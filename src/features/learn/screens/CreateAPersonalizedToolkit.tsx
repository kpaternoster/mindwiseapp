import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import createAPersonalizedToolkitData from '../data/createAPersonalizedToolkit.json';
import { createCreatePersonalizedToolkitEntry } from '../api/improve';

export default function CreateAPersonalizedToolkitScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, input, buttons } = createAPersonalizedToolkitData;

    const [toolkit, setToolkit] = useState('');

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        if (!toolkit.trim()) {
            setError('Please enter your personalized toolkit.');
            return;
        }

        setIsSaving(true);

        try {
            await createCreatePersonalizedToolkitEntry({
                parts: toolkit.trim(),
            });

            // Show success message
            setSuccessMessage('Toolkit saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save personalized toolkit:', err);
            setError('Failed to save toolkit. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setToolkit('');
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_CreateAPersonalizedToolkitEntries');
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

                    {/* Error Message */}
                    {error && (
                        <View className="bg-red-50 rounded-xl p-4 mb-4" style={{ borderColor: colors.red_light, borderWidth: 1 }}>
                            <Text style={[t.textRegular, { color: colors.red_light }]}>
                                {error}
                            </Text>
                        </View>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <View className="bg-green-50 rounded-xl p-4 mb-4" style={{ borderColor: colors.green_500, borderWidth: 1 }}>
                            <Text style={[t.textRegular, { color: colors.green_500 }]}>
                                {successMessage}
                            </Text>
                        </View>
                    )}

                    <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="p-2 mb-4">
                        {input.placeholder}
                    </Text>
                    {/* Toolkit Input Card */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <TextInput
                            value={toolkit}
                            onChangeText={setToolkit}
                            placeholder={input.placeholder}
                            placeholderTextColor={colors.text_secondary}
                            style={[
                                t.textRegular,
                                {
                                    color: colors.Text_Primary,
                                    backgroundColor: colors.white,
                                    minHeight: 150,
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
                            style={{ backgroundColor: colors.Button_Orange, opacity: isSaving ? 0.6 : 1 }}
                            onPress={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator size="small" color={colors.white} />
                            ) : (
                                <Text style={[t.textSemiBold, { color: colors.white }]}>
                                    {buttons.save}
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

