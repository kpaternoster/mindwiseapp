import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

export interface ClarifyYourGoalsEntry {
    id: string;
    date: string;
    time?: string;
    describeSituation: string;
    objectiveGoal: string;
    relationshipGoal: string;
    selfRespectGoal: string;
    mostImportant: string;
    secondPriority: string;
    thirdPriority: string;
    priorityReasoning: string;
}

interface ClarifyYourGoalsEntryCardProps {
    entry: ClarifyYourGoalsEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const ClarifyYourGoalsEntryCard: React.FC<ClarifyYourGoalsEntryCardProps> = ({
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

    const truncateText = (text: string, maxLength: number = 100) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    const getTopPriority = () => {
        if (entry.mostImportant) {
            return 'Most Important (Priority 1)';
        }
        if (entry.secondPriority) {
            return 'Second Priority';
        }
        if (entry.thirdPriority) {
            return 'Third Priority';
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
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Clarify Your Goals
            </Text>

            {/* Situation */}
            <View className="mb-2">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    Situation:
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {entry.describeSituation ? truncateText(entry.describeSituation) : 'Think of a current or upcoming interpersonal situation where you need to communicate something important.'}
                </Text>
            </View>

            {/* Top Priority */}
            {getTopPriority() && (
                <View>
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Top Priority:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {getTopPriority()}
                    </Text>
                </View>
            )}
        </View>
    );
};

