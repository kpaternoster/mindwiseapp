import React from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { BackIcon, ArrowRightIcon, LightBulbIcon } from '@components/Utils';
import chainAnalysisCompleteData from '../data/chainAnalysisComplete.json';

export default function ChainAnalysisCompleteScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, keyInsights, nextSteps, buttons, description } = chainAnalysisCompleteData;

    const handleReviewAnalysis = () => {
        // TODO: Navigate to review analysis screen or go back to GuidedChainAnalysis
        dissolveTo('Learn_GuidedChainAnalysis');
    };

    const handleBackToExercises = () => {
        dissolveTo('Learn_ChainAnalysisExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Main Content Card */}
                <View
                    className="rounded-2xl p-4 mb-2"
                    style={{ backgroundColor: colors.white, borderColor: colors.stoke_gray, borderWidth: 1 }}
                >
                    {/* Key Insights Section */}
                    <View className="mb-2">
                        <View className="flex-row items-center mb-4">
                            <LightBulbIcon size={17} color={colors.soft_amber} />
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className='ml-4'>
                                {keyInsights.title}
                            </Text>
                        </View>

                        {/* Intervention Points */}
                        <View className="mb-4 p-4 rounded-2xl" style={{backgroundColor: colors.orange_50}}>
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {keyInsights.interventionPoints.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                {keyInsights.interventionPoints.description}
                            </Text>
                            {keyInsights.interventionPoints.points.map((point, index) => (
                                <View key={index} className="mb-2 flex-row">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                        • <Text style={[t.textSemiBold, { color: colors.text_secondary }]}>
                                            {point.label}
                                        </Text> {point.skill}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        {description}
                    </Text>

                    {/* Next Steps Section */}
                    <View
                        className="rounded-xl p-4"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            {nextSteps.title}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            {nextSteps.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View className="px-5 pb-4" style={{ backgroundColor: colors.white }}>
                <Pressable
                    className="rounded-full py-3 px-3 flex-row items-center justify-center mb-3"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleReviewAnalysis}
                >
                    <View className='w-9 h-9 bg-white rounded-full items-center justify-center border-2' 
                        style={{borderColor: colors.stroke_orange}}
                    >
                        <BackIcon size={24} color={colors.icon} />
                    </View>
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]} className="ml-2 flex-1 text-center">
                        {buttons.reviewAnalysis}
                    </Text>
                </Pressable>

                <Pressable
                    className="rounded-full py-4 px-3 flex-row items-center justify-center"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleBackToExercises}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        {buttons.backToExercises}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

