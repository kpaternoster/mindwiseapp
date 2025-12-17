import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { SUDSEntry } from './SUDSEntryCard';
import { fetchSudsCalendar } from '../api/suds';

interface SUDSCalendarProps {
    entries: SUDSEntry[];
}

const getSUDSColor = (level: number): string => {
    if (level >= 1 && level <= 3) {
        return colors.green; // Light green for 1-3
    } else if (level >= 4 && level <= 6) {
        return colors.button_orange; // Orange for 4-6
    } else if (level >= 7 && level <= 8) {
        return colors.orange_600; // Darker orange/red-orange for 7-8
    } else {
        return colors.crisis; // Red for 9-10
    }
};

export const SUDSCalendar: React.FC<SUDSCalendarProps> = ({ entries }) => {
    const [calendarData, setCalendarData] = useState<(number | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState<string>('');

    // Extract YYYY-MM from date string (e.g., "2025-08-17" -> "2025-08")
    const extractMonth = (dateString: string): string => {
        return dateString.substring(0, 7); // Get first 7 characters (YYYY-MM)
    };

    // Load calendar data for a specific month
    const loadCalendarData = async (month: string) => {
        try {
            setIsLoading(true);
            const data = await fetchSudsCalendar(month);
            setCalendarData(data);
        } catch (error) {
            console.error('Error loading calendar data:', error);
            setCalendarData([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle month change
    const handleMonthChange = (month: { dateString: string }) => {
        const monthString = extractMonth(month.dateString);
        setCurrentMonth(monthString);
        loadCalendarData(monthString);
    };

    // Load initial month data
    useEffect(() => {
        const today = new Date();
        const currentMonthString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        setCurrentMonth(currentMonthString);
        loadCalendarData(currentMonthString);
    }, []);

    // Create marked dates from API calendar data
    const markedDates = useMemo(() => {
        const marked: any = {};
        
        if (calendarData.length > 0 && currentMonth) {
            const [year, month] = currentMonth.split('-').map(Number);
            const daysInMonth = new Date(year, month, 0).getDate();
            
            // Map calendar data array to marked dates
            calendarData.forEach((level, index) => {
                if (level !== null && index < daysInMonth) {
                    const day = index + 1;
                    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const color = getSUDSColor(level);
                    
                    marked[dateString] = {
                        marked: true,
                        dotColor: color,
                        selected: false,
                    };
                }
            });
        }
        
        // Also include entries from props as fallback/override
        entries.forEach((entry) => {
            const date = new Date(entry.date);
            const dateString = date.toISOString().split('T')[0];
            const color = getSUDSColor(entry.sudsLevel);
            
            marked[dateString] = {
                marked: true,
                dotColor: color,
                selected: false,
            };
        });
        
        return marked;
    }, [calendarData, currentMonth, entries]);

    return (
        <View>
            {/* {isLoading && (
                <View className="items-center justify-center py-4">
                    <ActivityIndicator size="small" color={colors.button_orange} />
                </View>
            )} */}
            {/* Calendar */}
            <Calendar
                style={{
                    borderWidth: 0,
                    borderColor: 'transparent',
                }}
                theme={{
                    backgroundColor: colors.white,
                    calendarBackground: colors.white,
                    textSectionTitleColor: colors.text_secondary,
                    selectedDayBackgroundColor: colors.button_orange,
                    selectedDayTextColor: colors.white,
                    todayTextColor: colors.button_orange,
                    dayTextColor: colors.Text_Primary,
                    textDisabledColor: colors.text_tetriary,
                    monthTextColor: colors.Text_Primary,
                    textDayFontFamily: 'System',
                    textMonthFontFamily: 'System',
                    textDayHeaderFontFamily: 'System',
                    textDayFontWeight: '400',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '400',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14,
                    arrowColor: colors.Text_Primary,
                }}
                markingType="dot"
                markedDates={markedDates}
                hideExtraDays={false}
                firstDay={0} // Sunday
                onMonthChange={handleMonthChange}
            />

            {/* Legend */}
            <View className="mt-6 pt-4" style={{ borderTopWidth: 1, borderTopColor: colors.stoke_gray }}>
                <View className="flex-row flex-wrap justify-center" style={{ gap: 16 }}>
                    <View className="flex-row items-center">
                        <View
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: colors.green }}
                        />
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            1-3
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <View
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: colors.soft_amber }}
                        />
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            4-6
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <View
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: colors.Button_Orange }}
                        />
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            7-8
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <View
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: colors.system_red }}
                        />
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            9-10
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

