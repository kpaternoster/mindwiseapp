import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    StatusBar,
    Platform,
    ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, CalendarBlankIcon, CheckIcon, CloseIcon, DownIcon } from '@components/Utils';
import { PageHeader, RatingSlider } from '../../components';
import { getCurrentDate, formatDate, formatDateToISO } from '../../utils/dateHelper';
import todayCheckInData from '../../data/dailycheckin/todayCheckIn.json';
import dailyPlanData from '../../data/dailycheckin/dailyPlan.json';
import { fetchDiaryEntry, updateDiaryEntry, DiaryEntryRequest } from '@features/home/api';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';


interface EmotionRatings {
    [key: string]: number;
}

interface UrgeRatings {
    [key: string]: number;
}

const buildInitialEmotionRatings = (): EmotionRatings => {
    const initial: EmotionRatings = {};
    todayCheckInData.emotions.forEach((emotion) => {
        initial[emotion.id] = 0;
    });
    return initial;
};

const buildInitialUrgeRatings = (): UrgeRatings => {
    const initial: UrgeRatings = {};
    todayCheckInData.urges.forEach((urge) => {
        initial[urge.id] = 0;
    });
    return initial;
};

const normalizeUrgeKey = (key: string) => {
    if (key === 'lieOrDeceive') {
        return 'lieDeceive';
    }
    return key;
};

const mergeRatings = (
    defaults: Record<string, number>,
    apiRatings?: Record<string, number>,
    keyNormalizer: (key: string) => string = (key) => key
) => {
    const merged = { ...defaults };
    if (apiRatings) {
        Object.entries(apiRatings).forEach(([key, value]) => {
            const normalizedKey = keyNormalizer(key);
            if (normalizedKey in merged) {
                merged[normalizedKey] = value;
            }
        });
    }
    return merged;
};

