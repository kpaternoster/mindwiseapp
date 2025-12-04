import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { EyeIcon } from '@components/Utils';

interface EmptyStateProps {
    title: string;
    description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
}) => {
    return (
        <View className="items-center justify-center py-12">
            <View className="relative mb-4">
                <EyeIcon size={64} color={colors.orange_150} fill={colors.orange_150} />
                <View
                    className="absolute w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: colors.orange_dark, top: -4, right: -4 }}
                >
                    <Text style={[t.footnoteRegular, { color: colors.white }]}>
                        0
                    </Text>
                </View>
            </View>
            <Text style={[t.title32SemiBold, { color: colors.Text_Primary }]} className="mb-4 text-center px-8">
                {title}
            </Text>
            <Text style={[t.textMedium, { color: colors.text_secondary }]} className="text-center">
                {description}
            </Text>
        </View>
    );
};

