import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { UpIcon, DownIcon, ScalesIcon } from '@components/Utils';
import recognizingDialecticalDilemmasData from '../data/recognizingDialecticalDilemmas.json';

export default function RecognizingDialecticalDilemmasScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = recognizingDialecticalDilemmasData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        describeSituation: true,
        identifyExtremes: false,
        findTruth: false,
        middlePathPerspective: false,
    });

    // Form state
    const [situationDilemma, setSituationDilemma] = useState('');
    const [extreme1, setExtreme1] = useState('');
    const [extreme2, setExtreme2] = useState('');
    const [truth1, setTruth1] = useState('');
    const [truth2, setTruth2] = useState('');
    const [middlePathPerspective, setMiddlePathPerspective] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleSave = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            situationDilemma,
            extreme1,
            extreme2,
            truth1,
            truth2,
            middlePathPerspective,
        };
        console.log('Saving Recognizing Dialectical Dilemmas data:', allData);
        // TODO: Show success message or navigate
    };

    const handleView = () => {
        dissolveTo('Learn_RecognizingDialecticalDilemmasEntries');
    };

    const handleClearForm = () => {
        setSituationDilemma('');
        setExtreme1('');
        setExtreme2('');
        setTruth1('');
        setTruth2('');
        setMiddlePathPerspective('');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_MiddlePathExercises');
    };

    const describeSituationSection = sections.find(s => s.id === 'describeSituation');
    const identifyExtremesSection = sections.find(s => s.id === 'identifyExtremes');
    const findTruthSection = sections.find(s => s.id === 'findTruth');
    const middlePathPerspectiveSection = sections.find(s => s.id === 'middlePathPerspective');



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
                        style={{ backgroundColor: colors.cream_40 }}
                    >
                        <View className="items-center justify-center mb-4">
                            <ScalesIcon size={24} color={colors.warm_dark} />
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {intro.text}
                        </Text>
                    </View>

                    {/* Describe the Situation Section */}
                    {describeSituationSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.describeSituation ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('describeSituation')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {describeSituationSection.title}
                                        </Text>
                                        {expandedSections.describeSituation ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.describeSituation && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                                        {describeSituationSection.instructions}
                                    </Text>

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {describeSituationSection.question1}
                                    </Text>
                                    <TextInput
                                        value={situationDilemma}
                                        onChangeText={setSituationDilemma}
                                        placeholder={describeSituationSection.placeholder1}
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
                        </View>
                    )}

                    {/* Identify the Extremes Section */}
                    {identifyExtremesSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.identifyExtremes ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('identifyExtremes')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {identifyExtremesSection.title}
                                        </Text>
                                        {expandedSections.identifyExtremes ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.identifyExtremes && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Extreme Position #1:
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                        {identifyExtremesSection.question1}
                                    </Text>
                                    <TextInput
                                        value={extreme1}
                                        onChangeText={setExtreme1}
                                        placeholder={identifyExtremesSection.placeholder1}
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
                                                marginBottom: 16,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Extreme Position #2:
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                        {identifyExtremesSection.question2}
                                    </Text>
                                    <TextInput
                                        value={extreme2}
                                        onChangeText={setExtreme2}
                                        placeholder={identifyExtremesSection.placeholder2}
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
                        </View>
                    )}

                    {/* Find Truth in Both Sides Section */}
                    {findTruthSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.findTruth ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('findTruth')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {findTruthSection.title}
                                        </Text>
                                        {expandedSections.findTruth ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.findTruth && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Truth in Position #1:
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                        {findTruthSection.question1}
                                    </Text>
                                    <TextInput
                                        value={truth1}
                                        onChangeText={setTruth1}
                                        placeholder={findTruthSection.placeholder1}
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
                                                marginBottom: 16,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        multiline
                                    />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Truth in Position #2:
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                        {findTruthSection.question2}
                                    </Text>
                                    <TextInput
                                        value={truth2}
                                        onChangeText={setTruth2}
                                        placeholder={findTruthSection.placeholder2}
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
                        </View>
                    )}

                    {/* Middle Path Perspective Section */}
                    {middlePathPerspectiveSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.middlePathPerspective ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('middlePathPerspective')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {middlePathPerspectiveSection.title}
                                        </Text>
                                        {expandedSections.middlePathPerspective ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                            </Pressable>

                            {expandedSections.middlePathPerspective && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                                        {middlePathPerspectiveSection.instructions}
                                    </Text>

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {middlePathPerspectiveSection.question1}
                                    </Text>
                                    <TextInput
                                        value={middlePathPerspective}
                                        onChangeText={setMiddlePathPerspective}
                                        placeholder={middlePathPerspectiveSection.placeholder1}
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
                        </View>
                    )}

                    {/* View, Save, Clear Form, Back to menu Buttons */}
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
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSave}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]}>
                                {buttons.save}
                            </Text>
                        </Pressable>
                    </View>
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleClearForm}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.clearForm}
                        </Text>
                    </Pressable>
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleBackToMenu}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.backToMenu}
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

