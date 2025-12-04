import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface SelectedEmotionCardProps {
    emotion: string;
}

export const SelectedEmotionCard: React.FC<SelectedEmotionCardProps> = ({
    emotion,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{ backgroundColor: colors.cream_40 }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                You Selected{' '}
                <Text style={[t.title16SemiBold, { color: colors.button_orange }]}>
                    {emotion}
                </Text>
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-1">
                This is a {" "}
                <Text style={[t.textBold, { color: colors.text_secondary }]}>
                    Secondary
                </Text>
                {" "} emotion
            </Text>
        </View>
    );
};

