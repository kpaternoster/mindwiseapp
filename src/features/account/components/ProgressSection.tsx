import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon, GreenLeafIcon } from '@components/Utils';

export interface RecentReward {
    id: string;
    name: string;
    leaves: number;
    timeEarned: string;
}

export interface Progress {
    level: string;
    currentStage: number;
    totalStages: number;
    currentLeaves: number;
    leavesToNextStage: number;
    progressPercentage: number;
    recentRewards: RecentReward[];
}

interface ProgressSectionProps {
    progress: Progress | null;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ progress }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isRewardExpanded, setIsRewardExpanded] = useState(true);

    if (!progress) return null;

    return (
        <View className="p-4 rounded-xl mt-3" style={{ backgroundColor: colors.orange_100 }}>
            <Pressable
                className="flex-row items-center justify-between"
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={[t.textBold, { color: colors.Text_Primary }]}>
                    My progress
                </Text>
                {isExpanded ? (
                        <UpIcon size={14} color={colors.Text_Primary} />
                ) : (
                    <DownIcon size={14} color={colors.Text_Primary} />
                )}
            </Pressable>

            {isExpanded && (
                <View className="pt-3">
                    <View className="bg-white rounded-xl p-4">
                        <View className="mb-3">
                            <View className="flex flex-row items-center justify-between">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                                    {progress.level}
                                </Text>
                                <View className="flex-row items-center rounded-full px-3 py-1" style={{ backgroundColor: colors.orange_150 }}>
                                    <GreenLeafIcon size={16} />
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="ml-1">
                                        {progress.currentLeaves}
                                    </Text>
                                </View>
                            </View>
                            <View className="mt-2 flex flex-row justify-between">
                                <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                    Stages {progress.currentStage}/{progress.totalStages}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {progress.leavesToNextStage} leaves to next stage
                                </Text>
                            </View>
                        </View>

                        <View className="mb-2">
                            <View className="h-2 rounded overflow-hidden" style={{ backgroundColor: colors.gray_300 }}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        { width: `${progress.progressPercentage}%` },
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Recent Rewards Section */}
                        <View className="pt-3">
                            <Pressable
                                className="flex-row justify-between items-center mb-1"
                                onPress={() => setIsRewardExpanded(!isRewardExpanded)}
                            >
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                    Recent Rewards
                                </Text>
                                {isRewardExpanded ? (
                                    <UpIcon size={14} color={colors.Text_Primary} />
                                ) : (
                                    <DownIcon size={14} color={colors.Text_Primary} />
                                )}
                            </Pressable>

                            {isRewardExpanded && (
                                <View className="pt-2">
                                    {progress.recentRewards.map((reward) => (
                                        <View key={reward.id} className="flex-row justify-between items-center py-2">
                                            <Text style={[t.textMedium, { color: colors.text_secondary }]} className="flex-1">
                                                {reward.name}
                                            </Text>
                                            <View className="flex-row items-center">
                                                <GreenLeafIcon size={14} />
                                                <Text style={[t.captionBold, {color: colors.text_primary}]} className="ml-1">
                                                    +{reward.leaves} {reward.timeEarned}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.orange_500,
        borderRadius: 4,
    },
});
