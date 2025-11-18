import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface InfoBlockProps {
    title?: string;
    description: string;
    isHighlight?: boolean;
    textColor?: string;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    description,
    isHighlight = false,
    textColor = colors.text_secondary,
}) => {
    return (
        <View
            className="p-4 rounded-xl mb-3"
            style={{
                backgroundColor: colors.orange_50,
                borderLeftWidth: isHighlight ? 3 : 0,
                borderLeftColor: isHighlight ? colors.gray_400 : 'transparent',
            }}
        >
            {title && (
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                    {title}
                </Text>
            )}
            <Text style={[t.textRegular, { color: textColor }]}>
                {description}
            </Text>
        </View>
    );
};

