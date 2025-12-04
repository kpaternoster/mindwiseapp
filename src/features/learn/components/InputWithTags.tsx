import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { TagButton } from './TagButton';

interface InputWithTagsProps {
    title: string;
    placeholder: string;
    tags: string[];
    isEmotion?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
}

export const InputWithTags: React.FC<InputWithTagsProps> = ({
    title,
    placeholder,
    tags,
    isEmotion = false,
    value,
    onChangeText,
}) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState(value || '');

    const handleTagPress = (tag: string) => {
        setSelectedTag(selectedTag === tag ? null : tag);
        if (onChangeText) {
            onChangeText(tag);
        }
        setInputValue(tag);
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
        if (onChangeText) {
            onChangeText(text);
        }
        // Clear selection when typing
        if (selectedTag) {
            setSelectedTag(null);
        }
    };

    return (
        <View className="mb-6 border border-gray-200 rounded-2xl p-4">
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                {title}
            </Text>
            <TextInput
                className="rounded-2xl p-4 mb-3"
                style={{
                    borderWidth: 1,
                    borderColor: colors.stoke_gray,
                    backgroundColor: colors.white,
                    minHeight: 90,
                }}
                placeholder={placeholder}
                placeholderTextColor={colors.text_secondary}
                value={inputValue}
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
                        isEmotion={isEmotion}
                    />
                ))}
            </View>
        </View>
    );
};

