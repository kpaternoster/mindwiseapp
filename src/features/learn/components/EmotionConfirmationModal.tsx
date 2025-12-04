import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface EmotionConfirmationModalProps {
    visible: boolean;
    emotion: string;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export const EmotionConfirmationModal: React.FC<EmotionConfirmationModalProps> = ({
    visible,
    emotion,
    onClose,
    onConfirm,
    onCancel,
}) => {
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

                    {/* Emotion Display */}
                    <View className='justify-center items-center'>
                        <View
                            className="rounded-2xl p-4 mb-4 px-8 items-center"
                            style={{ backgroundColor: colors.orange_100 }}
                        >
                            <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                                {emotion}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                Secondary Emotion
                            </Text>
                        </View>
                    </View>

                    {/* Question */}
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-6 text-center">
                        Is this the emotion you are feeling?
                    </Text>

                    {/* Buttons */}
                    <View className="flex-row gap-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{
                                borderWidth: 2,
                                borderColor: colors.button_orange,
                                backgroundColor: colors.white,
                            }}
                            onPress={onCancel}
                        >
                            <Text style={[t.button, { color: colors.Text_Primary }]}>
                                No
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{ backgroundColor: colors.button_orange }}
                            onPress={onConfirm}
                        >
                            <Text style={[t.button, { color: colors.white }]}>
                                Yes
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

