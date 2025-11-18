import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { AddressBookIcon, CaretRightIcon, HeartIcon, InfoIcon, SettingIcon, ShiedIcon, SignoutIcon } from '@components/Utils';

const HeartIconMock = ({ size = 20 }: { size?: number }) => (
    <HeartIcon size={size} color={colors.orange_500} />
);

const UsersIconMock = ({ size = 20 }: { size?: number }) => (
    <AddressBookIcon size={size} color={colors.orange_500} />
);

const ShieldIconMock = ({ size = 20 }: { size?: number }) => (
    <ShiedIcon size={size} color={colors.orange_500} />
);

const SettingsIconMock = ({ size = 20 }: { size?: number }) => (
    <SettingIcon size={size} color={colors.orange_500} />
);

const InfoIconMock = ({ size = 20 }: { size?: number }) => (
    <InfoIcon size={size} color={colors.orange_500} />
);

const LogoutIconMock = ({ size = 18 }: { size?: number }) => (
    <SignoutIcon size={size} color={colors.muted_coral} />
);


interface AccountOption {
    id: string;
    label: string;
    icon: string;
    route: string;
}

interface AccountOptionsListProps {
    options: AccountOption[];
    onOptionPress: (route: string) => void;
}

const IconMap: Record<string, React.FC<{ size?: number }>> = {
    heart: HeartIconMock,
    users: UsersIconMock,
    shield: ShieldIconMock,
    settings: SettingsIconMock,
    info: InfoIconMock,
    logout: LogoutIconMock
};

export const AccountOptionsList: React.FC<AccountOptionsListProps> = ({
    options,
    onOptionPress,
}) => {
    return (
        <View className="mt-2">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3 px-6">
                Account Options
            </Text>
            <View className="px-6">
                {options.map((option) => {
                    const IconComponent = IconMap[option.icon] || HeartIconMock;
                    return (
                        <Pressable
                            key={option.id}
                            className="flex-row items-center justify-between rounded-xl p-2 px-4 mb-3" style={{ backgroundColor: option.id === 'logout' ? colors.white : colors.gray_100 }}
                            onPress={() => onOptionPress(option.route)}
                        >
                            <View className="flex-row items-center flex-1">
                                <View className="w-10 h-10 items-center justify-center mr-3">
                                    <IconComponent size={option.icon === 'logout' ? 18 : 20} />
                                </View>
                                <Text style={[t.textSemiBold, { color: option.id === 'logout' ? colors.muted_coral : colors.Text_Primary }]} className="flex-1">
                                    {option.label}
                                </Text>
                            </View>
                            <CaretRightIcon size={16} color={colors.Text_Primary} />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};
