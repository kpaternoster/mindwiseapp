import React, { useMemo } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { SUDSEntry } from './SUDSEntryCard';

interface SUDSGraphProps {
    entries: SUDSEntry[];
}

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 80; // Account for padding
const barWidth = Math.min((chartWidth / 7) - 8, 30); // 7 days with spacing
const chartHeight = 240;
const maxLevel = 12;

const getSUDSColor = (level: number): string => {
    if (level >= 1 && level <= 3) {
        return colors.green; // Light green for 1-3
    } else if (level >= 4 && level <= 6) {
        return colors.soft_amber; // Orange for 4-6
    } else if (level >= 7 && level <= 8) {
        return colors.Button_Orange; // Darker orange/red-orange for 7-8
    } else {
        return colors.system_red; // Red for 9-10
    }
};

export const SUDSGraph: React.FC<SUDSGraphProps> = ({ entries }) => {
    // Generate data for last 7 days
    const weeklyData = useMemo(() => {
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const data = [];

        // Generate last 7 days (including today)
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dayIndex = date.getDay();
            // Convert Sunday (0) to 6, Monday (1) to 0, etc.
            const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            const dayName = dayNames[adjustedDayIndex];

            // Find entry for this date
            const entry = entries.find(e => {
                const entryDate = new Date(e.date);
                entryDate.setHours(0, 0, 0, 0);
                return entryDate.getTime() === date.getTime();
            });

            const level = entry ? entry.sudsLevel : 0;
            data.push({
                day: dayName,
                level: level,
            });
        }

        return data;
    }, [entries]);

    const styles = createStyles(barWidth);

    const renderBarChart = () => {
        return (
            <View style={styles.chartContainer}>
                {weeklyData.map((data, index) => {
                    const barColor = data.level > 0 ? getSUDSColor(data.level) : colors.gray_300;
                    return (
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
                                {/* Value label above bar */}
                                {data.level > 0 && (
                                    <View
                                        style={[
                                            styles.valueLabelContainer,
                                            {
                                                bottom: (data.level / maxLevel) * chartHeight + 4,
                                            },
                                        ]}
                                    >
                                        <Text style={[t.textBold, { color: colors.text_secondary, fontSize: 14 }]}>
                                            {data.level}
                                        </Text>
                                    </View>
                                )}
                                {/* Filled bar (colored based on SUDS level) */}
                                {data.level > 0 && (
                                    <View
                                        style={[
                                            styles.filledBar,
                                            {
                                                height: (data.level / maxLevel) * chartHeight,
                                                width: barWidth,
                                                backgroundColor: barColor,
                                            },
                                        ]}
                                    />
                                )}
                            </View>
                            <Text style={[t.textRegular, { color: colors.text_secondary, marginTop: 8 }]}>
                                {data.day}
                            </Text>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <View>
            {/* Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="text-center mb-6">
                Last 7 Days
            </Text>

            {/* Bar Chart */}
            <View
                className="rounded-2xl p-4 mb-4"
                style={{
                    backgroundColor: colors.white,
                    borderColor: colors.stoke_gray,
                    borderWidth: 1,
                }}
            >
                {renderBarChart()}
            </View>
        </View>
    );
};

const createStyles = (barWidth: number) => StyleSheet.create({
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
        height: chartHeight,
    },
    backgroundBar: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.gray_200,
        borderRadius: 16,
    },
    valueLabelContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: barWidth,
    },
    filledBar: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

