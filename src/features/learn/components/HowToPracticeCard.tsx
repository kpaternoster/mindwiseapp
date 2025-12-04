import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface HowToPracticeCardProps {
    steps: string[];
}

export const HowToPracticeCard: React.FC<HowToPracticeCardProps> = ({
    steps,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{
                backgroundColor: colors.orange_50,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                How to Practice
            </Text>
            {steps.map((step, index) => (
                <View key={index} className="flex-row items-start mb-4">
                    <View
                        className="w-8 h-8 rounded-full items-center justify-center mr-4"
                        style={{ backgroundColor: colors.button_orange }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.white }]}>
                            {index + 1}
                        </Text>
                    </View>
                    <Text
                        style={[t.textRegular, { color: colors.text_secondary }]}
                        className="flex-1 mt-1"
                    >
                        {step}
                    </Text>
                </View>
            ))}
        </View>
    );
};

