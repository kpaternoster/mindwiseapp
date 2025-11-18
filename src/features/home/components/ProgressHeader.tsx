import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ProgressHeaderProps {
    title: string;
    currentStep: number;
    totalSteps: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
    title,
    currentStep,
    totalSteps,
}) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <View className="mb-6">
            {/* Title */}
            <View className="flex-row items-center justify-between mb-3">
                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className='flex-1'>
                    {title}
                </Text>
                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                    {currentStep} of {totalSteps}
                </Text>
            </View>


            {/* Progress Bar and Count */}
            <View className="flex-row items-center">
                <View className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: colors.orange_100 }}>
                    <View
                        className="h-full rounded-full"
                        style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: colors.orange,
                        }}
                    />
                </View>

            </View>
        </View>
    );
};

