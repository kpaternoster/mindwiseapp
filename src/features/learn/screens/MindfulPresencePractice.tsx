import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard, TagButton } from '../components';
import { UpIcon, DownIcon, ArrowRightIcon, CaretRightIcon, MonitorPlayIcon, ResetIcon, AudioPauseIcon, AudioIcon, PauseIcon, PlayIcon } from '@components/Utils';
import mindfulPresencePracticeData from '../data/mindfulPresencePractice.json';
import { createHereAndNowEntry } from '../api/hereAndNow';

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

export default function MindfulPresencePracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = mindfulPresencePracticeData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        bodyAwareness: true,
        objectObservation: false,
        thoughtVisualization: false,
        reflection: false,
    });

    // Body Awareness
    const [bodyAwarenessInput, setBodyAwarenessInput] = useState('');

    // Object Observation
    const [selectedObject, setSelectedObject] = useState<string>('');
    const [customObject, setCustomObject] = useState('');
    const [objectObservationInput, setObjectObservationInput] = useState('');

    // Thought Visualization
    const [thoughtVisualizationInput, setThoughtVisualizationInput] = useState('');

    // Reflection
    const [reflectionInput, setReflectionInput] = useState('');

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleObjectSelect = (object: string) => {
        setSelectedObject(object);
        setCustomObject('');
    };

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            // Determine the object value (use customObject if provided, otherwise selectedObject)
            const objectValue = customObject.trim() || selectedObject;

            // Map form data to API format
            const entryData = {
                body: bodyAwarenessInput.trim(),
                object: objectValue,
                observation: objectObservationInput.trim(),
                thoughts: thoughtVisualizationInput.trim(),
                reflection: reflectionInput.trim(),
            };

            // Save to API
            await createHereAndNowEntry(entryData);

            // Show success message
            setSuccessMessage('Entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save here and now entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setBodyAwarenessInput('');
        setSelectedObject('');
        setCustomObject('');
        setObjectObservationInput('');
        setThoughtVisualizationInput('');
        setReflectionInput('');
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_MindfulPresencePracticeEntries');
    };

    const bodyAwarenessSection = sections.find(s => s.id === 'bodyAwareness');
    const objectObservationSection = sections.find(s => s.id === 'objectObservation');
    const thoughtVisualizationSection = sections.find(s => s.id === 'thoughtVisualization');
    const reflectionSection = sections.find(s => s.id === 'reflection');

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

                    {/* Body Awareness Scan Section */}
                    {bodyAwarenessSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.bodyAwareness ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('bodyAwareness')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {bodyAwarenessSection.title}
                                        </Text>
                                        {expandedSections.bodyAwareness ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>

                                </View>
                            </Pressable>

                            {expandedSections.bodyAwareness && (
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
                                        {bodyAwarenessSection.instructions}
                                    </Text>
                                    <TimerComponent minutes={bodyAwarenessSection.timerMinutes || 5} />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {bodyAwarenessSection.question}
                                    </Text>
                                    <TextInput
                                        value={bodyAwarenessInput}
                                        onChangeText={setBodyAwarenessInput}
                                        placeholder={bodyAwarenessSection.placeholder}
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

                    {/* Object Observation Section */}
                    {objectObservationSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.objectObservation ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('objectObservation')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {objectObservationSection.title}
                                        </Text>
                                        {expandedSections.objectObservation ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    
                                </View>
                            </Pressable>

                            {expandedSections.objectObservation && (
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
                                        {objectObservationSection.instructions}
                                    </Text>
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Choose your object:
                                    </Text>
                                    {objectObservationSection.objectOptions && (
                                        <View className="flex-row flex-wrap mb-4">
                                            {objectObservationSection.objectOptions.map((option) => (
                                                <TagButton
                                                    key={option}
                                                    label={option}
                                                    isSelected={selectedObject === option}
                                                    onPress={() => handleObjectSelect(option)}
                                                />
                                            ))}
                                        </View>
                                    )}
                                    <TextInput
                                        value={customObject}
                                        onChangeText={setCustomObject}
                                        placeholder={objectObservationSection.customObjectPlaceholder}
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
                                    />

                                    <TimerComponent minutes={objectObservationSection.timerMinutes || 5} />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {objectObservationSection.question}
                                    </Text>
                                    <TextInput
                                        value={objectObservationInput}
                                        onChangeText={setObjectObservationInput}
                                        placeholder={objectObservationSection.placeholder}
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

                    {/* Thought Visualization Section */}
                    {thoughtVisualizationSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.thoughtVisualization ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('thoughtVisualization')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {thoughtVisualizationSection.title}
                                        </Text>
                                        {expandedSections.thoughtVisualization ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    
                                </View>
                            </Pressable>

                            {expandedSections.thoughtVisualization && (
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
                                        {thoughtVisualizationSection.instructions}
                                    </Text>
                                    <TimerComponent minutes={thoughtVisualizationSection.timerMinutes || 5} />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {thoughtVisualizationSection.question}
                                    </Text>
                                    <TextInput
                                        value={thoughtVisualizationInput}
                                        onChangeText={setThoughtVisualizationInput}
                                        placeholder={thoughtVisualizationSection.placeholder}
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

                    {/* Reflection Section */}
                    {reflectionSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.reflection ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('reflection')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {reflectionSection.title}
                                        </Text>
                                        {expandedSections.reflection ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    
                                </View>
                            </Pressable>

                            {expandedSections.reflection && (
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
                                        {reflectionSection.instructions}
                                    </Text>
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {reflectionSection.question}
                                    </Text>
                                    <TextInput
                                        value={reflectionInput}
                                        onChangeText={setReflectionInput}
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
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    {/* Error Message */}
                                    {error && (
                                        <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.red_50 }}>
                                            <Text style={[t.textRegular, { color: colors.red_light }]}>
                                                {error}
                                            </Text>
                                        </View>
                                    )}

                                    {/* Success Message */}
                                    {successMessage && (
                                        <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.green_50 }}>
                                            <Text style={[t.textRegular, { color: colors.green_500 }]}>
                                                {successMessage}
                                            </Text>
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
                                            style={{ backgroundColor: colors.Button_Orange, opacity: isSaving ? 0.6 : 1 }}
                                            onPress={handleSave}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? (
                                                <ActivityIndicator size="small" color={colors.white} />
                                            ) : (
                                                <Text style={[t.textSemiBold, { color: colors.white }]}>
                                                    {buttons.save}
                                                </Text>
                                            )}
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

