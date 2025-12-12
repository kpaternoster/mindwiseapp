import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ContentCardProps {
    title: string;
    content: string;
    backgroundColor?: string;
}

const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // Remove the ** markers and render as bold
            const boldText = part.slice(2, -2);
            return (
                <Text key={index} style={[t.textSemiBold, { color: colors.text_secondary }]}>
                    {boldText}
                </Text>
            );
        }
        return (
            <Text key={index} style={[t.textRegular, { color: colors.text_secondary }]}>
                {part}
            </Text>
        );
    });
};

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
                {renderFormattedText(content)}
            </Text>
        </View>
    );
};

