import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon } from '@components/Utils';

export interface CheckTheFactsEntry {
    id: string;
    date: string; // ISO string
    describeSituation?: string;
    facts?: string;
    assumptions?: string;
    alternativeExplanations?: string;
    emotionFactsCheck?: string;
}

interface CheckTheFactsEntryCardProps {
    entry: CheckTheFactsEntry;
    onDelete?: (id: string) => void;
}

export const CheckTheFactsEntryCard: React.FC<CheckTheFactsEntryCardProps> = ({
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
            className="rounded-2xl p-4 mb-4"
            style={{
                backgroundColor: colors.white,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with Date and Delete */}
            <View className="flex-row items-center justify-between mb-4">
                <View
                    className="flex-row items-center px-3 py-1 rounded-full"
                    style={{ backgroundColor: colors.orange_opacity_10 }}
                >
                    <CalendarBlankIcon size={16} color={colors.button_orange} />
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

            {/* Check the Facts Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Check the Facts
            </Text>

            {/* Describe the Situation */}
            {entry.describeSituation && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Situation: <Text style={{ color: colors.text_secondary }}>{entry.describeSituation}</Text>
                    </Text>
                </View>
            )}

            {/* Facts */}
            {entry.facts && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Facts: <Text style={{ color: colors.text_secondary }}>{entry.facts}</Text>
                    </Text>
                </View>
            )}

            {/* Assumptions */}
            {entry.assumptions && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Assumptions: <Text style={{ color: colors.text_secondary }}>{entry.assumptions}</Text>
                    </Text>
                </View>
            )}

            {/* Alternative Explanations */}
            {entry.alternativeExplanations && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Alternative Explanations: <Text style={{ color: colors.text_secondary }}>{entry.alternativeExplanations}</Text>
                    </Text>
                </View>
            )}

            {/* Emotion & Facts Check */}
            {entry.emotionFactsCheck && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Emotion & Facts Check: <Text style={{ color: colors.text_secondary }}>{entry.emotionFactsCheck}</Text>
                    </Text>
                </View>
            )}
        </View>
    );
};

