import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { PencilSimpleIcon } from '@components/Utils';
// Edit icon will be added later

export interface SUDSEntry {
    id: string;
    date: string;
    sudsLevel: number;
    body: string;
    thoughts: string;
    urges: string;
    triggers: string;
}

interface SUDSEntryCardProps {
    entry: SUDSEntry;
    onEdit?: (entry: SUDSEntry) => void;
}

export const SUDSEntryCard: React.FC<SUDSEntryCardProps> = ({
    entry,
    onEdit,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month} - ${day} - ${year}`;
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
            {/* Header with Date and Edit */}
            <View className="flex-row items-center justify-between mb-3">
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                    {formatDate(entry.date)}
                </Text>
                {onEdit && (
                    <Pressable onPress={() => onEdit(entry)}>
                        <PencilSimpleIcon size={16} color={colors.icon} />
                    </Pressable>
                )}
            </View>
            <View className='bg-gray-200 mb-4' style={{ height: 2, width: '100%', backgroundColor: colors.stoke_gray }} />

            {/* SUDS Level */}
            <View className="mb-2">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    SUDS Level:{' '}
                    <Text style={[t.textBold, { color: colors.button_orange }]} >
                        {" "}{entry.sudsLevel}
                    </Text>
                </Text>
            </View>

            {/* Body */}
            {entry.body && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                        Body: {' '}<Text style={{ color: colors.text_secondary }}>{' '}{entry.body}</Text>
                    </Text>
                </View>
            )}

            {/* Thoughts */}
            {entry.thoughts && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                        Thoughts: {' '}<Text style={{ color: colors.text_secondary }}>{' '}{entry.thoughts}</Text>
                    </Text>
                </View>
            )}

            {/* Urges */}
            {entry.urges && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                        Urges: {' '}<Text style={{ color: colors.text_secondary }}>{' '}{entry.urges}</Text>
                    </Text>
                </View>
            )}

            {/* Triggers */}
            {entry.triggers && (
                <View className="mb-2">
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                        Triggers: {' '}<Text style={{ color: colors.text_secondary }}>{' '}{entry.triggers}</Text>
                    </Text>
                </View>
            )}
        </View>
    );
};

