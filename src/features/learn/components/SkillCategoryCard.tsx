import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CaretRightIcon } from '@components/Utils';

interface SkillCategoryCardProps {
    title: string;
    description: string;
    skillCount: number;
    progressPercentage: number;
    onPress: () => void;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({
    title,
    description,
    skillCount,
    progressPercentage,
    onPress,
}) => {
    const progressWidth = `${Math.max(progressPercentage, 2)}%` as `${number}%`;

    return (
        <Pressable
            className="bg-white rounded-2xl p-4 mb-3 mx-5 flex-row items-center"
            style={[{ borderColor: colors.stoke_gray, borderWidth: 1 }]}
            onPress={onPress}
        >
            <View className="flex-1">
                <View className="mb-3">
                    <View className='flex-row justify-between'>
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-1">
                            {title}
                        </Text>
                        <View>
                            <CaretRightIcon size={16} color={colors.black} />
                        </View>
                    </View>

                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                        {description}
                    </Text>

                </View>

                <View className="w-full">
                    <View className='flex-row justify-between mb-2'>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="text-xs">
                            {skillCount} {skillCount === 1 ? 'skill' : 'skills'}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="text-xs mb-1">
                            {progressPercentage}% Complete
                        </Text>
                    </View>

                    <View className="w-full">
                        <View
                            className="h-1 rounded overflow-hidden"
                            style={{ backgroundColor: colors.orange_100 }}
                        >
                            <View
                                className="h-full rounded"
                                style={{
                                    width: progressWidth,
                                    backgroundColor: colors.orange,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

