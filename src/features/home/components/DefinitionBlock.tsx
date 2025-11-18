import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface DefinitionBlockProps {
    title: string;
    description: string;
    example: string;
}

export const DefinitionBlock: React.FC<DefinitionBlockProps> = ({
    title,
    description,
    example,
}) => {
    return (
        <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                {title}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                {description}
            </Text>
            <View
                className="px-4 py-3 rounded-lg"
                style={{ backgroundColor: colors.orange_150 }}
            >
                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                    {example}
                </Text>
            </View>
        </View>
    );
};

