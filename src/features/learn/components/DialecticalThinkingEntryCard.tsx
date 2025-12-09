import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon } from '@components/Utils';

export interface DialecticalThinkingEntry {
    id: string;
    date: string; // ISO string
    title: string;
    butStatement: string;
    andStatement: string;
    situation?: string;
    reframe?: string;
}

interface DialecticalThinkingEntryCardProps {
    entry: DialecticalThinkingEntry;
    onDelete?: (id: string) => void;
}

export const DialecticalThinkingEntryCard: React.FC<DialecticalThinkingEntryCardProps> = ({
    entry,
    onDelete,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <View
            className="rounded-2xl p-4 mb-4 bg-white"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with Date and Delete */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center px-2 py-1 rounded-full" style={{backgroundColor: colors.orange_50}}>
                    <CalendarBlankIcon size={16} color={colors.orange_600} />
                    <Text style={[t.footnoteRegular, { color: colors.orange_600 }]} className="ml-2">
                        {formatDate(entry.date)}
                    </Text>
                </View>
                {onDelete && (
                    <Pressable onPress={() => onDelete(entry.id)}>
                        <TrashIcon size={15} color={colors.crisis} />
                    </Pressable>
                )}
            </View>

            {/* Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                {entry.title}
            </Text>

            {/* Entry Fields */}
            <View className="mb-2 flex-row gap-2">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    But Statement:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {entry.butStatement}
                </Text>
            </View>

            <View className="mb-2 flex-row gap-2">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} >
                    And Statement:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {entry.andStatement}
                </Text>
            </View>

            {entry.situation && (
                <View className="mb-2 flex-row gap-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} >
                        Stuck Situation:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.situation}
                    </Text>
                </View>
            )}

            {entry.reframe && (
                <View className="mb-2 flex-row gap-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Dialectical Reflection:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.reframe}
                    </Text>
                </View>
            )}
        </View>
    );
};

