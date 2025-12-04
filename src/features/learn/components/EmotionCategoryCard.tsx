import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { EmotionRadioButton } from './EmotionRadioButton';

interface EmotionCategoryCardProps {
    primaryEmotion: string;
    subEmotions: string[];
    selectedEmotion: string | null;
    onEmotionSelect: (emotion: string) => void;
}

export const EmotionCategoryCard: React.FC<EmotionCategoryCardProps> = ({
    primaryEmotion,
    subEmotions,
    selectedEmotion,
    onEmotionSelect,
}) => {
    return (
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                {primaryEmotion}
            </Text>
            <Text style={[t.footnoteRegular, { color: colors.text_secondary }]} className="mb-3">
                Primary Emotion
            </Text>
            <View className="flex-row flex-wrap">
                {subEmotions.map((emotion, index) => (
                    <EmotionRadioButton
                        key={index}
                        label={emotion}
                        isSelected={selectedEmotion === emotion}
                        onPress={() => onEmotionSelect(emotion)}
                    />
                ))}
            </View>
        </View>
    );
};

