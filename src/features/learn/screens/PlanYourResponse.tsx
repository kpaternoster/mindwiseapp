import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ProgressBar } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import planYourResponseData from '../data/planYourResponse.json';
import { createPlanYourResponseEntry } from '../api/interpersonalGoals';

export default function PlanYourResponseScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSteps, steps, buttons } = planYourResponseData as any;

    const [currentStep, setCurrentStep] = useState(1);
    const scrollViewRef = useRef<ScrollView>(null);
    const stepData = steps.find((s: any) => s.stepNumber === currentStep) || steps[0];

    // State for all inputs across all steps
    const [inputs, setInputs] = useState<{ [key: string]: string }>({
        reviewSituation: '',
        checkValuesAlignment: '',
        confirmGoalsAlignment: '',
        planYourWords: '',
        planYourTone: '',
        desiredOutcome: '',
        backupPlan: '',
        finalReflection: '',
    });

    // Scroll to top when step changes
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [currentStep]);

    const handleInputChange = (inputId: string, text: string) => {
        setInputs((prev) => ({
            ...prev,
            [inputId]: text,
        }));
    };

    const handleNext = () => {
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

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                situation: inputs.reviewSituation.trim(),
                valuesAlignment: inputs.checkValuesAlignment.trim(),
                goalsAlignment: inputs.confirmGoalsAlignment.trim(),
                wordsPlan: inputs.planYourWords.trim(),
                tonePlan: inputs.planYourTone.trim(),
                desiredOutcome: inputs.desiredOutcome.trim(),
                backupPlan: inputs.backupPlan.trim(),
                reflection: inputs.finalReflection.trim(),
            };

            // Save to API
            await createPlanYourResponseEntry(entryData);

            // Show success message
            setSuccessMessage('Entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save plan your response entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setInputs({
            reviewSituation: '',
            checkValuesAlignment: '',
            confirmGoalsAlignment: '',
            planYourWords: '',
            planYourTone: '',
            desiredOutcome: '',
            backupPlan: '',
            finalReflection: '',
        });
        setError(null);
        setSuccessMessage(null);
        // setCurrentStep(1);
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_PlanYourResponseEntries');
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
                    ref={scrollViewRef}
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >


                    {/* Sections */}
                    <View className="">
                        {stepData.sections.map((section: any) => (

                            <View
                                className="rounded-2xl mb-4 border"
                                style={{ backgroundColor: colors.white, borderColor: colors.stoke_gray, borderWidth: 1 }}
                                key={section.id}
                            >
                                <View className="flex-row items-center mb-2 rounded-t-2xl p-4"
                                    style={{
                                        backgroundColor: colors.orange_50,
                                    }}
                                >
                                    <View
                                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                        style={{ backgroundColor: colors.Button_Orange }}
                                    >
                                        <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                            {section.number}
                                        </Text>
                                    </View>
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                        {section.title}
                                    </Text>
                                </View>

                                {/* Description */}
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3 px-4">
                                    {section.description}
                                </Text>
                                <View className="p-4">

                                    {/* Input Field */}
                                    <TextInput
                                        value={inputs[section.id]}
                                        onChangeText={(text) => handleInputChange(section.id, text)}
                                        placeholder={section.placeholder}
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
                                                minHeight: 100,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
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

                {/* Bottom Navigation Buttons */}
                <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                    {currentStep === 1 ? (
                        // Step 1: Only Next button
                        <Pressable
                            className="rounded-full py-3 px-3 flex-row items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleNext}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]} className="flex-1 text-center">
                                {buttons.next}
                            </Text>
                            <View className='w-9 h-9 justify-center items-center bg-white rounded-full'>
                                <ArrowRightIcon size={16} color={colors.warm_dark} />
                            </View>
                        </Pressable>
                    ) : currentStep === 2 ? (
                        // Step 2: Back and Next buttons
                        <View className="flex-row gap-3">
                            <Pressable
                                className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleBack}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {buttons.back}
                                </Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 rounded-full py-3 px-3 flex-row items-center justify-center"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={handleNext}
                            >
                                <Text style={[t.textSemiBold, { color: colors.white }]} className="flex-1 text-center">
                                    {buttons.next}
                                </Text>
                                <View className='w-9 h-9 justify-center items-center bg-white rounded-full'>
                                    <ArrowRightIcon size={16} color={colors.warm_dark} />
                                </View>
                            </Pressable>
                        </View>
                    ) : (
                        // Step 3: Back, Save, and View Saved buttons
                        <View>
                            <View className="flex-row gap-3 mb-3">
                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                    onPress={handleBack}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                        {buttons.back}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    className="flex-1 rounded-full py-3 px-3 flex-row items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange, opacity: isSaving ? 0.6 : 1 }}
                                    onPress={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <ActivityIndicator size="small" color={colors.white} />
                                    ) : (
                                        <>
                                            <Text style={[t.textSemiBold, { color: colors.white }]} className="flex-1 text-center">
                                                {buttons.save}
                                            </Text>
                                            <View className='w-9 h-9 justify-center items-center bg-white rounded-full'>
                                                <ArrowRightIcon size={16} color={colors.warm_dark} />
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
                                <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                                    {buttons.viewSaved}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
