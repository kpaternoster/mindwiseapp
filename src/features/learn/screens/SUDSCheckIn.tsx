import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { TabSwitcher1 } from '../components/TabSwitcher1';
import { StepHeader } from '../components/StepHeader';
import { SUDSSlider } from '../components/SUDSSlider';
import { NumberedInputSection } from '../components/NumberedInputSection';
import { SUDSEntryCard, SUDSEntry } from '../components/SUDSEntryCard';
import { SUDSCalendar } from '../components/SUDSCalendar';
import { SUDSGraph } from '../components/SUDSGraph';
import { ArrowRightIcon, BackIcon, LeafIcon } from '@components/Utils';
import { fetchSudsCheckin, updateSudsCheckin, SudsCheckin, fetchSudsList, SudsCheckinListItem } from '../api/suds';
import { formatDateToISO, getCurrentDate } from '@features/home/utils';


// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = (): string => {
    return formatDateToISO(new Date());
};

export default function SUDSCheckInScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [activeTab, setActiveTab] = useState<'checkin' | 'list' | 'calendar' | 'graph'>('checkin');
    const [savedEntries, setSavedEntries] = useState<SUDSEntry[]>([]);

    // Form state
    const [sudsLevel, setSudsLevel] = useState(0);
    const [body, setBody] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [urges, setUrges] = useState('');
    const [triggers, setTriggers] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentEditingDate, setCurrentEditingDate] = useState<string>(formatDateToISO(new Date()));

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [activeTab]);

    // Load data when component mounts or when switching tabs
    useEffect(() => {
        if (activeTab === 'checkin' && currentEditingDate == formatDateToISO(new Date())) {
            loadTodayCheckin();
        } else if (activeTab === 'list' || activeTab === 'calendar' || activeTab === 'graph') {
            loadSudsList();
        }
    }, [activeTab]);

    // Map API response to component state
    const mapApiToComponentState = (data: SudsCheckin) => {
        if (data) {
            console.log('data', data);
            setSudsLevel(data.distress??0);
            setBody(data.bodySensations);
            setThoughts(data.thoughts);
            setUrges(data.urges);
            setTriggers(data.triggers);
        }
    };

    // Map component state to API format
    const mapComponentStateToApi = (): SudsCheckin => {
        return {
            distress: sudsLevel,
            bodySensations: body.trim(),
            thoughts: thoughts.trim(),
            urges: urges.trim(),
            triggers: triggers.trim(),
        };
    };

    // Map API data to SUDSEntry format
    const mapApiToEntry = (date: string, data: SudsCheckin): SUDSEntry => {
        return {
            id: date,
            date: new Date(date).toISOString(),
            sudsLevel: data.distress,
            body: data.bodySensations,
            thoughts: data.thoughts,
            urges: data.urges,
            triggers: data.triggers,
        };
    };

    // Map API list item to SUDSEntry format
    const mapListItemToEntry = (item: SudsCheckinListItem): SUDSEntry => {
        return {
            id: item.date,
            date: new Date(item.date).toISOString(),
            sudsLevel: item.distress,
            body: item.bodySensations,
            thoughts: item.thoughts,
            urges: item.urges,
            triggers: item.triggers,
        };
    };

    // Load today's check-in from API
    const loadTodayCheckin = async () => {
        try {
            setIsLoading(true);
            const todayDate = getTodayDateString();
            const data = await fetchSudsCheckin(todayDate);
            mapApiToComponentState(data);
            setCurrentEditingDate(todayDate);
        } catch (error) {
            console.error('Error fetching today\'s SUDS check-in:', error);
            // If no check-in exists for today, start with empty form
            setCurrentEditingDate(getTodayDateString());
        } finally {
            setIsLoading(false);
        }
    };

    // Load SUDS list from API
    const loadSudsList = async () => {
        try {
            setIsLoading(true);
            const listData = await fetchSudsList();
            const entries = listData.map(mapListItemToEntry);
            setSavedEntries(entries);
        } catch (error) {
            console.error('Error fetching SUDS list:', error);
            // Keep existing entries if API fails
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearForm = () => {
        setSudsLevel(0);
        setBody('');
        setThoughts('');
        setUrges('');
        setTriggers('');
        setCurrentEditingDate(getTodayDateString());
    };

    const handleSaveEntry = async () => {
        try {
            setIsLoading(true);
            const dateToSave = currentEditingDate || getTodayDateString();
            const checkinData = mapComponentStateToApi();

            // Save to API
            await updateSudsCheckin(dateToSave, checkinData);
            
            handleClearForm();
            setActiveTab('list');
            // The useEffect will trigger loadSudsList when switching to list tab
        } catch (error) {
            console.error('Error saving SUDS check-in:', error);
            // Still update local state even if API fails
            const todayDate = getTodayDateString();
            const newEntry: SUDSEntry = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                sudsLevel,
                body: body.trim(),
                thoughts: thoughts.trim(),
                urges: urges.trim(),
                triggers: triggers.trim(),
            };
            setSavedEntries([newEntry, ...savedEntries]);
            handleClearForm();
            setActiveTab('list');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditEntry = async (entry: SUDSEntry) => {
        try {
            setIsLoading(true);
            const entryDate = formatDateToISO(new Date(entry.date));
            // Load the entry data from API to ensure we have the latest
            try {
                const data = await fetchSudsCheckin(entryDate);
                mapApiToComponentState(data);
            } catch (error) {
                // If API fails, use the entry data we have
                console.error('Error fetching entry for edit:', error);
                setSudsLevel(entry.sudsLevel);
                setBody(entry.body);
                setThoughts(entry.thoughts);
                setUrges(entry.urges);
                setTriggers(entry.triggers);
            }

            setCurrentEditingDate(entryDate);
            setActiveTab('checkin');
        } catch (error) {
            console.error('Error loading entry for edit:', error);
            // Fallback to local entry data
            setSudsLevel(entry.sudsLevel);
            setBody(entry.body);
            setThoughts(entry.thoughts);
            setUrges(entry.urges);
            setTriggers(entry.triggers);
            setCurrentEditingDate(formatDateToISO(new Date(entry.date)));
            setActiveTab('checkin');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="SUDS Check-In" showHomeIcon={true} showLeafIcon={true} />

                <View className="px-5">
                    {/* Tab Switcher */}
                    <TabSwitcher1
                        tabs={[
                            { label: 'Check-In', value: 'checkin' },
                            { label: 'List', value: 'list' },
                            { label: 'Calendar', value: 'calendar' },
                            { label: 'Graph', value: 'graph' },
                        ]}
                        activeTab={activeTab}
                        onTabChange={(value) => {
                            setActiveTab(value as 'checkin' | 'list' | 'calendar' | 'graph');
                            if (value === 'checkin') {
                                setCurrentEditingDate(formatDateToISO(new Date()));
                            }
                        }}
                    />
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'checkin' && (
                        <>
                            {isLoading ? (
                                <View className="items-center justify-center py-20">
                                    <ActivityIndicator size="large" color={colors.button_orange} />
                                </View>
                            ) : (
                                <>
                                    {/* Step Header */}
                                    <StepHeader
                                        currentStep={1}
                                        totalSteps={4}
                                        stepTitle="What are you experiencing?"
                                        stepSubtitle="Take a moment to notice what's happening in your body, mind, and urges."
                                    />

                                    <View className="px-5">
                                        {/* SUDS Slider */}
                                        <SUDSSlider
                                            value={sudsLevel}
                                            onValueChange={setSudsLevel}
                                        />

                                        {/* Body Sensations */}
                                        <NumberedInputSection
                                            number={2}
                                            title="Body Sensations"
                                            placeholder="What do you notice in your body? (Tension, pain, temperature, etc)"
                                            value={body}
                                            onChangeText={setBody}
                                        />

                                        {/* Thoughts */}
                                        <NumberedInputSection
                                            number={3}
                                            title="Thoughts"
                                            placeholder="What thoughts are going through your mind?"
                                            value={thoughts}
                                            onChangeText={setThoughts}
                                        />

                                        {/* Urges */}
                                        <NumberedInputSection
                                            number={4}
                                            title="Urges"
                                            placeholder="What do you feel like doing? (avoiding, yelling, hiding, etc)"
                                            value={urges}
                                            onChangeText={setUrges}
                                        />

                                        {/* Triggers */}
                                        <NumberedInputSection
                                            number={5}
                                            title="Triggers"
                                            placeholder="What happened or what situations led to these feeling?"
                                            value={triggers}
                                            onChangeText={setTriggers}
                                        />
                                    </View>
                                </>
                            )}
                        </>
                    )}

                    {activeTab === 'list' && (
                        <View className="px-5">
                            {isLoading ? (
                                <View className="items-center justify-center py-20">
                                    <ActivityIndicator size="large" color={colors.button_orange} />
                                </View>
                            ) : savedEntries.length === 0 ? (
                                <View className="items-center justify-center py-12">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        No entries saved yet
                                    </Text>
                                </View>
                            ) : (
                                savedEntries.map((entry) => (
                                    <SUDSEntryCard
                                        key={entry.id}
                                        entry={entry}
                                        onEdit={handleEditEntry}
                                    />
                                ))
                            )}
                        </View>
                    )}

                    {activeTab === 'calendar' && (
                        <View className="px-5">
                            {isLoading ? (
                                <View className="items-center justify-center py-20">
                                    <ActivityIndicator size="large" color={colors.button_orange} />
                                </View>
                            ) : (
                                <SUDSCalendar entries={savedEntries} />
                            )}
                        </View>
                    )}

                    {activeTab === 'graph' && (
                        <View className="px-5">
                            {isLoading ? (
                                <View className="items-center justify-center py-20">
                                    <ActivityIndicator size="large" color={colors.button_orange} />
                                </View>
                            ) : (
                                <SUDSGraph entries={savedEntries} />
                            )}
                        </View>
                    )}
                </ScrollView>

                {/* Footer Buttons */}
                {activeTab === 'checkin' && (
                    <View className="px-5 pb-6 pt-4" style={{ backgroundColor: colors.white }}>
                        <View className="flex-row gap-3">
                            <Pressable
                                className="flex-1 rounded-full py-4 items-center justify-center"
                                style={{
                                    borderWidth: 2,
                                    borderColor: colors.button_orange,
                                    backgroundColor: colors.white,
                                }}
                                onPress={handleClearForm}
                            >
                                <Text style={[t.button, { color: colors.button_orange }]}>
                                    Clear Form
                                </Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 rounded-full py-4 items-center justify-center"
                                style={{ backgroundColor: colors.button_orange }}
                                onPress={handleSaveEntry}
                            >
                                <Text style={[t.button, { color: colors.white }]}>
                                    Save Entry
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* Back to SUDS Exercises */}
                {(activeTab === 'list' || activeTab === 'calendar' || activeTab === 'graph') && (
                    <View className="px-5 pb-6 pt-4 flex-row items-center" style={{ backgroundColor: colors.white }}>
                        <Pressable
                            className="flex-row items-center"
                            onPress={() => dissolveTo('Learn_SUDSExercises')}
                        >
                            <BackIcon size={28} color={colors.warm_dark} />

                        </Pressable>
                        <Text style={[t.button, { color: colors.warm_dark }]} className='ml-2 text-center flex-1 justify-center'>
                            Back to SUDS Exercises
                        </Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

