import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CheckIcon } from '@components/Utils';
import Svg, { Circle } from 'react-native-svg';

// Checkbox Icon
const CheckboxIcon = ({ checked = false }: { checked?: boolean }) => {
    if (checked) {
        return (
            <View className="w-5 h-5 rounded-full items-center justify-center">
                <CheckIcon size={16} color={colors.orange_500} />
            </View>
        );
    }
    return (
        <View className="w-5 h-5 items-center justify-center">
            <Svg width={20} height={20} viewBox="0 0 20 20">
                <Circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke={colors.orange_500}
                    strokeWidth="1.5"
                    fill="none"
                />
            </Svg>
        </View>

    );
};

interface HolidayCheckboxProps {
    label: string;
    description: string;
    selected: boolean;
    onChange: (value: boolean) => void;
}

export const HolidayCheckbox: React.FC<HolidayCheckboxProps> = ({
    label,
    description,
    selected,
    onChange,
}) => {
    return (
        <Pressable
            onPress={() => onChange(!selected)}
            className="flex-row items-center mb-3"
        >
            <CheckboxIcon checked={selected} />
            <View className="ml-4 flex-row">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {label} {""} ({description})
                </Text>
            </View>
        </Pressable>
    );
};

