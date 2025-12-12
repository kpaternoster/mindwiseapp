import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import stopDrillData from '../data/stopDrill.json';

export default function StopDrillScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, steps, buttons } = stopDrillData;

    const [plans, setPlans] = useState<{ [key: string]: string }>({
        stop: '',
        takeStepBack: '',
        observe: '',
        proceedMindfully: '',
    });

    const handlePlanChange = (stepId: string, text: string) => {
        setPlans((prev) => ({
            ...prev,
            [stepId]: text,
        }));
    };

    const handleSave = () => {
        // TODO: Save all plans to storage/backend
        console.log('Saving STOP Drill plans:', plans);
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'stopDrill' });
    };

    const handleView = () => {
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'stopDrill' });
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

                    {/* STOP Steps */}
                    {steps.map((step) => (
                        <View
                            key={step.id}
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            {/* Badge and Title */}
                            <View className="flex-row items-center mb-3">
                                <View
                                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                                    style={{ backgroundColor: colors.warm_dark }}
                                >
                                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                        {step.letter}
                                    </Text>
                                </View>
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                    {step.title}
                                </Text>
                            </View>

                            {/* Description */}
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                {step.description}
                            </Text>

                            {/* Plan Prompt */}
                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {step.planPrompt}
                            </Text>

                            {/* Input Field */}
                            <TextInput
                                value={plans[step.id]}
                                onChangeText={(text) => handlePlanChange(step.id, text)}
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
                                        minHeight: 100,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
                        </View>
                    ))}
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
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSave}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]}>
                                {buttons.save}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

