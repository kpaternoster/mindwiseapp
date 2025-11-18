import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon, UpIcon } from '@components/Utils';

interface DropdownOption {
    value: string;
    label: string;
}

interface SettingsDropdownProps {
    label: string;
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
    label,
    value,
    options,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View className="mb-4">
            <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                {label}
            </Text>
            <Pressable
                onPress={() => setIsOpen(!isOpen)}
                className="flex-row items-center justify-between rounded-full px-4 py-4 border"
                style={{ backgroundColor: colors.white, borderColor: colors.gray_200 }}
            >
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {value}
                </Text>
                {
                    isOpen ? <UpIcon size={12} color={colors.text_secondary} /> : <DownIcon size={12} color={colors.text_secondary} />
                }
            </Pressable>

            {/* Dropdown Options */}
            {isOpen && (
                <View className="mt-2 rounded-xl overflow-hidden border" style={{ backgroundColor: colors.white, borderColor: colors.gray_200 }}>
                    {options.map((option, index) => (
                        <Pressable
                            key={option.value}
                            onPress={() => {
                                onChange(option.label);
                                setIsOpen(false);
                            }}
                            className="px-4 py-3"
                            style={[
                                index !== options.length - 1 && {
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
                                            value === option.label
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
    );
};

