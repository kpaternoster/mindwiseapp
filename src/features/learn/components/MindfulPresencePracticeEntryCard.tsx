import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon, EyeIcon } from '@components/Utils';

export interface MindfulPresencePracticeEntry {
    id: string;
    date: string; // ISO string
    object?: string;
    customObject?: string;
    bodyAwareness?: string;
    objectObservation?: string;
    thoughtVisualization?: string;
    reflection?: string;
}

interface MindfulPresencePracticeEntryCardProps {
    entry: MindfulPresencePracticeEntry;
    onView?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const MindfulPresencePracticeEntryCard: React.FC<MindfulPresencePracticeEntryCardProps> = ({
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
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Only show time if hours or minutes are set (not midnight)
        if (hours !== 0 || minutes !== 0) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${day} ${month} ${year}, ${displayHours}:${displayMinutes} ${ampm}`;
        }
        return `${day} ${month} ${year}`;
    };

    const getObjectDescription = () => {
        if (entry.customObject && entry.customObject.trim() !== '') {
            return entry.customObject;
        }
        if (entry.object) {
            return entry.object;
        }
        return 'No object selected';
    };

    const objectDescription = getObjectDescription();
    const truncatedObject = objectDescription.length > 30 
        ? `${objectDescription.substring(0, 30)}...` 
        : objectDescription;

    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
                backgroundColor: colors.white,
            }}
        >
            {/* Header with Date and Actions */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center rounded-full px-2 py-1" 
                style={{
                    backgroundColor: colors.orange_50,
                }}
                >
                    <CalendarBlankIcon size={16} color={colors.orange_600} />
                    <Text style={[t.footnoteBold, { color: colors.orange_600 }]} className="ml-2">
                        {formatDate(entry.date)}
                    </Text>
                </View>
                <View className="flex-row items-center gap-4">
                    {onView && (
                        <Pressable onPress={() => onView(entry.id)}>
                            <EyeIcon size={18} color={colors.text_secondary} />
                        </Pressable>
                    )}
                    {onDelete && (
                        <Pressable onPress={() => onDelete(entry.id)}>
                            <TrashIcon size={15} color={colors.crisis} />
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Practice Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                Mindful Presence Practice
            </Text>

            {/* Object Description */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                Object: {truncatedObject}
            </Text>
        </View>
    );
};

