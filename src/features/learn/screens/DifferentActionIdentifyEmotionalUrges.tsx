import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { CloseIcon } from '@components/Utils';
import differentActionIdentifyEmotionalUrgesData from '../data/differentActionIdentifyEmotionalUrges.json';
import { createIdentifyEmotionalUrgesEntry } from '../api/differentAction';

interface UrgePair {
    id: number;
    urge: string;
    oppositeAction: string;
}

export default function DifferentActionIdentifyEmotionalUrgesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, inputs, buttons } = differentActionIdentifyEmotionalUrgesData;

    const [urgePairs, setUrgePairs] = useState<UrgePair[]>([
        { id: 1, urge: '', oppositeAction: '' }
    ]);

    const handleAddUrgePair = () => {
        const newId = urgePairs.length > 0 ? Math.max(...urgePairs.map(p => p.id)) + 1 : 1;
        setUrgePairs([...urgePairs, { id: newId, urge: '', oppositeAction: '' }]);
    };

    const handleRemoveUrgePair = (pairId: number) => {
        if (urgePairs.length > 1) {
            setUrgePairs(urgePairs.filter(p => p.id !== pairId));
        }
    };

    const handleUrgeChange = (pairId: number, value: string) => {
        setUrgePairs(urgePairs.map(p =>
            p.id === pairId ? { ...p, urge: value } : p
        ));
    };

    const handleOppositeActionChange = (pairId: number, value: string) => {
        setUrgePairs(urgePairs.map(p =>
            p.id === pairId ? { ...p, oppositeAction: value } : p
        ));
    };

    const handleAddMoreUrge = () => {
        handleAddUrgePair();
    };

    const handleAddMoreOppositeAction = () => {
        handleAddUrgePair();
    };

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Filter out empty urge pairs
        const validUrgePairs = urgePairs.filter(
            pair => pair.urge.trim().length > 0 || pair.oppositeAction.trim().length > 0
        );

        if (validUrgePairs.length === 0) {
            setError('Please add at least one urge and opposite action pair.');
            return;
        }

        setIsSaving(true);

        try {
            // Save each urge pair as a separate entry
            const savePromises = validUrgePairs.map(pair => {
                // Only save if both fields have content
                if (pair.urge.trim().length > 0 && pair.oppositeAction.trim().length > 0) {
                    return createIdentifyEmotionalUrgesEntry({
                        urges: pair.urge.trim(),
                        oppositeAction: pair.oppositeAction.trim(),
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
            console.error('Failed to save identify emotional urges entries:', err);
            setError('Failed to save entries. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setUrgePairs([
            { id: 1, urge: '', oppositeAction: '' }
        ]);
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_DifferentActionIdentifyEmotionalUrgesEntries');
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

                    {/* List Urges and Opposite Actions Card */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        {/* Title */}
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                            List Urges and Opposite Actions
                        </Text>

                        {/* Column Headers */}
                        <View className="flex-row mb-3">
                            <View className="flex-1 mr-2">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.urge.label}
                                </Text>
                            </View>
                            <View className="flex-1 ml-2">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {inputs.oppositeAction.label}
                                </Text>
                            </View>
                        </View>

                        {/* Urge Pairs */}
                        {urgePairs.map((pair, index) => (
                            <View key={pair.id} className="flex-row mb-3">
                                <View className="flex-1 mr-2">
                                    <TextInput
                                        value={pair.urge}
                                        onChangeText={(text) => handleUrgeChange(pair.id, text)}
                                        placeholder={`${inputs.urge.placeholder.replace('1', String(index + 1))}`}
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
                                                minHeight: 96,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                                <View className="flex-1 ml-2">
                                    <TextInput
                                        value={pair.oppositeAction}
                                        onChangeText={(text) => handleOppositeActionChange(pair.id, text)}
                                        placeholder={`${inputs.oppositeAction.placeholder.replace('1', String(index + 1))}`}
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
                                                minHeight: 96,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />
                                </View>
                            </View>
                        ))}

                        {/* Add More Buttons */}
                        <View className="flex-row mt-2">
                            <Pressable
                                className="flex-1 mr-2 flex-row items-center justify-center py-2"
                                onPress={handleAddMoreUrge}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark, fontSize: 18 }]} className="mr-1">
                                    +
                                </Text>
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {buttons.addMoreUrge}
                                </Text>
                            </Pressable>
                            {/* <Pressable
                                className="flex-1 ml-2 flex-row items-center justify-center py-2"
                                onPress={handleAddMoreOppositeAction}
                            >
                                <Text style={[t.textSemiBold, { color: colors.Button_Orange, fontSize: 18 }]} className="mr-1">
                                    +
                                </Text>
                                <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                                    {buttons.addMoreOppositeAction}
                                </Text>
                            </Pressable> */}
                        </View>
                    </View>

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

