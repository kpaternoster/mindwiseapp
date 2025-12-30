import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { CloseIcon } from '@components/Utils';
import radicalAcceptanceCopingStatementsListData from '../data/radicalAcceptanceCopingStatementsList.json';
import { createCopingStatementsListEntry } from '../api/radicalAcceptance';

interface Statement {
    id: number;
    statement: string;
}

export default function RadicalAcceptanceCopingStatementsListScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, input, buttons } = radicalAcceptanceCopingStatementsListData;

    const [statements, setStatements] = useState<Statement[]>([
        { id: 1, statement: '' }
    ]);

    // API states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddStatement = () => {
        const newId = statements.length > 0 ? Math.max(...statements.map(s => s.id)) + 1 : 1;
        setStatements([...statements, { id: newId, statement: '' }]);
    };

    const handleRemoveStatement = (statementId: number) => {
        if (statements.length > 1) {
            setStatements(statements.filter(s => s.id !== statementId));
        }
    };

    const handleStatementChange = (statementId: number, value: string) => {
        setStatements(statements.map(s =>
            s.id === statementId ? { ...s, statement: value } : s
        ));
    };

    const handleSave = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Filter out empty statements
        const validStatements = statements.filter(
            statement => statement.statement.trim().length > 0
        );

        if (validStatements.length === 0) {
            setError('Please add at least one coping statement.');
            return;
        }

        setIsSaving(true);

        try {
            // Save each statement as a separate API entry
            const savePromises = validStatements.map(statement => {
                return createCopingStatementsListEntry({
                    copingStatement: statement.statement.trim(),
                });
            });

            // Wait for all statements to be saved
            await Promise.all(savePromises);

            // Show success message
            setSuccessMessage('Statements saved successfully!');

            // Clear form after successful save
            handleClearForm();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save coping statements list entries:', err);
            setError('Failed to save statements. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClearForm = () => {
        setStatements([
            { id: 1, statement: '' }
        ]);
        setError(null);
        setSuccessMessage(null);
    };

    const handleView = () => {
        dissolveTo('Learn_RadicalAcceptanceCopingStatementsListEntries');
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

                    {/* Statement Cards */}
                    {statements.map((statement, index) => (
                        <View
                            key={statement.id}
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            {/* Statement Header */}
                            <View className="flex-row items-center justify-between mb-3">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                    {input.label} #{index + 1}:
                                </Text>
                                {statements.length > 1 && (
                                    <Pressable onPress={() => handleRemoveStatement(statement.id)}>
                                        <CloseIcon size={20} color={colors.text_secondary} />
                                    </Pressable>
                                )}
                            </View>

                            {/* Statement Input */}
                            <TextInput
                                value={statement.statement}
                                onChangeText={(text) => handleStatementChange(statement.id, text)}
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
                                        minHeight: 48,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
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
                    {/* Add Another Statement Button */}
                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleAddStatement}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                            {buttons.addAnotherStatement}
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

