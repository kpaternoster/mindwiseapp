import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { StepHeader } from '../components/StepHeader';
import { InputWithTags } from '../components/InputWithTags';
import { EmotionCategoryCard } from '../components/EmotionCategoryCard';
import { EmotionConfirmationModal } from '../components/EmotionConfirmationModal';
import { SelectedEmotionCard } from '../components/SelectedEmotionCard';
import { OriginalDescriptionCard } from '../components/OriginalDescriptionCard';
import { WarningBox } from '../components/WarningBox';
import { IdentifiedEmotionCard } from '../components/IdentifiedEmotionCard';
import { ReflectionCard } from '../components/ReflectionCard';
import { ReflectionSavedModal } from '../components/ReflectionSavedModal';
import { ArrowRightIcon } from '@components/Utils';
import nameYourEmotionsData from '../data/nameYourEmotions.json';
import emotionsWheelData from '../data/emotionsWheelData.json';
import nameYourEmotionsStepsData from '../data/nameYourEmotionsSteps.json';

export default function NameYourEmotionsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttonText } = nameYourEmotionsData;
    const { primaryEmotions } = emotionsWheelData;
    const { steps } = nameYourEmotionsStepsData;

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const currentStepData = steps.find(s => s.step === currentStep) || steps[0];

    const scrollViewRef = useRef<ScrollView>(null);
    const [formData, setFormData] = useState<Record<number, string>>({});
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [pendingEmotion, setPendingEmotion] = useState<string | null>(null);
    const [reflectionText, setReflectionText] = useState('');
    const [showReflectionSavedModal, setShowReflectionSavedModal] = useState(false);

    // Scroll to top when step changes
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [currentStep]);

    const handleInputChange = (sectionId: number, text: string) => {
        setFormData(prev => ({
            ...prev,
            [sectionId]: text,
        }));
    };

    const handleEmotionSelect = (emotion: string) => {
        setPendingEmotion(emotion);
        setShowConfirmationModal(true);
    };

    const handleConfirmEmotion = () => {
        if (pendingEmotion) {
            setSelectedEmotion(pendingEmotion);
            setShowConfirmationModal(false);
            setPendingEmotion(null);
        }
    };

    const handleCancelEmotion = () => {
        setShowConfirmationModal(false);
        setPendingEmotion(null);
    };

    const handleContinue = () => {
        if (currentStep === 1) {
            // Move to step 2
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Move to step 3
            if (selectedEmotion) {
                setCurrentStep(3);
            }
        } else if (currentStep === 3) {
            // Move to step 4
            setCurrentStep(4);
        } else if (currentStep === 4) {
            // Save reflection and show success modal
            handleSaveReflection();
        }
    };

    const handleSaveReflection = () => {
        // TODO: Save reflection to backend/storage
        console.log('Reflection saved:', reflectionText);
        setShowReflectionSavedModal(true);
    };

    const handleStartOver = () => {
        // Reset all state and go back to step 1
        setCurrentStep(1);
        setFormData({});
        setSelectedEmotion(null);
        setReflectionText('');
        setShowReflectionSavedModal(false);
    };

    const handleTryAgain = () => {
        // Go back to step 2
        setCurrentStep(2);
    };

    const handleBackToMenu = () => {
        // Navigate back to exercises menu
        dissolveTo('Learn_EmotionsWheelExercises');
    };

    // Get user's initial guess from form data (section 4 is the emotion question)
    const userInitialGuess = formData[4] || '';

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

                <StepHeader
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    stepTitle={currentStepData.title}
                    stepSubtitle={currentStepData.subtitle}
                />

                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {currentStep === 1 && (
                        <>
                            {sections.map((section) => (
                                <InputWithTags
                                    key={section.id}
                                    title={section.title}
                                    placeholder={""}
                                    tags={section.tags}
                                    isEmotion={section.isEmotion}
                                    value={formData[section.id]}
                                    onChangeText={(text) => handleInputChange(section.id, text)}
                                />
                            ))}
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            {primaryEmotions.map((emotion) => (
                                <EmotionCategoryCard
                                    key={emotion.id}
                                    primaryEmotion={emotion.name}
                                    subEmotions={emotion.subEmotions}
                                    selectedEmotion={selectedEmotion}
                                    onEmotionSelect={handleEmotionSelect}
                                />
                            ))}
                        </>
                    )}

                    {currentStep === 3 && selectedEmotion && (
                        <>
                            {/* Selected Emotion Card */}
                            <SelectedEmotionCard emotion={selectedEmotion} />

                            {/* Original Description Card */}
                            <OriginalDescriptionCard
                                body={formData[1] || ''}
                                thoughts={formData[2] || ''}
                                urges={formData[3] || ''}
                                userGuess={userInitialGuess}
                            />

                            {/* Warning Box */}
                            {userInitialGuess && userInitialGuess !== selectedEmotion && (
                                <WarningBox
                                    initialGuess={userInitialGuess}
                                    selectedEmotion={selectedEmotion}
                                    instruction="Take a moment to compare your body sensations, thoughts, and urges with both emotions."
                                />
                            )}

                            {/* Action Buttons */}
                            <View className="flex-row gap-3 mb-4">
                                <Pressable
                                    className="flex-1 rounded-full py-4 items-center justify-center"
                                    style={{
                                        borderWidth: 2,
                                        borderColor: colors.orange,
                                        backgroundColor: colors.white,
                                    }}
                                    onPress={handleTryAgain}
                                >
                                    <Text style={[t.button, { color: colors.Text_Primary }]}>
                                        Try Again
                                    </Text>
                                </Pressable>
                                <Pressable
                                    className="flex-1 rounded-full py-4 items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={handleBackToMenu}
                                >
                                    <Text style={[t.button, { color: colors.white }]}>
                                        Back to Menu
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    )}

                    {currentStep === 4 && selectedEmotion && (
                        <>
                            {/* Identified Emotion Card */}
                            <IdentifiedEmotionCard emotion={selectedEmotion} />

                            {/* Reflection Card */}
                            <ReflectionCard
                                value={reflectionText}
                                onChangeText={setReflectionText}
                            />


                        </>
                    )}

                    {/* Bottom Button */}
                    {currentStep !== 3 && currentStep !== 4 && (
                        <Pressable
                            className="rounded-full py-4 px-3 flex-row items-center justify-center mb-20"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleContinue}
                        >
                            <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                                {currentStep === 1 ? buttonText : 'Continue'}
                            </Text>
                            <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                <ArrowRightIcon size={16} color={colors.Text_Primary} />
                            </View>
                        </Pressable>
                    )}

                    {currentStep === 3 && (
                        <Pressable
                            className="rounded-full py-4 px-3 flex-row items-center justify-center mb-20"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleContinue}
                        >
                            <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                                Continue to Reflection
                            </Text>
                            <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                <ArrowRightIcon size={16} color={colors.icon} />
                            </View>
                        </Pressable>
                    )}

                    {currentStep === 4 && (
                        <View className='flex-col'>
                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center mb-4"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={handleContinue}
                            >
                                <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                                    Save My Reflection
                                </Text>
                                <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                    <ArrowRightIcon size={16} color={colors.icon} />
                                </View>
                            </Pressable>
                            {/* Action Buttons */}
                            <View className="flex-row gap-3 mb-4">
                                <Pressable
                                    className="flex-1 rounded-full py-4 items-center justify-center"
                                    style={{
                                        borderWidth: 2,
                                        borderColor: colors.orange,
                                        backgroundColor: colors.white,
                                    }}
                                    onPress={handleStartOver}
                                >
                                    <Text style={[t.button, { color: colors.Text_Primary }]}>
                                        Start Over
                                    </Text>
                                </Pressable>
                                <Pressable
                                    className="flex-1 rounded-full py-4 items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={handleBackToMenu}
                                >
                                    <Text style={[t.button, { color: colors.white }]}>
                                        Back to Menu
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Confirmation Modal */}
                <EmotionConfirmationModal
                    visible={showConfirmationModal}
                    emotion={pendingEmotion || ''}
                    onClose={handleCancelEmotion}
                    onConfirm={handleConfirmEmotion}
                    onCancel={handleCancelEmotion}
                />

                {/* Reflection Saved Modal */}
                <ReflectionSavedModal
                    visible={showReflectionSavedModal}
                    onClose={() => setShowReflectionSavedModal(false)}
                    onStartOver={handleStartOver}
                    onBackToMenu={handleBackToMenu}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

