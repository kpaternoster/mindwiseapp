import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { CloseIcon } from '@components/Utils';
import fiveSensesInventoryData from '../data/fiveSensesInventory.json';
import { createFiveSensesEntry } from '../api/selfSoothing';

interface Entry {
    id: number;
    sight: string;
    sound: string;
    smell: string;
    taste: string;
    touch: string;
}

export default function FiveSensesInventoryScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, senses, buttons } = fiveSensesInventoryData;

    const [entries, setEntries] = useState<Entry[]>([
        { id: 1, sight: '', sound: '', smell: '', taste: '', touch: '' }
    ]);

    const handleAddEntry = () => {
        const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
        setEntries([...entries, { id: newId, sight: '', sound: '', smell: '', taste: '', touch: '' }]);
    };

    const handleRemoveEntry = (entryId: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter(e => e.id !== entryId));
        }
    };

    const handleEntryChange = (entryId: number, senseId: string, value: string) => {
        setEntries(entries.map(e => 
            e.id === entryId ? { ...e, [senseId]: value } : e
        ));
    };

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Filter out empty entries (where all senses are empty)
        const validEntries = entries.filter(
            entry => entry.sight.trim().length > 0 || 
                     entry.sound.trim().length > 0 || 
                     entry.smell.trim().length > 0 || 
                     entry.taste.trim().length > 0 || 
                     entry.touch.trim().length > 0
        );

        if (validEntries.length === 0) {
            setError('Please add at least one entry with at least one sense filled in.');
            return;
        }

        setIsSaving(true);

        try {
            // Save each entry as a separate API entry
            const savePromises = validEntries.map(entry => {
                // Only save if at least one sense has content
                if (entry.sight.trim().length > 0 || 
                    entry.sound.trim().length > 0 || 
                    entry.smell.trim().length > 0 || 
                    entry.taste.trim().length > 0 || 
                    entry.touch.trim().length > 0) {
                    return createFiveSensesEntry({
                        sight: entry.sight.trim() || '',
                        sound: entry.sound.trim() || '',
                        smell: entry.smell.trim() || '',
                        taste: entry.taste.trim() || '',
                        touch: entry.touch.trim() || '',
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
            console.error('Failed to save five senses inventory entries:', err);
            setError('Failed to save entries. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setEntries([{ id: 1, sight: '', sound: '', smell: '', taste: '', touch: '' }]);
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_FiveSensesInventoryEntries');
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

                            {/* Five Senses Inputs */}
                            {senses.map((sense, senseIndex) => {
                                const senseValue = entry[sense.id as keyof Entry] as string;
                                return (
                                    <View key={sense.id} className={senseIndex < senses.length - 1 ? 'mb-4' : ''}>
                                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                            {sense.label}
                                        </Text>
                                        <TextInput
                                            value={senseValue}
                                            onChangeText={(text) => handleEntryChange(entry.id, sense.id, text)}
                                            placeholder={sense.placeholder}
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
                                                    minHeight: 48,
                                                    textAlignVertical: 'top',
                                                },
                                            ]}
                                            multiline
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    ))}
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
                            Add Another Entry
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

