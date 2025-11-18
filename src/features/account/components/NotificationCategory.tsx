import React from 'react';
import { View, Text, Switch } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface NotificationCategoryProps {
    label: string;
    description: string;
    enabled: boolean;
    locked?: boolean;
    note?: string;
    onChange: (value: boolean) => void;
}

export const NotificationCategory: React.FC<NotificationCategoryProps> = ({
    label,
    description,
    enabled,
    locked = false,
    note,
    onChange,
}) => {
    return (
        <View className="py-2">
            <View className="flex-row items-center justify-between mb-1">
                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="flex-1 mr-4">
                    {label}
                </Text>

            </View>
            <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-col mr-2'>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {description}
                    </Text>
                    {note && (
                        <Text style={[t.footnoteBold, { color: colors.Text_Primary }]} className="mt-1 text-xs">
                            {note}
                        </Text>
                    )}
                </View>
                <Switch
                    value={enabled}
                    onValueChange={onChange}
                    disabled={locked}
                    trackColor={{
                        false: colors.gray_200,
                        true: colors.orange_500,
                    }}
                    thumbColor={colors.white}
                    ios_backgroundColor={colors.gray_200}
                />
            </View>

        </View>
    );
};

