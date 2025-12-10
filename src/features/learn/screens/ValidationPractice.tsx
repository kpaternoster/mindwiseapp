import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ProgressBar } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import validationPracticeData from '../data/validationPractice.json';

export default function ValidationPracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSteps, steps } = validationPracticeData;
    const scrollViewRef = useRef<ScrollView>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const stepData = steps.find(s => s.stepNumber === currentStep) || steps[0];

    // Scroll to top when step changes
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [currentStep]);

    // Initialize all input states
    const [inputs, setInputs] = useState<{ [key: string]: string }>({
        // Step 1
        describeConversation: '',
        specificChallenges: '',
        engagementTechniques: '',
        // Step 2
        practiceTopic: '',
        asSpeaker: '',
        asListener: '',
        // Step 3
        keyLearnings: '',
        areasToImprove: '',
        practiceThisWeek: '',
        // Step 4
        emotionalSituation: '',
        emotionsIdentified: '',
        validatingResponse: '',
        supportOrAdvice: '',
        // Step 5
        dismissivePhrase1: '',
        reframe1: '',
        dismissivePhrase2: '',
        reframe2: '',
        dismissivePhrase3: '',
        reframe3: '',
        // Step 6
        practiceScenario: '',
        validationApproach: '',
        impactOnRelationships: '',
    });

    const handleContinue = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSaveEntry = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            inputs,
        };
        console.log('Saving Validation Practice data:', allData);
        // TODO: Navigate to entries screen when created
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_ValidationPracticeEntries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_ValidatingOthersExercises');
    };

    const handleInputChange = (inputId: string, text: string) => {
        setInputs((prev) => ({
            ...prev,
            [inputId]: text,
        }));
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
                    {/* Content Card */}
                    <View
                        className="rounded-2xl mb-4 border"
                        style={{ backgroundColor: colors.white, borderColor: colors.orange_200 }}
                    >
                        <View style={{ backgroundColor: colors.orange_50 }} className='p-4 rounded-t-2xl'>
                            {/* Step Badge and Title */}
                            <View className="flex-row items-center">
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
                        </View>

                        {/* Instructions */}
                        {stepData.instructions && (
                            <View
                                className="rounded-2xl p-4 mb-4 mt-4 mx-4"
                                style={{ backgroundColor: colors.orange_opacity_5 }}
                            >
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    <Text style={[t.textSemiBold, { color: colors.text_secondary }]}>
                                        {stepData.instructionsTitle}: {" "}
                                    </Text>
                                    {stepData.instructions}
                                </Text>
                            </View>
                        )}

                        {/* Input Fields */}
                        {stepData.inputs.map((input) => (
                            <View key={input.id} className="mb-2 p-4">

                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                                    {input.label}
                                </Text>
                                <TextInput
                                    value={inputs[input.id]}
                                    onChangeText={(text) => handleInputChange(input.id, text)}
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
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                    {currentStep === 1 ? (
                        <>
                            <Pressable
                                className="rounded-full py-3 px-3 flex-row items-center justify-center mb-3"
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

                            {/* <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleBackToMenu}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.backToMenu}
                                </Text>
                            </Pressable> */}
                        </>
                    ) : currentStep === totalSteps ? (
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
                                    className="flex-1 rounded-full py-3 px-3 flex-row items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={handleSaveEntry}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                        {stepData.buttons.save}
                                    </Text>
                                    <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                        <ArrowRightIcon size={16} color={colors.icon} />
                                    </View>
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
                    ) : (
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
                                    className="flex-1 rounded-full py-3 px-3 flex-row items-center justify-center"
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
                            {
                                currentStep > 2 && (
                                    <Pressable
                                        className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                        onPress={handleViewSaved}
                                    >
                                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                            {stepData.buttons.viewSaved}
                                        </Text>
                                    </Pressable>
                                )
                            }

                        </>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

