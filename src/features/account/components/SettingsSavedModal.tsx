import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, BackIcon, CheckIcon } from '@components/Utils';

interface SettingsSavedModalProps {
    visible: boolean;
    onStartTutorial: () => void;
    onGoHome: () => void;
}

export const SettingsSavedModal: React.FC<SettingsSavedModalProps> = ({
    visible,
    onStartTutorial,
    onGoHome,
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onGoHome}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Success Icon */}
                    <View className="items-center mb-6">
                        <View
                            className="w-16 h-16 rounded-full items-center justify-center"
                            style={{ backgroundColor: colors.orange_50, borderWidth: 4, borderColor: colors.orange_300 }}
                        >
                            <CheckIcon size={32} color={colors.orange_300} />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="text-center mb-3">
                        Great! Your preferences are saved.
                    </Text>

                    {/* Subtitle */}
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="text-center mb-6">
                        Ready to explore MindwiseDBT with a guided tutorial?
                    </Text>

                    {/* Primary Button */}
                    <Pressable
                        onPress={onStartTutorial}
                        className="flex-row items-center justify-between py-4 px-4 rounded-full mb-2"
                        style={{ backgroundColor: colors.button_orange }}
                    >
                        <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                            Next: Welcome to Mindwise
                        </Text>
                        <View
                            className="w-9 h-9 items-center justify-center rounded-full"
                            style={{ backgroundColor: colors.white }}
                        >
                            <ArrowRightIcon size={16} color={colors.warm_dark} />
                        </View>
                    </Pressable>

                    {/* Secondary Button */}
                    <Pressable
                        onPress={onGoHome}
                        className="flex-row items-center justify-center py-4"
                    >
                        <BackIcon size={24} color={colors.warm_dark} />
                        <Text style={[t.button, { color: colors.warm_dark }]} className="ml-2 flex-1 text-center">
                            Go to Homepage
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 32,
        width: '100%',
        maxWidth: 400,
    },
});

