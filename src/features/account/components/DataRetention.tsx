import React from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon, TrashIcon } from '@components/Utils';
import Svg, { Path } from 'react-native-svg';

interface RetentionPeriod {
    id: string;
    label: string;
    value: string;
    description: string;
    options: { value: string; label: string }[];
}

interface AutoDelete {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

interface DataRetentionProps {
    retentionPeriod: RetentionPeriod;
    autoDelete: AutoDelete;
    onRetentionChange: (value: string) => void;
    onAutoDeleteToggle: (value: boolean) => void;
    onExportData: () => void;
    onDeleteAllData: () => void;
    showRetentionPicker: boolean;
    onToggleRetentionPicker: () => void;
}

export const DataRetention: React.FC<DataRetentionProps> = ({
    retentionPeriod,
    autoDelete,
    onRetentionChange,
    onAutoDeleteToggle,
    onExportData,
    onDeleteAllData,
    showRetentionPicker,
    onToggleRetentionPicker,
}) => {
    return (
        <View className="p-4 mb-6 mx-6 border border-gray-200 rounded-2xl">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                Data Retention
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                Control how long your data is stored
            </Text>

            <View className="rounded-2xl p-4" style={{ backgroundColor: colors.white }}>
                {/* Data Retention Period */}
                <View className="mb-4">
                    <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                        {retentionPeriod.label}
                    </Text>
                    <Pressable
                        onPress={onToggleRetentionPicker}
                        className="flex-row items-center justify-between rounded-full px-4 py-4 border mb-2 mt-2 border-gray-200"
                        style={{ backgroundColor: colors.white }}
                    >
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {retentionPeriod.value}
                        </Text>
                        <DownIcon size={12} color={colors.text_secondary} />
                    </Pressable>
                    

                    {/* Retention Period Options */}
                    {showRetentionPicker && (
                        <View className="mb-2 rounded-xl overflow-hidden border" style={{ backgroundColor: colors.white, borderColor: colors.gray_200 }}>
                            {retentionPeriod.options.map((option, index) => (
                                <Pressable
                                    key={option.value}
                                    onPress={() => {
                                        onRetentionChange(option.label);
                                        onToggleRetentionPicker();
                                    }}
                                    className="px-4 py-3"
                                    style={[
                                        index !== retentionPeriod.options.length - 1 && {
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
                                                    retentionPeriod.value === option.label
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
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]} className="text-xs">
                        {retentionPeriod.description}
                    </Text>
                </View>

                {/* Auto-Delete Inactive Data */}
                <View className="mb-6">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="flex-1 mr-4">
                            {autoDelete.label}
                        </Text>
                        <Switch
                            value={autoDelete.enabled}
                            onValueChange={onAutoDeleteToggle}
                            trackColor={{
                                false: colors.gray_200,
                                true: colors.orange_500,
                            }}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray_200}
                        />
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {autoDelete.description}
                    </Text>
                </View>
                <View className='h-[1px] bg-gray-200 mb-4'></View>

                {/* Export Data Button */}
                <Pressable
                    onPress={onExportData}
                    className="py-4 rounded-full items-center justify-center mb-3"
                    style={{ backgroundColor: colors.orange_500 }}
                >
                    <Text style={[t.button, { color: colors.warm_dark }]}>
                        Export My Data
                    </Text>
                </Pressable>

                {/* Delete All Data */}
                <Pressable
                    onPress={onDeleteAllData}
                    className="flex-row items-center justify-center pt-4"
                >
                    <Text style={[t.button, { color: colors.red_light }]} className="mr-4">
                        Delete All My Data
                    </Text>
                    <TrashIcon size={16} color={colors.red_light} />
                </Pressable>
            </View>
        </View>
    );
};

