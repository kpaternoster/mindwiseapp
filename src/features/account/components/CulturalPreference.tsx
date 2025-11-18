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

interface CulturalPreferenceProps {
    label: string;
    question: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const CulturalPreference: React.FC<CulturalPreferenceProps> = ({
    label,
    question,
    value,
    onChange,
}) => {
    return (
        <View className="rounded-xl p-4 mb-3 border" style={{ backgroundColor: colors.white, borderColor: colors.orange_200 }}>
            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-2">
                {label}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                {question}
            </Text>
            <View className="flex-row gap-6">
                <Pressable
                    onPress={() => onChange(true)}
                    className="flex-row items-center"
                >
                    <RadioButton selected={value === true} />
                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="ml-2">
                        Yes
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => onChange(false)}
                    className="flex-row items-center"
                >
                    <RadioButton selected={value === false} />
                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="ml-2">
                        No
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

