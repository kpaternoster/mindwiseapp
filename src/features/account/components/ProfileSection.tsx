import React from 'react';
import { View, Text } from 'react-native';
import { t } from '@design/typography';
import AvatarIcon from '@assets/illus/avatar.svg';
import { colors } from '@design/color';

interface ProfileSectionProps {
    name: string;
    memberSince: string;
    isLoading?: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    name,
    memberSince,
    isLoading = false,
}) => {
    return (
        <View className="rounded-2xl p-4">
            <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: colors.orange_900 }}>
                    <AvatarIcon width={42} height={42} />
                </View>
                <View className="ml-3 flex-1">
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                        {isLoading ? 'Loading...' : name}
                    </Text>
                    <Text style={[t.textMedium, { color: colors.text_secondary }]} className="mt-1">
                        {isLoading ? '' : `Member since ${memberSince}`}
                    </Text>
                </View>
            </View>
        </View>
    );
};
