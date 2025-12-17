import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { TabSwitcher } from '../components/TabSwitcher';
import { EmotionTagSelector } from '../components/EmotionTagSelector';
import { IntensitySlider } from '../components/IntensitySlider';
import { EmotionHistoryList } from '../components/EmotionHistoryList';
import { TodayEmotionStatusModal } from '../components/TodayEmotionStatusModal';
import { ArrowRightIcon } from '@components/Utils';
import emotionsWheelData from '../data/emotionsWheelData.json';
import { fetchEmotionsTracking, updateEmotionsTracking, EmotionTrackingEntry, EmotionTrackingDay } from '../api/emotionwheel';
import { formatDateToISO } from '@features/home/utils';

interface EmotionEntry {
    date: string;
    day: string;
    primaryEmotion: string | null;
    secondaryEmotion: string | null;
    intensity: number | null;
}

export default function EmotionsTrackerScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { primaryEmotions } = emotionsWheelData;

    const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');
    const [selectedPrimaryEmotion, setSelectedPrimaryEmotion] = useState<string | null>(null);
    const [selectedSecondaryEmotion, setSelectedSecondaryEmotion] = useState<string | null>(null);
    const [intensity, setIntensity] = useState(5);
    const [hasLoggedToday, setHasLoggedToday] = useState(false);
    const [todayEntry, setTodayEntry] = useState<{ primary: string; secondary: string; intensity: number } | null>(null);
    const [historyEntries, setHistoryEntries] = useState<EmotionEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get all primary emotion names
    const primaryEmotionNames = primaryEmotions.map(em => em.name);

    // Get secondary emotions for selected primary emotion
    const selectedPrimaryEmotionData = primaryEmotions.find(em => em.name === selectedPrimaryEmotion);
    const secondaryEmotions = selectedPrimaryEmotionData?.subEmotions || [];

    // Reset secondary emotion when primary emotion changes
    useEffect(() => {
        if (selectedPrimaryEmotion) {
            const newSecondaryEmotions = primaryEmotions.find(em => em.name === selectedPrimaryEmotion)?.subEmotions || [];
            if (selectedSecondaryEmotion && !newSecondaryEmotions.includes(selectedSecondaryEmotion)) {
                setSelectedSecondaryEmotion(null);
            }
        } else {
            setSelectedSecondaryEmotion(null);
        }
    }, [selectedPrimaryEmotion]);

    

    // Load today's emotion data and history
    useEffect(() => {
        const loadEmotionsData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const today = new Date();
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const todayDateStr = formatDateToISO(today)
                today.setHours(0, 0, 0, 0);

                // Fetch latest 7 days data (API returns array of 7 entries, one for each of the last 7 days)
                const weekData = await fetchEmotionsTracking(todayDateStr);
                
                // The last entry in the array is today's entry
                const todayEntryData = weekData[weekData.length - 1] || null;

                // Check if user has logged today
                if (todayEntryData) {
                    setTodayEntry({
                        primary: todayEntryData.primary,
                        secondary: todayEntryData.secondary,
                        intensity: todayEntryData.intensity,
                    });
                    setHasLoggedToday(true);
                    setSelectedPrimaryEmotion(todayEntryData.primary);
                    setSelectedSecondaryEmotion(todayEntryData.secondary);
                    setIntensity(todayEntryData.intensity);
                } else {
                    setHasLoggedToday(false);
                }

                // Generate history entries from the 7 days data
                // weekData array contains entries for the last 7 days (oldest to newest)
                const entries: EmotionEntry[] = [];
                
                // Generate dates for the last 7 days (oldest to newest)
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - i);
                    const dayIndex = date.getDay();
                    const dayName = dayNames[dayIndex];
                    const dateNumber = date.getDate();

                    // Map weekData index: weekData[0] is 6 days ago, weekData[6] is today
                    // So weekData[6 - i] corresponds to the date we're processing
                    const dataIndex = 6 - i;
                    const entryData = weekData[dataIndex] || null;

                    entries.push({
                        date: dateNumber.toString(),
                        day: dayName,
                        primaryEmotion: entryData?.primary || null,
                        secondaryEmotion: entryData?.secondary || null,
                        intensity: entryData?.intensity || null,
                    });
                }

                setHistoryEntries(entries);
            } catch (err) {
                console.error('Failed to load emotions tracking data:', err);
                setError('Failed to load emotions data. Please try again.');
                // Initialize with empty entries on error
                const entries: EmotionEntry[] = [];
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - i);
                    const dayIndex = date.getDay();
                    const dayName = dayNames[dayIndex];
                    const dateNumber = date.getDate();
                    entries.push({
                        date: dateNumber.toString(),
                        day: dayName,
                        primaryEmotion: null,
                        secondaryEmotion: null,
                        intensity: null,
                    });
                }
                setHistoryEntries(entries);
            } finally {
                setIsLoading(false);
            }
        };

        loadEmotionsData();
    }, []);

    const handleSaveEmotions = async () => {
        if (!selectedPrimaryEmotion || !selectedSecondaryEmotion) {
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const today = new Date();
            const todayDateStr = formatDateToISO(today);

            // Prepare entry data
            const entryData: EmotionTrackingEntry = {
                primary: selectedPrimaryEmotion,
                secondary: selectedSecondaryEmotion,
                intensity: intensity,
            };

            // Save to API
            await updateEmotionsTracking(todayDateStr, entryData);

            // Update local state
            const entry = {
                primary: selectedPrimaryEmotion,
                secondary: selectedSecondaryEmotion,
                intensity: intensity,
            };
            setTodayEntry(entry);
            setHasLoggedToday(true);

            // Update history
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayName = dayNames[today.getDay()];

            const newHistoryEntries = [...historyEntries];
            newHistoryEntries[newHistoryEntries.length - 1] = {
                date: today.getDate().toString(),
                day: dayName,
                primaryEmotion: selectedPrimaryEmotion,
                secondaryEmotion: selectedSecondaryEmotion,
                intensity: intensity,
            };
            setHistoryEntries(newHistoryEntries);
        } catch (err) {
            console.error('Failed to save emotions:', err);
            setError('Failed to save emotions. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateToday = () => {
        setHasLoggedToday(false);
        setSelectedPrimaryEmotion(todayEntry?.primary || null);
        setSelectedSecondaryEmotion(todayEntry?.secondary || null);
        setIntensity(todayEntry?.intensity || 5);
    };

    const handleBackToMenu = () => {
        setHasLoggedToday(false);
        setTodayEntry(null);
        dissolveTo('Learn_EmotionsWheelExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Emotions Tracker" showHomeIcon={true} showLeafIcon={true} />

            {error && (
                <View className="mx-5 mt-2 p-3 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                        {error}
                    </Text>
                </View>
            )}

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            ) : (
                <>
            <View className="px-5">
                {/* Tab Switcher */}
                <TabSwitcher
                    tabs={[
                        { label: 'Today', value: 'today' },
                        { label: 'History', value: 'history' },
                    ]}
                    activeTab={activeTab}
                    onTabChange={(value) => setActiveTab(value as 'today' | 'history')}
                />
            </View>

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {activeTab === 'today' && (
                    <View className='flex-col'>
                        <View className='border border-gray-200 rounded-2xl p-4'>
                            {/* Heading */}
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Track Today's Emotions
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-6">
                                What are you feeling right now?
                            </Text>

                            {/* Primary Emotion Selector */}
                            <EmotionTagSelector
                                title="Primary Emotion"
                                emotions={primaryEmotionNames}
                                selectedEmotion={selectedPrimaryEmotion}
                                onSelect={setSelectedPrimaryEmotion}
                            />

                            {/* Secondary Emotion Selector */}
                            {selectedPrimaryEmotion && secondaryEmotions.length > 0 && (
                                <EmotionTagSelector
                                    title="Secondary Emotion"
                                    emotions={secondaryEmotions}
                                    selectedEmotion={selectedSecondaryEmotion}
                                    onSelect={setSelectedSecondaryEmotion}
                                />
                            )}

                            {/* Intensity Slider */}
                            <IntensitySlider
                                value={intensity}
                                onValueChange={setIntensity}
                            />
                        </View>

                        {/* Save Button */}
                        <Pressable
                            className="rounded-full py-4 px-3 flex-row items-center justify-center mb-20 mt-10"
                            style={{ 
                                backgroundColor: isSaving ? colors.text_secondary : colors.Button_Orange,
                                opacity: isSaving ? 0.6 : 1,
                            }}
                            onPress={handleSaveEmotions}
                            disabled={!selectedPrimaryEmotion || !selectedSecondaryEmotion || isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator size="small" color={colors.white} />
                            ) : (
                                <>
                                    <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                                        Save Today's Emotions
                                    </Text>
                                    <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                        <ArrowRightIcon size={16} color={colors.icon} />
                                    </View>
                                </>
                            )}
                        </Pressable>
                    </View>
                )}

                {activeTab === 'history' && (
                    <EmotionHistoryList entries={historyEntries} />
                )}
            </ScrollView>
                </>
            )}

            {/* Already Logged Modal */}
            {hasLoggedToday && todayEntry && (
                <TodayEmotionStatusModal
                    visible={hasLoggedToday}
                    primaryEmotion={todayEntry.primary}
                    secondaryEmotion={todayEntry.secondary}
                    intensity={todayEntry.intensity}
                    onUpdate={handleUpdateToday}
                    onBackToMenu={handleBackToMenu}
                    onClose={() => setHasLoggedToday(false)}
                />
            )}
        </View>
    );
}

