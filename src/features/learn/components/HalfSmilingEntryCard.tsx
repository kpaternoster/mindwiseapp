import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

export interface HalfSmilingEntry {
    id: string;
    date: string;
    time?: string;
    type: 'practice' | 'emotionMapping' | 'inAction' | 'anchorPrompts';
    visualization?: string;
    bodyResponse?: string;
    reflection?: string;
    timerStatus?: 'completed' | 'paused' | 'notStarted';
    // For other entry types (to be added later)
    [key: string]: any;
}

interface HalfSmilingEntryCardProps {
    entry: HalfSmilingEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const HalfSmilingEntryCard: React.FC<HalfSmilingEntryCardProps> = ({
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

    const truncateText = (text: string, maxLength: number = 60) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    const getTitle = () => {
        switch (entry.type) {
            case 'practice':
                return 'Practice';
            case 'emotionMapping':
                return 'Emotion Mapping';
            case 'inAction':
                return 'In Action';
            case 'anchorPrompts':
                return 'Anchor Prompts';
            default:
                return 'Practice';
        }
    };

    const getSnippet = () => {
        if (entry.type === 'practice') {
            // Prioritize reflection, then bodyResponse, then visualization
            if (entry.reflection) {
                return `Reflection... ${truncateText(entry.reflection)}`;
            }
            if (entry.bodyResponse) {
                return `Body Response... ${truncateText(entry.bodyResponse)}`;
            }
            if (entry.visualization) {
                return `Visualization... ${truncateText(entry.visualization)}`;
            }
            return 'Reflection...';
        }
        if (entry.type === 'emotionMapping') {
            return `The situation... ${truncateText(entry.emotionMapping)}`;
        }
        if (entry.type === 'inAction') {
            return `Activity... ${truncateText(entry.inAction)}`;
        }
        // For other types, return placeholder (to be implemented when those screens are built)
        return 'Entry...';
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
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                {getTitle()}
            </Text>

            {/* Description Snippet */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {getSnippet()}
            </Text>
        </View>
    );
};

