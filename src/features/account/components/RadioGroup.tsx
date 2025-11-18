import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import Svg, { Circle } from 'react-native-svg';

// Radio Button Icon
const RadioButton = ({ selected = false }: { selected?: boolean }) => (
    <Svg width={20} height={20} viewBox="0 0 20 20">
        <Circle
            cx="10"
            cy="10"
            r="9"
            stroke={colors.orange_500}
            strokeWidth="1.5"
            fill="none"
        />
        {selected && <Circle cx="10" cy="10" r="5" fill={colors.orange_500} />}
    </Svg>
);

interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    question: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    question,
    options,
    value,
    onChange,
}) => {
    return (
        <View className="mt-4">
            <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-3">
                {question}
            </Text>
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    onPress={() => onChange(option.value)}
                    className="flex-row items-center mb-3"
                >
                    <RadioButton selected={value === option.value} />
                    <Text style={[t.textMedium, { color: colors.text_secondary }]} className="ml-2">
                        {option.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

