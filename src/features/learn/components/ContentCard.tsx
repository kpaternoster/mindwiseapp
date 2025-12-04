import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ContentCardProps {
    title: string;
    content: string;
    backgroundColor?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
    title,
    content,
    backgroundColor
}) => {
    return (
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
                backgroundColor: backgroundColor?? colors.white
            }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                {title}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {content}
            </Text>
        </View>
    );
};

