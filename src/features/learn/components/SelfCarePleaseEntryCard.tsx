import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon, EyeIcon } from '@components/Utils';

export interface SelfCarePleaseEntry {
    id: string;
    date: string; // ISO string
    type: 'plan' | 'reflection';
    title: string;
}

interface SelfCarePleaseEntryCardProps {
    entry: SelfCarePleaseEntry;
    onView?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const SelfCarePleaseEntryCard: React.FC<SelfCarePleaseEntryCardProps> = ({
    entry,
    onView,
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
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with Date and Actions */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center rounded-full px-2 py-1" style={{backgroundColor: colors.orange_opacity_10}}>
                    <CalendarBlankIcon size={16} color={colors.button_orange} />
                    <Text style={[t.footnoteRegular, { color: colors.orange_600 }]} className="ml-2">
                        {formatDate(entry.date)}
                    </Text>
                </View>
                <View className="flex-row items-center" style={{ gap: 16 }}>
                    {onView && (
                        <Pressable onPress={() => onView(entry.id)}>
                            <EyeIcon size={18} color={colors.gray_medium} />
                        </Pressable>
                    )}
                    {onDelete && (
                        <Pressable onPress={() => onDelete(entry.id)}>
                            <TrashIcon size={15} color={colors.crisis} />
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Title */}
            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                {entry.title}
            </Text>
        </View>
    );
};

