import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { PLEASESection } from '../components/PLEASESection';
import { ArrowRightIcon } from '@components/Utils';
import selfCarePleasePlanData from '../data/selfCarePleasePlan.json';
import { createPleaseEntry } from '../api/selfcareplease';

export default function SelfCarePleasePlanScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, pleaseElements, buttons } = selfCarePleasePlanData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        physicalIllness: true,
        balanceSleep: false,
        balancedEating: false,
        avoidSubstances: false,
        regularExercise: false,
    });

    const [qualities, setQualities] = useState<{ [key: string]: number }>({
        physicalIllness: 5,
        balanceSleep: 5,
        balancedEating: 5,
        avoidSubstances: 5,
        regularExercise: 5,
    });

    const [personalPlans, setPersonalPlans] = useState<{ [key: string]: string }>({
        physicalIllness: '',
        balanceSleep: '',
        balancedEating: '',
        avoidSubstances: '',
        regularExercise: '',
    });

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

    const handleQualityChange = (sectionId: string, value: number) => {
        setQualities((prev) => ({
            ...prev,
            [sectionId]: value,
        }));
    };

    const handlePersonalPlanChange = (sectionId: string, text: string) => {
        setPersonalPlans((prev) => ({
            ...prev,
            [sectionId]: text,
        }));
    };

    const handleSavePlan = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                physicalIllness: {
                    value: qualities.physicalIllness,
                    ideas: personalPlans.physicalIllness.trim() || '',
                },
                sleep: {
                    value: qualities.balanceSleep,
                    ideas: personalPlans.balanceSleep.trim() || '',
                },
                eating: {
                    value: qualities.balancedEating,
                    ideas: personalPlans.balancedEating.trim() || '',
                },
                substances: {
                    value: qualities.avoidSubstances,
                    ideas: personalPlans.avoidSubstances.trim() || '',
                },
                exercise: {
                    value: qualities.regularExercise,
                    ideas: personalPlans.regularExercise.trim() || '',
                },
            };

            // Save to API
            await createPleaseEntry(entryData);

            // Show success message
            setSuccessMessage('Plan saved successfully!');

            // Clear form after successful save
            // setQualities({
            //     physicalIllness: 5,
            //     balanceSleep: 5,
            //     balancedEating: 5,
            //     avoidSubstances: 5,
            //     regularExercise: 5,
            // });
            // setPersonalPlans({
            //     physicalIllness: '',
            //     balanceSleep: '',
            //     balancedEating: '',
            //     avoidSubstances: '',
            //     regularExercise: '',
            // });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save PLEASE plan:', err);
            setError('Failed to save plan. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_SelfCarePleaseEntries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_SelfCarePleaseExercises');
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
                    <IntroCard
                        title={intro.title}
                        text={intro.description}
                    />

                    {/* PLEASE Sections */}
                    {pleaseElements.map((element) => (
                        <PLEASESection
                            key={element.id}
                            id={element.id}
                            title={element.title}
                            description={element.description}
                            suggestedPractices={element.suggestedPractices}
                            quality={qualities[element.id]}
                            onQualityChange={(value) => handleQualityChange(element.id, value)}
                            personalPlan={personalPlans[element.id]}
                            onPersonalPlanChange={(text) => handlePersonalPlanChange(element.id, text)}
                            isExpanded={expandedSections[element.id]}
                            onToggle={() => toggleSection(element.id)}
                        />
                    ))}

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
                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                        style={{ backgroundColor: colors.Button_Orange, opacity: isSaving ? 0.6 : 1 }}
                        onPress={handleSavePlan}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <ActivityIndicator size="small" color={colors.white} />
                        ) : (
                            <>
                                <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                    {buttons.savePlan}
                                </Text>
                                <View className='w-9 h-9 bg-white rounded-full items-center justify-center'>
                                    <ArrowRightIcon size={16} color={colors.icon} />
                                </View>
                            </>
                        )}
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleViewSaved}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.viewSaved}
                        </Text>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleBackToMenu}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.backToMenu}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

