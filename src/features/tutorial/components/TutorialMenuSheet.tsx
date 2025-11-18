import React from 'react';
import {
    Modal,
    View,
    Text,
    Pressable,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { TUTORIAL_STEPS } from '../data/tutorialData';

type Props = {
    visible: boolean;
    currentStepId: number;
    onClose: () => void;
    onSelectStep: (stepId: number) => void;
};

export const TutorialMenuSheet: React.FC<Props> = ({
    visible,
    currentStepId,
    onClose,
    onSelectStep,
}) => {
    const handleSelectStep = (stepId: number) => {
        onSelectStep(stepId);
        onClose();
    };
    
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.handle} />

                    {/* Menu Items */}
                    <ScrollView
                        className='flex-1 px-6 mt-6'
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {TUTORIAL_STEPS.map((step) => {
                            const isActive = step.id === currentStepId;

                            return (
                                <Pressable
                                    key={step.id}
                                    onPress={() => handleSelectStep(step.id)}
                                    style={[
                                        styles.menuCard,
                                        isActive ? styles.menuCardActive : styles.menuCardInactive
                                    ]}
                                    className='mb-4'
                                >
                                    {/* Title */}
                                    <Text
                                        style={[
                                            t.title16SemiBold,
                                            { color: isActive ? colors.warm_dark : colors.text_primary }
                                        ]}
                                        className='mb-3'
                                    >
                                        {step.title}
                                    </Text>

                                    {/* Narrative */}
                                    <Text
                                        style={[
                                            t.textRegular,
                                            {
                                                color: isActive ? colors.text_primary : colors.text_secondary,
                                            }
                                        ]}
                                    >
                                        {step.narrative}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    handle: {
        alignSelf: "center",
        width: 50,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.gray_400,
        marginTop: 12,
        marginBottom: 12
    },
    sheet: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 20,
        maxHeight: '90%',
        minHeight: 648,
    },
    scrollContent: {
        paddingBottom: 20,
        minHeight: '80%'
    },
    backIcon: {
        width: 16,
        height: 12,
    },
    menuCard: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    menuCardActive: {
        backgroundColor: colors.orange_50,
        borderColor: colors.orange_500,
    },
    menuCardInactive: {
        backgroundColor: colors.white,
        borderColor: colors.stoke_gray,
    },
});

