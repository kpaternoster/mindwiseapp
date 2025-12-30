import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { CloseIcon } from '@components/Utils';
import radicalAcceptanceJournalData from '../data/radicalAcceptanceJournal.json';
import { createAcceptanceJournalEntry } from '../api/radicalAcceptance';

interface Entry {
    id: number;
    situation: string;
    facts: string;
    emotions: string;
    copingStatement: string;
}

export default function RadicalAcceptanceJournalScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, inputs, buttons } = radicalAcceptanceJournalData;

    const [entries, setEntries] = useState<Entry[]>([
        { id: 1, situation: '', facts: '', emotions: '', copingStatement: '' }
    ]);

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddEntry = () => {
        const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
        setEntries([...entries, { id: newId, situation: '', facts: '', emotions: '', copingStatement: '' }]);
    };

    const handleRemoveEntry = (entryId: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter(e => e.id !== entryId));
        }
    };

    const handleEntryChange = (entryId: number, field: keyof Entry, value: string) => {
        setEntries(entries.map(e =>
            e.id === entryId ? { ...e, [field]: value } : e
        ));
    };

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Filter out empty entries (where both situation and copingStatement are empty)
        const validEntries = entries.filter(
            entry => entry.situation.trim().length > 0 || entry.copingStatement.trim().length > 0
        );

        if (validEntries.length === 0) {
            setError('Please add at least one entry with a situation or coping statement.');
            return;
        }

        setIsSaving(true);

        try {
            // Save each entry as a separate API entry
            const savePromises = validEntries.map(entry => {
                // Only save if both fields have content
                if (entry.situation.trim().length > 0 && entry.copingStatement.trim().length > 0) {
                    return createAcceptanceJournalEntry({
                        situation: entry.situation.trim(),
                        copingStatement: entry.copingStatement.trim(),
                    });
                }
                return Promise.resolve(null);
            });

            // Wait for all entries to be saved
            await Promise.all(savePromises.filter(p => p !== null));

            // Show success message
            setSuccessMessage('Entries saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save acceptance journal entries:', err);
            setError('Failed to save entries. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setEntries([
            { id: 1, situation: '', facts: '', emotions: '', copingStatement: '' }
        ]);
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_RadicalAcceptanceJournalEntries');
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

                    {/* Entry Cards */}
                    {entries.map((entry, index) => (
                        <View
                            key={entry.id}
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            {/* Entry Header */}
                            <View className="flex-row items-center justify-between mb-4">
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                    Entry #{index + 1}
                                </Text>
                                {entries.length > 1 && (
                                    <Pressable onPress={() => handleRemoveEntry(entry.id)}>
                                        <CloseIcon size={20} color={colors.text_secondary} />
                                    </Pressable>
                                )}
                            </View>

                            {/* Situation Input */}
                            <View className="mb-4">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.situation.label}
                                </Text>
                                <TextInput
                                    value={entry.situation}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'situation', text)}
                                    placeholder={inputs.situation.placeholder}
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

                            {/* Facts Without Judgment Input */}
                            {/* <View className="mb-4">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.facts.label}
                                </Text>
                                <TextInput
                                    value={entry.facts}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'facts', text)}
                                    placeholder={inputs.facts.placeholder}
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
                            </View> */}

                            {/* Emotions Input */}
                            {/* <View className="mb-4">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.emotions.label}
                                </Text>
                                <TextInput
                                    value={entry.emotions}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'emotions', text)}
                                    placeholder={inputs.emotions.placeholder}
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
                            </View> */}

                            {/* Coping Statement Input */}
                            <View className="mb-2">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.copingStatement.label}
                                </Text>
                                <TextInput
                                    value={entry.copingStatement}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'copingStatement', text)}
                                    placeholder={inputs.copingStatement.placeholder}
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
                        </View>
                    ))}

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
                <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                    {/* Add Another Entry Button */}
                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleAddEntry}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                            {buttons.addAnotherEntry}
                        </Text>
                    </Pressable>

                    {/* View and Save Buttons */}
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

