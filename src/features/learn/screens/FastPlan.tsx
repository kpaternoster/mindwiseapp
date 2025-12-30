import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import fastPlanData from '../data/fastPlan.json';
import { createFastPlanEntry } from '../api/fast';

export default function FastPlanScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, gettingStarted, sections, buttons } = fastPlanData;

    // State for all input fields
    const [situation, setSituation] = useState('');
    const [request, setRequest] = useState('');
    const [fair, setFair] = useState('');
    const [apologies, setApologies] = useState('');
    const [stickToValues, setStickToValues] = useState('');
    const [truthful, setTruthful] = useState('');
    const [confidence, setConfidence] = useState('');
    const [notes, setNotes] = useState('');

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSaveEntry = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                situation: situation.trim(),
                request: request.trim(),
                fair: fair.trim(),
                apologies: apologies.trim(),
                stickToValues: stickToValues.trim(),
                truthful: truthful.trim(),
                confidence: confidence.trim(),
                notes: notes.trim(),
            };

            // Save to API
            await createFastPlanEntry(entryData);

            // Show success message
            setSuccessMessage('Entry saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save fast plan entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_FastPlanEntries');
    };

    const handleClearForm = () => {
        setSituation('');
        setRequest('');
        setFair('');
        setApologies('');
        setStickToValues('');
        setTruthful('');
        setConfidence('');
        setNotes('');
        setError(null);
        setSuccessMessage(null);
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_FastExercises');
    };

    const situationRequestSection = sections.find(s => s.id === 'situationRequest');
    const fastCheckSection = sections.find(s => s.id === 'fastCheck');
    const buildConfidenceSection = sections.find(s => s.id === 'buildConfidence');

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
                    {/* Getting Started Section */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            backgroundColor: colors.cream_40
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {gettingStarted.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {gettingStarted.description}
                        </Text>
                    </View>

                    {/* Situation & Request Section */}
                    {situationRequestSection && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                                {situationRequestSection.title}
                            </Text>
                            {situationRequestSection.inputs?.map((input) => (
                                <View key={input.id} className="mb-4">
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                                        {input.label}
                                    </Text>
                                    <TextInput
                                        value={input.id === 'situation' ? situation : request}
                                        onChangeText={input.id === 'situation' ? setSituation : setRequest}
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
                                                minHeight: 90,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                            ))}
                        </View>
                    )}

                    {/* FAST Check Section */}
                    {fastCheckSection && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                                {fastCheckSection.title}
                            </Text>
                            {fastCheckSection.subsections?.map((subsection) => (
                                <View key={subsection.id} className="mb-4">
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                            {subsection.title}
                                        </Text>
                                        {' - '}
                                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                            {subsection.label.replace(`${subsection.title} - `, '')}
                                        </Text>
                                    </Text>
                                    <TextInput
                                        value={
                                            subsection.id === 'fair' ? fair :
                                            subsection.id === 'apologies' ? apologies :
                                            subsection.id === 'stickToValues' ? stickToValues :
                                            truthful
                                        }
                                        onChangeText={
                                            subsection.id === 'fair' ? setFair :
                                            subsection.id === 'apologies' ? setApologies :
                                            subsection.id === 'stickToValues' ? setStickToValues :
                                            setTruthful
                                        }
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
                                                minHeight: 90,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Build Confidence Section */}
                    {buildConfidenceSection && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                                {buildConfidenceSection.title}
                            </Text>
                            {buildConfidenceSection.inputs?.map((input) => (
                                <View key={input.id} className="mb-4">
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                                        {input.label}
                                    </Text>
                                    <TextInput
                                        value={confidence}
                                        onChangeText={setConfidence}
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
                                                minHeight: 90,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                            ))}
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

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                    {/* Row 1: View and Save buttons side by side */}
                    <View className="flex-row gap-3 mb-3">
                        <Pressable
                            className="flex-1 rounded-full py-3 px-3 flex-row items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleViewSaved}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                                {buttons.view}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-3 px-3 flex-row items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange, opacity: isSaving ? 0.6 : 1 }}
                            onPress={handleSaveEntry}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator size="small" color={colors.white} />
                            ) : (
                                <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                    {buttons.save}
                                </Text>
                            )}
                        </Pressable>
                    </View>

                    {/* Row 2: Clear Form button */}
                    <Pressable
                        className="rounded-full py-3 px-3 flex-row items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleClearForm}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.clearForm}
                        </Text>
                    </Pressable>

                    {/* Row 3: Back to Menu button */}
                    <Pressable
                        className="rounded-full py-3 px-3 flex-row items-center justify-center"
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

