import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon } from '@components/Utils';
import { LearningPreferenceButton } from './LearningPreferenceButton';

interface SkillCardProps {
    title: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    tags: string[];
    onPress?: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
    title,
    duration,
    difficulty,
    description,
    tags,
    onPress,
}) => {
    const [selectedPreference, setSelectedPreference] = useState<'read' | 'watch' | 'listen' | 'chat'>('read');

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
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            {/* Header with title and tags */}
            <View className="flex-row items-center justify-between mb-2">
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="flex-1">
                    {title}
                </Text>
                <View className="flex-row gap-2 ml-2">
                    <View
                        className="px-3 py-1 rounded-full"
                        style={{ backgroundColor: colors.orange_opacity_10 }}
                    >
                        <Text style={[t.footnoteBold, { color: colors.orange_600 }]}>
                            {duration}
                        </Text>
                    </View>
                    <View
                        className="px-3 py-1 rounded-full"
                        style={{ backgroundColor: getDifficultyColor() }}
                    >
                        <Text style={[t.footnoteBold, { color: getDifficultyTextColor() }]}>
                            {difficulty}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Description */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                {description}
            </Text>

            {/* Choose learning method */}
            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Choose learning method:
            </Text>
            <View className="flex-row justify-between mb-4">
                <LearningPreferenceButton
                    type="read"
                    isSelected={selectedPreference === 'read'}
                    onPress={() => setSelectedPreference('read')}
                    isButtonStyle={false}
                />
                <LearningPreferenceButton
                    type="watch"
                    isSelected={selectedPreference === 'watch'}
                    onPress={() => setSelectedPreference('watch')}
                    isButtonStyle={false}
                />
                <LearningPreferenceButton
                    type="listen"
                    isSelected={selectedPreference === 'listen'}
                    onPress={() => setSelectedPreference('listen')}
                    isButtonStyle={false}
                />
                <LearningPreferenceButton
                    type="chat"
                    isSelected={selectedPreference === 'chat'}
                    onPress={() => setSelectedPreference('chat')}
                    isButtonStyle={false}
                />
            </View>

            {/* Do Exercise Button */}
            <Pressable
                className="rounded-full py-3 px-3 flex-row items-center justify-center mb-3"
                style={{ backgroundColor: colors.Button_Orange }}
                onPress={onPress}
            >
                <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                    Do Exercise
                </Text>
                <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                    <ArrowRightIcon size={16} color={colors.icon} />
                </View>
            </Pressable>

            {/* Tags */}
            <View className="flex-row flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <View
                        key={index}
                        className="px-3 py-1 rounded-full"
                        style={{ backgroundColor: colors.gray_tag_background }}
                    >
                        <Text style={[t.footnoteRegular, { color: colors.gray_tag_text }]}>
                            {tag}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

