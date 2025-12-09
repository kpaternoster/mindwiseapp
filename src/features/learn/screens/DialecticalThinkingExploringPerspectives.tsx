import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ProgressBar';
import { TagButton } from '../components/TagButton';
import { ArrowRightIcon } from '@components/Utils';
import dialecticalThinkingExploringPerspectivesData from '../data/dialecticalThinkingExploringPerspectives.json';

export default function DialecticalThinkingExploringPerspectivesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSteps, steps } = dialecticalThinkingExploringPerspectivesData;

    const [currentStep, setCurrentStep] = useState(1);
    const stepData = steps.find(s => s.stepNumber === currentStep) || steps[0];

    // Step 1 state
    const [conflict, setConflict] = useState('');
    const [perspective, setPerspective] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('');

    // Step 2 state
    const [alternative1, setAlternative1] = useState('');
    const [alternative2, setAlternative2] = useState('');

    // Step 3 state
    const [belief, setBelief] = useState('');
    const [opposite, setOpposite] = useState('');
    const [bothTruths, setBothTruths] = useState('');

    const handleContinue = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSaveEntry = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            step1: {
                conflict,
                perspective,
                selectedTag,
            },
            step2: {
                alternative1,
                alternative2,
            },
            step3: {
                belief,
                opposite,
                bothTruths,
            },
        };
        console.log('Saving all exploring perspectives data:', allData);
        
        // Format alternative views (combine alternative1 and alternative2)
        const alternativeViews = [alternative1, alternative2].filter(v => v.trim()).join(' | ');
        
        // Create entry object
        const entry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            title: conflict || selectedTag || 'Untitled Entry',
            conflict: conflict || '',
            perspective: perspective || '',
            alternativeViews: alternativeViews || undefined,
            belief: belief || undefined,
            opposite: opposite || undefined,
            synthesis: bothTruths || undefined,
        };
        
        // TODO: Save to storage/backend
        console.log('Entry to save:', entry);
        // TODO: Show success message or navigate
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_DialecticalThinkingPerspectiveEntries');
    };

    const getInputValue = (inputId: string) => {
        if (currentStep === 1) {
            if (inputId === 'conflict') return conflict;
            if (inputId === 'perspective') return perspective;
        } else if (currentStep === 2) {
            if (inputId === 'alternative1') return alternative1;
            if (inputId === 'alternative2') return alternative2;
        } else if (currentStep === 3) {
            if (inputId === 'belief') return belief;
            if (inputId === 'opposite') return opposite;
            if (inputId === 'bothTruths') return bothTruths;
        }
        return '';
    };

    const setInputValue = (inputId: string, value: string) => {
        if (currentStep === 1) {
            if (inputId === 'conflict') setConflict(value);
            if (inputId === 'perspective') setPerspective(value);
        } else if (currentStep === 2) {
            if (inputId === 'alternative1') setAlternative1(value);
            if (inputId === 'alternative2') setAlternative2(value);
        } else if (currentStep === 3) {
            if (inputId === 'belief') setBelief(value);
            if (inputId === 'opposite') setOpposite(value);
            if (inputId === 'bothTruths') setBothTruths(value);
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

                {/* Progress Bar */}
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {/* Content Card */}
                    <View
                        className="rounded-2xl mb-4 border"
                        style={{ backgroundColor: colors.white, borderColor: colors.orange_200 }}
                    >
                        <View style={{ backgroundColor: colors.orange_50 }} className='p-4 rounded-t-2xl'>
                            {/* Step Badge and Title */}
                            <View className="flex-row items-center mb-4">
                                <View
                                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                >
                                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                        {stepData.stepBadge.number}
                                    </Text>
                                </View>
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                    {stepData.stepBadge.text}
                                </Text>
                            </View>

                            {/* Instructions */}
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {stepData.instructions}
                            </Text>
                        </View>

                        {/* Input Fields */}
                        {stepData.inputs.map((input) => (
                            <View key={input.id} className="mb-2 p-4">
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                                    {input.label}
                                </Text>


                                <TextInput
                                    value={getInputValue(input.id)}
                                    onChangeText={(text) => setInputValue(input.id, text)}
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
                                            minHeight: 90,
                                            textAlignVertical: 'top',
                                        },
                                    ]}
                                    multiline
                                />
                                {/* Tags for first input of step 1 */}
                                {currentStep === 1 && input.id === 'conflict' && stepData.tags && (
                                    <View className="flex-row flex-wrap mt-3">
                                        {stepData.tags.map((tag) => (
                                            <TagButton
                                                key={tag}
                                                label={tag}
                                                isSelected={selectedTag === tag}
                                                onPress={() => setSelectedTag(tag)}
                                            />
                                        ))}
                                    </View>
                                )}

                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                    {currentStep === 1 ? (
                        <>
                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={handleContinue}
                            >
                                <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                    {stepData.buttons.continue}
                                </Text>
                                <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                    <ArrowRightIcon size={16} color={colors.icon} />
                                </View>
                            </Pressable>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleViewSaved}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.viewSaved}
                                </Text>
                            </Pressable>
                        </>
                    ) : currentStep === 2 ? (
                        <>
                            {/* Back and Continue buttons side by side */}
                            <View className="flex-row gap-3 mb-3">
                                <Pressable
                                    className="min-w-24 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                    onPress={handleBack}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                        {stepData.buttons.back}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={handleContinue}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                        {stepData.buttons.continue}
                                    </Text>
                                    <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                        <ArrowRightIcon size={16} color={colors.icon} />
                                    </View>
                                </Pressable>
                            </View>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleViewSaved}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.viewSaved}
                                </Text>
                            </Pressable>
                        </>
                    ) : (
                        <View className="flex-col">
                            {/* Back and Save Entry buttons side by side */}
                            <View className="flex-row gap-2 mb-3">
                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                    onPress={handleBack}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                        {stepData.buttons.back}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={handleSaveEntry}
                                >
                                    <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                        {stepData.buttons.saveEntry}
                                    </Text>
                                    <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                        <ArrowRightIcon size={16} color={colors.icon} />
                                    </View>
                                </Pressable>
                            </View>

                            <Pressable
                                className="rounded-full py-4 px-3 flex-row items-center justify-center"
                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                onPress={handleViewSaved}
                            >
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                    {stepData.buttons.viewSaved}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

