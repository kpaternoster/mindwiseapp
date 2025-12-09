import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { TagButton } from '../components/TagButton';
import { UpIcon, DownIcon, CloseIcon, ArrowRightIcon } from '@components/Utils';
import problemSolvingExerciseData from '../data/problemSolvingExercise.json';

export default function ProblemSolvingExerciseScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = problemSolvingExerciseData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        stateProblem: true,
        observeOptions: false,
        prosCons: false,
        verifySolution: false,
        execute: false,
        reflect: false,
    });

    // State the Problem
    const [problem, setProblem] = useState('');
    const [selectedProblemOption, setSelectedProblemOption] = useState<string>('');

    // Observe Options
    const [options, setOptions] = useState<string[]>(['', '', '']);

    // Pros and Cons
    const [pros, setPros] = useState<string[]>(['', '']);
    const [cons, setCons] = useState<string[]>(['', '']);

    // Verify Solution
    const [chosenSolution, setChosenSolution] = useState('');
    const [whyBestChoice, setWhyBestChoice] = useState('');

    // Execute
    const [implementation, setImplementation] = useState('');
    const [specificSteps, setSpecificSteps] = useState('');

    // Reflection
    const [reflection, setReflection] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleProblemOptionPress = (option: string) => {
        setSelectedProblemOption(option);
        setProblem(option);
    };

    const handleOptionChange = (index: number, text: string) => {
        const newOptions = [...options];
        newOptions[index] = text;
        setOptions(newOptions);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length > 1) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleProChange = (index: number, text: string) => {
        const newPros = [...pros];
        newPros[index] = text;
        setPros(newPros);
    };

    const handleAddPro = () => {
        setPros([...pros, '']);
    };

    const handleConChange = (index: number, text: string) => {
        const newCons = [...cons];
        newCons[index] = text;
        setCons(newCons);
    };

    const handleAddCon = () => {
        setCons([...cons, '']);
    };

    const handleSaveEntry = () => {
        // TODO: Save all data to storage/backend
        const allData = {
            problem,
            options: options.filter(o => o.trim() !== ''),
            pros: pros.filter(p => p.trim() !== ''),
            cons: cons.filter(c => c.trim() !== ''),
            chosenSolution,
            whyBestChoice,
            implementation,
            specificSteps,
            reflection,
        };
        console.log('Saving Problem Solving data:', allData);
        // TODO: Show success message or navigate
    };

    const handleClearForm = () => {
        setProblem('');
        setSelectedProblemOption('');
        setOptions(['', '', '']);
        setPros(['', '']);
        setCons(['', '']);
        setChosenSolution('');
        setWhyBestChoice('');
        setImplementation('');
        setSpecificSteps('');
        setReflection('');
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_ProblemSolvingEntries');
    };

    const handleBack = () => {
        dissolveTo('Learn_ProblemSolving');
    };

    const stateProblemSection = sections.find(s => s.id === 'stateProblem');
    const observeOptionsSection = sections.find(s => s.id === 'observeOptions');
    const prosConsSection = sections.find(s => s.id === 'prosCons');
    const verifySolutionSection = sections.find(s => s.id === 'verifySolution');
    const executeSection = sections.find(s => s.id === 'execute');
    const reflectSection = sections.find(s => s.id === 'reflect');

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
                    <IntroCard
                        title={intro.title}
                        text={intro.description}
                    />

                    {/* State the Problem Section */}
                    {stateProblemSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.stateProblem ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('stateProblem')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {stateProblemSection.title}
                                        </Text>
                                        {expandedSections.stateProblem ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {stateProblemSection.description}
                                    </Text>
                                </View>
                            </Pressable>

                            {expandedSections.stateProblem && (
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
                                        {stateProblemSection.question}
                                    </Text>
                                    
                                    {/* Example */}
                                    <View className="mb-4 p-3 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                            {stateProblemSection.example}
                                        </Text>
                                    </View>

                                    {/* Problem Options */}
                                    {stateProblemSection.problemOptions && (
                                        <View className="flex-row flex-wrap mb-4">
                                            {stateProblemSection.problemOptions.map((option) => (
                                                <TagButton
                                                    key={option}
                                                    label={option}
                                                    isSelected={selectedProblemOption === option}
                                                    onPress={() => handleProblemOptionPress(option)}
                                                />
                                            ))}
                                        </View>
                                    )}

                                    {/* Problem Input */}
                                    <TextInput
                                        value={problem}
                                        onChangeText={setProblem}
                                        placeholder="Describe your problem clearly..."
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

                    {/* Observe Options Section */}
                    {observeOptionsSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.observeOptions ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('observeOptions')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {observeOptionsSection.title}
                                        </Text>
                                        {expandedSections.observeOptions ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {observeOptionsSection.description}
                                    </Text>
                                </View>
                            </Pressable>

                            {expandedSections.observeOptions && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    {options.map((option, index) => (
                                        <View key={index} className="mb-3 flex-row items-start">
                                            <TextInput
                                                value={option}
                                                onChangeText={(text) => handleOptionChange(index, text)}
                                                placeholder={`Option ${index + 1}: e.g., Delegate tasks, Request extension, Prioritize deadlines`}
                                                placeholderTextColor={colors.text_secondary}
                                                style={[
                                                    t.textRegular,
                                                    {
                                                        flex: 1,
                                                        color: colors.Text_Primary,
                                                        backgroundColor: colors.white,
                                                        borderColor: colors.stoke_gray,
                                                        borderWidth: 1,
                                                        borderRadius: 12,
                                                        padding: 12,
                                                        minHeight: 80,
                                                        textAlignVertical: 'top',
                                                    },
                                                ]}
                                            />
                                            {options.length > 1 && (
                                                <Pressable
                                                    onPress={() => handleRemoveOption(index)}
                                                    className="ml-2 border rounded-xl p-1"
                                                    style={{ borderColor: colors.stoke_gray, borderWidth: 1 }}
                                                >
                                                    <CloseIcon size={18} color={colors.warm_dark} />
                                                </Pressable>
                                            )}
                                        </View>
                                    ))}
                                    <Pressable
                                        onPress={handleAddOption}
                                        className="flex-row items-center justify-center py-3 rounded-xl"
                                        // style={{ borderColor: colors.Button_Orange, borderWidth: 1, borderStyle: 'dashed' }}
                                    >
                                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                            + Add Another Option
                                        </Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Pros and Cons Section */}
                    {prosConsSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.prosCons ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('prosCons')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {prosConsSection.title}
                                        </Text>
                                        {expandedSections.prosCons ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {prosConsSection.description}
                                    </Text>
                                </View>
                            </Pressable>

                            {expandedSections.prosCons && (
                                <View
                                    className="rounded-b-2xl px-4 py-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderTopWidth: 0,
                                    }}
                                >
                                    <View className="flex-row gap-3">
                                        {/* Pros Column */}
                                        <View className="flex-1">
                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                                Pros
                                            </Text>
                                            {pros.map((pro, index) => (
                                                <TextInput
                                                    key={index}
                                                    value={pro}
                                                    onChangeText={(text) => handleProChange(index, text)}
                                                    placeholder={`Pro ${index + 1}`}
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
                                                            marginBottom: 8,
                                                        },
                                                    ]}
                                                />
                                            ))}
                                            <Pressable
                                                onPress={handleAddPro}
                                                className="py-2 rounded-xl items-center"
                                                // style={{ borderColor: colors.Button_Orange, borderWidth: 1, borderStyle: 'dashed' }}
                                            >
                                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                                    + Add Pro
                                                </Text>
                                            </Pressable>
                                        </View>

                                        {/* Cons Column */}
                                        <View className="flex-1">
                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                                Cons
                                            </Text>
                                            {cons.map((con, index) => (
                                                <TextInput
                                                    key={index}
                                                    value={con}
                                                    onChangeText={(text) => handleConChange(index, text)}
                                                    placeholder={`Con ${index + 1}`}
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
                                                            marginBottom: 8,
                                                        },
                                                    ]}
                                                />
                                            ))}
                                            <Pressable
                                                onPress={handleAddCon}
                                                className="py-2 rounded-xl items-center"
                                                // style={{ borderColor: colors.Button_Orange, borderWidth: 1, borderStyle: 'dashed' }}
                                            >
                                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                                    + Add Con
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Verify Solution Section */}
                    {verifySolutionSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.verifySolution ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('verifySolution')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {verifySolutionSection.title}
                                        </Text>
                                        {expandedSections.verifySolution ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {verifySolutionSection.description}
                                    </Text>
                                </View>
                            </Pressable>

                            {expandedSections.verifySolution && (
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
                                        {verifySolutionSection.questions?.[0]}
                                    </Text>
                                    <TextInput
                                        value={chosenSolution}
                                        onChangeText={setChosenSolution}
                                        placeholder={verifySolutionSection.placeholders?.[0]}
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
                                                marginBottom: 16,
                                            },
                                        ]}
                                        multiline
                                    />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {verifySolutionSection.questions?.[1]}
                                    </Text>
                                    <TextInput
                                        value={whyBestChoice}
                                        onChangeText={setWhyBestChoice}
                                        placeholder={verifySolutionSection.placeholders?.[1]}
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

                    {/* Execute Section */}
                    {executeSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.execute ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('execute')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {executeSection.title}
                                        </Text>
                                        {expandedSections.execute ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {executeSection.description}
                                    </Text>
                                </View>
                            </Pressable>

                            {expandedSections.execute && (
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
                                        {executeSection.questions?.[0]}
                                    </Text>
                                    <TextInput
                                        value={implementation}
                                        onChangeText={setImplementation}
                                        placeholder={executeSection.placeholders?.[0]}
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
                                                marginBottom: 16,
                                            },
                                        ]}
                                        multiline
                                    />

                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        {executeSection.questions?.[1]}
                                    </Text>
                                    <TextInput
                                        value={specificSteps}
                                        onChangeText={setSpecificSteps}
                                        placeholder={executeSection.placeholders?.[1]}
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
                                                marginBottom: 16,
                                            },
                                        ]}
                                        multiline
                                    />

                                    {/* Action Tags */}
                                    {executeSection.actionTags && (
                                        <View className="flex-row flex-wrap">
                                            {executeSection.actionTags.map((tag) => (
                                                <TagButton
                                                    key={tag}
                                                    label={tag}
                                                    isSelected={false}
                                                    onPress={() => {}}
                                                />
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    )}

                    {/* Reflection Section */}
                    {reflectSection && (
                        <View className="mb-4">
                            <Pressable
                                className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.reflect ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                style={{ backgroundColor: colors.orange_50 }}
                                onPress={() => toggleSection('reflect')}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {reflectSection.title}
                                        </Text>
                                        {expandedSections.reflect ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {reflectSection.description}
                                    </Text>
                                </View>
                            </Pressable>

                            {expandedSections.reflect && (
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
                                        {reflectSection.question}
                                    </Text>
                                    <TextInput
                                        value={reflection}
                                        onChangeText={setReflection}
                                        placeholder={reflectSection.placeholder}
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
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                    {/* Back and Save Entry buttons side by side */}
                    <View className="flex-row gap-3 mb-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleBack}
                        >
                            <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                {buttons.back}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSaveEntry}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                {buttons.saveEntry}
                            </Text>
                            <View className="w-9 h-9 bg-white rounded-full items-center justify-center">
                                <ArrowRightIcon size={16} color={colors.icon} />
                            </View>
                        </Pressable>
                    </View>

                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center mb-3"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleClearForm}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.clearForm}
                        </Text>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-3 flex-row items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleViewSaved}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            {buttons.viewSaved}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

