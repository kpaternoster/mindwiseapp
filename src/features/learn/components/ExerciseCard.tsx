import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, CaretRightIcon } from '@components/Utils';

interface ExerciseCardProps {
    number?: number;
    title: string;
    description: string;
    duration?: string;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    tags?: string[];
    onPress?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
    number,
    title,
    description,
    duration,
    difficulty,
    tags = [],
    onPress,
}) => {
    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'Beginner':
                return colors.yellow_light;
            case 'Intermediate':
                return colors.yellow_light;
            case 'Advanced':
                return colors.yellow_light;
            default:
                return colors.yellow_light;
        }
    };

    const getDifficultyTextColor = () => {
        switch (difficulty) {
            case 'Beginner':
                return colors.yellow_dark;
            case 'Intermediate':
                return colors.yellow_dark;
            case 'Advanced':
                return colors.yellow_dark;
            default:
                return colors.yellow_dark;
        }
    };
    return (
        <Pressable
            className="bg-white rounded-2xl p-4 mb-4 flex-col"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
            onPress={onPress}
        >
            <View className='flex-row w-full items-center justify-between mb-3'>
                <View className='flex-row items-center'>
                    <View
                        className="w-8 h-8 rounded-full items-center justify-center mr-4"
                        style={{ backgroundColor: colors.Button_Orange }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.white }]}>
                            {number}
                        </Text>
                    </View>

                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="">
                        {title}
                    </Text>

                </View>
                <ArrowRightIcon size={16} color={colors.gray_medium} />
            </View>
            {(duration || difficulty) && (
                <View className="flex-row items-center justify-start gap-2 mb-3">
                    {duration && (
                        <View
                            className="px-3 py-1 rounded-full"
                            style={{ backgroundColor: colors.orange_opacity_10 }}
                        >
                            <Text style={[t.footnoteBold, { color: colors.orange_600 }]}>
                                {duration}
                            </Text>
                        </View>
                    )}
                    {difficulty && (
                        <View
                            className="px-3 py-1 rounded-full"
                            style={{ backgroundColor: getDifficultyColor() }}
                        >
                            <Text style={[t.footnoteBold, { color: getDifficultyTextColor() }]}>
                                {difficulty}
                            </Text>
                        </View>
                    )}
                </View>
            )}
            <View className="flex-1 mb-3">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            </View>
            {/* Tags */}
            {tags.length > 0 && (
                <View className="flex-row flex-wrap items-center justify-start" style={{ gap: 8 }}>
                    {tags.map((tag, index) => (
                        <View
                            key={index}
                            className="px-3 py-1 rounded-full"
                            style={{ backgroundColor: colors.gray_200 }}
                        >
                            <Text style={[t.footnoteRegular, { color: colors.gray_tag_text }]}>
                                {tag}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </Pressable>
    );
};

