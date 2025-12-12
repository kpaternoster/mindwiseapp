import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import halfSmilingAnchorPromptData from '../data/halfSmilingAnchorPrompt.json';

export default function HalfSmilingAnchorPromptScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, suggestedPrompts, reflection, buttons } = halfSmilingAnchorPromptData;

    const [selectedPrompts, setSelectedPrompts] = useState<Set<string>>(new Set());
    const [customPrompts, setCustomPrompts] = useState<string[]>(['']);

    const handlePromptToggle = (prompt: string) => {
        setSelectedPrompts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(prompt)) {
                newSet.delete(prompt);
            } else {
                newSet.add(prompt);
            }
            return newSet;
        });
    };

    const handleCustomPromptChange = (index: number, value: string) => {
        const newPrompts = [...customPrompts];
        newPrompts[index] = value;
        setCustomPrompts(newPrompts);
    };

    const handleAddCustomPrompt = () => {
        setCustomPrompts([...customPrompts, '']);
    };

    const handleRemoveCustomPrompt = (index: number) => {
        if (customPrompts.length > 1) {
            const newPrompts = customPrompts.filter((_, i) => i !== index);
            setCustomPrompts(newPrompts);
        }
    };

    const allSelectedPrompts = [
        ...Array.from(selectedPrompts),
        ...customPrompts.filter((p) => p.trim() !== ''),
    ];

    const handleReflectionChange = (value: string) => {
        // Store reflection in state if needed
        setReflectionText(value);
    };

    const [reflectionText, setReflectionText] = useState('');

    const handleSave = () => {
        // TODO: Save prompts and reflection to storage/backend
        console.log('Saving Anchor Prompts:', {
            selectedPrompts: Array.from(selectedPrompts),
            customPrompts: customPrompts.filter((p) => p.trim() !== ''),
            reflection: reflectionText,
        });
        dissolveTo('Learn_HalfSmilingEntries', { initialTab: 'anchorPrompts' });
    };

    const handleView = () => {
        dissolveTo('Learn_HalfSmilingEntries', { initialTab: 'anchorPrompts' });
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

                    {/* Suggested Prompts Section */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Suggested Prompts
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                            Tap to select prompts that resonate with you:
                        </Text>

                        {/* Prompt Buttons Grid */}
                        <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                            {suggestedPrompts.map((prompt) => {
                                const isSelected = selectedPrompts.has(prompt);
                                return (
                                    <Pressable
                                        key={prompt}
                                        onPress={() => handlePromptToggle(prompt)}
                                        className="rounded-2xl px-4 py-2"
                                        style={{
                                            backgroundColor: isSelected ? colors.Button_Orange : colors.white,
                                            borderColor: colors.stoke_gray,
                                            borderWidth: 1,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                t.textSemiBold,
                                                {
                                                    color: isSelected ? colors.white : colors.Text_Primary,
                                                },
                                            ]}
                                        >
                                            {prompt}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Create Your Own Section */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Create Your Own
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                            Add personal affirmations that feel meaningful to you:
                        </Text>

                        {/* Custom Prompt Inputs */}
                        {customPrompts.map((prompt, index) => (
                            <View key={index} className="mb-3">
                                <TextInput
                                    value={prompt}
                                    onChangeText={(value) => handleCustomPromptChange(index, value)}
                                    placeholder={`Custom prompt #${index + 1}...`}
                                    placeholderTextColor={colors.text_secondary}
                                    style={[
                                        t.textRegular,
                                        {
                                            color: colors.Text_Primary,
                                            backgroundColor: colors.white,
                                            borderColor: colors.stoke_gray,
                                            borderWidth: 1,
                                            borderRadius: 24,
                                            padding: 12,
                                            minHeight: 48,
                                        },
                                    ]}
                                />
                            </View>
                        ))}

                        {/* Add Another Prompt Button */}
                        <Pressable
                            onPress={handleAddCustomPrompt}
                            className="flex-row items-center justify-start py-2"
                        >
                            <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                + Add Another Prompt
                            </Text>
                        </Pressable>
                    </View>

                    {/* Your Anchor Prompts Section */}
                    {allSelectedPrompts.length > 0 && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <View className="flex-row items-center mb-4">
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mr-2">
                                    Your Anchor Prompts
                                </Text>
                                <View
                                    className="rounded-full w-6 h-6 items-center justify-center"
                                    style={{ backgroundColor: colors.orange_100 }}
                                >
                                    <Text style={[t.footnoteBold, { color: colors.Button_Orange }]}>
                                        {allSelectedPrompts.length}
                                    </Text>
                                </View>
                            </View>

                            {/* Display Selected Prompts */}
                            {allSelectedPrompts.map((prompt, index) => (
                                <View
                                    key={index}
                                    className="mb-2 p-3 rounded-2xl"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                        {index + 1}. {prompt}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Reflection Section */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {reflection.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                            {reflection.question}
                        </Text>
                        <TextInput
                            value={reflectionText}
                            onChangeText={handleReflectionChange}
                            placeholder={reflection.placeholder}
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

