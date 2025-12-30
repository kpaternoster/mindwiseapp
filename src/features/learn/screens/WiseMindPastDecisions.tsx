import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import wiseMindPastDecisionsData from '../data/wiseMindPastDecisions.json';
import { createPastDecisionEntry } from '../api/wiseMind';

export default function WiseMindPastDecisionsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = wiseMindPastDecisionsData;

    // State for all input fields
    const [situation, setSituation] = useState('');
    const [mindStateAnalysis, setMindStateAnalysis] = useState('');
    const [wiseMindPerspective, setWiseMindPerspective] = useState('');
    const [insightsLearning, setInsightsLearning] = useState('');

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
            // Map form data to API format
            const entryData = {
                situation: situation.trim(),
                mindState: mindStateAnalysis.trim(),
                wiseMindPerspective: wiseMindPerspective.trim(),
                insights: insightsLearning.trim(),
            };

            // Save to API
            await createPastDecisionEntry(entryData);

            // Show success message
            setSuccessMessage('Entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save past decision entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setSituation('');
        setMindStateAnalysis('');
        setWiseMindPerspective('');
        setInsightsLearning('');
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_WiseMindPastDecisionEntries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_WiseMindExercises');
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
                    <View
                        className="rounded-2xl p-4 mb-4"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {intro.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {intro.text}
                        </Text>
                    </View>

                    {/* Situation Section */}
                    {sections.find(s => s.id === 'situation') && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {sections.find(s => s.id === 'situation')?.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {sections.find(s => s.id === 'situation')?.instructions}
                            </Text>
                            <TextInput
                                value={situation}
                                onChangeText={setSituation}
                                placeholder={sections.find(s => s.id === 'situation')?.placeholder}
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
                                        minHeight: 90,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
                        </View>
                    )}

                    {/* Mind State Analysis Section */}
                    {sections.find(s => s.id === 'mindStateAnalysis') && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {sections.find(s => s.id === 'mindStateAnalysis')?.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {sections.find(s => s.id === 'mindStateAnalysis')?.instructions}
                            </Text>
                            <TextInput
                                value={mindStateAnalysis}
                                onChangeText={setMindStateAnalysis}
                                placeholder={sections.find(s => s.id === 'mindStateAnalysis')?.placeholder}
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
                                        minHeight: 90,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
                        </View>
                    )}

                    {/* Wise Mind Perspective Section */}
                    {sections.find(s => s.id === 'wiseMindPerspective') && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {sections.find(s => s.id === 'wiseMindPerspective')?.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {sections.find(s => s.id === 'wiseMindPerspective')?.instructions}
                            </Text>
                            <TextInput
                                value={wiseMindPerspective}
                                onChangeText={setWiseMindPerspective}
                                placeholder={sections.find(s => s.id === 'wiseMindPerspective')?.placeholder}
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
                                        minHeight: 90,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
                        </View>
                    )}

                    {/* Insights & Learning Section */}
                    {sections.find(s => s.id === 'insightsLearning') && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {sections.find(s => s.id === 'insightsLearning')?.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {sections.find(s => s.id === 'insightsLearning')?.instructions}
                            </Text>
                            <TextInput
                                value={insightsLearning}
                                onChangeText={setInsightsLearning}
                                placeholder={sections.find(s => s.id === 'insightsLearning')?.placeholder}
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
                                        minHeight: 90,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
                        </View>
                    )}
                    {/* Error Message */}
                    {error && (
                        <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.red_50 }}>
                            <Text style={[t.textRegular, { color: colors.red_light }]}>
                                {error}
                            </Text>
                        </View>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.green_50 }}>
                            <Text style={[t.textRegular, { color: colors.green_500 }]}>
                                {successMessage}
                            </Text>
                        </View>
                    )}
                </ScrollView>

                {/* Footer Buttons */}
                <View className="px-5 pb-6 pt-4 bg-white">
                    <View className="flex-row gap-3 mb-3">
                        <Pressable
                            className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleView}
                        >
                            <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                {buttons.view}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-3 px-3 items-center justify-center"
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

                    <Pressable
                        className="rounded-full py-3 px-3 items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleClearForm}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            Clear Form
                        </Text>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-3 px-3 items-center justify-center"
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

