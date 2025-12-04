import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
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

    // Generate history entries (last 7 days)
    useEffect(() => {
        const generateHistoryEntries = () => {
            const entries: EmotionEntry[] = [];
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to start of day

            // Generate entries for the last 7 days (including today)
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dayIndex = date.getDay();
                const dayName = dayNames[dayIndex];
                const dateNumber = date.getDate();

                // Mock data: Only show entries for the last 2 days (yesterday and today)
                if (i === 1 || i === 0) {
                    entries.push({
                        date: dateNumber.toString(),
                        day: dayName,
                        primaryEmotion: 'Love',
                        secondaryEmotion: 'Adoration',
                        intensity: i === 0 ? 8 : 6,
                    });
                } else {
                    entries.push({
                        date: dateNumber.toString(),
                        day: dayName,
                        primaryEmotion: null,
                        secondaryEmotion: null,
                        intensity: null,
                    });
                }
            }

            return entries;
        };

        setHistoryEntries(generateHistoryEntries());

        // Check if user has logged today (mock - in real app, check from storage)
        // For demo, set to false initially
        setHasLoggedToday(false);
    }, []);

    const handleSaveEmotions = () => {
        if (selectedPrimaryEmotion && selectedSecondaryEmotion) {
            // Save to storage (mock)
            const entry = {
                primary: selectedPrimaryEmotion,
                secondary: selectedSecondaryEmotion,
                intensity: intensity,
            };
            setTodayEntry(entry);
            setHasLoggedToday(true);

            // Update history
            const today = new Date();
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayName = dayNames[today.getDay()];

            const newHistoryEntries = [...historyEntries];
            newHistoryEntries[newHistoryEntries.length - 1] = {
                date: today.toISOString().split('T')[0],
                day: `${dayName} ${today.getDate()}`,
                primaryEmotion: selectedPrimaryEmotion,
                secondaryEmotion: selectedSecondaryEmotion,
                intensity: intensity,
            };
            setHistoryEntries(newHistoryEntries);
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
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSaveEmotions}
                            disabled={!selectedPrimaryEmotion || !selectedSecondaryEmotion}
                        >
                            <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                                Save Today's Emotions
                            </Text>
                            <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                <ArrowRightIcon size={16} color={colors.icon} />
                            </View>
                        </Pressable>
                    </View>
                )}

                {activeTab === 'history' && (
                    <EmotionHistoryList entries={historyEntries} />
                )}
            </ScrollView>

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

