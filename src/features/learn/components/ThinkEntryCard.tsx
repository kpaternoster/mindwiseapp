import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

export interface ThinkEntry {
    id: string;
    date: string;
    time?: string;
    chooseSomeone?: string;
    listPositiveQualities?: string;
    whatConversation?: string;
    howApplyThink?: string;
    howDidItGo?: string;
    howDidTheyRespond?: string;
    whatDidYouNotice?: string;
    whatDidYouLearn?: string;
}

interface ThinkEntryCardProps {
    entry: ThinkEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const ThinkEntryCard: React.FC<ThinkEntryCardProps> = ({
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

    // Get snippet text - prioritize chooseSomeone
    const getSnippet = () => {
        if (entry.chooseSomeone) {
            return `Choose someone you'll interact with... ${truncateText(entry.chooseSomeone, 50)}`;
        }
        if (entry.whatConversation) {
            return `What conversation or interaction... ${truncateText(entry.whatConversation, 50)}`;
        }
        return `Choose someone you'll interact with...`;
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
                Communicate with THINK
            </Text>

            {/* Description Snippet */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {getSnippet()}
            </Text>
        </View>
    );
};

