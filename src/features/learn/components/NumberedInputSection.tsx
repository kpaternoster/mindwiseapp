import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface NumberedInputSectionProps {
    number: number;
    title: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

export const NumberedInputSection: React.FC<NumberedInputSectionProps> = ({
    number,
    title,
    placeholder,
    value,
    onChangeText,
}) => {
    return (
        <View className="mb-6 border border-gray-200 rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
                <View
                    className="w-8 h-8 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: colors.button_orange }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                        {number}
                    </Text>
                </View>
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    {title}
                </Text>
            </View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.text_secondary}
                style={[
                    t.textRegular,
                    {
                        color: colors.Text_Primary,
                        backgroundColor: colors.white,
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                        borderRadius: 12,
                        padding: 12,
                        minHeight: 100,
                        textAlignVertical: 'top',
                    },
                ]}
                multiline
            />
        </View>
    );
};

