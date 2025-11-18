import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon } from '@components/Utils';

interface EmotionFunctionCardProps {
    emotion: string;
    function: string;
    backgroundColor: string;
    textColor: string;
}

export const EmotionFunctionCard: React.FC<EmotionFunctionCardProps> = ({
    emotion,
    function: emotionFunction,
    backgroundColor,
    textColor,
}) => {
    return (
        <View
            className="px-4 py-3 rounded-xl mb-2 flex-row items-center gap-3"
            style={{ backgroundColor }}
        >
            <Text style={[t.textSemiBold, { color: textColor }]}>{emotion}</Text>
            <ArrowRightIcon size={12} />
            <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                {emotionFunction}
            </Text>
        </View>
    );
};

