import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import rolePlayExerciseData from '../data/rolePlayExercise.json';
import { createRolePlayEntry } from '../api/stop';

export default function RolePlayExerciseScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, scenarioIdeas, inputs, buttons } = rolePlayExerciseData;

    const [formData, setFormData] = useState<{ [key: string]: string }>({
        rolePlayPartner: '',
        scenarioContext: '',
        learningsReflections: '',
    });

    const handleInputChange = (inputId: string, text: string) => {
        setFormData((prev) => ({
            ...prev,
            [inputId]: text,
        }));
    };

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            await createRolePlayEntry({
                who: formData.rolePlayPartner.trim() || '',
                scenario: formData.scenarioContext.trim() || '',
                reflection: formData.learningsReflections.trim() || '',
            });

            // Show success message
            setSuccessMessage('Role-play entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save role-play entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setFormData({
            rolePlayPartner: '',
            scenarioContext: '',
            learningsReflections: '',
        });
        setError(null);
        setSuccessMessage(null);
    };

    const handleViewEntry = () => {
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'rolePlay' });
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

                    {/* Scenario Ideas Card */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                            backgroundColor: colors.orange_50
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                            Scenario Ideas:
                        </Text>
                        {scenarioIdeas.map((idea, index) => (
                            <View key={index} className="flex-row mb-2">
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                    • {idea}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Input Cards */}
                    {inputs.map((input) => (
                        <View
                            key={input.id}
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {input.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-3">
                                {input.prompt}
                            </Text>
                            <TextInput
                                value={formData[input.id]}
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
                                        minHeight: input.multiline ? 120 : 48,
                                        textAlignVertical: input.multiline ? 'top' : 'center',
                                    },
                                ]}
                                multiline={input.multiline}
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
                            onPress={handleViewEntry}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                {buttons.viewEntry}
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

