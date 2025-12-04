import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CheckCircleIcon } from '@components/Utils';

interface TodayEmotionStatusModalProps {
    visible: boolean;
    primaryEmotion: string;
    secondaryEmotion: string;
    intensity: number;
    onUpdate: () => void;
    onBackToMenu: () => void;
    onClose: () => void;
}

export const TodayEmotionStatusModal: React.FC<TodayEmotionStatusModalProps> = ({
    visible,
    primaryEmotion,
    secondaryEmotion,
    intensity,
    onUpdate,
    onBackToMenu,
    onClose,
}) => {
    const renderIntensityDots = () => {
        return (
            <View className="flex-row items-center" style={{ gap: 4 }}>
                {Array.from({ length: 10 }, (_, i) => (
                    <View
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: i < intensity ? colors.warm_dark : colors.gray_300,
                        }}
                    />
                ))}
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50 px-4">
                <Pressable
                    className="absolute inset-0"
                    onPress={onClose}
                />
                <View
                    className="bg-white rounded-2xl p-6 w-full"
                >
                    {/* Close Button */}
                    <Pressable
                        className="self-end mb-4"
                        onPress={onClose}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.icon }]}>
                            ✕
                        </Text>
                    </Pressable>

                    {/* Success Icon and Title */}
                    <View className="items-center mb-4">
                        <View className="mb-3">
                            <CheckCircleIcon size={48} color={colors.orange_300} />
                        </View>
                        <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Today's Emotions
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            You've already logged your emotions for today
                        </Text>
                    </View>

                    {/* Emotion Display */}
                    <View
                        className="rounded-xl p-4 mb-4 mt-4 items-center justify-center"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.button_orange }]} className='mb-2'>
                            {secondaryEmotion}
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                            ({primaryEmotion})
                        </Text>
                        <View className="flex-row items-center">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-4">
                                Intensity
                            </Text>
                            {renderIntensityDots()}
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="ml-4">
                                {intensity}/10
                            </Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View className="flex-col gap-3 mt-4">
                        <Pressable
                            className="rounded-full py-4 items-center justify-center"
                            style={{
                                borderWidth: 2,
                                borderColor: colors.button_orange,
                                backgroundColor: colors.white,
                            }}
                            onPress={onUpdate}
                        >
                            <Text style={[t.button, { color: colors.warm_dark }]}>
                                Update Today's Entry
                            </Text>
                        </Pressable>
                        <Pressable
                            className="rounded-full py-4 items-center justify-center"
                            style={{ backgroundColor: colors.white }}
                            onPress={onBackToMenu}
                        >
                            <Text style={[t.button, { color: colors.warm_dark }]}>
                                Back to Menu
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

