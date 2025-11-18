import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { HomePage } from '@components/HomePage';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import { ArrowRightIcon, VideoIcon } from '@components/Utils';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import preTreatmentData from '../../data/pretreatment/preTreatment.json';

interface Step {
    id: number;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
}

const STEPS_DATA: Step[] = preTreatmentData.steps;

export default function PreTreatmentScreen() {
    const [steps] = useState<Step[]>(STEPS_DATA);
    const [completedSteps, setCompletedSteps] = useState(0);
    const totalSteps = steps.length;
    const { dissolveTo } = useDissolveNavigation();

    // Calculate completed steps
    useEffect(() => {
        const completed = steps.filter(step => step.completed).length;
        setCompletedSteps(completed);
    }, [steps]);

    // Calculate progress percentage
    const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    const progressWidth = `${progressPercentage}%` as `${number}%`;

    // Calculate indicator position (assuming progress bar width, adjust as needed)
    const indicatorLeftPosition = (progressPercentage === 0 ? 0 : `${progressPercentage}%`) as `${number}%` | 0;

    const handleStepPress = (stepId: number) => {
        switch (stepId) {
            case 1:
                dissolveTo('DBTOverview');
                break;
            case 2:
                dissolveTo('TreatmentAssessment');
                break;
            case 3:
                dissolveTo("BuildingCommitment");
                break;
            case 4:
                dissolveTo("TreatmentPlan");
                break;
            default:
                console.log('Step pressed:', stepId);
                break;
        }
    };

    return (
        <HomePage>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            {/* Header */}
            <View className="flex-row justify-between items-start px-5 pt-9 pb-4">
                    <View className="flex-1">
                        <Text style={[t.title32SemiBold, { color: colors.Text_Primary }]} className='mb-1'>
                            Pre Treatment
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            Prepare for your Mindwise DBT journey
                        </Text>
                    </View>
                    <Image
                        source={images.leaf_big}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            <ScrollView className="flex-1 bg-white pt-4 pb-4 px-2 mb-12" showsVerticalScrollIndicator={false}>
                
                {/* Your Progress Card */}
                <View className="mx-5 mb-4 p-4 rounded-2xl" style={{ backgroundColor: colors.orange_50 }}>
                    <View className="flex-row justify-between items-center">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className='mb-2'>
                            Your Progress
                        </Text>
                        <Text style={[t.title24SemiBold, { color: colors.orange_500 }]}>
                            {progressPercentage}%
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-center mb-3">
                        <Text style={[t.textMedium, { color: colors.text_secondary }]}>
                            {completedSteps} of {totalSteps} steps completed
                        </Text>
                        <View className="items-end">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>Complete</Text>
                        </View>
                    </View>
                    <View className="h-1.5 bg-white rounded mb-2">
                        <View
                            className="h-full rounded absolute left-0"
                            style={{ width: progressWidth, backgroundColor: colors.orange }}
                        />
                        {/* Progress Indicator Dot */}
                        <View
                            className="absolute -top-1 -ml-1.5"
                            style={{
                                left: indicatorLeftPosition,
                            }}
                        >
                            <View
                                className="w-3.5 h-3.5 rounded-full border-2"
                                style={{
                                    backgroundColor: colors.orange,
                                    borderColor: colors.white,
                                }}
                            />
                        </View>
                    </View>
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                        Complete all steps to begin your DBT modules
                    </Text>
                </View>

                {/* Welcome Card */}
                <View className="mx-5 mb-6 p-4 rounded-2xl" style={{ backgroundColor: colors.orange }}>
                    <View className='flex-row items-center mb-3'>
                        <View className='w-12 h-12 bg-white rounded-full justify-center items-center mr-3'>
                            <Image
                                source={images.leaf}
                                style={styles.logo_small}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[t.title16SemiBold, { color: colors.white }]}>
                            Welcome to Mindwise DBT
                        </Text>
                    </View>

                    <Text style={[t.textRegular, { color: colors.white_80 }]}>
                        Before we begin your DBT journey, let's take some time to understand what DBT is,
                        assess your needs, and create a personalized plan for your healing.
                    </Text>
                </View>

                {/* Getting Started Section */}
                <View className="flex-row justify-between items-start px-5 pb-4">
                    <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className='mt-5 mb-4'>
                        Getting Started
                    </Text>
                </View>

                {/* App Tutorial Card */}
                <View className="mx-5 mb-3 p-4 rounded-2xl" style={{ backgroundColor: colors.orange_50 }}>
                    <View className="flex-row mb-2">
                        <View className="w-6 h-6 justify-center items-center mr-3">
                            <VideoIcon size={20} />

                        </View>
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className='mb-1'>
                            App Tutorial
                        </Text>
                    </View>
                    <View className="flex-1 mb-3">
                        <Text style={[t.textSmall, { color: colors.text_secondary }]} className='mb-2'>
                            Learn how to use every feature
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            Take an interactive, step-by-step tour to master all Mindwise DBT features
                            and get the most out of your journey.
                        </Text>
                    </View>
                    <Pressable
                        className="rounded-full py-4 px-6 flex-row justify-center items-center"
                        style={{ backgroundColor: colors.button_orange }}
                        onPress={() => {dissolveTo('TutorialIntro')}}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.white }]} className='flex-1 text-center'>
                            Start Interactive Tutorial
                        </Text>
                        <View className='w-9 h-9 justify-center items-center bg-white rounded-full'>
                            <ArrowRightIcon size={18} color={colors.warm_dark} />
                        </View>
                    </Pressable>
                </View>

                {/* Steps List */}
                {steps.map((step) => (
                    <Pressable
                        key={step.id}
                        className="bg-white mx-5 mb-3 p-4 rounded-2xl shadow-sm border-gray-200 border"
                        onPress={() => handleStepPress(step.id)}
                    >
                        <View className="self-start px-3 py-1 rounded-xl mb-3" style={{ backgroundColor: colors.orange_opacity_10 }}>
                            <Text style={[t.footnoteBold, { color: colors.orange_600 }]}>
                                Step {step.id}
                            </Text>
                        </View>
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className='mb-2'>
                            {step.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-3'>
                            {step.description}
                        </Text>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.orange_300 }} />
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                    {step.duration}
                                </Text>
                            </View>
                            {step.completed && (
                                <View className="px-3 py-1 rounded-xl" style={{ backgroundColor: colors.green_50 }}>
                                    <Text style={[t.textSmall, { color: colors.green_500 }]}>✓ Completed</Text>
                                </View>
                            )}
                        </View>
                    </Pressable>
                ))}

                {/* Important Notice Card */}
                <View className="bg-gray-100 mx-5 mt-3 p-4 rounded-2xl shadow-sm border-gray-200 border mb-20">
                    <View className="flex-row items-center mb-2">
                        <View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.orange_500 }} />
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>Important Notice</Text>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                        Mindwise DBT is designed to supplement, not replace, professional therapy.
                        If you're in crisis or having thoughts of self-harm, please seek immediate
                        professional help.
                    </Text>
                    <Pressable className="flex-row items-center" onPress={() => {dissolveTo('Help')}}>
                        <Text style={[t.title16SemiBold, { color: colors.warm_dark }]} className='mr-4'>
                            Crisis
                        </Text>
                        <ArrowRightIcon size={16} color={colors.Text_Primary} />
                    </Pressable>
                </View>

                <View className="h-24" />
            </ScrollView>
        </HomePage>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 35,
        height: 55,
    },
    logo_small: {
        width: 20,
        height: 30
    }
});