import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { FormInput } from '../components/FormInput';
import { ArrowDownIcon, ArrowRightIcon } from '@components/Utils';
import guidedChainAnalysisData from '../data/guidedChainAnalysis.json';

export default function GuidedChainAnalysisScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, gettingStarted, behavioralChain, sections, buttons } = guidedChainAnalysisData;

    const [problemBehavior, setProblemBehavior] = useState('');
    const [promptingEvent, setPromptingEvent] = useState('');
    const [vulnerabilityFactors, setVulnerabilityFactors] = useState<string[]>(['']);
    const [linksInChain, setLinksInChain] = useState<string[]>(['']);
    const [consequences, setConsequences] = useState<string[]>(['']);

    const handleVulnerabilityFactorChange = (index: number, text: string) => {
        const newFactors = [...vulnerabilityFactors];
        newFactors[index] = text;
        setVulnerabilityFactors(newFactors);
    };

    const handleAddVulnerabilityFactor = () => {
        setVulnerabilityFactors([...vulnerabilityFactors, '']);
    };

    const handleLinkInChainChange = (index: number, text: string) => {
        const newLinks = [...linksInChain];
        newLinks[index] = text;
        setLinksInChain(newLinks);
    };

    const handleAddLinkInChain = () => {
        setLinksInChain([...linksInChain, '']);
    };

    const handleConsequenceChange = (index: number, text: string) => {
        const newConsequences = [...consequences];
        newConsequences[index] = text;
        setConsequences(newConsequences);
    };

    const handleAddConsequence = () => {
        setConsequences([...consequences, '']);
    };

    const handleCompleteAnalysis = () => {
        // TODO: Save analysis to storage/backend
        const analysisData = {
            problemBehavior,
            promptingEvent,
            vulnerabilityFactors: vulnerabilityFactors.filter(f => f.trim() !== ''),
            linksInChain: linksInChain.filter(l => l.trim() !== ''),
            consequences: consequences.filter(c => c.trim() !== ''),
        };
        console.log('Chain Analysis completed:', analysisData);
        dissolveTo('Learn_ChainAnalysisComplete');
    };

    const handleBackToExercises = () => {
        dissolveTo('Learn_ChainAnalysisExercises');
    };

    const problemBehaviorSection = sections.find(s => s.id === 'problemBehavior');
    const promptingEventSection = sections.find(s => s.id === 'promptingEvent');
    const vulnerabilityFactorsSection = sections.find(s => s.id === 'vulnerabilityFactors');
    const linksInChainSection = sections.find(s => s.id === 'linksInChain');
    const consequencesSection = sections.find(s => s.id === 'consequences');

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
                    {/* Getting Started Section */}
                    <View
                        className="rounded-2xl p-4 mb-4"
                        style={{ backgroundColor: colors.cream_40 }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                            {gettingStarted.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                            {gettingStarted.instruction}
                        </Text>
                        {/* Tip Box */}
                        <View
                            className="rounded-xl p-3"
                            style={{ backgroundColor: colors.white, borderColor: colors.orange_150, borderWidth: 1 }}
                        >
                            <Text style={[t.textBold, { color: colors.Text_Primary }]}>
                                {gettingStarted.tip.title}{' '}
                                <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                    {gettingStarted.tip.content}
                                </Text>
                            </Text>
                        </View>
                    </View>

                    {/* Your Behavioral Chain Section */}
                    <View
                        className="rounded-2xl p-4 mb-4 border border-gray-200"
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {behavioralChain.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                            {behavioralChain.subtitle}
                        </Text>
                        {/* Chain Visualization */}
                        <View className="items-center">
                            <View
                                className="rounded-full px-6 py-3  mt-2 mb-2"
                                style={{ backgroundColor: colors.orange_100 }}
                            >
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                    Vulnerability Factors
                                </Text>
                            </View>
                            <ArrowDownIcon size={15} color={colors.icon} />
                            <View
                                className="rounded-full px-6 py-3 mt-2 mb-2"
                                style={{ backgroundColor: colors.orange_200 }}
                            >
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                    Prompting Event
                                </Text>
                            </View>
                            <ArrowDownIcon size={15} color={colors.icon} />
                            <View
                                className="rounded-full px-6 py-3 mb-2 mt-2"
                                style={{ backgroundColor: colors.orange_100 }}
                            >
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                    Links in the Chain
                                </Text>
                            </View>
                            <ArrowDownIcon size={15} color={colors.icon} />
                            <Pressable
                                className="rounded-full px-2 py-3 mt-2 mb-2 flex-row items-center justify-center"
                                style={{ backgroundColor: colors.Button_Orange }}
                            >
                                <Text style={[t.button, { color: colors.white }]} className="ml-2 mr-2">
                                    Add Link
                                </Text>
                                <View className='w-9 h-9 bg-white rounded-full items-center justify-center'>
                                    <Text style={[t.textRegular, { color: colors.icon, fontSize: 24 }]}>+</Text>
                                </View>
                            </Pressable>
                            <ArrowDownIcon size={15} color={colors.icon} />
                            <View
                                className="rounded-full px-6 py-3 mt-2 mb-2"
                                style={{ backgroundColor: colors.orange_200 }}
                            >
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                    Problem Behavior
                                </Text>
                            </View>
                            <ArrowDownIcon size={15} color={colors.icon} />
                            <View
                                className="rounded-full px-6 py-3 mt-2 mb-2"
                                style={{ backgroundColor: colors.orange_100 }}
                            >
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                    Consequences
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Problem Behavior Section */}
                    {problemBehaviorSection && (
                        <View className="mb-6 border border-gray-200 rounded-xl p-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                {problemBehaviorSection.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {problemBehaviorSection.instruction}
                            </Text>
                            <TextInput
                                value={problemBehavior}
                                onChangeText={setProblemBehavior}
                                placeholder={problemBehaviorSection.placeholder}
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
                    )}

                    {/* Prompting Event Section */}
                    {promptingEventSection && (
                        <View className="mb-6 border border-gray-200 rounded-xl p-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                {promptingEventSection.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {promptingEventSection.instruction}
                            </Text>
                            <TextInput
                                value={promptingEvent}
                                onChangeText={setPromptingEvent}
                                placeholder={promptingEventSection.placeholder}
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
                    )}

                    {/* Vulnerability Factors Section */}
                    {vulnerabilityFactorsSection && (
                        <View className="mb-6 border border-gray-200 rounded-xl p-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                {vulnerabilityFactorsSection.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {vulnerabilityFactorsSection.instruction}
                            </Text>
                            {vulnerabilityFactors.map((factor, index) => (
                                <View key={index} className="mb-3 flex-row items-start justify-between gap-2">
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                        #{index + 1}
                                    </Text>
                                    <TextInput
                                        value={factor}
                                        onChangeText={(text) => handleVulnerabilityFactorChange(index, text)}
                                        placeholder={vulnerabilityFactorsSection.placeholder}
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
                                        className='flex-1'
                                        multiline
                                    />
                                </View>
                            ))}
                            <Pressable
                                className="items-center justify-center py-3 rounded-full border-2 flex-row"
                                style={{ borderColor: colors.Button_Orange, backgroundColor: colors.orange_50 }}
                                onPress={handleAddVulnerabilityFactor}
                            >
                                <Text style={[t.textRegular, { color: colors.icon, fontSize: 24 }]}>+</Text>
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]} className="ml-2 mt-1">
                                    {vulnerabilityFactorsSection.addButtonText}
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Links in the Chain Section */}
                    {linksInChainSection && (
                        <View className="mb-6 border border-gray-200 rounded-xl p-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                {linksInChainSection.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {linksInChainSection.instruction}
                            </Text>
                            {linksInChain.map((link, index) => (
                                <View key={index} className="mb-3 flex-row items-start justify-between gap-2">
                                    <View className="flex-row items-center mb-2">
                                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                            #{index + 1}
                                        </Text>
                                    </View>
                                    <TextInput
                                        value={link}
                                        onChangeText={(text) => handleLinkInChainChange(index, text)}
                                        placeholder={linksInChainSection.placeholder}
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
                            <Pressable
                                className="items-center justify-center py-3 rounded-full border-2 flex-row"
                                style={{ borderColor: colors.Button_Orange, backgroundColor: colors.orange_50 }}
                                onPress={handleAddLinkInChain}
                            >
                                <Text style={[t.textRegular, { color: colors.icon, fontSize: 24 }]}>+</Text>
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]} className="ml-2 mt-1">
                                    {linksInChainSection.addButtonText}
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Consequences Section */}
                    {consequencesSection && (
                        <View className="mb-6 border border-gray-200 rounded-xl p-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                {consequencesSection.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {consequencesSection.instruction}
                            </Text>
                            {consequences.map((consequence, index) => (
                                <View key={index} className="mb-3 flex-row items-start justify-between gap-2">
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                        #{index + 1}
                                    </Text>
                                    <TextInput
                                        value={consequence}
                                        onChangeText={(text) => handleConsequenceChange(index, text)}
                                        placeholder={consequencesSection.placeholder}
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
                            <Pressable
                                className="items-center justify-center py-3 rounded-full border-2 flex-row"
                                style={{ borderColor: colors.Button_Orange, backgroundColor: colors.orange_50 }}
                                onPress={handleAddConsequence}
                            >
                                <Text style={[t.textRegular, { color: colors.icon, fontSize: 24 }]}>+</Text>
                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]} className="ml-2 mt-1">
                                    {consequencesSection.addButtonText}
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    {/* Action Buttons */}
                    <Pressable
                        className="rounded-full py-3 px-3 flex-row items-center justify-center mb-4"
                        style={{ backgroundColor: colors.Button_Orange }}
                        onPress={handleCompleteAnalysis}
                    >
                        <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                            {buttons.completeAnalysis}
                        </Text>
                        <View className='w-9 h-9 bg-white rounded-full items-center justify-center'>
                            <ArrowRightIcon size={16} color={colors.icon} />
                        </View>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center mb-4"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleBackToExercises}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.backToExercises}
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

