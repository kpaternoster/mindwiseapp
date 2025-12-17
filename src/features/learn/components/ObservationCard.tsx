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
                backgroundColor: colors.white,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with Date and Delete */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: colors.orange_opacity_10 }}>
                    <CalendarBlankIcon size={14} color={colors.button_orange} />
                    <Text style={[t.footnoteRegular, { color: colors.orange_600 }]} className="ml-2">
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
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    Observed: <Text style={[{ color: colors.text_secondary }, t.textRegular]}>{entry.observed}</Text>
                </Text>
            </View>

            {/* Your Guess */}
            <View className="mb-2">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    Your guess: <Text style={[{ color: colors.text_secondary }, t.textRegular]}>{entry.guess}</Text>
                </Text>
            </View>

            {/* They Said (if available) */}
            {entry.theySaid && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        They said: <Text style={[{ color: colors.text_secondary }, t.textRegular]}>{entry.theySaid}</Text>
                    </Text>
                </View>
            )}

            {/* Notes (if available) */}
            {entry.notes && (
                <View className="mt-2 p-4 rounded-2xl" style={{ backgroundColor: colors.orange_opacity_10 }}>
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Notes:
                    </Text>
                    <View
                        className="mt-2"
                    >
                        <Text style={[{ color: colors.text_secondary }, t.textRegular]}>
                            {entry.notes}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

