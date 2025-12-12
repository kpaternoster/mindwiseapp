import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

interface RecognizingDialecticalDilemmasEntry {
    id: string;
    date: string;
    time?: string;
    situationDilemma?: string;
    extreme1?: string;
    extreme2?: string;
    truth1?: string;
    truth2?: string;
    middlePathPerspective?: string;
}

interface RecognizingDialecticalDilemmasEntryCardProps {
    entry: RecognizingDialecticalDilemmasEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const RecognizingDialecticalDilemmasEntryCard: React.FC<RecognizingDialecticalDilemmasEntryCardProps> = ({
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
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Recognizing Dialectical Dilemmas
            </Text>

            {/* Situation */}
            {entry.situationDilemma && (
                <View className="mb-2">
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Situation:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.situationDilemma.length > 100 
                            ? `${entry.situationDilemma.substring(0, 100)}...` 
                            : entry.situationDilemma}
                    </Text>
                </View>
            )}

            {/* Middle Path Perspective */}
            {entry.middlePathPerspective && (
                <View>
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Middle Path Perspective:
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.middlePathPerspective.length > 100 
                            ? `${entry.middlePathPerspective.substring(0, 100)}...` 
                            : entry.middlePathPerspective}
                    </Text>
                </View>
            )}
        </View>
    );
};

