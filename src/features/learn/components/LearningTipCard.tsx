import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface LearningTipCardProps {
    tip: string;
}

export const LearningTipCard: React.FC<LearningTipCardProps> = ({
    tip,
}) => {
    return (
        <View 
            className="rounded-2xl p-4 mt-2 mx-5 mb-3"
            style={{ backgroundColor: colors.gray_100, borderColor: colors.stoke_gray, borderWidth: 1 }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                Learning Tip
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {tip}
            </Text>
        </View>
    );
};

