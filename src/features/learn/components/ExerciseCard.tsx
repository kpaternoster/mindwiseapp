import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, CaretRightIcon } from '@components/Utils';

interface ExerciseCardProps {
    number: number;
    title: string;
    description: string;
    onPress?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
    number,
    title,
    description,
    onPress,
}) => {
    return (
        <Pressable
            className="bg-white rounded-2xl p-4 mb-4 flex-col items-center"
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
                        style={{ backgroundColor: colors.button_orange }}
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
            <View className="flex-1">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            </View>
        </Pressable>
    );
};

