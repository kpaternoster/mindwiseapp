import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { HeartIcon } from '@components/Utils';

interface ReminderCardProps {
    title: string;
    content: string;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
    title,
    content,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4 flex-row items-start flex-col"
            style={{ backgroundColor: colors.orange_50 }}
        >
            <View className='flex-row items-center mb-3'>
                <HeartIcon size={24} color={colors.orange_500} />
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-4">
                    {title}
                </Text>
            </View>
            <View className="flex-1">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {content}
                </Text>
            </View>
        </View>
    );
};

