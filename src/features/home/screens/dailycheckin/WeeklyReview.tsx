import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    StatusBar,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon } from '@components/Utils';
import { PageHeader } from '../../components';
import { fetchWeeklyReview, updateWeeklyReview } from '@features/home/api';
import { formatDateToISO, getDayName } from '../../utils/dateHelper';

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
    const [reflection, setReflection] = useState('');
    const [weeklySUDS, setWeeklySUDS] = useState<WeeklySUDSData[]>([]);
    const [topEmotions, setTopEmotions] = useState<EmotionData[]>([]);
    const [topUrges, setTopUrges] = useState<UrgeData[]>([]);
    const [mostPracticedSkills, setMostPracticedSkills] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadWeeklyReview = async () => {
            try {
                setIsLoading(true);
                const todayIso = formatDateToISO(new Date());
                const data = await fetchWeeklyReview(todayIso);
                // Transform dailyDistress to WeeklySUDSData format
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const transformedSUDS: WeeklySUDSData[] = data.dailyDistress.map((value, index) => {
                    // Calculate the date for this index (7 days ending with today)
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - index));
                    const dayName = dayNames[date.getDay()];
                    
                    return {
                        day: dayName,
                        level: value ?? 0,
                    };
                });
                setWeeklySUDS(transformedSUDS);

                // Transform topEmotions - convert camelCase to Title Case
                const formatKeyToName = (key: string): string => {
                    return key
                        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                        .trim();
                };

                const transformedEmotions: EmotionData[] = data.topEmotions.map((emotion) => ({
                    name: formatKeyToName(emotion.key),
                    value: Math.round(emotion.average * 10) / 10, // Round to 1 decimal place
                }));
                setTopEmotions(transformedEmotions);

                // Transform topUrges
                const transformedUrges: UrgeData[] = data.topUrges.map((urge) => ({
                    name: formatKeyToName(urge.key),
                    value: Math.round(urge.average * 10) / 10, // Round to 1 decimal place
                }));
                setTopUrges(transformedUrges);

                // Set most practiced skills
                setMostPracticedSkills(data.mostPracticedSkills);

                // Set reflection
                setReflection(data.reflection || '');
            } catch (error) {
                console.error('Error loading weekly review:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadWeeklyReview();
    }, []);

    const handleSaveReflection = async () => {
        if (!reflection.trim()) {
            return;
        }

        try {
            setIsSaving(true);
            const todayIso = formatDateToISO(new Date());
            await updateWeeklyReview(todayIso, { reflection });
        } catch (error) {
            console.error('Error saving reflection:', error);
        } finally {
            setIsSaving(false);
        }
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
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            ) : (
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
                        className="p-4 pt-8 rounded-xl mb-4 border border-gray-200"
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
                        style={{ 
                            backgroundColor: isSaving ? colors.text_disabled : colors.button_orange,
                            opacity: isSaving ? 0.6 : 1,
                        }}
                        onPress={handleSaveReflection}
                        disabled={isSaving}
                    >
                        <Text
                            style={[t.button, { color: colors.white }]}
                            className="flex-1 text-center"
                        >
                            {isSaving ? 'Saving...' : 'Save Reflection'}
                        </Text>
                        {!isSaving && (
                            <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                <ArrowRightIcon size={16} color={colors.icon} />
                            </View>
                        )}
                    </Pressable>
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
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginTop: 24,
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

