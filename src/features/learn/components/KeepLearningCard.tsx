import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import { TrophyIcon } from '@components/Utils';

interface KeepLearningCardProps {
    title: string;
    description: string;
}

export const KeepLearningCard: React.FC<KeepLearningCardProps> = ({
    title,
    description,
}) => {
    return (
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
                backgroundColor: colors.gray_100
            }}
        >
            <View className="flex-col items-start">
                <View
                    className="flex-row items-center mb-3"
                >
                    <TrophyIcon size={22} color={colors.orange_500} />
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-4">
                        {title}
                    </Text>
                </View>
                <View className="flex-1">
                    <View className="flex-row items-center flex-wrap">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {description}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

