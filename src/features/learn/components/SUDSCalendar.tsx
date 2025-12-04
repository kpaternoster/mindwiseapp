import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { SUDSEntry } from './SUDSEntryCard';

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
    // Create marked dates from entries
    const markedDates = useMemo(() => {
        const marked: any = {};
        
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
    }, [entries]);

    return (
        <View>
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

