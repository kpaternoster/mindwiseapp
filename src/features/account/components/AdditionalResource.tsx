import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ExternalLinkIcon } from '@components/Utils';


interface AdditionalResourceProps {
    title: string;
    description: string;
    onPress: () => void;
}

export const AdditionalResource: React.FC<AdditionalResourceProps> = ({
    title,
    description,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center justify-between p-4 rounded-xl border-gray-200 mb-4 border"
            style={{ borderBottomColor: colors.gray_200 }}
        >
            <View className="flex-1 mr-3">
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    {title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            </View>
            <ExternalLinkIcon size={16} color={colors.gray_medium} />
        </Pressable>
    );
};

