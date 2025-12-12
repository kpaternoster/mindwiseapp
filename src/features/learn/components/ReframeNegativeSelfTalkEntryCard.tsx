import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

export interface ReframeNegativeSelfTalkEntry {
    id: string;
    date: string;
    time?: string;
    negativeThoughts: { id: number; thought: string }[];
    evidenceFor: string;
    evidenceAgainst: string;
    friendsPerspective: string;
    balancedThought: string;
}

interface ReframeNegativeSelfTalkEntryCardProps {
    entry: ReframeNegativeSelfTalkEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const ReframeNegativeSelfTalkEntryCard: React.FC<ReframeNegativeSelfTalkEntryCardProps> = ({
    entry,
    onView,
    onDelete,
}) => {
    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        if (timeString) {
            return `${formattedDate}, ${timeString}`;
        }
        return formattedDate;
    };

    const truncateText = (text: string, maxLength: number = 60) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    const getOriginalThought = () => {
        if (entry.negativeThoughts && entry.negativeThoughts.length > 0 && entry.negativeThoughts[0].thought) {
            return truncateText(entry.negativeThoughts[0].thought);
        }
        return '';
    };

    const getBalancedThought = () => {
        if (entry.balancedThought) {
            return truncateText(entry.balancedThought);
        }
        return '';
    };

    return (
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <View className="flex-row items-start justify-between mb-3">
                {/* Date Badge */}
                <View
                    className="flex-row items-center px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <CalendarBlankIcon size={14} color={colors.orange_600} />
                    <Text
                        style={[t.footnoteBold, { color: colors.orange_600 }]}
                        className="ml-2"
                    >
                        {formatDate(entry.date, entry.time)}
                    </Text>
                </View>

                {/* Action Icons */}
                <View className="flex-row items-center gap-4">
                    <Pressable onPress={() => onView(entry.id)}>
                        <EyeIcon size={20} color={colors.text_secondary} />
                    </Pressable>
                    <Pressable onPress={() => onDelete(entry.id)}>
                        <TrashIcon size={16} color={colors.muted_coral} />
                    </Pressable>
                </View>
            </View>

            {/* Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                Reframe Negative Self-Talk
            </Text>

            {/* Thought Prompts */}
            <View className="mb-1">
                <Text style={[t.textSemiBold, { color: colors.text_secondary }]}>
                    Original Thought:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {getOriginalThought()}
                </Text>
            </View>

            <View>
                <Text style={[t.textSemiBold, { color: colors.text_secondary }]}>
                    Balanced Thought:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {getBalancedThought()}
                </Text>
            </View>
        </View>
    );
};

