import React from 'react';
import { View, Text, Switch } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

export interface Permission {
    id: string;
    label: string;
    enabled: boolean;
}

interface SharingPermissionsProps {
    permissions: Permission[];
    onToggle: (id: string, value: boolean) => void;
}

export const SharingPermissions: React.FC<SharingPermissionsProps> = ({
    permissions,
    onToggle,
}) => {
    return (
        <View className="px-6 mb-4">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Sharing Permissions
            </Text>
            <View className="rounded-2xl p-4" style={{ backgroundColor: colors.gray_100 }}>
                {permissions.map((permission, index) => (
                    <View
                        key={permission.id}
                        className={`flex-row items-center justify-between ${
                            index !== permissions.length - 1 ? 'pb-4' : ''
                        }`}
                    >
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="flex-1">
                            {permission.label}
                        </Text>
                        <Switch
                            value={permission.enabled}
                            onValueChange={(value) => onToggle(permission.id, value)}
                            trackColor={{
                                false: colors.gray_200,
                                true: colors.orange_500,
                            }}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray_200}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

