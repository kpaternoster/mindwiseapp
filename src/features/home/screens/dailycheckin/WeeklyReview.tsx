import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon } from '@components/Utils';
import { PageHeader } from '../../components';
import weeklyReviewData from '../../data/dailycheckin/weeklyReview.json';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

interface WeeklySUDSData {
    day: string;
    level: number;
}

interface EmotionData {
    name: string;
    value: number;
}

interface UrgeData {
    name: string;
    value: number;
}

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 80; // Account for padding
const barWidth = Math.min((chartWidth / 7) - 8, 24); // 7 days, with spacing

export default function WeeklyReviewScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [reflection, setReflection] = useState('');

    // Data from JSON file - in real app, this would come from user's data store
    const weeklySUDS: WeeklySUDSData[] = weeklyReviewData.sampleData.weeklySUDS;
    const topEmotions: EmotionData[] = weeklyReviewData.sampleData.topEmotions;
    const topUrges: UrgeData[] = weeklyReviewData.sampleData.topUrges;
    const mostPracticedSkills = weeklyReviewData.sampleData.mostPracticedSkills;

    const handleSaveReflection = () => {
        console.log('Save reflection:', reflection);
        // Handle save logic
    };

    const renderBarChart = () => {
        const maxLevel = 10;
        const chartHeight = 240;

        return (
            <View style={styles.chartContainer}>
                {weeklySUDS.map((data, index) => (
                    <View key={index} style={styles.barContainer}>
                        <View style={styles.barWrapper}>
                            {/* Background bar (gray outline) */}
                            <View
                                style={[
                                    styles.backgroundBar,
                                    {
                                        height: chartHeight,
                                        width: barWidth,
                                    },
                                ]}
                            />
                            {/* Filled bar (orange) */}
                            <Text style={[t.footnoteBold, { color: colors.Text_Color }]}>
                                {data.level}
                            </Text>
                            <View
                                style={[
                                    styles.filledBar,
                                    {
                                        height: (data.level / maxLevel) * chartHeight,
                                        width: barWidth,
                                        backgroundColor: colors.button_orange,
                                    },
                                ]}
                            >

                            </View>
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary, marginTop: 8 }]}>
                            {data.day}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    const renderProgressBar = (name: string, value: number) => {
        return (
            <View key={name} style={styles.progressBarContainer} className='border border-gray-200 rounded-xl p-4'>
                <View style={styles.progressBarRow}>
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary, flex: 1 }]}>
                        {name}
                    </Text>
                    <Text style={[t.textSemiBold, { color: colors.text_secondary, marginLeft: 8 }]}>
                        {value}
                    </Text>
                </View>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: `${(value / 9) * 100}%`,
                                backgroundColor: colors.button_orange,
                            },
                        ]}
                    />
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 pt-9 bg-white" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <PageHeader title="Weekly Review" />

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Weekly SUDS Levels */}
                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-8">
                    Weekly SUDS Levels
                </Text>
                <View
                    className="p-4 rounded-xl mb-4 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    {renderBarChart()}
                </View>

                {/* Top Emotions */}
                <View
                    className="p-4 pb-1 rounded-xl mb-4 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                        Top Emotions
                    </Text>
                    {topEmotions.map((emotion) => renderProgressBar(emotion.name, emotion.value))}
                </View>

                {/* Top Urges */}
                <View
                    className="p-4 pb-1 rounded-xl mb-4 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                        Top Urges
                    </Text>
                    {topUrges.map((urge) => renderProgressBar(urge.name, urge.value))}
                </View>

                {/* Most Practiced Skills */}
                <View
                    className="p-4 rounded-xl mb-4 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-6">
                        Most Practiced Skills
                    </Text>
                    <View className="flex-row flex-wrap">
                        {mostPracticedSkills.map((skill, index) => (
                            <View
                                key={index}
                                className="px-4 py-2 rounded-full mr-2 mb-2"
                                style={{ backgroundColor: colors.orange_opacity_20 }}
                            >
                                <Text style={[t.textMedium, { color: colors.warm_dark }]}>
                                    {skill}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Weekly Reflection */}
                <View
                    className="p-4 rounded-xl mb-4 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                        Weekly Reflection
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                        What did you learn this week? What were your biggest challenges and wins?
                    </Text>
                    <TextInput
                        className="p-4 rounded-xl"
                        style={[
                            t.textRegular,
                            {
                                borderWidth: 1,
                                borderColor: colors.orange_500,
                                color: colors.Text_Primary,
                                minHeight: 150,
                                textAlignVertical: 'top',
                                backgroundColor: colors.white,
                            },
                        ]}
                        placeholder="Write your weekly reflection here..."
                        placeholderTextColor={colors.text_secondary}
                        multiline
                        value={reflection}
                        onChangeText={setReflection}
                    />
                </View>

                {/* Save Button */}
                <Pressable
                    className="rounded-full py-4 px-6 flex-row justify-center items-center mb-6"
                    style={{ backgroundColor: colors.button_orange }}
                    onPress={handleSaveReflection}
                >
                    <Text
                        style={[t.button, { color: colors.white }]}
                        className="flex-1 text-center"
                    >
                        Save Reflection
                    </Text>
                    <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                        <ArrowRightIcon size={16} color={colors.icon} />
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
    },
    barWrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backgroundBar: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.gray_300,
        borderRadius: 16,
        opacity: 0.3,
    },
    filledBar: {
        borderRadius: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 8,
    },
    progressBarContainer: {
        marginBottom: 16,
    },
    progressBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: colors.gray_200,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
});

