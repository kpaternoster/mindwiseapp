import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { BackIcon } from '@components/Utils';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = 'Search favorites',
}) => {
    return (
        <View className="mx-6 mb-4">
            <View className="flex-row items-center rounded-full px-4 py-3 border border-gray-200" style={{ backgroundColor: colors.white }}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.text_secondary}
                    style={[t.textRegular, { color: colors.Text_Primary, flex: 1 }]}
                />
                <BackIcon size={24} color={colors.Text_Primary} />
            </View>
        </View>
    );
};

