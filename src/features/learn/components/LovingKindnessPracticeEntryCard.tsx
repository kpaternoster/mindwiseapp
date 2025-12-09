import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

interface LovingKindnessPracticeEntry {
    id: string;
    date: string;
    time?: string;
    yourselfReflection?: string;
    lovedOneReflection?: string;
    neutralPersonReflection?: string;
    difficultPersonReflection?: string;
    overallReflection?: string;
}

interface LovingKindnessPracticeEntryCardProps {
    entry: LovingKindnessPracticeEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const LovingKindnessPracticeEntryCard: React.FC<LovingKindnessPracticeEntryCardProps> = ({
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

    const getPreviewText = () => {
        if (entry.overallReflection) {
            return entry.overallReflection.length > 50 
                ? `${entry.overallReflection.substring(0, 50)}...` 
                : entry.overallReflection;
        }
        if (entry.difficultPersonReflection) {
            return entry.difficultPersonReflection.length > 50 
                ? `${entry.difficultPersonReflection.substring(0, 50)}...` 
                : entry.difficultPersonReflection;
        }
        if (entry.yourselfReflection) {
            return entry.yourselfReflection.length > 50 
                ? `${entry.yourselfReflection.substring(0, 50)}...` 
                : entry.yourselfReflection;
        }
        return 'No reflection available';
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
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                Loving Kindness Practice
            </Text>

            {/* Preview Text */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {getPreviewText()}
            </Text>
        </View>
    );
};

