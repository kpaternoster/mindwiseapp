import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon } from '@components/Utils';

interface PLEASEReflectionSectionProps {
    id: string;
    title: string;
    prompt: string;
    value: string;
    onValueChange: (text: string) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export const PLEASEReflectionSection: React.FC<PLEASEReflectionSectionProps> = ({
    title,
    prompt,
    value,
    onValueChange,
    isExpanded,
    onToggle,
}) => {
    return (
        <View className="mb-4">
            {/* Header */}
            <Pressable
                className={`flex-row items-center justify-between px-4 py-4 ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                style={{
                    backgroundColor: colors.orange_50,
                }}
                onPress={onToggle}
            >
                <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                            {title}
                        </Text>
                        <View className="ml-3">
                            {isExpanded ? (
                                <UpIcon size={12} color={colors.Text_Primary} />
                            ) : (
                                <DownIcon size={12} color={colors.Text_Primary} />
                            )}
                        </View>
                    </View>
                    <View>
                        {/* Prompt */}
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {prompt}
                        </Text>
                    </View>
                </View>
            </Pressable>

            {/* Expanded Content */}
            {isExpanded && (
                <View
                    className="rounded-b-2xl px-4 py-4"
                    style={{
                        backgroundColor: colors.white,
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                        borderTopWidth: 0,
                    }}
                >


                    {/* Text Input */}
                    <TextInput
                        value={value}
                        onChangeText={onValueChange}
                        placeholder="Reflect on your recent experience with this self-care area..."
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
            )}
        </View>
    );
};

