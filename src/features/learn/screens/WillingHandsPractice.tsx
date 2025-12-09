import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { UpIcon, DownIcon, ResetIcon, PauseIcon, PlayIcon, AudioIcon, HandIcon } from '@components/Utils';
import willingHandsPracticeData from '../data/willingHandsPractice.json';

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

export default function WillingHandsPracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = willingHandsPracticeData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        willingHandsPosture: true,
        bodyScan: false,
        setIntention: false,
        reflectionIntegration: false,
    });

    // Body Scan
    const [bodyScanTension, setBodyScanTension] = useState('');

    // Set Intention
    const [situation, setSituation] = useState('');
    const [intention, setIntention] = useState('');

    // Reflection & Integration
    const [reflection, setReflection] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleSave = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            bodyScanTension,
            situation,
            intention,
            reflection,
        };
        console.log('Saving Willing Hands Practice data:', allData);
        // TODO: Show success message or navigate
    };

    const handleView = () => {
        dissolveTo('Learn_WillingHandsEntries');
    };

    const handleClearForm = () => {
        setBodyScanTension('');
        setSituation('');
        setIntention('');
        setReflection('');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_WillingHandsExercises');
    };

    const willingHandsPostureSection = sections.find(s => s.id === 'willingHandsPosture');
    const bodyScanSection = sections.find(s => s.id === 'bodyScan');
    const setIntentionSection = sections.find(s => s.id === 'setIntention');
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

                    {/* Willing Hands Posture Section */}
                    {willingHandsPostureSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.willingHandsPosture ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('willingHandsPosture')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {willingHandsPostureSection.title}
                                        </Text>
                                        {expandedSections.willingHandsPosture ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.willingHandsPosture && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <View className='items-center justify-center mb-4'>
                                        <HandIcon size={26} color={colors.warm_dark} />
                                    </View>
                                    {willingHandsPostureSection.steps && (
                                        <View className='bg-yellow-20 p-3 rounded-xl mb-4' style={{ backgroundColor: colors.yellow_20 }}>
                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                                {willingHandsPostureSection.instructions}
                                            </Text>
                                            <View className="mb-4">
                                                {willingHandsPostureSection.steps.map((step, index) => (
                                                    <View key={index} className="flex-row mb-2">
                                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                            •
                                                        </Text>
                                                        <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                                            {step}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>

                                    )}
                                    {willingHandsPostureSection.quote && (
                                        <View
                                            className="rounded-xl p-3"
                                            style={{ backgroundColor: colors.orange_50 }}
                                        >
                                            <Text style={[t.textRegular, { color: colors.warm_dark }]}>
                                                "{willingHandsPostureSection.quote}"
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    )}

                    {/* Body Scan with Willing Hands Section */}
                    {bodyScanSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.bodyScan ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('bodyScan')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {bodyScanSection.title}
                                        </Text>
                                        {expandedSections.bodyScan ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.bodyScan && (
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
                                        {bodyScanSection.instructions}
                                    </Text>
                                    <TimerComponent minutes={bodyScanSection.timerMinutes || 5} />

                                    {bodyScanSection.guideTitle && (
                                        <View
                                            className="rounded-xl p-3 mb-4"
                                            style={{ backgroundColor: colors.yellow_20 }}
                                        >
                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                {bodyScanSection.guideTitle}
                                            </Text>
                                            {bodyScanSection.guideSteps && (
                                                <View>
                                                    {bodyScanSection.guideSteps.map((step, index) => (
                                                        <View key={index} className="flex-row mb-2">
                                                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                                •
                                                            </Text>
                                                            <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                                                {step}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    )}

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {bodyScanSection.question}
                                    </Text>
                                    <TextInput
                                        value={bodyScanTension}
                                        onChangeText={setBodyScanTension}
                                        placeholder={bodyScanSection.placeholder}
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

                    {/* Set Your Intention Section */}
                    {setIntentionSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.setIntention ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('setIntention')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {setIntentionSection.title}
                                        </Text>
                                        {expandedSections.setIntention ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.setIntention && (
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
                                        {setIntentionSection.instructions}
                                    </Text>

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {setIntentionSection.question1}
                                    </Text>
                                    <TextInput
                                        value={situation}
                                        onChangeText={setSituation}
                                        placeholder={setIntentionSection.placeholder1}
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
                                                marginBottom: 16,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    {setIntentionSection.subSectionTitle && (
                                        <View
                                            className="rounded-xl p-3 mb-4"
                                            style={{ backgroundColor: colors.yellow_20 }}
                                        >
                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                {setIntentionSection.subSectionTitle}
                                            </Text>
                                            {setIntentionSection.subSectionSteps && (
                                                <View>
                                                    {setIntentionSection.subSectionSteps.map((step, index) => (
                                                        <View key={index} className="flex-row mb-2">
                                                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                                •
                                                            </Text>
                                                            <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                                                {step}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    )}

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {setIntentionSection.question2}
                                    </Text>
                                    <TextInput
                                        value={intention}
                                        onChangeText={setIntention}
                                        placeholder={setIntentionSection.placeholder2}
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

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {reflectionSection.question}
                                    </Text>
                                    <TextInput
                                        value={reflection}
                                        onChangeText={setReflection}
                                        placeholder={reflectionSection.placeholder}
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
                                                marginBottom: 16,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    {reflectionSection.subSectionTitle && (
                                        <View
                                            className="rounded-xl p-3 mb-4"
                                            style={{ backgroundColor: colors.yellow_20 }}
                                        >
                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                {reflectionSection.subSectionTitle}
                                            </Text>
                                            {reflectionSection.subSectionSteps && (
                                                <View>
                                                    {reflectionSection.subSectionSteps.map((step, index) => (
                                                        <View key={index} className="flex-row mb-2">
                                                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                                •
                                                            </Text>
                                                            <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                                                {step}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    )}


                                </View>
                            )}
                        </View>
                    )}

                    {/* View, Save, Clear Form, Back to menu Buttons */}
                    <View className="flex-row gap-3 mb-3">
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
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleClearForm}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.clearForm}
                        </Text>
                    </Pressable>
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleBackToMenu}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.backToMenu}
                        </Text>
                    </Pressable>

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

