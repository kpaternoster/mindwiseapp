import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon } from '@components/Utils';
import { TagButton } from './TagButton';

export interface Subsection {
    id: string;
    title: string;
    prompt: string;
    placeholder: string;
    tags?: string[];
}

interface CollapsibleInputWithTagsProps {
    id: string;
    title: string;
    prompt?: string;
    placeholder?: string;
    tags?: string[];
    subsections?: Subsection[];
    value?: string;
    subsectionValues?: { [key: string]: string };
    onChangeText?: (id: string, text: string) => void;
    isExpanded: boolean;
    onToggle: () => void;
    selectedTag?: string | null;
    subsectionSelectedTags?: { [key: string]: string | null };
    onTagPress?: (id: string, tag: string) => void;
}

export const CollapsibleInputWithTags: React.FC<CollapsibleInputWithTagsProps> = ({
    id,
    title,
    prompt,
    placeholder,
    tags = [],
    subsections,
    value = '',
    subsectionValues = {},
    onChangeText,
    isExpanded,
    onToggle,
    selectedTag = null,
    subsectionSelectedTags = {},
    onTagPress,
}) => {
    const [internalSelectedTag, setInternalSelectedTag] = useState<string | null>(null);

    // Use controlled selectedTag if provided, otherwise use internal state
    const currentSelectedTag = selectedTag !== undefined ? selectedTag : internalSelectedTag;

    const handleTagPress = (tag: string) => {
        if (onTagPress) {
            const newTag = currentSelectedTag === tag ? null : tag;
            onTagPress(id, newTag || '');
        } else {
            const newTag = currentSelectedTag === tag ? null : tag;
            setInternalSelectedTag(newTag);
            if (onChangeText) {
                onChangeText(id, newTag || '');
            }
        }
    };

    const handleInputChange = (text: string) => {
        if (onChangeText) {
            onChangeText(id, text);
        }
        if (currentSelectedTag && text !== currentSelectedTag) {
            if (onTagPress) {
                onTagPress(id, '');
            } else {
                setInternalSelectedTag(null);
            }
        }
    };

    const handleSubsectionTagPress = (subsectionId: string, tag: string) => {
        if (onTagPress) {
            const currentTag = subsectionSelectedTags?.[subsectionId];
            const newTag = currentTag === tag ? null : tag;
            onTagPress(subsectionId, newTag || '');
        }
    };

    const handleSubsectionInputChange = (subsectionId: string, text: string) => {
        if (onChangeText) {
            onChangeText(subsectionId, text);
        }
        const currentTag = subsectionSelectedTags?.[subsectionId];
        if (currentTag && text !== currentTag) {
            if (onTagPress) {
                onTagPress(subsectionId, '');
            }
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
                    {prompt && (
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {prompt}
                        </Text>
                    )}
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
                    {subsections ? (
                        // Render subsections
                        subsections.map((subsection) => (
                            <View key={subsection.id} className="mb-4">
                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {subsection.title}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                                    {subsection.prompt}
                                </Text>
                                <TextInput
                                    className="rounded-xl p-4 mb-3"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.stoke_gray,
                                        backgroundColor: colors.white,
                                        minHeight: 90,
                                    }}
                                    placeholder={subsection.placeholder}
                                    placeholderTextColor={colors.text_secondary}
                                    value={subsectionValues[subsection.id] || ''}
                                    onChangeText={(text) => handleSubsectionInputChange(subsection.id, text)}
                                    multiline
                                    textAlignVertical="top"
                                />
                                {subsection.tags && subsection.tags.length > 0 && (
                                    <View className="flex-row flex-wrap">
                                        {subsection.tags.map((tag, index) => (
                                            <TagButton
                                                key={index}
                                                label={tag}
                                                isSelected={subsectionSelectedTags?.[subsection.id] === tag}
                                                onPress={() => handleSubsectionTagPress(subsection.id, tag)}
                                                isEmotion={false}
                                            />
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))
                    ) : (
                        // Render single input
                        <>
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
                            {tags.length > 0 && (
                                <View className="flex-row flex-wrap">
                                    {tags.map((tag, index) => {
                                        const isSelected = currentSelectedTag === tag;
                                        return (
                                            <TagButton
                                                key={index}
                                                label={tag}
                                                isSelected={isSelected}
                                                onPress={() => handleTagPress(tag)}
                                                isEmotion={false}
                                            />
                                        );
                                    })}
                                </View>
                            )}
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

