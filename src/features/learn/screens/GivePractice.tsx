import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { ArrowRightIcon, DownIcon, UpIcon } from '@components/Utils';
import givePracticeData from '../data/givePractice.json';

export default function GivePracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = givePracticeData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        practiceDailyValidation: true,
        sendGiveCheckIn: true,
        reflectOnPractice: true,
        validation1: true,
        validation2: true,
        validation3: true,
        whoReachOut: true,
        giveMessage: true,
        checkInResponse: true,
        connectionResponses: true,
        challenges: true,
        naturalHardest: true,
        doDifferently: true,
        continuePracticing: true,
    });

    // Initialize all input states
    const [inputs, setInputs] = useState<{ [key: string]: string }>({
        validation1What: '',
        validation1Response: '',
        validation2What: '',
        validation2Response: '',
        validation3What: '',
        validation3Response: '',
        whoReachOut: '',
        giveMessage: '',
        checkInResponse: '',
        connectionResponses: '',
        challenges: '',
        naturalHardest: '',
        doDifferently: '',
        continuePracticing: '',
    });

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleInputChange = (inputId: string, text: string) => {
        setInputs((prev) => ({
            ...prev,
            [inputId]: text,
        }));
    };

    const handleSaveReflection = () => {
        // TODO: Save reflection to storage/backend
        const practiceData = {
            inputs,
        };
        console.log('Saving GIVE Practice:', practiceData);
        dissolveTo('Learn_GivePracticeEntries');
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_GivePracticeEntries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_GiveExercises');
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

                    {/* Sections */}
                    {sections.map((section: any) => {
                        // Section with subsections that have inputs (Practice Daily Validation)
                        if (section.subsections && section.subsections[0]?.inputs) {
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
                                             {section.instructions && (
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                                    {section.instructions}
                                                </Text>
                                            )}
                                            {section.subsections.map((subsection: any) => (
                                                <View key={subsection.id} className="mb-4">
                                                    <View
                                                        className={`rounded-2xl p-4`}
                                                        style={{
                                                            backgroundColor: colors.orange_opacity_5,
                                                            borderColor: colors.stoke_gray,
                                                            borderWidth: 1,
                                                        }}
                                                    >
                                                        <Pressable
                                                            className="flex-row items-center justify-between"
                                                            onPress={() => toggleSection(subsection.id)}
                                                        >
                                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                                                {subsection.title}
                                                            </Text>
                                                            <View className="ml-3">
                                                                {expandedSections[subsection.id] ? (
                                                                    <UpIcon size={12} color={colors.Text_Primary} />
                                                                ) : (
                                                                    <DownIcon size={12} color={colors.Text_Primary} />
                                                                )}
                                                            </View>
                                                        </Pressable>

                                                        {expandedSections[subsection.id] && (
                                                            <View className="mt-4">
                                                                {subsection.inputs.map((input: any) => (
                                                                    <View key={input.id} className="mb-4">
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
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        }

                        // Section with direct inputs (Send a GIVE-Style Check-In)
                        if (section.inputs) {
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
                                            {section.inputs.map((input: any) => (
                                                <View key={input.id} className="mb-4">
                                                    <View
                                                        className="rounded-2xl p-4"
                                                        style={{
                                                            backgroundColor: colors.orange_opacity_5,
                                                            borderColor: colors.stoke_gray,
                                                            borderWidth: 1,
                                                        }}
                                                    >
                                                        <Pressable
                                                            className="flex-row items-center justify-between"
                                                            onPress={() => toggleSection(input.id)}
                                                        >
                                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                                                {input.label}
                                                            </Text>
                                                            <View className="ml-3">
                                                                {expandedSections[input.id] ? (
                                                                    <UpIcon size={12} color={colors.Text_Primary} />
                                                                ) : (
                                                                    <DownIcon size={12} color={colors.Text_Primary} />
                                                                )}
                                                            </View>
                                                        </Pressable>

                                                        {expandedSections[input.id] && (
                                                            <View className="mt-4">
                                                                <TextInput
                                                                    value={inputs[input.id]}
                                                                    onChangeText={(text) => handleInputChange(input.id, text)}
                                                                    placeholder={input.placeholder || input.instructions || ''}
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
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        }

                        // Section with subsections that have prompts (Reflect on Your GIVE Practice)
                        if (section.subsections && section.subsections[0]?.prompt) {
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
                                                    <View
                                                        className="rounded-2xl p-4"
                                                        style={{
                                                            backgroundColor: colors.orange_opacity_5,
                                                            borderColor: colors.stoke_gray,
                                                            borderWidth: 1,
                                                        }}
                                                    >
                                                        <Pressable
                                                            className="flex-row items-center justify-between"
                                                            onPress={() => toggleSection(subsection.id)}
                                                        >
                                                            <Text className='flex-1' style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                                                {subsection.title}
                                                            </Text>
                                                            <View className="ml-3 flex">
                                                                {expandedSections[subsection.id] ? (
                                                                    <UpIcon size={12} color={colors.Text_Primary} />
                                                                ) : (
                                                                    <DownIcon size={12} color={colors.Text_Primary} />
                                                                )}
                                                            </View>
                                                        </Pressable>

                                                        {expandedSections[subsection.id] && (
                                                            <View className="mt-4">
                                                                <TextInput
                                                                    value={inputs[subsection.id]}
                                                                    onChangeText={(text) => handleInputChange(subsection.id, text)}
                                                                    placeholder={subsection.placeholder || subsection.prompt || ''}
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
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        }

                        return null;
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
            </View>
        </KeyboardAvoidingView>
    );
}

