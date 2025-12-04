import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface StepHeaderProps {
    currentStep: number;
    totalSteps: number;
    stepTitle: string;
    stepSubtitle: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
    currentStep,
    totalSteps,
    stepTitle,
    stepSubtitle,
}) => {
    return (
        <View className="px-5 mb-6">
            {/* Step Title and Subtitle */}
            <View
                className="rounded-2xl p-4"
                style={{ backgroundColor: colors.cream_40 }}
            >
                <View className='flex-row items-center justify-between'>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                        Step {currentStep}:
                    </Text>
                    {/* Progress Indicator */}
                    <View className="flex-row justify-end mb-4 rounded-full px-3 py-1" style={{ backgroundColor: colors.orange_opacity_10 }}>
                        <Text style={[t.footnoteRegular, { color: colors.orange_600 }]}>
                            Step {currentStep} of {totalSteps}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                        {stepTitle}
                    </Text>
                </View>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {stepSubtitle}
                </Text>
            </View>
        </View>
    );
};

