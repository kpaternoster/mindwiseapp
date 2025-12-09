import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon } from '@components/Utils';

export interface DialecticalThinkingPerspectiveEntry {
    id: string;
    date: string; // ISO string
    title: string;
    conflict: string;
    perspective: string;
    alternativeViews?: string;
    belief?: string;
    opposite?: string;
    synthesis?: string;
}

interface DialecticalThinkingPerspectiveEntryCardProps {
    entry: DialecticalThinkingPerspectiveEntry;
    onDelete?: (id: string) => void;
}

export const DialecticalThinkingPerspectiveEntryCard: React.FC<DialecticalThinkingPerspectiveEntryCardProps> = ({
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
                    Conflict:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {entry.conflict}
                </Text>
            </View>

            <View className="mb-2 flex-row gap-2">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    My Perspective:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {entry.perspective}
                </Text>
            </View>

            {entry.alternativeViews && (
                <View className="mb-2 flex-row gap-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Alternative Views:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.alternativeViews}
                    </Text>
                </View>
            )}

            {entry.belief && (
                <View className="mb-2 flex-row gap-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Personal Belief:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.belief}
                    </Text>
                </View>
            )}

            {entry.opposite && (
                <View className="mb-2 flex-row gap-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Opposite Argument:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.opposite}
                    </Text>
                </View>
            )}

            {entry.synthesis && (
                <View className="mb-2 flex-row gap-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Synthesis:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.synthesis}
                    </Text>
                </View>
            )}
        </View>
    );
};

