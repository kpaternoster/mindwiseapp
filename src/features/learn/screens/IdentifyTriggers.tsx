import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { ArrowRightIcon, CloseIcon } from '@components/Utils';
import identifyTriggersData from '../data/identifyTriggers.json';

interface Entry {
    id: number;
    overwhelmingSituation: string;
    improveStrategies: string;
}

export default function IdentifyTriggersScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, inputs, buttons } = identifyTriggersData;

    const [entries, setEntries] = useState<Entry[]>([
        { id: 1, overwhelmingSituation: '', improveStrategies: '' }
    ]);

    const handleAddEntry = () => {
        const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
        setEntries([...entries, { id: newId, overwhelmingSituation: '', improveStrategies: '' }]);
    };

    const handleRemoveEntry = (entryId: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter(e => e.id !== entryId));
        }
    };

    const handleEntryChange = (entryId: number, field: 'overwhelmingSituation' | 'improveStrategies', value: string) => {
        setEntries(entries.map(e =>
            e.id === entryId ? { ...e, [field]: value } : e
        ));
    };

    const handleSave = () => {
        // TODO: Save all entries to storage/backend
        console.log('Saving Identify Triggers entries:', entries);
        dissolveTo('Learn_IdentifyTriggersEntries');
    };

    const handleView = () => {
        dissolveTo('Learn_IdentifyTriggersEntries');
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

                            {/* Overwhelming Situation Input */}
                            <View className="mb-4">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.overwhelmingSituation.label}
                                </Text>
                                <TextInput
                                    value={entry.overwhelmingSituation}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'overwhelmingSituation', text)}
                                    placeholder={inputs.overwhelmingSituation.placeholder}
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

                            {/* IMPROVE Strategies Input */}
                            <View className="mb-2">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.improveStrategies.label}
                                </Text>
                                <TextInput
                                    value={entry.improveStrategies}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'improveStrategies', text)}
                                    placeholder={inputs.improveStrategies.placeholder}
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

