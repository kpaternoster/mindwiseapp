import React from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon } from '@components/Utils';

interface SecuritySetting {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

interface LogoutTimeSetting {
    id: string;
    label: string;
    value: string;
    options: { value: string; label: string }[];
}

interface SecuritySettingsProps {
    appLock: SecuritySetting;
    automaticLogout: SecuritySetting;
    logoutTime: LogoutTimeSetting;
    onToggle: (id: string, value: boolean) => void;
    onLogoutTimeChange: (value: string) => void;
    showLogoutPicker: boolean;
    onToggleLogoutPicker: () => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
    appLock,
    automaticLogout,
    logoutTime,
    onToggle,
    onLogoutTimeChange,
    showLogoutPicker,
    onToggleLogoutPicker,
}) => {
    return (
        <View className="p-4 mb-6 mx-6 border border-gray-200 rounded-2xl">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                Security Settings
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                Protect your account and data
            </Text>

            <View className="mt-4" style={{ backgroundColor: colors.white }}>
                {/* App Lock */}
                <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                            {appLock.label}
                        </Text>
                        <Switch
                            value={appLock.enabled}
                            onValueChange={(value) => onToggle(appLock.id, value)}
                            trackColor={{
                                false: colors.gray_200,
                                true: colors.orange_500,
                            }}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray_200}
                        />
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {appLock.description}
                    </Text>
                </View>

                {/* Automatic Logout */}
                <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                            {automaticLogout.label}
                        </Text>
                        <Switch
                            value={automaticLogout.enabled}
                            onValueChange={(value) => onToggle(automaticLogout.id, value)}
                            trackColor={{
                                false: colors.gray_200,
                                true: colors.orange_500,
                            }}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray_200}
                        />
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {automaticLogout.description}
                    </Text>
                </View>

                {/* Logout Time Dropdown */}
                <View>
                    <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                        {logoutTime.label}
                    </Text>
                    <Pressable
                        onPress={onToggleLogoutPicker}
                        className="flex-row items-center justify-between rounded-full px-4 py-4 border border-gray-200"
                        style={{ backgroundColor: colors.white }}
                    >
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {logoutTime.value}
                        </Text>
                        <DownIcon size={12} color={colors.text_secondary} />
                    </Pressable>

                    {/* Logout Time Options */}
                    {showLogoutPicker && (
                        <View className="mt-2 rounded-xl overflow-hidden border" style={{ backgroundColor: colors.white, borderColor: colors.gray_200 }}>
                            {logoutTime.options.map((option, index) => (
                                <Pressable
                                    key={option.value}
                                    onPress={() => {
                                        onLogoutTimeChange(option.label);
                                        onToggleLogoutPicker();
                                    }}
                                    className="px-4 py-3"
                                    style={[
                                        index !== logoutTime.options.length - 1 && {
                                            borderBottomWidth: 1,
                                            borderBottomColor: colors.gray_200,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            t.textRegular,
                                            {
                                                color:
                                                    logoutTime.value === option.label
                                                        ? colors.orange_500
                                                        : colors.Text_Primary,
                                            },
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

