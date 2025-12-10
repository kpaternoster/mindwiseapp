import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { UpIcon, DownIcon, ArrowRightIcon, HeartIcon } from '@components/Utils';
import dearManExercisesData from '../data/dearManExercises.json';

export default function DearManExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, introTitle, exercises, remember, buttons } = dearManExercisesData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        practiceDearMan: true,
    });

    const [script, setScript] = useState('');
    const [reflection, setReflection] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleSaveEntry = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            script,
            reflection,
        };
        
        dissolveTo('Learn_DearManEntries');
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_DearManEntries');
    };

    const practiceExercise = exercises.find(e => e.id === 1);
    const startSmallExercise = exercises.find(e => e.id === 2);

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
                    {/* Intro Card with custom background */}
                    <View
                        className="rounded-2xl p-4 mb-4"
                        style={{ backgroundColor: colors.cream_40 }}
                    >
                        {introTitle && (
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                                {introTitle}
                            </Text>
                        )}
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {introText}
                        </Text>
                    </View>

                    {/* Practice DEAR MAN Exercise */}
                    {practiceExercise && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.practiceDearMan ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{
                                    backgroundColor: colors.white,
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                    borderBottomWidth: expandedSections.practiceDearMan ? 0 : 1,
                                }}
                                onPress={() => toggleSection('practiceDearMan')}
                            >
                                <View className="flex-row items-center flex-1">
                                    <View
                                        className="w-8 h-8 rounded-full items-center justify-center mr-4"
                                        style={{ backgroundColor: colors.Button_Orange }}
                                    >
                                        <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                            {practiceExercise.number}
                                        </Text>
                                    </View>
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="flex-1">
                                        {practiceExercise.title}
                                    </Text>
                                </View>
                                {expandedSections.practiceDearMan ? (
                                    <UpIcon size={12} color={colors.Text_Primary} />
                                ) : (
                                    <DownIcon size={12} color={colors.Text_Primary} />
                                )}
                            </Pressable>

                            {expandedSections.practiceDearMan && (
                                <View
                                    className="rounded-b-2xl px-4 pb-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                        {practiceExercise.description}
                                    </Text>

                                    {/* Write Your DEAR MAN Script Section */}
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                        {practiceExercise.scriptTitle}
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-3">
                                        {practiceExercise.scriptInstructions}
                                    </Text>
                                    <TextInput
                                        value={script}
                                        onChangeText={setScript}
                                        placeholder={practiceExercise.scriptPlaceholder}
                                        placeholderTextColor={colors.text_secondary}
                                        style={[
                                            t.textRegular,
                                            {
                                                color: colors.Text_Primary,
                                                backgroundColor: colors.gray_100,
                                                borderColor: colors.stoke_gray,
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                padding: 12,
                                                minHeight: 120,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    <View className="h-0.5 w-full my-4" style={{ backgroundColor: colors.stoke_gray }} />

                                    {/* Practice Reflection Section */}
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2 mt-2">
                                        {practiceExercise.reflectionTitle}
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-3">
                                        {practiceExercise.reflectionInstructions}
                                    </Text>
                                    <TextInput
                                        value={reflection}
                                        onChangeText={setReflection}
                                        placeholder={practiceExercise.reflectionPlaceholder}
                                        placeholderTextColor={colors.text_secondary}
                                        style={[
                                            t.textRegular,
                                            {
                                                color: colors.Text_Primary,
                                                backgroundColor: colors.gray_100,
                                                borderColor: colors.stoke_gray,
                                                borderWidth: 1,
                                                borderRadius: 12,
                                                padding: 12,
                                                minHeight: 120,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    {/* Action Buttons */}
                                    <View className="flex-row gap-3 mt-4">
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
                                            style={{ backgroundColor: colors.Button_Orange }}
                                            onPress={handleSaveEntry}
                                        >
                                            <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                                {buttons.saveEntry}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Start Small Exercise */}
                    {startSmallExercise && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <View className="flex-row items-center mb-3">
                                <View
                                    className="w-8 h-8 rounded-full items-center justify-center mr-4"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                >
                                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                        {startSmallExercise.number}
                                    </Text>
                                </View>
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                    {startSmallExercise.title}
                                </Text>
                            </View>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {startSmallExercise.description}
                            </Text>
                        </View>
                    )}

                    {/* Remember Card */}
                    {remember && (
                        <View
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                                backgroundColor: colors.orange_50,
                            }}
                        >
                            <View className="flex-row items-start mb-3">
                                <View className="mr-3">
                                    <HeartIcon size={24} color={colors.orange_500} />
                                </View>
                                <View className="flex-1">
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                        {remember.title}
                                    </Text>

                                </View>
                            </View>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {remember.text}
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

