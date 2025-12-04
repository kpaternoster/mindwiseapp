import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CheckCircleIcon } from '@components/Utils';

interface ReflectionSavedModalProps {
    visible: boolean;
    onClose: () => void;
    onStartOver: () => void;
    onBackToMenu: () => void;
}

export const ReflectionSavedModal: React.FC<ReflectionSavedModalProps> = ({
    visible,
    onClose,
    onStartOver,
    onBackToMenu,
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

                    {/* Success Icon */}
                    <View className="justify-center items-center mb-4">
                        <View
                            className="w-16 h-16 rounded-full items-center justify-center"
                            style={{ backgroundColor: colors.gray_100 }}
                        >
                            <CheckCircleIcon size={32} color={colors.green} />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="mb-2 text-center">
                        Reflection Saved
                    </Text>

                    {/* Subtitle */}
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-8 text-center">
                        Your reflection has been saved!
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
                            onPress={onStartOver}
                        >
                            <Text style={[t.button, { color: colors.Text_Primary }]}>
                                Start Over
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={onBackToMenu}
                        >
                            <Text style={[t.button, { color: colors.white }]}>
                                Back to Menu
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

