import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon } from '@components/Utils';

export interface ObservationEntry {
    id: string;
    date: string;
    person: string;
    observed: string;
    guess: string;
    theySaid?: string;
    notes?: string;
}

interface ObservationCardProps {
    entry: ObservationEntry;
    onDelete: (id: string) => void;
}

export const ObservationCard: React.FC<ObservationCardProps> = ({
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
                backgroundColor: colors.cream_40,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with Date and Delete */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                    <CalendarBlankIcon size={20} color={colors.button_orange} />
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="ml-2">
                        {formatDate(entry.date)}
                    </Text>
                </View>
                <Pressable onPress={() => onDelete(entry.id)}>
                    <TrashIcon size={15} color={colors.crisis} />
                </Pressable>
            </View>

            {/* Person Name */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                {entry.person}
            </Text>

            {/* Observed */}
            <View className="mb-2">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    Observed: <Text style={{ color: colors.Text_Primary }}>{entry.observed}</Text>
                </Text>
            </View>

            {/* Your Guess */}
            <View className="mb-2">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    Your guess: <Text style={{ color: colors.Text_Primary }}>{entry.guess}</Text>
                </Text>
            </View>

            {/* They Said (if available) */}
            {entry.theySaid && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        They said: <Text style={{ color: colors.Text_Primary }}>{entry.theySaid}</Text>
                    </Text>
                </View>
            )}

            {/* Notes (if available) */}
            {entry.notes && (
                <View className="mt-2">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                        Notes:
                    </Text>
                    <View
                        className="rounded-xl p-3"
                        style={{ backgroundColor: colors.white }}
                    >
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            {entry.notes}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

