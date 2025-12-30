import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { PlayIcon, PauseIcon, ResetIcon } from '@components/Utils';
import Svg, { Circle } from 'react-native-svg';
import mindfulPauseTimerData from '../data/mindfulPauseTimer.json';
import { createMindfulPauseTimerEntry } from '../api/stop';

const TIMER_SIZE = 200;
const STROKE_WIDTH = 24;
const RADIUS = (TIMER_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function MindfulPauseTimerScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, howToPractice, timerDuration, reflection, buttons } = mindfulPauseTimerData;

    const [timeRemaining, setTimeRemaining] = useState(timerDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [reflectionText, setReflectionText] = useState('');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        // TODO: Play chime sound
                        return 0;
                    }
                    return prev - 1;
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
    }, [isRunning, timeRemaining]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        if (timeRemaining === 0) {
            setTimeRemaining(timerDuration);
        }
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeRemaining(timerDuration);
    };

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        const completed = isComplete;

        setIsSaving(true);

        try {
            await createMindfulPauseTimerEntry({
                completed,
                reflection: reflectionText.trim() || '',
            });

            // Show success message
            setSuccessMessage('Mindful pause entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save mindful pause timer entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setReflectionText('');
        setError(null);
        setSuccessMessage(null);
    };

    const handleViewEntry = () => {
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'mindfulPause' });
    };

    const progress = (timerDuration - timeRemaining) / timerDuration;
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
    const isComplete = timeRemaining === 0;

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
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {/* Error Message */}
                    {error && (
                        <View className="bg-red-50 rounded-xl p-4 mb-4" style={{ borderColor: colors.red_light, borderWidth: 1 }}>
                            <Text style={[t.textRegular, { color: colors.red_light }]}>
                                {error}
                            </Text>
                        </View>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <View className="bg-green-50 rounded-xl p-4 mb-4" style={{ borderColor: colors.green_500, borderWidth: 1 }}>
                            <Text style={[t.textRegular, { color: colors.green_500 }]}>
                                {successMessage}
                            </Text>
                        </View>
                    )}

                    {/* How to Practice Card */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            backgroundColor: colors.cream_40,
                        }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.text_secondary }]} className="mb-3">
                            {howToPractice.title}
                        </Text>
                        {howToPractice.instructions.map((instruction, index) => (
                            <View key={index} className="flex-row">
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                    • {instruction}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View className="mb-4">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className='text-center'>
                            One Minute Pause
                        </Text>
                    </View>
                    {/* Circular Timer */}
                    <View className="items-center mb-6">
                        <View style={{ width: TIMER_SIZE, height: TIMER_SIZE, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                            <Svg width={TIMER_SIZE} height={TIMER_SIZE} style={{ position: 'absolute' }}>
                                {/* Background Circle */}
                                <Circle
                                    cx={TIMER_SIZE / 2}
                                    cy={TIMER_SIZE / 2}
                                    r={RADIUS}
                                    stroke={colors.orange_50}
                                    strokeWidth={STROKE_WIDTH}
                                    fill="none"
                                />

                                <Circle
                                    cx={TIMER_SIZE / 2}
                                    cy={TIMER_SIZE / 2}
                                    r={RADIUS}
                                    stroke={colors.warm_dark}
                                    strokeWidth={STROKE_WIDTH}
                                    fill="none"
                                    strokeDasharray={CIRCUMFERENCE}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    transform={`rotate(-90 ${TIMER_SIZE / 2} ${TIMER_SIZE / 2})`}
                                />

                                {/* Start indicator dot */}
                                {
                                    timeRemaining === timerDuration && (
                                        <Circle
                                            cx={TIMER_SIZE / 2}
                                            cy={STROKE_WIDTH / 2}
                                            r={STROKE_WIDTH / 2}
                                            fill={colors.warm_dark}
                                        />
                                    )
                                }

                            </Svg>

                            {/* Timer Text */}
                            <View className="items-center" style={{ zIndex: 1 }}>
                                <Text style={[t.title32SemiBold, { color: colors.Text_Primary }]}>
                                    {formatTime(timeRemaining)}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-2">
                                    {isRunning ? 'Breathe...' : isComplete ? 'Complete' : 'Ready'}
                                </Text>
                            </View>
                        </View>

                        {/* Start/Pause Button */}
                        <Pressable
                            className="rounded-full py-3 px-8 flex-row items-center justify-center mb-3 mt-4"
                            style={{
                                backgroundColor: isRunning ? colors.white : colors.Button_Orange,
                                borderColor: isRunning ? colors.button_orange : colors.Button_Orange,
                                borderWidth: 1,
                            }}
                            onPress={isRunning ? handlePause : handleStart}
                        >
                            {isRunning ? (
                                <>
                                    <PauseIcon size={16} color={colors.warm_dark} />
                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]} className="ml-2">
                                        Pause
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <PlayIcon size={16} color={colors.white} />
                                    <Text style={[t.textSemiBold, { color: colors.white }]} className="ml-2">
                                        Start
                                    </Text>
                                </>
                            )}
                        </Pressable>

                        {/* Reset Link (only shown when running) */}
                        {isRunning && (
                            <Pressable onPress={handleReset} className="flex-row items-center mt-3">
                                <ResetIcon size={16} color={colors.warm_dark} />
                                <Text style={[t.textRegular, { color: colors.warm_dark }]} className="ml-2">
                                    Reset
                                </Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Reflection Card */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {reflection.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                            {reflection.prompt}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-4">
                            {reflection.question}
                        </Text>
                        <TextInput
                            value={reflectionText}
                            onChangeText={setReflectionText}
                            placeholder={reflection.placeholder}
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
                                    minHeight: 120,
                                    textAlignVertical: 'top',
                                },
                            ]}
                            multiline
                        />
                    </View>
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                    <View className="flex-row gap-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleViewEntry}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                                {buttons.viewEntry}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
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
            </View>
        </KeyboardAvoidingView>
    );
}

