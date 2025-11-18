import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon } from '@components/Utils';

interface CategoryAccordionProps {
    title: string;
    description: string;
    isExpanded: boolean;
    onToggle: () => void;
}

export const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
    title,
    description,
    isExpanded,
    onToggle,
}) => {
    return (
        <Pressable
            className="flex-row items-center justify-between p-4 mb-3 rounded-xl"
            style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.gray_200,
            }}
            onPress={onToggle}
        >
            <View className="flex-1 mr-3">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    {title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            </View>
            <View className="w-6 h-6 items-center justify-center">
                <DownIcon size={12} color={colors.text_secondary} />
            </View>
        </Pressable>
    );
};

