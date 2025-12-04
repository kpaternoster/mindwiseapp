import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
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

// Generate mock data for the last 7 days
const generateMockData = (): SUDSEntry[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const mockEntries: SUDSEntry[] = [];
    const mockData = [
        { sudsLevel: 7, body: 'Tension in shoulders', thoughts: 'Feeling overwhelmed', urges: 'Want to avoid', triggers: 'Work deadline' },
        { sudsLevel: 5, body: 'Slight headache', thoughts: 'Worried about meeting', urges: 'Need to rest', triggers: 'Busy schedule' },
        { sudsLevel: 8, body: 'Racing heart', thoughts: 'Anxious about presentation', urges: 'Want to escape', triggers: 'Public speaking' },
        { sudsLevel: 6, body: 'Tight chest', thoughts: 'Feeling stressed', urges: 'Need to breathe', triggers: 'Family conflict' },
        { sudsLevel: 9, body: 'Severe tension', thoughts: 'Completely overwhelmed', urges: 'Want to hide', triggers: 'Multiple stressors' },
        { sudsLevel: 3, body: 'Mild discomfort', thoughts: 'Slightly worried', urges: 'Want to relax', triggers: 'Minor issue' },
        { sudsLevel: 7, body: 'Muscle tension', thoughts: 'Feeling anxious', urges: 'Need to calm down', triggers: 'Uncertain situation' },
    ];
    
    // Generate entries for the last 7 days
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const data = mockData[6 - i];
        
        mockEntries.push({
            id: `mock-${date.toISOString()}`,
            date: date.toISOString(),
            sudsLevel: data.sudsLevel,
            body: data.body,
            thoughts: data.thoughts,
            urges: data.urges,
            triggers: data.triggers,
        });
    }
    
    return mockEntries;
};

export default function SUDSCheckInScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [activeTab, setActiveTab] = useState<'checkin' | 'list' | 'calendar' | 'graph'>('checkin');
    const [savedEntries, setSavedEntries] = useState<SUDSEntry[]>(generateMockData());

    // Form state
    const [sudsLevel, setSudsLevel] = useState(5);
    const [body, setBody] = useState('');
    const [thoughts, setThoughts] = useState('');
    const [urges, setUrges] = useState('');
    const [triggers, setTriggers] = useState('');

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [activeTab]);

    const handleClearForm = () => {
        setSudsLevel(5);
        setBody('');
        setThoughts('');
        setUrges('');
        setTriggers('');
    };

    const handleSaveEntry = () => {
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
    };

    const handleEditEntry = (entry: SUDSEntry) => {
        setSudsLevel(entry.sudsLevel);
        setBody(entry.body);
        setThoughts(entry.thoughts);
        setUrges(entry.urges);
        setTriggers(entry.triggers);
        setActiveTab('checkin');
        // TODO: Handle editing existing entry (update instead of create new)
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
                        onTabChange={(value) => setActiveTab(value as 'checkin' | 'list' | 'calendar' | 'graph')}
                    />
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'checkin' && (
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

                    {activeTab === 'list' && (
                        <View className="px-5">
                            {savedEntries.length === 0 ? (
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
                            <SUDSCalendar entries={savedEntries} />
                        </View>
                    )}

                    {activeTab === 'graph' && (
                        <View className="px-5">
                            <SUDSGraph entries={savedEntries} />
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

