import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ProgressSectionProps {
    completedSkills: number;
    totalSkills: number;
    progressPercentage: number;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
    completedSkills,
    totalSkills,
    progressPercentage,
}) => {
    const progressWidth = `${progressPercentage}%` as `${number}%`;

    return (
        <View className="px-5 mb-6">
            <View className="flex-row items-center justify-between mb-3">
                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                    Progress
                </Text>
                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                    {completedSkills}/{totalSkills} skills
                </Text>
            </View>
            <View className="h-2.5 rounded-full" style={{ backgroundColor: colors.orange_100 }}>
                <View
                    className="h-full rounded-full"
                    style={{
                        width: progressWidth,
                        backgroundColor: colors.orange,
                    }}
                />
            </View>
        </View>
    );
};

