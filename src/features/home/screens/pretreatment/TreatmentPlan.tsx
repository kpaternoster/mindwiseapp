import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, BackIcon, LeafIcon} from '@components/Utils';
import { PageHeader } from '../../components';
import treatmentPlanData from '../../data/pretreatment/treatmentPlan.json';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { fetchTreatmentPlan, TreatmentPlan, fetchPreTreatmentState, updatePreTreatmentState, PreTreatmentState } from '../../api/treatment';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

interface TreatmentTarget {
    id: string;
    title: string;
    subtitle: string;
    goals: string[];
    priorities: string[];
    skills: string[];
}

export default function TreatmentPlanScreen() {
    const [showGenerationInfo, setShowGenerationInfo] = useState(false);
    const { dissolveTo } = useDissolveNavigation();
    const [treatmentTargets, setTreatmentTargets] = useState<TreatmentTarget[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [preTreatmentState, setPreTreatmentState] = useState<PreTreatmentState | null>(null);
    const [hasUpdatedSteps, setHasUpdatedSteps] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const [expandedSections, setExpandedSections] = useState<{
        [key: string]: {
            goals: boolean;
            priorities: boolean;
            skills: boolean;
        };
    }>({
        '30-days': { goals: true, priorities: false, skills: false },
        '60-days': { goals: true, priorities: false, skills: false },
        '180-days': { goals: true, priorities: false, skills: false },
    });

    useEffect(() => {
        const loadTreatmentPlan = async () => {
            try {
                setIsLoading(true);
                const plan: TreatmentPlan = await fetchTreatmentPlan();
                console.log(plan)
                
                // Transform API response to match UI structure
                const transformedTargets: TreatmentTarget[] = plan.map((section) => {
                    const id = `${section.numberOfDays}-days`;
                    const title = `Next ${section.numberOfDays} Days`;
                    
                    // Extract goals from subsections with type "goal"
                    const goals: string[] = [];
                    section.subsections.forEach((subsection) => {
                        if (subsection.type === 'goal') {
                            goals.push(...subsection.items);
                        }
                    });
                    
                    return {
                        id,
                        title,
                        subtitle: section.objective,
                        goals,
                        priorities: [], // Not in API response
                        skills: [], // Not in API response
                    };
                });
                
                setTreatmentTargets(transformedTargets);
            } catch (error) {
                console.error('Error loading treatment plan:', error);
                // Fallback to empty array or show error
            } finally {
                setIsLoading(false);
            }
        };

        const loadPreTreatmentState = async () => {
            try {
                const state = await fetchPreTreatmentState();
                setPreTreatmentState(state);
            } catch (error) {
                console.error('Error loading pre-treatment state:', error);
            }
        };

        loadTreatmentPlan();
        loadPreTreatmentState();
    }, []);

    const toggleSection = (targetId: string, section: 'goals' | 'priorities' | 'skills') => {
        setExpandedSections((prev) => ({
            ...prev,
            [targetId]: {
                ...prev[targetId],
                [section]: !prev[targetId]?.[section],
            },
        }));
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isCloseToBottom && !hasUpdatedSteps && preTreatmentState) {
            setHasUpdatedSteps(true);
            updateStepsCompleted();
        }
    };

    const updateStepsCompleted = async () => {
        if (!preTreatmentState) return;

        try {
            const newStepsCompleted = Math.min(preTreatmentState.stepsCompleted + 1, 4);
            const updatedState: PreTreatmentState = {
                ...preTreatmentState,
                stepsCompleted: newStepsCompleted,
            };
            
            await updatePreTreatmentState(updatedState);
            setPreTreatmentState(updatedState);
        } catch (error) {
            console.error('Error updating steps completed:', error);
            setHasUpdatedSteps(false); // Reset flag to allow retry
        }
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <PageHeader title="Your Treatment Plan" />

            {/* Main Content */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            ) : (
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                {/* Introduction */}
                <View className="flex-row items-start mb-6">
                    <LeafIcon size={20} />
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-4 flex-1">
                        Based on your assessment, here's your tailored DBT skills learning path.
                    </Text>
                </View>

                {/* Important Clinical Information */}
                <View
                    className="p-4 rounded-xl mb-6 border border-width-1 border-gray-200"
                >
                    <Text style={[t.title16SemiBold, { color: colors.muted_coral }]} className="mb-3">
                        {treatmentPlanData.clinicalInfo.title}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        {treatmentPlanData.clinicalInfo.description}
                    </Text>
                    <Pressable
                        className="flex-row items-center"
                        onPress={() => setShowGenerationInfo(!showGenerationInfo)}
                    >
                        <Text style={[t.button, { color: colors.warm_dark }]} className='mr-3'>
                            Show how this plan was generated
                        </Text>
                        <ArrowRightIcon size={16} color={colors.warm_dark} />
                    </Pressable>

                    {showGenerationInfo && (
                        <View className="mt-4 p-3 rounded-lg" style={{ backgroundColor: colors.white }}>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                This plan was created based on your responses in the Treatment Assessment and Strengths & Resources forms. We analyzed your distress level, life situation, selected goals, triggers, and support system to recommend the most relevant DBT skills for your journey.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Your Treatment Targets */}
                <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                    Your Treatment Targets
                </Text>

                {/* Treatment Target Cards */}
                {treatmentTargets.map((target) => (
                    <View
                        key={target.id}
                        className="rounded-xl mb-4"
                        style={{ backgroundColor: colors.white }}
                    >
                        <View style={{ backgroundColor: colors.orange_50 }} className='p-4 rounded-t-xl'>
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                                {target.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {target.subtitle}
                            </Text>
                        </View>

                        <View className='rounded-b-xl border-gray-200 p-4 bg-white border border-width-1 border-gray-200'
                            style={{ borderTopWidth: 0 }}
                        >
                            {/* Goals */}
                            <View
                                className="rounded-xl mb-3 border border-width-1 border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Pressable
                                    className="flex-row items-center justify-between p-4"
                                    onPress={() => toggleSection(target.id, 'goals')}
                                >
                                    <View className="flex-row items-center flex-1">
                                        <View
                                            className="w-2 h-2 rounded-full mr-2"
                                            style={{ backgroundColor: colors.orange_500 }}
                                        />
                                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                            {target.id === '30-days' ? '30-day goal:' :
                                                target.id === '60-days' ? '60-day goal:' : '180-day goal:'}
                                        </Text>
                                    </View>
                                    {/* {expandedSections[target.id]?.goals ? (
                                        <DownIcon size={12} color={colors.text_secondary} />
                                    ) : (
                                        <UpIcon size={12} color={colors.text_secondary} />
                                    )} */}
                                </Pressable>
                                {expandedSections[target.id]?.goals && (
                                    <View className='px-4 pb-4'>
                                        {target.goals.map((goal, index) => (
                                            <View key={index} className="flex-row mb-1 ml-4">
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                    •
                                                </Text>
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                                    {goal}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* Priorities */}
                            <View
                                className="rounded-xl mb-3 border border-width-1 border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Pressable
                                    className="flex-row items-center justify-between p-4"
                                    onPress={() => toggleSection(target.id, 'priorities')}
                                >
                                    <View className="flex-row items-center flex-1">
                                        <View
                                            className="w-2 h-2 rounded-full mr-2"
                                            style={{ backgroundColor: colors.orange_500 }}
                                        />
                                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                            {target.id === '30-days' ? '30-day Priorities:' :
                                                target.id === '60-days' ? '60-day Priorities:' : '180-day Priorities:'}
                                        </Text>
                                    </View>
                                    {/* {expandedSections[target.id]?.priorities ? (
                                        <DownIcon size={12} color={colors.text_secondary} />
                                    ) : (
                                        <UpIcon size={12} color={colors.text_secondary} />
                                    )} */}
                                </Pressable>
                                {expandedSections[target.id]?.priorities && (
                                    <View className='px-4 pb-4'>
                                        {target.priorities.map((priority, index) => (
                                            <View key={index} className="flex-row mb-1 ml-4">
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                    •
                                                </Text>
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                                    {priority}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* DBT Skills Focus */}
                            <View
                                className="rounded-xl border border-width-1 border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Pressable
                                    className="flex-row items-center justify-between p-4"
                                    onPress={() => toggleSection(target.id, 'skills')}
                                >
                                    <View className="flex-row items-center flex-1">
                                        <View
                                            className="w-2 h-2 rounded-full mr-2"
                                            style={{ backgroundColor: colors.orange_500 }}
                                        />
                                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                            DBT Skills Focus:
                                        </Text>
                                    </View>
                                    {/* {expandedSections[target.id]?.skills ? (
                                        <DownIcon size={12} color={colors.text_secondary} />
                                    ) : (
                                        <UpIcon size={12} color={colors.text_secondary} />
                                    )} */}
                                </Pressable>
                                {expandedSections[target.id]?.skills && (
                                    <View className='px-4 pb-4'>
                                        {target.skills.map((skill, index) => (
                                            <View key={index} className="flex-row mb-1 ml-4">
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                                    •
                                                </Text>
                                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                                    {skill}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                ))}

                {/* Ready to Begin Section */}
                <View
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <View className="flex-row items-center mb-3">
                        <LeafIcon size={20} color={colors.green}/>
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-4">
                            {treatmentPlanData.readyToBegin.title}
                        </Text>
                    </View>

                    <View className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.white }}>
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-4">
                            {treatmentPlanData.readyToBegin.intro}
                        </Text>
                        <Text style={[t.textMedium, { color: colors.text_secondary }]}>
                            {treatmentPlanData.readyToBegin.support}
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <Pressable
                        className="rounded-full py-4 px-6 flex-row justify-center items-center mb-3"
                        style={{ backgroundColor: colors.button_orange }}
                        onPress={() => dissolveTo("Learn")}
                    >
                        <Text
                            style={[t.button, { color: colors.white }]}
                            className="flex-1 text-center"
                        >
                            Start Learning Skills
                        </Text>
                        <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                            <ArrowRightIcon size={16} color={colors.Text_Primary} />
                        </View>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-6 items-center mb-3"
                        style={{
                            borderWidth: 2,
                            borderColor: colors.orange_500,
                        }}
                        onPress={() => dissolveTo('Act')}
                    >
                        <Text style={[t.button, { color: colors.Text_Primary }]}>
                            Address Specific Challenge
                        </Text>
                    </Pressable>

                    <Pressable
                        className="flex-row justify-center items-center py-2"
                        onPress={() => dissolveTo('PreTreatment')}
                    >
                        <View className='w-9 h-9 justify-center items-center'>
                            <BackIcon size={28} color={colors.warm_dark} />
                        </View>
                      
                        <Text style={[t.button, { color: colors.warm_dark, marginLeft: 8 }]} className='flex-1 text-center'>
                            Go back to Pre-Treatment
                        </Text>
                        <View className='w-9 h-9 justify-center items-center'>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
});

