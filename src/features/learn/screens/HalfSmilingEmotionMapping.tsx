import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import halfSmilingEmotionMappingData from '../data/halfSmilingEmotionMapping.json';

export default function HalfSmilingEmotionMappingScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, sections, buttons } = halfSmilingEmotionMappingData;

    const [inputs, setInputs] = useState<Record<string, string>>(
        sections.reduce((acc, section) => {
            acc[section.id] = '';
            return acc;
        }, {} as Record<string, string>)
    );

    const handleInputChange = (id: string, value: string) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        // TODO: Save inputs to storage/backend
        console.log('Saving emotion mapping:', inputs);
        dissolveTo('Learn_HalfSmilingEntries', { initialTab: 'emotionMapping' });
    };

    const handleView = () => {
        dissolveTo('Learn_HalfSmilingEntries', { initialTab: 'emotionMapping' });
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
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {/* Intro Card */}
                    <IntroCard text={introText} />

                    {/* Form Sections */}
                    {sections.map((section) => (
                        <View
                            key={section.id}
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {section.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                {section.description}
                            </Text>
                            <TextInput
                                value={inputs[section.id] || ''}
                                onChangeText={(value) => handleInputChange(section.id, value)}
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
                    ))}
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
                            <Text style={[t.textSemiBold, { color: colors.white }]}>
                                {buttons.save}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

