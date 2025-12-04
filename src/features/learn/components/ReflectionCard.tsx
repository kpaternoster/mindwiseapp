import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ReflectionCardProps {
    value: string;
    onChangeText: (text: string) => void;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({
    value,
    onChangeText,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4"
            style={{
                backgroundColor: colors.white,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                Reflect on your emotion
            </Text>
            
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="What needs might this emotion be highlighting? What concerns? How can understanding this emotion help you move forward?"
                placeholderTextColor={colors.text_secondary}
                style={[
                    t.textRegular,
                    {
                        color: colors.Text_Primary,
                        minHeight: 120,
                        textAlignVertical: 'top',
                    },
                ]}
                multiline
                className="mb-3 border border-gray-200 rounded-xl p-4"
            />
            
            <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                Consider: What is this emotion trying to protect or help you with?
            </Text>
        </View>
    );
};

