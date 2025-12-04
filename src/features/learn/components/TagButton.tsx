import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface TagButtonProps {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    isEmotion?: boolean;
}

export const TagButton: React.FC<TagButtonProps> = ({
    label,
    isSelected,
    onPress,
    isEmotion = false,
}) => {
    return (
        <Pressable
            className="px-4 py-2 rounded-xl mb-2 mr-2"
            style={{
                backgroundColor: isSelected
                    ? (isEmotion ? colors.orange : colors.orange_50)
                    : colors.white,
                borderWidth: 1,
                borderColor: colors.orange_400
            }}
            onPress={onPress}
        >
            <Text
                style={[
                    t.textRegular,
                    {
                        color: isSelected
                            ? (isEmotion ? colors.white : colors.orange_600)
                            : colors.text_secondary,
                    },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
};

