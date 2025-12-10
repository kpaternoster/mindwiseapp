import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { ArrowRightIcon, DownIcon, UpIcon } from '@components/Utils';
import clarifyYourGoalsData from '../data/clarifyYourGoals.json';

export default function ClarifyYourGoalsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = clarifyYourGoalsData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        objectiveEffectiveness: true,
        relationshipEffectiveness: true,
        selfRespect: true,
        relationshipMindfulness: true,
        rankGoals: true,
        reflectOnPriorities: true,
    });

    const [reflections, setReflections] = useState<{ [key: string]: string }>({
        objectiveEffectiveness: '',
        relationshipEffectiveness: '',
        selfRespect: '',
        relationshipMindfulness: '',
        mostImportant: '',
        secondImportant: '',
        leastImportant: '',
        whyPriorities: '',
        howToCommunicate: '',
    });

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

    const handleSaveReflection = () => {
        // TODO: Save reflection to storage/backend
        const reflectionData = {
            reflections,
        };
        console.log('Saving Clarify Your Goals:', reflectionData);
        // TODO: Navigate to entries screen when created
    };

    const handleViewSaved = () => {
        // TODO: Navigate to Clarify Your Goals Entries screen when created
        console.log('View saved entries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_InterpersonalGoalsExercises');
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
                {
                    false && (
                        <>
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

                                {/* Reflection Sections */}
                                {sections.map((section) => {
                                    // Sections with subsections (Rank Your Goals, Reflect on Your Priorities)
                                    if (section.subsections) {
                                        return (
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
                                                    </View>
                                                </Pressable>

                                                {/* Expanded Content with Subsections */}
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
                                                        {section.subsections.map((subsection: any) => (
                                                            <View key={subsection.id} className="mb-4">
                                                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                                    {subsection.title}
                                                                </Text>
                                                                <TextInput
                                                                    value={reflections[subsection.id]}
                                                                    onChangeText={(text) => handleReflectionChange(subsection.id, text)}
                                                                    placeholder={subsection.placeholder}
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
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    }

                                    // Regular sections without subsections
                                    return (
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
                                    );
                                })}
                            </ScrollView>

                            {/* Bottom Action Buttons */}
                            <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                                <View className="flex-row items-center justify-between gap-2">
                                    <Pressable
                                        className="rounded-full py-4 px-3 flex-1 items-center justify-center mb-3"
                                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                        onPress={handleViewSaved}
                                    >
                                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                            {buttons.viewSaved}
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        className="rounded-full py-3 px-3 flex-1 flex-row items-center justify-center mb-3"
                                        style={{ backgroundColor: colors.Button_Orange }}
                                        onPress={handleSaveReflection}
                                    >
                                        <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                            {buttons.save}
                                        </Text>
                                        <View className='w-9 h-9 bg-white rounded-full items-center justify-center'>
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
                                        {buttons.backToMenu}
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    )
                }
            </View>
        </KeyboardAvoidingView>
    );
}
