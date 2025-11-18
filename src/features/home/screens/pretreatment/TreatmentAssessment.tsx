import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    Modal,
    StatusBar,
} from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, UpIcon, NoteBookIcon, WarningFillIcon, DownIcon, BackIcon, CircleWarningIcon } from '@components/Utils';
import { PageHeader } from '../../components';
import { DistressSlider } from '../../components/DistressSlider';
import { RadioGroup } from '../../components/RadioGroup';
import treatmentData from '../../data/pretreatment/treatmentAssessment.json';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

function TreatmentAssessmentContent() {
    const { dissolveTo } = useDissolveNavigation();
    const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
    const scrollViewRef = useRef<ScrollView>(null);
    const otherGoalsLayoutRef = useRef<{ y: number; height: number } | null>(null);

    // Animated style that adjusts margin bottom based on keyboard height
    const animatedStyle = useAnimatedStyle(() => ({
        // ensure non-negative just in case
        paddingBottom: Math.max(keyboardHeight.value, 0),
    }));

    // State management
    const [distressLevel, setDistressLevel] = useState(5);
    const [housing, setHousing] = useState('stable');
    const [work, setWork] = useState('stable');
    const [food, setFood] = useState('enough');
    const [healthcare, setHealthcare] = useState('regular');
    const [emotionalExperiences, setEmotionalExperiences] = useState('sad_depressed');
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
    const [expandedSections, setExpandedSections] = useState({
        distress: true,
        lifeSituation: false,
        emotionalExperiences: false,
        behavioralPatterns: false,
        relationshipsSelfConcept: false,
        traumaStress: false,
        categories: false,
        safety: false,
        other: false,
    });
    const [selectedSafety, setSelectedSafety] = useState<string[]>([]);
    const [hasOtherGoals, setHasOtherGoals] = useState(false);
    const [otherGoalsText, setOtherGoalsText] = useState('');
    const [showNoGoalsModal, setShowNoGoalsModal] = useState(false);
    const [behavioralGoals, setBehavioralGoals] = useState('stop_substances_for_emotions');
    const [relationshipGoals, setRelationshipGoals] = useState('improve_relationships');
    const [traumaRelatedGoals, setTraumaRelatedGoals] = useState('reduce_unwanted_memories');

    const checkIfGoalsSelected = () => {
        // Check if any goals are selected
        const hasExpandedCategories = Object.values(expandedCategories).some(val => val);
        const hasSafetySelected = selectedSafety.length > 0;
        const hasOtherGoalsSelected = hasOtherGoals && otherGoalsText.trim() !== '';

        return hasExpandedCategories || hasSafetySelected || hasOtherGoalsSelected;
    };

    const handleSeeTreatmentPlan = () => {
        if (!checkIfGoalsSelected()) {
            setShowNoGoalsModal(true);
            return;
        }
        dissolveTo('TreatmentPlan');
    };

    const handleSeeDemoPlan = () => {
       
        // Navigate to demo treatment plan
        setShowNoGoalsModal(false);
    };

    const toggleCategory = (id: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleSafety = (value: string) => {
        setSelectedSafety((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleOtherGoalsLayout = (event: any) => {
        const { y, height } = event.nativeEvent.layout;
        otherGoalsLayoutRef.current = { y, height };
    };

    const handleOtherGoalsFocus = () => {
        if (!expandedSections.other) {
            toggleSection('other');
        }

        requestAnimationFrame(() => {
            setTimeout(() => {
                if (otherGoalsLayoutRef.current) {
                    const targetY = Math.max(0, otherGoalsLayoutRef.current.y - 80);
                    scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
                } else {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }
            }, 250);
        });
    };

    return (
        <Animated.View
            className="flex-1 bg-white pt-9"
            style={[{ backgroundColor: colors.white, flex: 1 }, animatedStyle]}
        >
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <PageHeader title="Treatment Assessment" />

            {/* Main Content */}
            <ScrollView
                ref={scrollViewRef}
                className="flex-1 px-6 mb-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 24 }]}
                keyboardShouldPersistTaps="handled"
            >
                {/* Introduction Card */}
                <View
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <View className="flex-row items-center mb-2">
                        <NoteBookIcon size={18} color={colors.Text_Primary} />
                        <Text
                            style={[t.title16SemiBold, { color: colors.Text_Primary }]}
                            className="ml-4"
                        >
                            What do you want to work on?
                        </Text>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Choose as many or as few as apply. If nothing applies, use the 'Other' section at the bottom.
                    </Text>
                </View>

                {/* Current Distress Level */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable className="flex-col p-4 rounded-t-xl" onPress={() => toggleSection('distress')} style={{ backgroundColor: expandedSections.distress ? colors.orange_100 : colors.white }}>
                        <View className="flex-row items-center justify-between ">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Current Distress Level
                            </Text>
                            {
                                expandedSections.distress ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                How distressed or overwhelmed are you feeling right now?
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.distress && (
                        <View className="px-4 pb-4">
                            <DistressSlider
                                value={distressLevel}
                                onValueChange={setDistressLevel}
                            />
                        </View>
                    )}
                </View>

                {/* Life Situation */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable className="flex-col p-4 rounded-t-xl" onPress={() => toggleSection('lifeSituation')} style={{ backgroundColor: expandedSections.lifeSituation ? colors.orange_100 : colors.white }}>
                        <View className="flex-row items-center justify-between ">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Life Situation
                            </Text>
                            {
                                expandedSections.lifeSituation ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Help us recommend the most practical skills for your situation.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.lifeSituation && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            {/* Housing */}
                            <View className="mt-4">
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2">
                                    Housing situation:
                                </Text>
                                <RadioGroup
                                    options={treatmentData.lifeSituation.housing}
                                    selected={housing}
                                    onSelect={setHousing}
                                />
                            </View>

                            <View style={styles.divider} />

                            {/* Work/Income */}
                            <View className="">
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2">
                                    Work/income situation:
                                </Text>
                                <RadioGroup
                                    options={treatmentData.lifeSituation.work}
                                    selected={work}
                                    onSelect={setWork}
                                />
                            </View>

                            <View style={styles.divider} />

                            {/* Food Access */}
                            <View className="">
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2">
                                    Access to food (past month):
                                </Text>
                                <RadioGroup
                                    options={treatmentData.lifeSituation.food}
                                    selected={food}
                                    onSelect={setFood}
                                />
                            </View>

                            <View style={styles.divider} />

                            {/* Healthcare */}
                            <View>
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2">
                                    Healthcare access:
                                </Text>
                                <RadioGroup
                                    options={treatmentData.lifeSituation.healthcare}
                                    selected={healthcare}
                                    onSelect={setHealthcare}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Emotional experience */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable className="flex-col p-4 rounded-t-xl" onPress={() => toggleSection('emotionalExperiences')} style={{ backgroundColor: expandedSections.emotionalExperiences ? colors.orange_100 : colors.white }}>
                        <View className="flex-row items-center justify-between ">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Emotional Experiences
                            </Text>
                            {
                                expandedSections.emotionalExperiences ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Managing and understanding your feelings.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.emotionalExperiences && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2">

                            </Text>
                            <RadioGroup
                                options={treatmentData.emotionalExperiences}
                                selected={emotionalExperiences}
                                onSelect={setEmotionalExperiences}
                            />
                        </View>
                    )}
                </View>

                {/* Behavioral Patterns */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable className="flex-col p-4 rounded-t-xl" onPress={() => toggleSection('behavioralPatterns')} style={{ backgroundColor: expandedSections.behavioralPatterns ? colors.orange_100 : colors.white }}>
                        <View className="flex-row items-center justify-between ">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Behavioral Patterns
                            </Text>
                            {
                                expandedSections.behavioralPatterns ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Changing unhelpful actions and habits.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.behavioralPatterns && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2"> </Text>
                            <RadioGroup
                                options={treatmentData.behavioralGoals}
                                selected={behavioralGoals}
                                onSelect={setBehavioralGoals}
                            />
                        </View>
                    )}
                </View>

                {/* Relationships & Self-Concept */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1"
                >
                    <Pressable className="flex-col p-4 rounded-t-xl" onPress={() => toggleSection('relationshipsSelfConcept')} style={{ backgroundColor: expandedSections.relationshipsSelfConcept ? colors.orange_100 : colors.white }}>
                        <View className="flex-row items-center justify-between ">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Relationships & Self-Concept
                            </Text>
                            {
                                expandedSections.relationshipsSelfConcept ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Building healthier connections with others and yourself.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.relationshipsSelfConcept && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2"> </Text>
                            <RadioGroup
                                options={treatmentData.relationshipGoals}
                                selected={relationshipGoals}
                                onSelect={setRelationshipGoals}
                            />
                        </View>
                    )}
                </View>

                {/* Trauma & Stress */}
                <View
                    className="rounded-xl mb-4 border border-gray-200 pb-1 pb-1"
                >
                    <Pressable className="flex-col p-4 rounded-t-xl" onPress={() => toggleSection('traumaStress')} style={{ backgroundColor: expandedSections.traumaStress ? colors.orange_100 : colors.white }}>
                        <View className="flex-row items-center justify-between ">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Trauma & Stress
                            </Text>
                            {
                                expandedSections.traumaStress ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <View className="mt-4">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Coping with past events and current stressors.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.traumaStress && (
                        <View className="px-4 pb-4 bg-white rounded-b-xl">
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2"> </Text>
                            <RadioGroup
                                options={treatmentData.traumaRelatedGoals}
                                selected={traumaRelatedGoals}
                                onSelect={setTraumaRelatedGoals}
                            />
                        </View>
                    )}
                </View>




                {/* Safety & Crisis Behaviors */}
                <View
                    className="rounded-xl mb-4 border border-gray-200"
                >
                    <Pressable
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.safety ? '' : 'rounded-b-xl'}`}
                        onPress={() => toggleSection('safety')}
                        style={{ backgroundColor: expandedSections.safety ? colors.red_250 : colors.white }}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Safety & Crisis Behaviors
                            </Text>
                            {
                                expandedSections.safety ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <Text style={[t.textRegular, { color: colors.muted_coral }]} className="mt-2 mb-4">
                            Addressing immediate risks and crisis situations.
                        </Text>
                        <View className="flex-row items-center">
                            <WarningFillIcon size={16} color={colors.brown} />
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="ml-2">
                                Important: Please review these items carefully.
                            </Text>
                        </View>
                    </Pressable>
                    {expandedSections.safety && (
                        <View className="px-4 pb-4" style={{ backgroundColor: colors.red_50 }}>
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2 mt-4">
                                Healthcare access:
                            </Text>
                            {treatmentData.safetyBehaviors.map((behavior) => (
                                <Pressable
                                    key={behavior.value}
                                    className="flex-row items-center py-3"
                                    onPress={() => toggleSafety(behavior.value)}
                                >
                                    <View
                                        className="w-5 h-5 rounded-full border-2 items-center justify-center mr-3"
                                        style={{
                                            borderColor: selectedSafety.includes(behavior.value)
                                                ? colors.orange_500
                                                : colors.stroke_orange,
                                        }}
                                    >
                                        {selectedSafety.includes(behavior.value) && (
                                            <View
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: colors.orange_500 }}
                                            />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                        {behavior.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>

                {/* Other Goals */}
                <View
                    className="rounded-xl mb-32 border border-gray-200"
                >
                    <Pressable
                        className={`flex-col p-4 rounded-t-xl ${expandedSections.other ? '' : 'rounded-b-xl'}`}
                        style={{ backgroundColor: colors.orange_50 }}
                        onPress={() => toggleSection('other')}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Other Goals
                            </Text>
                            {
                                expandedSections.other ? <DownIcon size={12} color={colors.text_secondary} /> : <UpIcon size={12} color={colors.text_secondary} />
                            }
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-2">
                            Describe any other goals or concerns not listed above.
                        </Text>
                    </Pressable>
                    {expandedSections.other && (
                        <View className="px-4 pb-4 rounded-b-xl" style={{ backgroundColor: colors.white }}>
                            <Pressable
                                className="flex-row items-center py-3 mt-4"
                                onPress={() => setHasOtherGoals(!hasOtherGoals)}
                            >
                                <View
                                    className="w-5 h-5 rounded-full border-2 items-center justify-center mr-3"
                                    style={{
                                        borderColor: hasOtherGoals ? colors.orange_500 : colors.stroke_orange,
                                    }}
                                >
                                    {hasOtherGoals && (
                                        <View
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: colors.orange_500 }}
                                        />
                                    )}
                                </View>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    I have other goals or concerns.
                                </Text>
                            </Pressable>

                            <View onLayout={handleOtherGoalsLayout}>
                                <TextInput
                                    className="p-3 rounded-lg mt-2"
                                    style={[
                                        t.textRegular,
                                        {
                                            borderWidth: 1,
                                            borderColor: colors.stroke_orange,
                                            color: colors.text_secondary,
                                            minHeight: 100,
                                            textAlignVertical: 'top',
                                        },
                                    ]}
                                    placeholder="Please describe your goals or concerns, or areas you'd like to work on..."
                                    placeholderTextColor={colors.text_secondary}
                                    multiline
                                    value={otherGoalsText}
                                    onChangeText={setOtherGoalsText}
                                    onFocus={handleOtherGoalsFocus}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                <View className="mt-4">
                    <Pressable
                        className="rounded-full py-4 px-6 flex-row justify-center items-center mb-3"
                        style={{ backgroundColor: colors.button_orange }}
                        onPress={() => dissolveTo('StrengthsResources')}
                    >
                        <Text
                            style={[t.title16SemiBold, { color: colors.white }]}
                            className="flex-1 text-center"
                        >
                            Next: Strengths & Resources
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

            {/* No Goals Selected Modal */}
            <Modal
                visible={showNoGoalsModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowNoGoalsModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Warning Icon */}
                        <View style={styles.iconContainer}>
                            <CircleWarningIcon size={26} color={colors.muted_coral} />
                        </View>

                        {/* Title */}
                        <Text style={[t.title24SemiBold, { color: colors.Text_Primary, textAlign: 'center', marginBottom: 12 }]}>
                            No Goals Selected
                        </Text>

                        {/* Description */}
                        <Text style={[t.textRegular, { color: colors.text_secondary, textAlign: 'center', marginBottom: 20 }]}>
                            You haven't selected any goals yet. {"\n"} Would you like to see a demo treatment plan with sample goals?
                        </Text>

                        {/* Info Box */}
                        <View style={styles.infoBox}>
                            <View style={styles.bulletPoint}>
                                <View style={styles.bullet} />
                                <Text style={[t.textRegular, { color: colors.Text_Primary, flex: 1 }]}>
                                    Demo plan will use sample mental health goals
                                </Text>
                            </View>
                            <View style={styles.bulletPoint}>
                                <View style={styles.bullet} />
                                <Text style={[t.textRegular, { color: colors.Text_Primary, flex: 1 }]}>
                                    You can return anytime to fill out your own goals
                                </Text>
                            </View>
                            <View style={styles.bulletPoint}>
                                <View style={styles.bullet} />
                                <Text style={[t.textRegular, { color: colors.Text_Primary, flex: 1 }]}>
                                    Your personalized plan will be more accurate
                                </Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <Pressable
                            style={styles.primaryButton}
                            onPress={handleSeeDemoPlan}
                        >
                            <Text style={[t.button, { color: colors.white }]} className='flex-1 text-center'>
                                See Demo Plan
                            </Text>
                            <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                <ArrowRightIcon size={16} color={colors.Text_Primary} />
                            </View>
                        </Pressable>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={() => setShowNoGoalsModal(false)}
                        >
                            <BackIcon size={24} color={colors.warm_dark} />
                            <Text style={[t.textMedium, { color: colors.warm_dark, marginLeft: 8 }]} className='flex-1 text-center'>
                                Go Back & Fill Out Goals
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
}

export default function TreatmentAssessmentScreen() {
    return <TreatmentAssessmentContent />;
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: colors.gray_200,
        marginVertical: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    iconContainer: {
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: '#FFE4E1',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    infoBox: {
        backgroundColor: colors.orange_100,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    bulletPoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.text_secondary,
        marginTop: 6,
        marginRight: 12,
    },
    primaryButton: {
        backgroundColor: colors.button_orange,
        borderRadius: 36,
        paddingVertical: 10,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    secondaryButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
});

