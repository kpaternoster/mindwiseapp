import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { PLEASEReflectionSection } from '../components/PLEASEReflectionSection';
import { ArrowRightIcon, DownIcon, UpIcon } from '@components/Utils';
import selfCarePleaseReflectionData from '../data/selfCarePleaseReflection.json';
import { createSelfCareReflectionEntry } from '../api/selfcarereflection';

export default function SelfCarePleaseReflectionScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, pleaseElements, additionalSections, buttons } = selfCarePleaseReflectionData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        physicalIllness: true,
        balanceSleep: true,
        balancedEating: true,
        avoidSubstances: true,
        regularExercise: true,
        overallInsights: true,
        revisedPlan: true,
    });

    const [reflections, setReflections] = useState<{ [key: string]: string }>({
        physicalIllness: '',
        balanceSleep: '',
        balancedEating: '',
        avoidSubstances: '',
        adequateSleep: '',
        regularExercise: '',
        overallInsights: '',
        revisedPlan: '',
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

    const handleReflectionChange = (sectionId: string, text: string) => {
        setReflections((prev) => ({
            ...prev,
            [sectionId]: text,
        }));
    };

    const handleSaveReflection = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                physicalIllness: reflections.physicalIllness.trim() || '',
                sleep: reflections.balanceSleep.trim() || '',
                eating: reflections.balancedEating.trim() || '',
                substances: reflections.avoidSubstances.trim() || '',
                adequateSleep: reflections.adequateSleep.trim() || '',
                exercise: reflections.regularExercise.trim() || '',
                insights: reflections.overallInsights.trim() || '',
                plan: reflections.revisedPlan.trim() || '',
            };

            // Save to API
            await createSelfCareReflectionEntry(entryData);

            // Show success message
            setSuccessMessage('Reflection saved successfully!');

            // Clear form after successful save (optional - you may want to keep the data)
            // setReflections({
            //     physicalIllness: '',
            //     balanceSleep: '',
            //     balancedEating: '',
            //     avoidSubstances: '',
            //     adequateSleep: '',
            //     regularExercise: '',
            //     overallInsights: '',
            //     revisedPlan: '',
            // });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save self-care reflection:', err);
            setError('Failed to save reflection. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_SelfCarePleaseReflectionEntries');
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

                    {/* PLEASE Reflection Sections */}
                    {pleaseElements.map((element) => (
                        <PLEASEReflectionSection
                            key={element.id}
                            id={element.id}
                            title={element.title}
                            prompt={element.prompt}
                            value={reflections[element.id]}
                            onValueChange={(text) => handleReflectionChange(element.id, text)}
                            isExpanded={expandedSections[element.id]}
                            onToggle={() => toggleSection(element.id)}
                        />
                    ))}

                    {/* Additional Sections */}
                    {additionalSections.map((section) => (
                        <View key={section.id} className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections[section.id] ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{
                                    backgroundColor: colors.orange_50,
                                }}
                                onPress={() => toggleSection(section.id)}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {section.title}
                                        </Text>
                                        <View className="ml-3">
                                            {expandedSections[section.id] ? (
                                                <UpIcon size={12} color={colors.Text_Primary} />
                                            ) : (
                                                <DownIcon size={12} color={colors.Text_Primary} />
                                            )}
                                        </View>
                                    </View>
                                    <View>
                                        {/* Prompt */}
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                            {section.prompt}
                                        </Text>
                                    </View>
                                </View>

                            </Pressable>

                            {/* Expanded Content */}
                            {expandedSections[section.id] && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >


                                    {/* Text Input */}
                                    <TextInput
                                        value={reflections[section.id]}
                                        onChangeText={(text) => handleReflectionChange(section.id, text)}
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
                            )}
                        </View>
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
                        onPress={handleSaveReflection}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <ActivityIndicator size="small" color={colors.white} />
                        ) : (
                            <>
                                <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                    {buttons.saveReflection}
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

