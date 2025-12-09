import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { UpIcon, DownIcon, ResetIcon, PauseIcon, PlayIcon, AudioIcon, SpiralIcon, WavesIcon } from '@components/Utils';
import wiseMindPracticeData from '../data/wiseMindPractice.json';

interface TimerState {
    isRunning: boolean;
    timeRemaining: number; // in seconds
    totalTime: number; // in seconds
}

const TimerComponent: React.FC<{
    minutes: number;
    onTimeUp?: () => void;
}> = ({ minutes, onTimeUp }) => {
    const [timerState, setTimerState] = useState<TimerState>({
        isRunning: false,
        timeRemaining: minutes * 60,
        totalTime: minutes * 60,
    });
    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (timerState.isRunning && timerState.timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimerState((prev) => {
                    if (prev.timeRemaining <= 1) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        }
                        if (onTimeUp) {
                            onTimeUp();
                        }
                        return { ...prev, isRunning: false, timeRemaining: 0 };
                    }
                    return { ...prev, timeRemaining: prev.timeRemaining - 1 };
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timerState.isRunning, timerState.timeRemaining, onTimeUp]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setTimerState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    };

    const handleReset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimerState({
            isRunning: false,
            timeRemaining: minutes * 60,
            totalTime: minutes * 60,
        });
    };

    const handleAudio = () => {
        // TODO: Implement audio functionality
        console.log('Audio pressed');
    };

    return (
        <View className="mb-4">
            {/* Timer Display */}
            <View className='flex-row items-center justify-center w-full'>
                <View
                    className="rounded-xl px-8 py-4 mb-4 items-center justify-center"
                    style={{ backgroundColor: colors.green_50 }}
                >
                    <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]}>
                        {formatTime(timerState.timeRemaining)}
                    </Text>
                </View>
            </View>

            {/* Timer Controls */}
            <View className="flex-row justify-center gap-4 mb-4">
                {/* Reset Button */}
                <Pressable
                    onPress={handleReset}
                    className="items-center"
                >
                    <View
                        className="w-10 h-10 rounded-xl items-center justify-center mb-2"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <ResetIcon size={12} color={colors.warm_dark} />
                    </View>
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                        Reset
                    </Text>
                </Pressable>

                {/* Start/Pause Button */}
                <Pressable
                    onPress={handleStart}
                    className="items-center"
                >
                    <View
                        className="w-10 h-10 rounded-xl items-center justify-center mb-2"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        {timerState.isRunning ? (
                            <PauseIcon size={11} color={colors.warm_dark} />
                        ) : (
                            <PlayIcon size={11} color={colors.warm_dark} />
                        )}
                    </View>
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                        {timerState.isRunning ? 'Pause' : 'Start'}
                    </Text>
                </Pressable>

                {/* Audio Button */}
                <Pressable
                    onPress={handleAudio}
                    className="items-center"
                >
                    <View
                        className="w-10 h-10 rounded-xl items-center justify-center mb-2"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <AudioIcon size={11} color={colors.warm_dark} />
                    </View>
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                        Audio
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default function WiseMindPracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = wiseMindPracticeData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        breathingReflection: true,
        visualization: true,
        reflectionIntegration: false,
    });

    // Breathing Reflection
    const [breathingInsights, setBreathingInsights] = useState('');

    // Visualization
    const [selectedVisualization, setSelectedVisualization] = useState<string>('');
    const [visualizationGuidance, setVisualizationGuidance] = useState('');

    // Reflection & Integration
    const [currentSituation, setCurrentSituation] = useState('');
    const [emotionMind, setEmotionMind] = useState('');
    const [reasonableMind, setReasonableMind] = useState('');
    const [wiseMind, setWiseMind] = useState('');
    const [pastExperience, setPastExperience] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleVisualizationSelect = (visualizationId: string) => {
        setSelectedVisualization(visualizationId);
    };

    const handleSave = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            breathingInsights,
            selectedVisualization,
            visualizationGuidance,
            currentSituation,
            emotionMind,
            reasonableMind,
            wiseMind,
            pastExperience,
        };
        console.log('Saving Wise Mind Practice data:', allData);
        // TODO: Show success message or navigate
    };

    const handleView = () => {
        dissolveTo('Learn_WiseMindPracticeEntries');
    };

    const breathingSection = sections.find(s => s.id === 'breathingReflection');
    const visualizationSection = sections.find(s => s.id === 'visualization');
    const reflectionSection = sections.find(s => s.id === 'reflectionIntegration');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {/* Intro Card */}
                    <View
                        className="rounded-2xl p-4 mb-4"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {intro.text}
                        </Text>
                    </View>

                    {/* Breathing Reflection Section */}
                    {breathingSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.breathingReflection ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('breathingReflection')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {breathingSection.title}
                                        </Text>
                                        {expandedSections.breathingReflection ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.breathingReflection && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                                        {breathingSection.instructions}
                                    </Text>
                                    <TimerComponent minutes={breathingSection.timerMinutes || 5} />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {breathingSection.question}
                                    </Text>
                                    <TextInput
                                        value={breathingInsights}
                                        onChangeText={setBreathingInsights}
                                        placeholder={breathingSection.placeholder}
                                        placeholderTextColor={colors.text_secondary}
                                        style={[
                                            t.textRegular,
                                            {
                                                color: colors.Text_Primary,
                                                backgroundColor: colors.white,
                                                borderColor: colors.stoke_gray,
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                padding: 12,
                                                minHeight: 90,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                            )}
                        </View>
                    )}

                    {/* Visualization Section */}
                    {visualizationSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.visualization ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('visualization')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {visualizationSection.title}
                                        </Text>
                                        {expandedSections.visualization ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.visualization && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-3'>
                                        {visualizationSection.instructions}
                                    </Text>
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Choose your visualization:
                                    </Text>
                                    {visualizationSection.visualizationOptions && (
                                        <View className="flex-row gap-3 mb-4">
                                            {visualizationSection.visualizationOptions.map((option) => (
                                                <Pressable
                                                    key={option.id}
                                                    onPress={() => handleVisualizationSelect(option.id)}
                                                    className="flex-1 rounded-xl p-4 items-center justify-center"
                                                    style={{
                                                        borderColor: selectedVisualization === option.id ? colors.Button_Orange : colors.stoke_gray,
                                                        borderWidth: selectedVisualization === option.id ? 2 : 1,
                                                        backgroundColor: colors.white,
                                                    }}
                                                >
                                                    <View className="mb-2">
                                                        {/* Simple icon representation - can be replaced with actual icons */}
                                                        <View
                                                            className="w-12 h-12 rounded-full items-center justify-center"
                                                            style={{ backgroundColor: colors.white }}
                                                        >
                                                            {option.icon === 'spiral' ? <SpiralIcon size={21} color={colors.warm_dark} /> : <WavesIcon size={18} color={colors.warm_dark} />}
                                                        </View>
                                                    </View>
                                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                                        {option.label}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    )}
                                    <TimerComponent minutes={visualizationSection.timerMinutes || 5} />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {visualizationSection.question}
                                    </Text>
                                    <TextInput
                                        value={visualizationGuidance}
                                        onChangeText={setVisualizationGuidance}
                                        placeholder={visualizationSection.placeholder}
                                        placeholderTextColor={colors.text_secondary}
                                        style={[
                                            t.textRegular,
                                            {
                                                color: colors.Text_Primary,
                                                backgroundColor: colors.white,
                                                borderColor: colors.stoke_gray,
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                padding: 12,
                                                minHeight: 90,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                            )}
                        </View>
                    )}

                    {/* Reflection & Integration Section */}
                    {reflectionSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.reflectionIntegration ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('reflectionIntegration')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {reflectionSection.title}
                                        </Text>
                                        {expandedSections.reflectionIntegration ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.reflectionIntegration && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                                        {reflectionSection.instructions}
                                    </Text>

                                    {/* Step 1: Current Situation */}
                                    {reflectionSection.steps && reflectionSection.steps[0] && (
                                        <View className="mb-4">
                                            <View className="flex-row items-center mb-3">
                                                <View
                                                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                                    style={{ backgroundColor: colors.orange_50 }}
                                                >
                                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                                        {reflectionSection.steps[0].number}
                                                    </Text>
                                                </View>
                                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                                    {reflectionSection.steps[0].title}
                                                </Text>
                                            </View>
                                            <TextInput
                                                value={currentSituation}
                                                onChangeText={setCurrentSituation}
                                                placeholder={reflectionSection.steps[0].placeholder}
                                                placeholderTextColor={colors.text_secondary}
                                                style={[
                                                    t.textRegular,
                                                    {
                                                        color: colors.Text_Primary,
                                                        backgroundColor: colors.white,
                                                        borderColor: colors.stoke_gray,
                                                        borderWidth: 1,
                                                        borderRadius: 12,
                                                        padding: 12,
                                                        minHeight: 90,
                                                        textAlignVertical: 'top',
                                                    },
                                                ]}
                                                multiline
                                            />
                                        </View>
                                    )}

                                    {/* Step 2: Three Minds Comparison */}
                                    {reflectionSection.steps && reflectionSection.steps[1] && (
                                        <View className="mb-4">
                                            <View className="flex-row items-center mb-3">
                                                <View
                                                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                                    style={{ backgroundColor: colors.orange_50 }}
                                                >
                                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                                        {reflectionSection.steps[1].number}
                                                    </Text>
                                                </View>
                                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                                    {reflectionSection.steps[1].title}
                                                </Text>
                                            </View>
                                            {reflectionSection.steps[1].subsections && reflectionSection.steps[1].subsections.map((subsection, index) => (
                                                <View key={index} className="mb-3">
                                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                        {subsection.title}
                                                    </Text>
                                                    <TextInput
                                                        value={
                                                            subsection.title === 'Emotion Mind' ? emotionMind :
                                                                subsection.title === 'Reasonable Mind' ? reasonableMind :
                                                                    wiseMind
                                                        }
                                                        onChangeText={(text) => {
                                                            if (subsection.title === 'Emotion Mind') {
                                                                setEmotionMind(text);
                                                            } else if (subsection.title === 'Reasonable Mind') {
                                                                setReasonableMind(text);
                                                            } else {
                                                                setWiseMind(text);
                                                            }
                                                        }}
                                                        placeholder={subsection.placeholder}
                                                        placeholderTextColor={colors.text_secondary}
                                                        style={[
                                                            t.textRegular,
                                                            {
                                                                color: colors.Text_Primary,
                                                                backgroundColor: colors.white,
                                                                borderColor: colors.stoke_gray,
                                                                borderWidth: 1,
                                                                borderRadius: 12,
                                                                padding: 12,
                                                                minHeight: 90,
                                                                textAlignVertical: 'top',
                                                            },
                                                        ]}
                                                        multiline
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    {/* Step 3: Past Experience */}
                                    {reflectionSection.steps && reflectionSection.steps[2] && (
                                        <View className="mb-4">
                                            <View className="flex-row items-center mb-3">
                                                <View
                                                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                                    style={{ backgroundColor: colors.orange_50 }}
                                                >
                                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                                        {reflectionSection.steps[2].number}
                                                    </Text>
                                                </View>
                                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                                    {reflectionSection.steps[2].title}
                                                </Text>
                                            </View>
                                            <TextInput
                                                value={pastExperience}
                                                onChangeText={setPastExperience}
                                                placeholder={reflectionSection.steps[2].placeholder}
                                                placeholderTextColor={colors.text_secondary}
                                                style={[
                                                    t.textRegular,
                                                    {
                                                        color: colors.Text_Primary,
                                                        backgroundColor: colors.white,
                                                        borderColor: colors.stoke_gray,
                                                        borderWidth: 1,
                                                        borderRadius: 12,
                                                        padding: 12,
                                                        minHeight: 90,
                                                        textAlignVertical: 'top',
                                                    },
                                                ]}
                                                multiline
                                            />
                                        </View>
                                    )}


                                </View>
                            )}
                        </View>
                    )}
                    {/* View and Save Buttons */}
                    <View className="flex-row gap-3 mt-4">
                        <Pressable
                            className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleView}
                        >
                            <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                {buttons.view}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSave}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]}>
                                {buttons.save}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

