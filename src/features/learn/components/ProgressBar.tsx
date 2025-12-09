import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    currentStep,
    totalSteps,
}) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <View className="flex px-5 mb-4">
            {/* Step Text */}
            <View className="flex-row items-center justify-center mb-2">
                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                    {currentStep} of {totalSteps}
                </Text>
            </View>

            {/* Progress Bar */}
            <View className="h-1.5 rounded-full w-full mb-2" style={{ backgroundColor: colors.gray_200 }}>
                <View
                    className="h-full rounded-full"
                    style={{
                        width: `${progressPercentage}%`,
                        backgroundColor: colors.orange,
                    }}
                />
            </View>
        </View>
    );
};

