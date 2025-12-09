import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

interface WiseMindPastDecisionEntry {
    id: string;
    date: string;
    time?: string;
    title: string;
}

interface WiseMindPastDecisionEntryCardProps {
    entry: WiseMindPastDecisionEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export default function WiseMindPastDecisionEntryCard({
    entry,
    onView,
    onDelete,
}: WiseMindPastDecisionEntryCardProps) {
    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        
        if (timeString) {
            const time = new Date(timeString);
            const formattedTime = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            return `${formattedDate}, ${formattedTime}`;
        }
        return formattedDate;
    };

    return (
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <View className="flex-row items-start justify-between">
                <View className="flex-1 mr-3">
                    {/* Date Badge */}
                    <View className="flex-row items-center mb-3">
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
                    </View>

                    {/* Title */}
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                        {entry.title}
                    </Text>
                </View>

                {/* Action Icons */}
                <View className="flex-row items-center gap-3">
                    <Pressable onPress={() => onView(entry.id)}>
                        <EyeIcon size={18} color={colors.text_secondary} />
                    </Pressable>
                    <Pressable onPress={() => onDelete(entry.id)}>
                        <TrashIcon size={15} color={colors.muted_coral} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

