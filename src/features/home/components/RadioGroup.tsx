import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

export interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    options: RadioOption[];
    selected: string;
    onSelect: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    options,
    selected,
    onSelect,
}) => {
    return (
        <View>
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    className="flex-row items-center py-3"
                    onPress={() => onSelect(option.value)}
                >
                    <View
                        className="w-5 h-5 rounded-full border-2 items-center justify-center mr-3"
                        style={{
                            borderColor: selected === option.value ? colors.orange_500 : colors.stroke_orange,
                        }}
                    >
                        {selected === option.value && (
                            <View
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors.orange_500 }}
                            />
                        )}
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                        {option.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

