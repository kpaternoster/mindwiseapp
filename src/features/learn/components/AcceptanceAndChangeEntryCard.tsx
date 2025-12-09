import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

interface AcceptanceAndChangeEntry {
    id: string;
    date: string;
    time?: string;
    describeSituation?: string;
    partsNeedAcceptance?: string;
    partsCanChange?: string;
    actionableStepsAcceptance?: string;
    actionableStepsChange?: string;
    reflection?: string;
}

interface AcceptanceAndChangeEntryCardProps {
    entry: AcceptanceAndChangeEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const AcceptanceAndChangeEntryCard: React.FC<AcceptanceAndChangeEntryCardProps> = ({
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
                        <TrashIcon size={20} color={colors.muted_coral} />
                    </Pressable>
                </View>
            </View>

            {/* Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Acceptance & Change
            </Text>

            {/* Situation */}
            {entry.describeSituation && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Situation:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {truncateText(entry.describeSituation)}
                    </Text>
                </View>
            )}

            {/* Accept */}
            {entry.partsNeedAcceptance && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Accept:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {truncateText(entry.partsNeedAcceptance)}
                    </Text>
                </View>
            )}

            {/* Change */}
            {entry.partsCanChange && (
                <View>
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Change:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {truncateText(entry.partsCanChange)}
                    </Text>
                </View>
            )}
        </View>
    );
};

