import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { UpIcon, DownIcon, ResetIcon, PauseIcon, PlayIcon, AudioIcon } from '@components/Utils';
import lovingKindnessPracticeData from '../data/lovingKindnessPractice.json';

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

export default function LovingKindnessPracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = lovingKindnessPracticeData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        forYourself: true,
        forLovedOne: false,
        forNeutralPerson: false,
        forDifficultPerson: false,
        overallReflection: false,
    });

    // Reflection states for each section
    const [yourselfReflection, setYourselfReflection] = useState('');
    const [lovedOneReflection, setLovedOneReflection] = useState('');
    const [neutralPersonReflection, setNeutralPersonReflection] = useState('');
    const [difficultPersonReflection, setDifficultPersonReflection] = useState('');
    const [overallReflection, setOverallReflection] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleSave = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            yourselfReflection,
            lovedOneReflection,
            neutralPersonReflection,
            difficultPersonReflection,
            overallReflection,
        };
        console.log('Saving Loving Kindness Practice data:', allData);
        // TODO: Show success message or navigate
    };

    const handleView = () => {
        dissolveTo('Learn_LovingKindnessPracticeEntries');
    };

    const forYourselfSection = sections.find(s => s.id === 'forYourself');
    const forLovedOneSection = sections.find(s => s.id === 'forLovedOne');
    const forNeutralPersonSection = sections.find(s => s.id === 'forNeutralPerson');
    const forDifficultPersonSection = sections.find(s => s.id === 'forDifficultPerson');

    const renderSection = (section: any, reflectionValue: string, setReflection: (value: string) => void, sectionKey: string) => {
        if (!section) return null;

        return (
            <View className="mb-4">
                <Pressable
                    className={`flex-row items-center justify-between px-4 py-4 ${expandedSections[sectionKey] ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                    style={{ backgroundColor: colors.orange_50 }}
                    onPress={() => toggleSection(sectionKey)}
                >
                    <View className="flex-1">
                        <View className="flex-row items-center justify-between mb-1">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                {section.title}
                            </Text>
                            {expandedSections[sectionKey] ? (
                                <UpIcon size={12} color={colors.Text_Primary} />
                            ) : (
                                <DownIcon size={12} color={colors.Text_Primary} />
                            )}
                        </View>
                    </View>
                </Pressable>

                {expandedSections[sectionKey] && (
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
                            {section.instructions}
                        </Text>

                        {/* Loving Kindness Phrases */}
                        <View className="mb-4">
                            <Text
                                style={[t.title20SemiBold, { color: colors.Button_Orange }]}
                                className="text-center"
                            >
                                {section.phrases}
                            </Text>
                        </View>

                        {section.additionalInstructions && (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                                {section.additionalInstructions}
                            </Text>
                        )}

                        {/* Timer Component */}
                        <TimerComponent minutes={section.timerMinutes || 1.5} />

                        {/* Reflection Input */}
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                            {section.reflectionLabel}
                        </Text>
                        <TextInput
                            value={reflectionValue}
                            onChangeText={setReflection}
                            placeholder={section.reflectionPlaceholder}
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
        );
    };

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
                        style={{ backgroundColor: colors.cream_40 }}
                    >
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {intro.text}
                        </Text>
                    </View>

                    {/* Loving Kindness for Yourself */}
                    {renderSection(forYourselfSection, yourselfReflection, setYourselfReflection, 'forYourself')}

                    {/* Loving Kindness for a Loved One */}
                    {renderSection(forLovedOneSection, lovedOneReflection, setLovedOneReflection, 'forLovedOne')}

                    {/* Loving Kindness for a Neutral Person */}
                    {renderSection(forNeutralPersonSection, neutralPersonReflection, setNeutralPersonReflection, 'forNeutralPerson')}

                    {/* Loving Kindness for a Difficult Person */}
                    {forDifficultPersonSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.forDifficultPerson ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('forDifficultPerson')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {forDifficultPersonSection.title}
                                        </Text>
                                        {expandedSections.forDifficultPerson ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.forDifficultPerson && (
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
                                        {forDifficultPersonSection.instructions}
                                    </Text>

                                    {/* Loving Kindness Phrases */}
                                    <View className="mb-4">
                                        <Text
                                            style={[t.title20SemiBold, { color: colors.Button_Orange }]}
                                            className="text-center"
                                        >
                                            {forDifficultPersonSection.phrases}
                                        </Text>
                                    </View>

                                    {forDifficultPersonSection.additionalInstructions && (
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                                            {forDifficultPersonSection.additionalInstructions}
                                        </Text>
                                    )}

                                    {/* Timer Component */}
                                    <TimerComponent minutes={forDifficultPersonSection.timerMinutes || 1.5} />

                                    {/* Reflection Input */}
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {forDifficultPersonSection.reflectionLabel}
                                    </Text>
                                    <TextInput
                                        value={difficultPersonReflection}
                                        onChangeText={setDifficultPersonReflection}
                                        placeholder={forDifficultPersonSection.reflectionPlaceholder}
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
                            {/* Overall Reflection Subsection */}
                            {forDifficultPersonSection.overallReflection && (
                                <View className="mt-4">
                                    <Pressable
                                        className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.overallReflection ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                        style={{ backgroundColor: colors.orange_50 }}
                                        onPress={() => toggleSection('overallReflection')}
                                    >
                                        <View className="flex-1">
                                            <View className="flex-row items-center justify-between mb-1">
                                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                                    {forDifficultPersonSection.overallReflection.title}
                                                </Text>
                                                {expandedSections.overallReflection ? (
                                                    <UpIcon size={12} color={colors.Text_Primary} />
                                                ) : (
                                                    <DownIcon size={12} color={colors.Text_Primary} />
                                                )}
                                            </View>
                                        </View>
                                    </Pressable>

                                    {expandedSections.overallReflection && (
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
                                                {forDifficultPersonSection.overallReflection.instructions}
                                            </Text>

                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                                {forDifficultPersonSection.overallReflection.label}
                                            </Text>
                                            <TextInput
                                                value={overallReflection}
                                                onChangeText={setOverallReflection}
                                                placeholder={forDifficultPersonSection.overallReflection.placeholder}
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
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

