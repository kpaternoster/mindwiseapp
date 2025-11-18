import React from 'react';
import { View, Text, Switch } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

export interface PrivacyControl {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

interface DataPrivacyControlsProps {
    controls: PrivacyControl[];
    onToggle: (id: string, value: boolean) => void;
}

export const DataPrivacyControls: React.FC<DataPrivacyControlsProps> = ({
    controls,
    onToggle,
}) => {
    return (
        <View className="p-4 mb-6 mx-6 border border-gray-200 rounded-2xl">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                Data Privacy Controls
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                Granular control over your data usage
            </Text>

            <View className="pt-4" style={{ backgroundColor: colors.white }}>
                {controls.map((control, index) => (
                    <View
                        key={control.id}
                        className={index !== controls.length - 1 ? 'mb-4' : ''}
                    >
                        <View className="flex-row items-center justify-between mb-1">
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="flex-1 mr-4">
                                {control.label}
                            </Text>
                            <Switch
                                value={control.enabled}
                                onValueChange={(value) => onToggle(control.id, value)}
                                trackColor={{
                                    false: colors.gray_200,
                                    true: colors.orange_500,
                                }}
                                thumbColor={colors.white}
                                ios_backgroundColor={colors.gray_200}
                            />
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {control.description}
                        </Text>
                        {
                            control.id === 'location_tracking' && (
                                <View className='h-[1px] bg-gray-200 mt-4'></View>
                            )
                        }
                    </View>
                ))}
            </View>
        </View>
    );
};

