import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ProgressBar } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import fastStartSmallData from '../data/fastStartSmall.json';
import { createStartSmallEntry } from '../api/fast';

export default function FastStartSmallScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSteps, steps } = fastStartSmallData;

    const [currentStep, setCurrentStep] = useState(1);
    const stepData = steps.find(s => s.stepNumber === currentStep) || steps[0];

    // Step 1 state
    const [smallRequest, setSmallRequest] = useState('');
    const [outcome, setOutcome] = useState('');
    const [reflection, setReflection] = useState('');

    // Step 2 state
    const [biggerSituation, setBiggerSituation] = useState('');
    const [practiceOutLoud, setPracticeOutLoud] = useState('');
    const [biggerChallengeOutcome, setBiggerChallengeOutcome] = useState('');

    // Step 3 state
    const [learnedAboutFast, setLearnedAboutFast] = useState('');
    const [nextSteps, setNextSteps] = useState('');

    const handleContinue = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSaveEntry = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                smallRequest: smallRequest.trim(),
                smallOutcome: outcome.trim(),
                smallReflection: reflection.trim(),
                biggerSituation: biggerSituation.trim(),
                practice: practiceOutLoud.trim(),
                biggerReflection: biggerChallengeOutcome.trim(),
                overallReflection: learnedAboutFast.trim(),
                nextSteps: nextSteps.trim(),
            };

            // Save to API
            await createStartSmallEntry(entryData);

            // Show success message
            setSuccessMessage('Entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save start small entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setSmallRequest('');
        setOutcome('');
        setReflection('');
        setBiggerSituation('');
        setPracticeOutLoud('');
        setBiggerChallengeOutcome('');
        setLearnedAboutFast('');
        setNextSteps('');
        setError(null);
        setSuccessMessage(null);
        // setCurrentStep(1);
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_FastStartSmallEntries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_FastExercises');
    };

    const getInputValue = (inputId: string) => {
        if (currentStep === 1) {
            if (inputId === 'smallRequest') return smallRequest;
            if (inputId === 'outcome') return outcome;
            if (inputId === 'reflection') return reflection;
        } else if (currentStep === 2) {
            if (inputId === 'biggerSituation') return biggerSituation;
            if (inputId === 'practiceOutLoud') return practiceOutLoud;
            if (inputId === 'biggerChallengeOutcome') return biggerChallengeOutcome;
        } else if (currentStep === 3) {
            if (inputId === 'learnedAboutFast') return learnedAboutFast;
            if (inputId === 'nextSteps') return nextSteps;
        }
        return '';
    };

    const setInputValue = (inputId: string, value: string) => {
        if (currentStep === 1) {
            if (inputId === 'smallRequest') setSmallRequest(value);
            if (inputId === 'outcome') setOutcome(value);
            if (inputId === 'reflection') setReflection(value);
        } else if (currentStep === 2) {
            if (inputId === 'biggerSituation') setBiggerSituation(value);
            if (inputId === 'practiceOutLoud') setPracticeOutLoud(value);
            if (inputId === 'biggerChallengeOutcome') setBiggerChallengeOutcome(value);
        } else if (currentStep === 3) {
            if (inputId === 'learnedAboutFast') setLearnedAboutFast(value);
            if (inputId === 'nextSteps') setNextSteps(value);
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
                <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

                {/* Progress Bar */}
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {/* Content Card */}
                    <View
                        className="rounded-2xl mb-4 border"
                        style={{ backgroundColor: colors.white, borderColor: colors.orange_200 }}
                    >
                        <View style={{backgroundColor: colors.orange_50}} className='p-4 rounded-t-2xl'>
                            {/* Step Badge and Title */}
                            <View className="flex-row items-center mb-4">
                                <View
                                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                >
                                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                        {stepData.stepBadge.number}
                                    </Text>
                                </View>
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                    {stepData.stepBadge.text}
                                </Text>
                            </View>

                            {/* Instructions */}
                            {stepData.instructions && (
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {stepData.instructions}
                                </Text>
                            )}
                        </View>

                        {/* Input Fields */}
                        {stepData.inputs.map((input) => (
                            <View key={input.id} className="mb-2 p-4">
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                                    {input.label}
                                </Text>
                                <TextInput
                                    value={getInputValue(input.id)}
                                    onChangeText={(text) => setInputValue(input.id, text)}
                                    placeholder={input.placeholder}
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
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                    {currentStep === 1 ? (
                        <>
                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={handleContinue}
                            >
                                <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                    {stepData.buttons.next}
                                </Text>
                                <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                    <ArrowRightIcon size={16} color={colors.icon} />
                                </View>
                            </Pressable>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleBackToMenu}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.backToMenu}
                                </Text>
                            </Pressable>
                        </>
                    ) : currentStep === 2 ? (
                        <>
                            {/* Back and Next buttons side by side */}
                            <View className="flex-row gap-3 mb-3">
                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                    onPress={handleBack}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                        {stepData.buttons.back}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={handleContinue}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                        {stepData.buttons.next}
                                    </Text>
                                    <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                        <ArrowRightIcon size={16} color={colors.icon} />
                                    </View>
                                </Pressable>
                            </View>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleBackToMenu}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.backToMenu}
                                </Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            {/* Back and Save buttons side by side */}
                            <View className="flex-row gap-3 mb-3">
                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                    onPress={handleBack}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                        {stepData.buttons.back}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange, opacity: isSaving ? 0.6 : 1 }}
                                    onPress={handleSaveEntry}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <ActivityIndicator size="small" color={colors.white} />
                                    ) : (
                                        <>
                                            <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                                {stepData.buttons.save}
                                            </Text>
                                            <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                                <ArrowRightIcon size={16} color={colors.icon} />
                                            </View>
                                        </>
                                    )}
                                </Pressable>
                            </View>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleViewSaved}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.viewSaved}
                                </Text>
                            </Pressable>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleBackToMenu}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.backToMenu}
                                </Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