export default function TodayCheckInScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeTab, setActiveTab] = useState<'check-in' | 'daily-plan'>('check-in');
    const [date, setDate] = useState(getCurrentDate());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [distressLevel, setDistressLevel] = useState(0);
    const [safetyRating, setSafetyRating] = useState(0);

    // Initialize all emotions to 0 (only runs once)
    const [emotionRatings, setEmotionRatings] = useState<EmotionRatings>(() => buildInitialEmotionRatings());

    // Initialize all urges to 0 (only runs once)
    const [urgeRatings, setUrgeRatings] = useState<UrgeRatings>(() => buildInitialUrgeRatings());

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    const [selectedHelpArea, setSelectedHelpArea] = useState<string>('');
    const [showHelpAreasDropdown, setShowHelpAreasDropdown] = useState(false);
    const [notes, setNotes] = useState('');
    const [loadingDiaryEntry, setLoadingDiaryEntry] = useState(false);

    const handleEmotionChange = (emotionId: string, value: number) => {
        setEmotionRatings((prev) => ({
            ...prev,
            [emotionId]: value,
        }));
    };


    const handleUrgeChange = (urgeId: string, value: number) => {
        setUrgeRatings((prev) => ({
            ...prev,
            [urgeId]: value,
        }));
    };

    const toggleSkillSelection = (skill: string) => {
        setSelectedSkills((prev) => {
            if (prev.includes(skill)) {
                return prev.filter((s) => s !== skill);
            } else {
                return [...prev, skill];
            }
        });
    };

    const removeSkill = (skill: string) => {
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    };

    const selectHelpArea = (helpArea: string) => {
        setSelectedHelpArea(helpArea);
        setShowHelpAreasDropdown(false);
    };

    const handleSave = async () => {
        try {
            const isoDate = formatDateToISO(selectedDate);

            const payload: DiaryEntryRequest = {
                distress: distressLevel,
                safety: safetyRating,
                emotions: emotionRatings,
                urges: urgeRatings,
                skillsUsed: selectedSkills,
                needHelpWith: selectedHelpArea ? [selectedHelpArea] : [],
                notes,
            };

            await updateDiaryEntry(isoDate, payload);

            // dissolveTo('DailyCheckIn');
            setActiveTab('daily-plan')

        } catch (error) {
            console.error('Error saving diary entry:', error);
        }
    };

    const loadDiaryEntry = useCallback(async (dateToLoad: Date) => {
        try {
            setLoadingDiaryEntry(true);
            const isoDate = formatDateToISO(dateToLoad);
            const entry = await fetchDiaryEntry(isoDate);

            setDistressLevel(entry?.distress ?? 0);
            setSafetyRating(entry?.safety ?? 0);
            setEmotionRatings(() => mergeRatings(buildInitialEmotionRatings(), entry?.emotions));
            setUrgeRatings(() => mergeRatings(buildInitialUrgeRatings(), entry?.urges));
            setSelectedSkills(entry?.skillsUsed ?? []);
            setSelectedHelpArea(entry?.needHelpWith?.[0] ?? '');
            setNotes(entry?.notes ?? '');
        } catch (error) {
            console.error('Error fetching diary entry:', error);
        } finally {
            setLoadingDiaryEntry(false);
        }
    }, []);

    useEffect(() => {
        loadDiaryEntry(selectedDate);
    }, [loadDiaryEntry]);

    // Scroll to top when tab changes
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [activeTab]);

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
        setDate(formatDate(currentDate));
        loadDiaryEntry(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View className="flex-1 pt-9 bg-white" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <PageHeader title="Daily Check-In" />

            {/* Main Content */}
            {loadingDiaryEntry ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            ) : (
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-6 mb-10"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Today's Focus */}
                    <View
                        className="p-4 rounded-2xl mb-4"
                        style={{ backgroundColor: colors.gray_100 }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Today's Focus
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            Complete your daily diary card to track patterns and earn leaves for your growth tree.
                        </Text>
                    </View>

                    {/* Tab Selector */}
                    <View className="flex-row mb-4 border border-gray-200 rounded-full">
                        <Pressable
                            className="flex-1 py-3 mr-2 rounded-full items-center"
                            style={{
                                backgroundColor: activeTab === 'check-in' ? colors.orange_medium : colors.white,
                            }}
                            onPress={() => setActiveTab('check-in')}
                        >
                            <Text
                                style={[
                                    t.button,
                                    {
                                        color: activeTab === 'check-in' ? colors.white : colors.text_secondary,
                                    },
                                ]}
                            >
                                Check-In
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 py-3 ml-2 rounded-full items-center"
                            style={{
                                backgroundColor: activeTab === 'daily-plan' ? colors.orange_medium : colors.white,
                            }}
                            onPress={() => setActiveTab('daily-plan')}
                        >
                            <Text
                                style={[
                                    t.button,
                                    {
                                        color: activeTab === 'daily-plan' ? colors.white : colors.text_secondary,
                                    },
                                ]}
                            >
                                Daily Plan
                            </Text>
                        </Pressable>
                    </View>

                    {/* Check-In Tab Content */}
                    {activeTab === 'check-in' && (
                        <>
                            {/* Today's Date */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    Today's Date
                                </Text>
                                <Pressable onPress={showDatepicker}>
                                    <View
                                        className="flex-row items-center p-3 py-5 rounded-full"
                                        style={{
                                            borderWidth: 1,
                                            borderColor: colors.gray_300,
                                        }}
                                        pointerEvents="none"
                                    >
                                        <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                            {date}
                                        </Text>
                                        <CalendarBlankIcon size={20} color={colors.warm_dark} />
                                    </View>
                                </Pressable>
                            </View>

                            {/* Distress Level */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Distress Level
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                                    SUDS (Subjective Units of Distress Scale): Rate your overall distress level right now
                                </Text>
                                <View className="flex-row items-center justify-between mt-3">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        Overall distress 0 - 10
                                    </Text>
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                        Current: {distressLevel}
                                    </Text>
                                </View>
                                <RatingSlider
                                    label=""
                                    value={distressLevel}
                                    onValueChange={setDistressLevel}
                                    minLabel="No distress"
                                    maxLabel="Extreme distress"
                                    showCurrentValue={false}
                                />
                            </View>

                            {/* Safety Rating */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Safety Rating
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                                    How safe do you feel right now? 0 = completely safe, 10 = very unsafe
                                </Text>
                                <View className="flex-row items-center justify-between">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        Safety level 0 - 10
                                    </Text>
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                        Current: {safetyRating}
                                    </Text>
                                </View>
                                <RatingSlider
                                    label=""
                                    value={safetyRating}
                                    onValueChange={setSafetyRating}
                                    minLabel="Completely Safe"
                                    maxLabel="Very unsafe"
                                    showCurrentValue={false}
                                />
                            </View>

                            {/* Emotions */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Emotions
                                </Text>
                                <View className="flex-row items-center justify-between mb-4">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        Rate the intensity of emotions you experienced today
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-between mb-3">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        0 = No Feeling
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        10 = Many Times a Day
                                    </Text>
                                </View>

                                {todayCheckInData.emotions.map((emotion) => (
                                    <RatingSlider
                                        key={emotion.id}
                                        label={emotion.label}
                                        value={emotionRatings[emotion.id]}
                                        onValueChange={(value) => handleEmotionChange(emotion.id, value)}
                                        showCurrentValue={true}
                                    />
                                ))}
                            </View>

                            {/* Urges */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Urges
                                </Text>
                                <View className="flex-row items-center justify-between mb-4">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        Rate the intensity of any urges you experienced
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-between mb-3">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        0 = No Urge
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        10 = Many Times a Day
                                    </Text>
                                </View>

                                {todayCheckInData.urges.map((urge) => (
                                    <RatingSlider
                                        key={urge.id}
                                        label={urge.label}
                                        value={urgeRatings[urge.id]}
                                        onValueChange={(value) => handleUrgeChange(urge.id, value)}
                                        showCurrentValue={true}
                                    />
                                ))}
                            </View>

                            {/* DBT Skills Used */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    DBT Skills Used
                                </Text>
                                <Pressable
                                    className="flex-row items-center justify-between p-3 py-4 rounded-full"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.gray_300,
                                    }}
                                    onPress={() => setShowSkillsDropdown(!showSkillsDropdown)}
                                >
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {selectedSkills.length > 0
                                            ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
                                            : 'Select skills used today'}
                                    </Text>
                                    <DownIcon size={12} color={colors.Text_Primary} />
                                </Pressable>

                                {/* Dropdown List */}
                                {showSkillsDropdown && (
                                    <View className="mt-1 p-2 border border-gray-200 rounded-lg">
                                        <ScrollView
                                            style={{ maxHeight: 300 }}
                                            showsVerticalScrollIndicator={true}
                                            nestedScrollEnabled={true}
                                        >
                                            {todayCheckInData.dbtSkills.map((skill, index) => (
                                                <Pressable
                                                    key={index}
                                                    className="flex-row items-center py-3 px-2"
                                                    onPress={() => toggleSkillSelection(skill)}
                                                >
                                                    <View
                                                        className="w-5 h-5 rounded mr-3 items-center justify-center"
                                                        style={{
                                                            borderWidth: 2,
                                                            borderColor: selectedSkills.includes(skill)
                                                                ? colors.orange_medium
                                                                : colors.gray_300,
                                                            backgroundColor: selectedSkills.includes(skill)
                                                                ? colors.orange_medium
                                                                : 'transparent',
                                                        }}
                                                    >
                                                        {selectedSkills.includes(skill) && (
                                                            <CheckIcon
                                                                size={12}
                                                                color={colors.white}
                                                            />
                                                        )}
                                                    </View>
                                                    <Text
                                                        style={[
                                                            t.textRegular,
                                                            {
                                                                color: selectedSkills.includes(skill)
                                                                    ? colors.Text_Primary
                                                                    : colors.text_secondary,
                                                            },
                                                        ]}
                                                    >
                                                        {skill}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}

                                {/* Selected Skills Display */}
                                {selectedSkills.length > 0 && (
                                    <View className="flex-row flex-wrap mt-3">
                                        {selectedSkills.map((skill, index) => (
                                            <View
                                                key={index}
                                                className="flex-row items-center px-3 py-2 rounded-full mr-2 mb-2"
                                                style={{ backgroundColor: colors.gray_100 }}
                                            >
                                                <Text
                                                    style={[
                                                        t.textRegular,
                                                        { color: colors.Text_Primary, fontSize: 12 },
                                                    ]}
                                                >
                                                    {skill}
                                                </Text>
                                                <Pressable
                                                    onPress={() => removeSkill(skill)}
                                                    className="ml-2"
                                                >
                                                    <CloseIcon
                                                        size={12}
                                                        color={colors.text_secondary}
                                                    />
                                                </Pressable>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* What do you need help with today? */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    What do you need help with today?
                                </Text>
                                <Pressable
                                    className="flex-row items-center justify-between p-3 py-4 rounded-full"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.gray_300,
                                    }}
                                    onPress={() => setShowHelpAreasDropdown(!showHelpAreasDropdown)}
                                >
                                    <Text style={[t.textRegular, { color: selectedHelpArea ? colors.Text_Primary : colors.text_secondary }]}>
                                        {selectedHelpArea || 'Choose what you need help with the most'}
                                    </Text>
                                    <DownIcon size={12} color={colors.Text_Primary} />
                                </Pressable>

                                {/* Dropdown List */}
                                {showHelpAreasDropdown && (
                                    <View className="mt-1 p-2 border border-gray-200 rounded-lg">
                                        <ScrollView
                                            style={{ maxHeight: 300 }}
                                            showsVerticalScrollIndicator={true}
                                            nestedScrollEnabled={true}
                                        >
                                            {todayCheckInData.helpAreas.map((helpArea, index) => (
                                                <Pressable
                                                    key={index}
                                                    className="py-3 px-3"
                                                    style={{
                                                        backgroundColor: selectedHelpArea === helpArea
                                                            ? colors.gray_100
                                                            : 'transparent',
                                                        borderRadius: 8,
                                                    }}
                                                    onPress={() => selectHelpArea(helpArea)}
                                                >
                                                    <Text
                                                        style={[
                                                            t.textRegular,
                                                            {
                                                                color: selectedHelpArea === helpArea
                                                                    ? colors.Text_Primary
                                                                    : colors.text_secondary,
                                                            },
                                                        ]}
                                                    >
                                                        {helpArea}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>

                            {/* Notes */}
                            <View
                                className="p-4 rounded-xl mb-6 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    Notes
                                </Text>
                                <TextInput
                                    className="p-4 rounded-xl"
                                    style={[
                                        t.textRegular,
                                        {
                                            borderWidth: 1,
                                            borderColor: colors.orange_500,
                                            color: colors.Text_Primary,
                                            minHeight: 120,
                                            textAlignVertical: 'top',
                                            backgroundColor: colors.white,
                                        },
                                    ]}
                                    placeholder="What happened today? How are you feeling? Any insights"
                                    placeholderTextColor={colors.text_secondary}
                                    multiline
                                    value={notes}
                                    onChangeText={setNotes}
                                />
                            </View>

                            {/* Save Button */}
                            <Pressable
                                className="rounded-full py-4 px-6 flex-row justify-center items-center mb-4"
                                style={{ backgroundColor: colors.orange_medium }}
                                onPress={handleSave}
                            >
                                <Text
                                    style={[t.button, { color: colors.white }]}
                                    className="flex-1 text-center"
                                >
                                    Save & View Your Daily Plan
                                </Text>
                                <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                                    <ArrowRightIcon size={16} color={colors.orange_medium} />
                                </View>
                            </Pressable>
                        </>
                    )}

                    {/* Daily Plan Tab Content */}
                    {activeTab === 'daily-plan' && (
                        <>
                            {/* Heading */}
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className=" mt-4 mb-4">
                                Your Personalised Daily Plan
                            </Text>

                            {/* Immediately Section */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    Immediately
                                </Text>
                                {dailyPlanData.immediately.map((item) => (
                                    <View key={item.id} className="flex-row mb-3">
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                            • Practice{' '}
                                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                                {item.skill}
                                            </Text>{' '}
                                            for {item.description}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Today Section */}
                            <View
                                className="p-4 rounded-xl mb-4 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    Today
                                </Text>
                                {dailyPlanData.today.map((item) => (
                                    <View key={item.id} className="flex-row mb-3">
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                            {item.skill ? (
                                                <>
                                                    • Consider{' '}
                                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                                        {item.skill}
                                                    </Text>{' '}
                                                    for {item.description}
                                                </>
                                            ) : (
                                                <>• {item.text}</>
                                            )}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* This Week Section */}
                            <View
                                className="p-4 rounded-xl mb-6 border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                            >
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                                    This Week
                                </Text>
                                {dailyPlanData.thisWeek.map((item) => (
                                    <View key={item.id} className="flex-row mb-3">
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                            • {item.text}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}


                </ScrollView>
            )}

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
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

