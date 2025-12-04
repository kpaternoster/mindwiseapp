import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon } from '@components/Utils';
import { TagButton } from './TagButton';

interface STUNWAVESectionProps {
    title: string;
    prompt: string;
    placeholder: string;
    tags: string[];
    value: string;
    onChangeText: (text: string) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export const STUNWAVESection: React.FC<STUNWAVESectionProps> = ({
    title,
    prompt,
    placeholder,
    tags,
    value,
    onChangeText,
    isExpanded,
    onToggle,
}) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleTagPress = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
        onChangeText(tag);
    };

    const handleInputChange = (text: string) => {
        onChangeText(text);
        if (selectedTag) {
            setSelectedTag(null);
        }
    };

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
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {prompt}
                    </Text>
                </View>
            </Pressable>

            {/* Content */}
            {isExpanded && (
                <View
                    className="rounded-b-2xl px-4 pb-4 pt-4"
                    style={{
                        backgroundColor: colors.white,
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                        borderTopWidth: 0,
                    }}
                >
                    <TextInput
                        className="rounded-xl p-4 mb-3"
                        style={{
                            borderWidth: 1,
                            borderColor: colors.stoke_gray,
                            backgroundColor: colors.white,
                            minHeight: 90,
                        }}
                        placeholder={placeholder}
                        placeholderTextColor={colors.text_secondary}
                        value={value}
                        onChangeText={handleInputChange}
                        multiline
                        textAlignVertical="top"
                    />
                    <View className="flex-row flex-wrap">
                        {tags.map((tag, index) => (
                            <TagButton
                                key={index}
                                label={tag}
                                isSelected={selectedTag === tag}
                                onPress={() => handleTagPress(tag)}
                                isEmotion={false}
                            />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

