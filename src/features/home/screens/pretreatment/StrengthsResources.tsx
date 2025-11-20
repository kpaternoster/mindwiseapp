import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, NoteBookIcon, UpIcon, DownIcon } from '@components/Utils';
import { PageHeader } from '../../components';
import { RadioGroup } from '../../components/RadioGroup';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

export default function StrengthsResourcesScreen() {
    const navigation = useNavigation<NavigationProp>();
    // State management
    const [currentStrength, setCurrentStrength] = useState('exercise');
    const [mainTrigger, setMainTrigger] = useState('relationships');
    const [supportSystem, setSupportSystem] = useState('family');
    const [therapyExperience, setTherapyExperience] = useState('new');
    const [additionalNotes, setAdditionalNotes] = useState('');
    
    const [expandedSections, setExpandedSections] = useState({
        strengths: true,
        triggers: false,
        support: false,
        therapy: false,
        notes: false,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Data for radio groups
    const strengthsOptions = [
        { value: 'exercise', label: 'Exercise or movement' },
        { value: 'breathing', label: 'Breathing exercises or meditation' },
        { value: 'creative', label: 'Creative outlets (art, music, writing)' },
        { value: 'journaling', label: 'Journaling' },
        { value: 'support', label: 'Support from others' },
        { value: 'none', label: 'None of these currently' },
    ];

    const triggersOptions = [
        { value: 'relationships', label: 'Relationship conflicts' },
        { value: 'work', label: 'Work or school stress' },
        { value: 'criticism', label: 'Being criticized or rejected' },
        { value: 'overwhelmed', label: 'Feeling overwhelmed' },
        { value: 'alone', label: 'Being alone' },
        { value: 'trauma', label: 'Past trauma memories' },
        { value: 'other', label: 'Other situations' },
    ];

    const supportOptions = [
        { value: 'family', label: 'Family members' },
        { value: 'friends', label: 'Friends' },
        { value: 'partner', label: 'Partner/spouse' },
        { value: 'therapist', label: 'Therapist or counselor' },
        { value: 'group', label: 'Support group' },
        { value: 'none', label: 'No reliable support currently' },
    ];

    const therapyOptions = [
        { value: 'new', label: 'New to therapy' },
        { value: 'current', label: 'Currently in therapy' },
        { value: 'previous', label: 'Previous therapy experience' },
        { value: 'dbt', label: 'Familiar with DBT skills' },
    ];

    const handleBuildCommitmentPlan = () => {
        navigation.navigate('BuildingCommitment');
    };

    const handleSeeTreatmentPlan = () => {
        navigation.navigate('TreatmentPlan');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                
                {/* Header */}
                <PageHeader title="Strengths & Resources" />

                {/* Main Content */}
                <ScrollView
                    className="flex-1 px-6 mb-10"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                {/* Introduction Card */}
                <View
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <View className="flex-row items-center mb-2">
                        <Text
                            style={[t.title16SemiBold, { color: colors.Text_Primary }]}
                            className=""
                        >
                            What are your strengths and resources?
                        </Text>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Help us understand what's already working for you and what support you have available.
                    </Text>
                </View>

                {/* Current Strengths */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable 
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.strengths ? '' : 'rounded-b-xl'}`}
                        onPress={() => toggleSection('strengths')} 
                        style={{ backgroundColor: expandedSections.strengths ? colors.orange_100 : colors.white }}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Current Strengths
                            </Text>
                            {expandedSections.strengths ? 
                                <DownIcon size={12} color={colors.text_secondary} /> : 
                                <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Positive coping skills you already use.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.strengths && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <View className="mt-4">
                                <RadioGroup
                                    options={strengthsOptions}
                                    selected={currentStrength}
                                    onSelect={setCurrentStrength}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Main Triggers */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable 
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.triggers ? '' : 'rounded-b-xl'}`}
                        onPress={() => toggleSection('triggers')} 
                        style={{ backgroundColor: expandedSections.triggers ? colors.orange_100 : colors.white }}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Main Triggers
                            </Text>
                            {expandedSections.triggers ? 
                                <DownIcon size={12} color={colors.text_secondary} /> : 
                                <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                What tends to cause you the most distress?
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.triggers && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <View className="mt-4">
                                <RadioGroup
                                    options={triggersOptions}
                                    selected={mainTrigger}
                                    onSelect={setMainTrigger}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Support System */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable 
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.support ? '' : 'rounded-b-xl'}`}
                        onPress={() => toggleSection('support')} 
                        style={{ backgroundColor: expandedSections.support ? colors.orange_100 : colors.white }}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Support System
                            </Text>
                            {expandedSections.support ? 
                                <DownIcon size={12} color={colors.text_secondary} /> : 
                                <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Who can you rely on for support?
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.support && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <View className="mt-4">
                                <RadioGroup
                                    options={supportOptions}
                                    selected={supportSystem}
                                    onSelect={setSupportSystem}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Therapy Experience */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable 
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.therapy ? '' : 'rounded-b-xl'}`}
                        onPress={() => toggleSection('therapy')} 
                        style={{ backgroundColor: expandedSections.therapy ? colors.orange_100 : colors.white }}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Therapy Experience
                            </Text>
                            {expandedSections.therapy ? 
                                <DownIcon size={12} color={colors.text_secondary} /> : 
                                <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Your experience with therapy and DBT.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.therapy && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <View className="mt-4">
                                <RadioGroup
                                    options={therapyOptions}
                                    selected={therapyExperience}
                                    onSelect={setTherapyExperience}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Additional Notes */}
                <View
                    className="rounded-xl mb-10 border border-gray-200"
                >
                    <Pressable
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.notes ? '' : 'rounded-b-xl'}`}
                        style={{ backgroundColor: colors.orange_50 }}
                        onPress={() => toggleSection('notes')}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Additional Notes
                            </Text>
                            {expandedSections.notes ? 
                                <DownIcon size={12} color={colors.text_secondary} /> : 
                                <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-2">
                            Anything else you'd like us to know about your strengths, challenges, or situation?
                        </Text>
                    </Pressable>
                    {expandedSections.notes && (
                        <View className="px-4 pb-4 rounded-b-xl" style={{ backgroundColor: colors.white }}>
                            <TextInput
                                className="p-3 rounded-lg mt-4"
                                style={[
                                    t.textRegular,
                                    {
                                        borderWidth: 1,
                                        borderColor: colors.stroke_orange,
                                        color: colors.text_secondary,
                                        minHeight: 120,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                placeholder="Share any additional information that might help us create a better treatment plan for you..."
                                placeholderTextColor={colors.text_secondary}
                                multiline
                                value={additionalNotes}
                                onChangeText={setAdditionalNotes}
                            />
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                <View className="mt-4">
                    <Pressable
                        className="rounded-full py-4 px-6 flex-row justify-center items-center mb-3"
                        style={{ backgroundColor: colors.button_orange }}
                        onPress={handleBuildCommitmentPlan}
                    >
                        <Text
                            style={[t.title16SemiBold, { color: colors.white }]}
                            className="flex-1 text-center"
                        >
                            Build Commitment Plan
                        </Text>
                        <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                            <ArrowRightIcon size={16} color={colors.Text_Primary} />
                        </View>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-6 items-center"
                        style={{
                            borderWidth: 1,
                            borderColor: colors.orange_500,
                            backgroundColor: colors.white,
                        }}
                        onPress={handleSeeTreatmentPlan}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                            See Treatment Plan
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
        flexGrow: 1,
    },
});

