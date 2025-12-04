import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface FormInputProps {
    title: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    instruction?: string;
    isBorder?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    title,
    placeholder,
    value,
    onChangeText,
    multiline = false,
    instruction,
    isBorder = true,
}) => {
    return (
        <View className={`mb-6 ${isBorder ? 'border border-gray-200 rounded-xl p-4' : ''}`}>
            <Text style={[!isBorder ? t.textSemiBold : t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                {title}
            </Text>
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
                        minHeight: multiline ? 100 : 48,
                        textAlignVertical: multiline ? 'top' : 'center',
                    },
                ]}
                multiline={multiline}
            />
            {instruction && (
                <Text style={[t.captionBold, { color: colors.Text_Primary }]} className="mt-2">
                    {instruction}
                </Text>
            )}
        </View>
    );
};

