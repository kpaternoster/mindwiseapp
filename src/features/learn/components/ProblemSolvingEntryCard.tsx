import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, TrashIcon, EyeIcon } from '@components/Utils';

export interface ProblemSolvingEntry {
    id: string;
    date: string; // ISO string
    problem: string;
    options: string[];
    chosenSolution?: string;
    implementation?: string;
    specificSteps?: string;
    reflection?: string;
}

interface ProblemSolvingEntryCardProps {
    entry: ProblemSolvingEntry;
    onView?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const ProblemSolvingEntryCard: React.FC<ProblemSolvingEntryCardProps> = ({
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
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${day} ${month} ${year}, ${displayHours}:${displayMinutes} ${ampm}`;
    };

    const optionsCount = entry.options.filter(o => o.trim() !== '').length;
    const hasSolution = entry.chosenSolution && entry.chosenSolution.trim() !== '';

    return (
        <View
            className="rounded-2xl p-4 mb-4 bg-white"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with Date and Actions */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center px-2 py-1 rounded-full" style={{backgroundColor: colors.orange_opacity_10}}>
                    <CalendarBlankIcon size={16} color={colors.orange_600} />
                    <Text style={[t.footnoteRegular, { color: colors.orange_600 }]} className="ml-2">
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

            {/* Problem Text */}
            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-2">
                {entry.problem || '[State the Problem Clearly]'}
            </Text>

            {/* Summary */}
            <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                {optionsCount} {optionsCount === 1 ? 'option' : 'options'}. {hasSolution ? 'Solutions...' : 'No solution yet.'}
            </Text>
        </View>
    );
};

