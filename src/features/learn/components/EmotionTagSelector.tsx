import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface EmotionTagSelectorProps {
    title: string;
    emotions: string[];
    selectedEmotion: string | null;
    onSelect: (emotion: string) => void;
}

export const EmotionTagSelector: React.FC<EmotionTagSelectorProps> = ({
    title,
    emotions,
    selectedEmotion,
    onSelect,
}) => {
    return (
        <View className="mb-6">
            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                {title}
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                {emotions.map((emotion) => {
                    const isSelected = selectedEmotion === emotion;
                    return (
                        <Pressable
                            key={emotion}
                            className="px-4 py-2 rounded-xl"
                            style={{
                                backgroundColor: isSelected ? colors.button_orange : colors.white,
                                borderWidth: 1,
                                borderColor: isSelected ? colors.button_orange : colors.stoke_gray,
                            }}
                            onPress={() => onSelect(emotion)}
                        >
                            <Text
                                style={[
                                    t.textRegular,
                                    {
                                        color: isSelected ? colors.white : colors.text_secondary,
                                    },
                                ]}
                            >
                                {emotion}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

