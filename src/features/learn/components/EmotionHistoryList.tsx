import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface EmotionEntry {
    date: string;
    day: string;
    primaryEmotion: string | null;
    secondaryEmotion: string | null;
    intensity: number | null;
}

interface EmotionHistoryListProps {
    entries: EmotionEntry[];
}

export const EmotionHistoryList: React.FC<EmotionHistoryListProps> = ({
    entries,
}) => {
    const renderIntensityDots = (intensity: number | null) => {
        if (intensity === null) return null;

        return (
            <View className="flex-row items-center ml-2" style={{ gap: 4 }}>
                {Array.from({ length: 10 }, (_, i) => (
                    <View
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: i < intensity ? colors.warm_dark : colors.gray_300,
                        }}
                    />
                ))}
            </View>
        );
    };

    return (
        <View className='p-4 rounded-2xl border border-gray-200'>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                    Emotion History
                </Text>
                <Text style={[t.textSemiBold, { color: colors.text_secondary }]}>
                    Last 7 Days
                </Text>
            </View>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-4'>
                Your emotional patterns over time
            </Text>

            {/* Entries */}
            <View>
                {entries.map((entry, index) => (
                    <View
                        key={index}
                        className="flex-row items-center justify-between py-3"
                    >
                        <View className="flex-row items-center flex-1">
                            <View className="w-16 h-16 p-2 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: colors.cream_40 }}>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {entry.day}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {entry.date}
                                </Text>
                            </View>

                            {entry.primaryEmotion && entry.secondaryEmotion ? (
                                <View className="flex-row items-center justify-between flex-1">
                                    <View className='flex-col mr-4'>
                                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                            {entry.secondaryEmotion}
                                        </Text>
                                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                            ({entry.primaryEmotion})
                                        </Text>
                                    </View>

                                    {renderIntensityDots(entry.intensity)}
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="ml-4">
                                        {entry.intensity}/10
                                    </Text>
                                </View>
                            ) : (
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    No Entry
                                </Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

