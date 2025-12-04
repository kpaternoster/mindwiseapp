import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface PracticeIntroCardProps {
    title: string;
    description: string;
}

export const PracticeIntroCard: React.FC<PracticeIntroCardProps> = ({
    title,
    description,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{ backgroundColor: colors.cream_40 }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                {title}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {description}
            </Text>
        </View>
    );
};

