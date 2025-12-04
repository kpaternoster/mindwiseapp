import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { WarningFillIcon } from '@components/Utils';

interface WarningBoxProps {
    initialGuess: string;
    selectedEmotion: string;
    instruction: string;
}

export const WarningBox: React.FC<WarningBoxProps> = ({
    initialGuess,
    selectedEmotion,
    instruction,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4 flex-col items-start"
            style={{ backgroundColor: colors.orange_50 }}
        >
            <View className="mr-3 mt-1 flex-row">
                <WarningFillIcon size={24} color={colors.warm_dark} />
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-4">
                    Your initial guess was "{initialGuess}" but you selected "{selectedEmotion}"
                </Text>
            </View>
            <View className="mt-2">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {instruction}
                </Text>
            </View>
        </View>
    );
};

