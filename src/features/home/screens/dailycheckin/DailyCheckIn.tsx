import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, BackIcon, GreenLeafIcon, PottedPlantIcon } from '@components/Utils';
import dailyCheckInData from '../../data/dailycheckin/dailyCheckIn.json';
import { images } from '@design/image';
import { useNavigation } from '@react-navigation/native';
import { HomePage } from '@components/HomePage';
import InfiniteDateSelector from '@features/home/components/InfiniteDateSelector';
import { fetchTodayStatus } from '../../api';
import { formatDateToISO, capitalizeFirstLetter } from '../../utils';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;


export default function DailyCheckInScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Current date
    const [currentStreak, setCurrentStreak] = useState(12);
    const [todayStatus, setTodayStatus] = useState('Pending');
    const [weeklyCount, setWeeklyCount] = useState(5);
    const [totalEntries, setTotalEntries] = useState(45);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Fetch today's status for the selected date
     */
    const loadTodayStatus = async (date: Date) => {
        try {
            setIsLoading(true);
            const dateString = formatDateToISO(date);
            const statusData = await fetchTodayStatus(dateString);
            // console.log('statusData', statusData);
            // Update state with fetched data
            setCurrentStreak(statusData.streak);
            setTodayStatus(capitalizeFirstLetter(statusData.todayStatus));
            setWeeklyCount(statusData.thisWeek);
            setTotalEntries(statusData.totalEntries);
        } catch (error) {
            console.error('Error loading today status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTodayStatus(selectedDate);
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        loadTodayStatus(date);
    };

    return (
        <HomePage>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <View className="px-6 pt-12 pb-4">
                <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-1">
                        <Text style={[t.title32SemiBold, { color: colors.Text_Primary }]}>
                            Daily Check-In
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-3">
                            Track your journey and build awareness
                        </Text>
                    </View>
                    <Image
                        source={images.leaf}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Date Selector */}
            <InfiniteDateSelector
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
            />

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-6 mb-12"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Today's Status Card */}
                <View
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <View className='flex-row items-center justify-between'>
                        <View className="flex-col mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Today's Status
                            </Text>
                            <Text style={[t.textMedium, { color: colors.text_secondary }]} className='mt-3'>
                                {todayStatus}
                            </Text>
                        </View>

                        {/* Streak Display */}
                        <View className="items-center mb-4">
                            <Text style={[t.title24SemiBold, { color: colors.orange_500 }]}>
                                {currentStreak}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                days streak
                            </Text>
                        </View>

                    </View>

                    {/* Weekly Stats */}
                    <View className="flex-row justify-between">
                        <View
                            className="flex-1 p-3 rounded-xl mr-2"
                            style={{ backgroundColor: colors.white }}
                        >
                            <Text style={[t.title20SemiBold, { color: colors.text_secondary }]} className="text-center">
                                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]}>{weeklyCount}</Text> / <Text style={[t.title20SemiBold, { color: colors.text_secondary }]}>7</Text>
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="text-center mt-1">
                                This week
                            </Text>
                        </View>
                        <View
                            className="flex-1 p-3 rounded-xl ml-2"
                            style={{ backgroundColor: colors.white }}
                        >
                            <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="text-center">
                                {totalEntries}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="text-center mt-1">
                                Total Enteries
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Today's Check-In Card */}
                <Pressable
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: colors.button_orange }}
                    onPress={() => navigation.navigate('TodayCheckIn')}
                >
                    <View className="flex-row items-start justify-between mb-2">
                        <Text style={[t.textSemiBold, { color: colors.white }]}>
                            {dailyCheckInData.todayCheckIn.title}
                        </Text>
                        <View
                            className="px-3 py-1 rounded-full"
                            style={{ backgroundColor: colors.soft_amber }}
                        >
                            <Text style={[t.footnoteRegular, { color: colors.Text_Primary }]}>
                                {dailyCheckInData.todayCheckIn.status}
                            </Text>
                        </View>
                    </View>

                    <Text style={[t.textRegular, { color: colors.white }]} className="mb-3">
                        {dailyCheckInData.todayCheckIn.description}
                    </Text>

                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">

                            <Text style={[t.textRegular, { color: colors.white }]}>
                                • {dailyCheckInData.todayCheckIn.duration}
                            </Text>
                        </View>
                        <View
                            className="w-9 h-9 rounded-full items-center justify-center"
                            style={{ backgroundColor: colors.white }}
                        >
                            <ArrowRightIcon size={16} color={colors.warm_dark} />
                        </View>
                    </View>
                </Pressable>

                {/* Recent Check-Ins Card */}
                <View
                    className="p-4 mb-4 border border-gray-200 rounded-2xl"
                >
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: colors.orange_opacity_30 }}>
                                <PottedPlantIcon size={20} color={colors.orange_500} />
                            </View>
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-4">
                                Recent Check-Ins
                            </Text>
                        </View>
                        <View className='py-2 px-3 rounded-full items-center justify-center' style={{ backgroundColor: colors.orange_opacity_10 }}>
                            <Text style={[t.footnoteRegular, { color: colors.orange_600 }]}>
                                1 min read
                            </Text>
                        </View>
                    </View>

                    {dailyCheckInData.recentCheckIns.map((entry) => (
                        <View
                            key={entry.id}
                            className="p-3 rounded-xl mt-2"
                            style={{ backgroundColor: colors.gray_100 }}
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1">
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                        {entry.date}
                                    </Text>
                                    <Text style={[t.textMedium, { color: colors.text_secondary }]} className="mt-3">
                                        Mood: {entry.mood}/10  Anxiety: {entry.anxiety}/10
                                    </Text>
                                </View>
                                <Text style={[t.textMedium, { color: colors.text_secondary }]}>
                                    {entry.status}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Weekly Review Card */}
                <Pressable
                    className="p-4 rounded-xl mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                    onPress={() => navigation.navigate('WeeklyReview')}
                >
                    <View className="flex-row items-start justify-between mb-2">
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                            {dailyCheckInData.weeklyReview.title}
                        </Text>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                        {dailyCheckInData.weeklyReview.description}
                    </Text>
                    <View className="flex-row items-center">
                        <Text style={[t.textSemiBold, { color: colors.orange_300 }]} className='mr-3'>•</Text>
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                            {dailyCheckInData.weeklyReview.duration}
                        </Text>
                    </View>
                </Pressable>

                {/* Progress Tracking Card */}
                <Pressable
                    className="p-4 rounded-xl mb-20"
                    style={{ backgroundColor: colors.orange_50 }}
                    onPress={() => navigation.navigate('ProgressTracking')}
                >
                    <View className="flex-row items-start justify-between mb-2">
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                            {dailyCheckInData.progressTracking.title}
                        </Text>
                        
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                        {dailyCheckInData.progressTracking.description}
                    </Text>
                    <View className="flex-row items-center">
                        <Text style={[t.textSemiBold, { color: colors.orange_300 }]} className='mr-3'>•</Text>
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                            {dailyCheckInData.progressTracking.duration}
                        </Text>
                    </View>
                </Pressable>
            </ScrollView>
        </HomePage>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    logo: {
        width: 35,
        height: 55
    }
});

