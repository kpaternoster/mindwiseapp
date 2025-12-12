import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

export interface DearManEntry {
    id: string;
    date: string;
    time?: string;
    script?: string;
    reflection?: string;
}

interface DearManEntryCardProps {
    entry: DearManEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

export const DearManEntryCard: React.FC<DearManEntryCardProps> = ({
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

    // Parse script to extract DEAR components
    const parseScript = (script: string = '') => {
        const lines = script.split('\n').filter(line => line.trim());
        const components: { [key: string]: string } = {
            describe: '',
            express: '',
            assert: '',
            reinforce: '',
        };

        lines.forEach(line => {
            const lowerLine = line.toLowerCase();
            if (lowerLine.startsWith('describe:')) {
                components.describe = line.replace(/^describe:\s*/i, '').trim();
            } else if (lowerLine.startsWith('express:')) {
                components.express = line.replace(/^express:\s*/i, '').trim();
            } else if (lowerLine.startsWith('assert:')) {
                components.assert = line.replace(/^assert:\s*/i, '').trim();
            } else if (lowerLine.startsWith('reinforce:')) {
                components.reinforce = line.replace(/^reinforce:\s*/i, '').trim();
            }
        });

        return components;
    };

    const scriptComponents = parseScript(entry.script);

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

            {/* DEAR MAN Script Section */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                DEAR MAN Script
            </Text>

            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                Describe: {scriptComponents.describe || 'The situation is...'}
            </Text>

            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                Express: {scriptComponents.express || 'I feel...'}
            </Text>

            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                Assert: {scriptComponents.assert || 'I need/want...'}
            </Text>

            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                Reinforce: {scriptComponents.reinforce || 'This would help because...'}
            </Text>

            {/* Practice Reflection Section */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                Practice Reflection
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {entry.reflection || 'After practicing, I noticed...'}
            </Text>
        </View>
    );
};

