import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface IdentifiedEmotionCardProps {
    emotion: string;
}

export const IdentifiedEmotionCard: React.FC<IdentifiedEmotionCardProps> = ({
    emotion,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{
                backgroundColor: colors.cream_40,
            }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                You Identified{' '}
                <Text style={[t.title16SemiBold, { color: colors.button_orange }]}>
                    {emotion}
                </Text>
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-2">
                Now let's explore what this emotion might be telling you
            </Text>
        </View>
    );
};

