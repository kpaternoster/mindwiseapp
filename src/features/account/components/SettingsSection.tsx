import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon } from '@components/Utils';

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
    title,
    children,
    defaultExpanded = true,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <View className="mx-6 mb-4 rounded-2xl">
            <Pressable
                className={`flex-row items-center justify-between px-4 py-4 border ${
                    isExpanded ? 'rounded-t-2xl rounded-b-0' : 'rounded-2xl'
                }`}
                style={{ backgroundColor: colors.orange_50, borderColor: colors.orange_150 }}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                    {title}
                </Text>
                {isExpanded ? (
                    <UpIcon size={14} color={colors.Text_Primary} />
                ) : (
                    <DownIcon size={14} color={colors.Text_Primary} />
                )}
            </Pressable>

            {isExpanded && (
                <View className="border border-gray-200 rounded-b-2xl border-t-0 pt-4 px-4 pb-4">
                    {children}
                </View>
            )}
        </View>
    );
};

