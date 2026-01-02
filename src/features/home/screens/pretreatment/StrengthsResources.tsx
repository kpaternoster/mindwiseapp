import React, { useState, useEffect } from 'react';
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
import { fetchStrengthsAndResources, updateStrengthsAndResources, StrengthsAndResources } from '../../api/treatment';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

export default function StrengthsResourcesScreen() {
    const navigation = useNavigation<NavigationProp>();
    // State management - multiple selections
    const [currentStrengths, setCurrentStrengths] = useState<{ [key: string]: boolean }>({
        exercise: false,
        meditation: false,
        creativeOutlets: false,
        journaling: false,
        supportFromOthers: false,
    });
    const [mainTriggers, setMainTriggers] = useState<{ [key: string]: boolean }>({
        relationshipConflicts: false,
        workOrSchool: false,
        rejection: false,
        feelingOverwhelmed: false,
        beingAlone: false,
        pastTrauma: false,
        other: false,
    });
    const [supportSystem, setSupportSystem] = useState<{ [key: string]: boolean }>({
        family: false,
        friends: false,
        partner: false,
        therapist: false,
        supportGroup: false,
    });
    const [therapyExperience, setTherapyExperience] = useState('none');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
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

    // Data for checkboxes and radio groups
    const strengthsOptions = [
        { value: 'exercise', label: 'Exercise or movement' },
        { value: 'meditation', label: 'Breathing exercises or meditation' },
        { value: 'creativeOutlets', label: 'Creative outlets (art, music, writing)' },
        { value: 'journaling', label: 'Journaling' },
        { value: 'supportFromOthers', label: 'Support from others' },
    ];

    const triggersOptions = [
        { value: 'relationshipConflicts', label: 'Relationship conflicts' },
        { value: 'workOrSchool', label: 'Work or school stress' },
        { value: 'rejection', label: 'Being criticized or rejected' },
        { value: 'feelingOverwhelmed', label: 'Feeling overwhelmed' },
        { value: 'beingAlone', label: 'Being alone' },
        { value: 'pastTrauma', label: 'Past trauma memories' },
        { value: 'other', label: 'Other situations' },
    ];

    const supportOptions = [
        { value: 'family', label: 'Family members' },
        { value: 'friends', label: 'Friends' },
        { value: 'partner', label: 'Partner/spouse' },
        { value: 'therapist', label: 'Therapist or counselor' },
        { value: 'supportGroup', label: 'Support group' },
    ];

    const therapyOptions = [
        { value: 'none', label: 'New to therapy' },
        { value: 'currentlyInTherapy', label: 'Currently in therapy' },
        { value: 'previousExperience', label: 'Previous therapy experience' },
        { value: 'familiarWithDBTSkills', label: 'Familiar with DBT skills' },
    ];

    const toggleStrength = (value: string) => {
        setCurrentStrengths((prev) => ({
            ...prev,
            [value]: !prev[value],
        }));
    };

    const toggleTrigger = (value: string) => {
        setMainTriggers((prev) => ({
            ...prev,
            [value]: !prev[value],
        }));
    };

    const toggleSupport = (value: string) => {
        setSupportSystem((prev) => ({
            ...prev,
            [value]: !prev[value],
        }));
    };

    // Map API response to component state
    const mapApiToComponentState = (data: StrengthsAndResources) => {
        setCurrentStrengths({ ...data.currentStrengths } as { [key: string]: boolean });
        setMainTriggers({ ...data.mainTriggers } as { [key: string]: boolean });
        setSupportSystem({ ...data.supportSystem } as { [key: string]: boolean });
        setTherapyExperience(data.therapyExperience);
        setAdditionalNotes(data.notes);
    };

    // Map component state to API format
    const mapComponentStateToApi = (): StrengthsAndResources => {
        return {
            currentStrengths: currentStrengths as any,
            mainTriggers: mainTriggers as any,
            supportSystem: supportSystem as any,
            therapyExperience,
            notes: additionalNotes,
        };
    };

    // Initialize data from API
    useEffect(() => {
        const initializeData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchStrengthsAndResources();
                mapApiToComponentState(data);
                setIsInitialized(true);
            } catch (error) {
                console.error('Error fetching strengths and resources:', error);
                // Continue with default values if API fails
                setIsInitialized(true);
            } finally {
                setIsLoading(false);
            }
        };

        initializeData();
    }, []);

    const handleBuildCommitmentPlan = async () => {
        try {
            setIsLoading(true);
            const data = mapComponentStateToApi();
            await updateStrengthsAndResources(data);
            navigation.navigate('BuildingCommitment');
        } catch (error) {
            console.error('Error updating strengths and resources:', error);
            // Still navigate even if API call fails
            navigation.navigate('BuildingCommitment');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSeeTreatmentPlan = async () => {
        try {
            setIsLoading(true);
            const data = mapComponentStateToApi();
            await updateStrengthsAndResources(data);
            navigation.navigate('TreatmentPlan');
        } catch (error) {
            console.error('Error updating strengths and resources:', error);
            // Still navigate even if API call fails
            navigation.navigate('TreatmentPlan');
        } finally {
            setIsLoading(false);
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
                                {strengthsOptions.map((option) => (
                                    <Pressable
                                        key={option.value}
                                        className="flex-row items-center py-3"
                                        onPress={() => toggleStrength(option.value)}
                                    >
                                        <View
                                            className="w-5 h-5 rounded-full border-2 items-center justify-center mr-3"
                                            style={{
                                                borderColor: currentStrengths[option.value]
                                                    ? colors.orange_500
                                                    : colors.stroke_orange,
                                            }}
                                        >
                                            {currentStrengths[option.value] && (
                                                <View
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: colors.orange_500 }}
                                                />
                                            )}
                                        </View>
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                ))}
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
                                {triggersOptions.map((option) => (
                                    <Pressable
                                        key={option.value}
                                        className="flex-row items-center py-3"
                                        onPress={() => toggleTrigger(option.value)}
                                    >
                                        <View
                                            className="w-5 h-5 rounded-full border-2 items-center justify-center mr-3"
                                            style={{
                                                borderColor: mainTriggers[option.value]
                                                    ? colors.orange_500
                                                    : colors.stroke_orange,
                                            }}
                                        >
                                            {mainTriggers[option.value] && (
                                                <View
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: colors.orange_500 }}
                                                />
                                            )}
                                        </View>
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                ))}
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
                                {supportOptions.map((option) => (
                                    <Pressable
                                        key={option.value}
                                        className="flex-row items-center py-3"
                                        onPress={() => toggleSupport(option.value)}
                                    >
                                        <View
                                            className="w-5 h-5 rounded-full border-2 items-center justify-center mr-3"
                                            style={{
                                                borderColor: supportSystem[option.value]
                                                    ? colors.orange_500
                                                    : colors.stroke_orange,
                                            }}
                                        >
                                            {supportSystem[option.value] && (
                                                <View
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: colors.orange_500 }}
                                                />
                                            )}
                                        </View>
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                ))}
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

