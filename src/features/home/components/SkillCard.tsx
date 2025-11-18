import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface SkillCardProps {
    title: string;
    description: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ title, description }) => {
    return (
        <View
            className="px-4 py-3 rounded-lg mb-3"
            style={{ backgroundColor: colors.orange_50 }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                {title}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {description}
            </Text>
        </View>
    );
};

