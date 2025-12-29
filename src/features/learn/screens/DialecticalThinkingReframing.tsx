import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ProgressBar';
import { ArrowRightIcon } from '@components/Utils';
import dialecticalThinkingReframingData from '../data/dialecticalThinkingReframing.json';
import { createDialecticalReframingEntry } from '../api/dialecticalThinking';

export default function DialecticalThinkingReframingScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSteps, steps } = dialecticalThinkingReframingData;

    const [currentStep, setCurrentStep] = useState(1);
    const stepData = steps.find(s => s.stepNumber === currentStep) || steps[0];

    // Step 1 state
    const [butStatement, setButStatement] = useState('');
    const [andStatement, setAndStatement] = useState('');

    // Step 2 state
    const [situation, setSituation] = useState('');
    const [reframe, setReframe] = useState('');

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleContinue = () => {
        if (currentStep === 1) {
            // Move to step 2
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        if (currentStep === 2) {
            // Go back to step 1
            setCurrentStep(1);
        }
    };

    const handleSaveEntry = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Validate required fields
        if (!butStatement.trim()) {
            setError('Please enter a "BUT" statement.');
            return;
        }

        if (!andStatement.trim()) {
            setError('Please enter an "AND" statement.');
            return;
        }

        if (!situation.trim()) {
            setError('Please describe the stuck situation.');
            return;
        }

        if (!reframe.trim()) {
            setError('Please provide a reframe.');
            return;
        }

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                title: null, // Title is optional, not collected in the form
                but: butStatement.trim(),
                and: andStatement.trim(),
                stuckSituation: situation.trim(),
                reframe: reframe.trim(),
            };

            // Save to API
            await createDialecticalReframingEntry(entryData);

            // Show success message
            setSuccessMessage('Entry saved successfully!');

            // Clear form after successful save
            setButStatement('');
            setAndStatement('');
            setSituation('');
            setReframe('');

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save dialectical reframing entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_DialecticalThinkingEntries');
    };

    const getInputValue = (inputId: string) => {
        if (currentStep === 1) {
            if (inputId === 'butStatement') return butStatement;
            if (inputId === 'andStatement') return andStatement;
        } else {
            if (inputId === 'situation') return situation;
            if (inputId === 'reframe') return reframe;
        }
        return '';
    };

    const setInputValue = (inputId: string, value: string) => {
        if (currentStep === 1) {
            if (inputId === 'butStatement') setButStatement(value);
            if (inputId === 'andStatement') setAndStatement(value);
        } else {
            if (inputId === 'situation') setSituation(value);
            if (inputId === 'reframe') setReframe(value);
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
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {stepData.instructions}
                            </Text>
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
                        <View className="mx-5 mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.red_50 }}>
                            <Text style={[t.textRegular, { color: colors.red_light }]}>
                                {error}
                            </Text>
                        </View>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <View className="mx-5 mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.green_50 }}>
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
                                    {stepData.buttons.continue}
                                </Text>
                                <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                    <ArrowRightIcon size={16} color={colors.icon} />
                                </View>
                            </Pressable>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleViewSaved}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.viewSaved}
                                </Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            {/* Back and Save Entry buttons side by side */}
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
                                                {stepData.buttons.saveEntry}
                                            </Text>
                                            <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                                <ArrowRightIcon size={16} color={colors.Text_Primary} />
                                            </View>
                                        </>
                                    )}
                                </Pressable>
                            </View>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleViewSaved}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.viewSaved}
                                </Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

