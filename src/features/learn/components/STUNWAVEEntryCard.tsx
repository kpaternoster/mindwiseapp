import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon } from '@components/Utils';

export interface STUNWAVEEntry {
    id: string;
    date: string; // ISO string
    sensations?: string;
    thoughts?: string;
    urges?: string;
    emotions?: string;
    waveReflection?: string;
    reflection?: string;
    notes?: string;
}

interface STUNWAVEEntryCardProps {
    entry: STUNWAVEEntry;
    onDelete?: (id: string) => void;
}

export const STUNWAVEEntryCard: React.FC<STUNWAVEEntryCardProps> = ({
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

            {/* STUNWAVE Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                STUNWAVE
            </Text>

            {/* Emotions */}
            {entry.emotions && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Emotions: <Text style={{ color: colors.text_secondary }}>{entry.emotions}</Text>
                    </Text>
                </View>
            )}

            {/* Reflection */}
            {entry.reflection && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Reflection: <Text style={{ color: colors.text_secondary }}>{entry.reflection}</Text>
                    </Text>
                </View>
            )}

            {/* Wave Reflection */}
            {entry.waveReflection && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Wave Reflection: <Text style={{ color: colors.text_secondary }}>{entry.waveReflection}</Text>
                    </Text>
                </View>
            )}

            {/* Sensations */}
            {entry.sensations && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Sensations: <Text style={{ color: colors.Text_Primary }}>{entry.sensations}</Text>
                    </Text>
                </View>
            )}

            {/* Thoughts */}
            {entry.thoughts && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Thoughts: <Text style={{ color: colors.Text_Primary }}>{entry.thoughts}</Text>
                    </Text>
                </View>
            )}

            {/* Urges */}
            {entry.urges && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Urges: <Text style={{ color: colors.Text_Primary }}>{entry.urges}</Text>
                    </Text>
                </View>
            )}

            {/* Notes */}
            {entry.notes && (
                <View className="mt-3">

                    <View
                        className="rounded-xl p-4 flex-col"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Notes:
                        </Text>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            {entry.notes}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

