import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { ArrowRightIcon, DownIcon, UpIcon } from '@components/Utils';
import selfValidationPracticeData from '../data/selfValidationPractice.json';

export default function SelfValidationPracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttons } = selfValidationPracticeData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        acknowledge: true,
        accept: true,
        understandEmotion: true,
        respond: true,
    });

    const [inputs, setInputs] = useState<{ [key: string]: string }>({
        acknowledge: '',
        acceptEmotion: '',
        understandEmotion: '',
        offerCompassion: '',
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

    const handleSave = () => {
        // TODO: Save to storage/backend
        console.log('Saving Self-Validation Practice:', inputs);
        dissolveTo('Learn_SelfValidationPracticeEntries');
    };

    const handleView = () => {
        dissolveTo('Learn_SelfValidationPracticeEntries');
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
                    {sections.map((section) => {
                        // Sections with subsections (Accept)
                        if (section.id === 'accept') {
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
                                            {section.subsections?.map((subsection: any) => (
                                                <View key={subsection.id} className="mb-4 border border-gray-200 rounded-2xl p-4">
                                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                        {subsection.title}
                                                    </Text>
                                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                                        {subsection.instruction}
                                                    </Text>
                                                    <TextInput
                                                        value={inputs[subsection.id]}
                                                        onChangeText={(text) => handleInputChange(subsection.id, text)}
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

                        // Regular sections (Acknowledge, Understand Emotion)
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
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                            {section.instruction}
                                        </Text>
                                        {section.subsections?.map((subsection: any) => (
                                            <View key={subsection.id} className="mb-4">
                                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                    {subsection.title}
                                                </Text>
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                                    {subsection.instruction}
                                                </Text>
                                                <TextInput
                                                    value={inputs[subsection.id]}
                                                    onChangeText={(text) => handleInputChange(subsection.id, text)}
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
                                        {
                                            section.placeholder && (
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
                                            )
                                        }

                                    </View>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                    <View className="flex-row gap-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleView}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                                {buttons.view}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSave}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                {buttons.save}
                            </Text>

                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

