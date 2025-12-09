import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import acceptanceAndChangeData from '../data/acceptanceAndChange.json';

export default function AcceptanceAndChangeScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, steps, buttons } = acceptanceAndChangeData;

    // Form state for each step
    const [describeSituation, setDescribeSituation] = useState('');
    const [partsNeedAcceptance, setPartsNeedAcceptance] = useState('');
    const [partsCanChange, setPartsCanChange] = useState('');
    const [actionableStepsAcceptance, setActionableStepsAcceptance] = useState('');
    const [actionableStepsChange, setActionableStepsChange] = useState('');
    const [reflection, setReflection] = useState('');

    const handleSave = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            describeSituation,
            partsNeedAcceptance,
            partsCanChange,
            actionableStepsAcceptance,
            actionableStepsChange,
            reflection,
        };
        console.log('Saving Acceptance & Change data:', allData);
        // TODO: Show success message or navigate
    };

    const handleView = () => {
        dissolveTo('Learn_AcceptanceAndChangeEntries');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_MiddlePathExercises');
    };

    const getStepState = (stepId: string) => {
        switch (stepId) {
            case 'describeSituation':
                return { value: describeSituation, setValue: setDescribeSituation };
            case 'partsNeedAcceptance':
                return { value: partsNeedAcceptance, setValue: setPartsNeedAcceptance };
            case 'partsCanChange':
                return { value: partsCanChange, setValue: setPartsCanChange };
            case 'actionableStepsAcceptance':
                return { value: actionableStepsAcceptance, setValue: setActionableStepsAcceptance };
            case 'actionableStepsChange':
                return { value: actionableStepsChange, setValue: setActionableStepsChange };
            case 'reflection':
                return { value: reflection, setValue: setReflection };
            default:
                return { value: '', setValue: () => {} };
        }
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
                        style={{ backgroundColor: colors.cream_40 }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {intro.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {intro.text}
                        </Text>
                    </View>

                    {/* Steps */}
                    {steps.map((step) => {
                        const { value, setValue } = getStepState(step.id);
                        return (
                            <View
                                key={step.id}
                                className="bg-white rounded-2xl p-4 mb-4"
                                style={{
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                }}
                            >
                                {/* Step Number and Title */}
                                <View className="flex-row items-center mb-3">
                                    <View
                                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                        style={{ backgroundColor: colors.orange_50 }}
                                    >
                                        <Text style={[t.title16SemiBold, { color: colors.orange_500 }]}>
                                            {step.number}
                                        </Text>
                                    </View>
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="flex-1">
                                        {step.title}
                                    </Text>
                                </View>

                                {/* Prompt */}
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                    {step.prompt}
                                </Text>

                                {/* Input Field */}
                                <TextInput
                                    value={value}
                                    onChangeText={setValue}
                                    placeholder={step.placeholder}
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
                        );
                    })}

                    {/* View, Save, Back to menu Buttons */}
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

