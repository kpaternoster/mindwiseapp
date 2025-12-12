import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { ArrowRightIcon, CloseIcon } from '@components/Utils';
import reflectivePracticeData from '../data/reflectivePractice.json';

interface Entry {
    id: number;
    situation: string;
    reflection: string;
}

export default function ReflectivePracticeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, inputs, buttons } = reflectivePracticeData;

    const [entries, setEntries] = useState<Entry[]>([
        { id: 1, situation: '', reflection: '' }
    ]);

    const handleAddEntry = () => {
        const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
        setEntries([...entries, { id: newId, situation: '', reflection: '' }]);
    };

    const handleRemoveEntry = (entryId: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter(e => e.id !== entryId));
        }
    };

    const handleEntryChange = (entryId: number, field: 'situation' | 'reflection', value: string) => {
        setEntries(entries.map(e => 
            e.id === entryId ? { ...e, [field]: value } : e
        ));
    };

    const handleSave = () => {
        // TODO: Save all entries to storage/backend
        console.log('Saving entries:', entries);
        dissolveTo('Learn_ReflectivePracticeEntries');
    };

    const handleView = () => {
        dissolveTo('Learn_ReflectivePracticeEntries');
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

                            {/* Reflection & Learning Input */}
                            <View className="mb-2">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.reflection.label}
                                </Text>
                                <TextInput
                                    value={entry.reflection}
                                    onChangeText={(text) => handleEntryChange(entry.id, 'reflection', text)}
                                    placeholder={inputs.reflection.placeholder}
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
                            <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                <ArrowRightIcon size={16} color={colors.Text_Primary} />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

