import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface IntroCardProps {
    text: string;
    title?: string;
}

export const IntroCard: React.FC<IntroCardProps> = ({ text, title }) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{ backgroundColor: colors.cream_40 }}
        >
            {title && (
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                    {title}
                </Text>
            )}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {text}
            </Text>
        </View>
    );
};

