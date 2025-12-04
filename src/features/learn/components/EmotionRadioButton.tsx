import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface EmotionRadioButtonProps {
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

export const EmotionRadioButton: React.FC<EmotionRadioButtonProps> = ({
    label,
    isSelected,
    onPress,
}) => {
    return (
        <Pressable
            className="px-4 py-2 rounded-full mb-2 mr-2 flex-row items-center"
            style={{
                backgroundColor: isSelected ? colors.orange : colors.white,
                borderWidth: 1,
                borderColor: isSelected ? colors.orange : colors.stoke_gray,
            }}
            onPress={onPress}
        >
            {/* Radio Button Icon */}
            <View
                className="w-6 h-6 rounded-full mr-2 items-center justify-center"
                style={{
                    borderWidth: 2,
                    borderColor: isSelected ? colors.white : colors.gray_500,
                }}
            >
                {isSelected && (
                    <View
                        className="w-4 h-4 rounded-full"
                        style={{
                            backgroundColor: isSelected ? colors.white : 'transparent',
                        }}
                    >
                    </View>)
                }
            </View>
            <Text
                style={[
                    t.textRegular,
                    {
                        color: isSelected ? colors.white : colors.text_secondary,
                    },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
};

