import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon } from '@components/Utils';

interface SUDSExerciseCardProps {
    number: number;
    title: string;
    description: string;
    tags?: string[];
    onPress?: () => void;
}

export const SUDSExerciseCard: React.FC<SUDSExerciseCardProps> = ({
    number,
    title,
    description,
    tags = [],
    onPress,
}) => {
    return (
        <Pressable
            className="bg-white rounded-2xl p-4 mb-4"
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

                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        {title}
                    </Text>
                </View>
                <ArrowRightIcon size={16} color={colors.gray_medium} />
            </View>
            
            <View className="mb-3">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            </View>

            {/* Tags */}
            {tags.length > 0 && (
                <View className="flex-row flex-wrap" style={{ gap: 8 }}>
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

