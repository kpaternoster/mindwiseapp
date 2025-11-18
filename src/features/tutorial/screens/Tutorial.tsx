import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import ProgressSteps from '../../onboarding/components/ProgressSteps';
import { TutorialMenuSheet } from '../components/TutorialMenuSheet';
import { getTutorialStep, getTotalSteps } from '../data/tutorialData';
import type { RouteProp } from '@react-navigation/native';
import type { OnboardingStackParams } from '@app/navigation/types';
import ArrowLeftIcon from '@assets/icons/previous.svg';


type TutorialScreenRouteProp = RouteProp<OnboardingStackParams, 'Tutorial'>;

type Props = {
    route: TutorialScreenRouteProp;
};

export default function TutorialScreen({ route }: Props) {
    const { stepId } = route.params;
    const { dissolveTo, dissolveGoBack } = useDissolveNavigation();
    const [menuVisible, setMenuVisible] = useState(false);

    const currentStep = getTutorialStep(stepId);
    const totalSteps = getTotalSteps();

    if (!currentStep) {
        return null;
    }

    const isFirst = stepId === 1;
    const isLast = stepId === totalSteps;

    const onPrevious = () => {
        if (!isFirst) {
            dissolveTo('Tutorial', { stepId: stepId - 1 });
        }
    };

    const onNext = () => {
        if (isLast) {
            dissolveTo('Home');
        } else {
            dissolveTo('Tutorial', { stepId: stepId + 1 });
        }
    };

    const onOpenMenu = () => {
        setMenuVisible(true);
    };

    const onCloseMenu = () => {
        setMenuVisible(false);
    };

    const onSelectStep = (newStepId: number) => {
        if (newStepId !== stepId) {
            dissolveTo('Tutorial', { stepId: newStepId });
        }
    };

    const onBack = () => {
        dissolveGoBack();
    };

    return (
        <View className='flex-1 bg-white pt-9'>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View className='flex-1 bg-white p-5'>
                {/* Header */}
                <View className='flex-row justify-between items-center px-4 pt-3 pb-2'>
                    <Pressable
                        onPress={onBack}
                        className="h-9 w-9 rounded-lg items-center justify-center"
                        accessibilityLabel="Go back"
                    >
                        <ArrowLeftIcon width={28} height={28} fill={colors.white} />
                    </Pressable>

                    <Pressable
                        onPress={onOpenMenu}
                        className="h-9 w-9 rounded-lg items-center justify-center"
                        accessibilityLabel="Open menu"
                    >
                        <View style={styles.menuIcon}>
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                            <View style={styles.menuLine} />
                        </View>
                    </Pressable>
                </View>

                {/* Progress Steps */}
                <View className='px-4 pt-5'>
                    <ProgressSteps current={stepId} total={totalSteps} />
                </View>

                {/* Main Content */}
                <ScrollView
                    className='flex-1'
                    showsVerticalScrollIndicator={false}
                >
                    <View className='px-4 mt-4'>
                        <View
                            className='rounded-3xl p-4'
                            style={styles.contentCard}
                        >
                            {/* Logo */}
                            <View className='items-center mb-4 mt-4'>
                                <Image
                                    source={images.leaf}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Title */}
                            <Text style={[t.title20SemiBold, { color: colors.text_primary }]} className='text-center mb-4'>
                                {currentStep.title}
                            </Text>

                            {/* Description */}
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className='text-center mb-6'>
                                {currentStep.description}
                            </Text>

                            {/* Narrative Box */}
                            <View
                                className='rounded-2xl p-4 min-h-40'
                                style={styles.narrativeBox}
                            >
                                <Text style={[t.textRegular, { color: colors.text_primary }]}>
                                    {currentStep.narrative}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>


            {/* Navigation Buttons */}
            <View className='px-6 pb-10 pt-4 flex-row justify-between' style={styles.navButtonContainer}>
                <Pressable
                    onPress={onPrevious}
                    disabled={isFirst}
                    style={[
                        styles.navButton,
                    ]}
                    className='flex-1 mr-2'
                >
                    <Text style={[
                        t.button,
                        { color: isFirst ? colors.orange_300 : colors.warm_dark }
                    ]}>
                        Previous
                    </Text>
                </Pressable>

                <Pressable
                    onPress={onNext}
                    style={[styles.navButton, styles.navButtonNext]}
                    className='flex-1 ml-2'
                >
                    <Text style={[t.button, { color: colors.warm_dark }]}>
                        {isLast ? 'Finish' : 'Next'}
                    </Text>
                </Pressable>
            </View>

            {/* Tutorial Menu Modal */}
            <TutorialMenuSheet
                visible={menuVisible}
                currentStepId={stepId}
                onClose={onCloseMenu}
                onSelectStep={onSelectStep}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backIcon: {
        width: 16,
        height: 12,
    },
    menuIcon: {
        width: 20,
        height: 16,
        justifyContent: 'space-between',
    },
    menuLine: {
        width: 20,
        height: 2,
        backgroundColor: colors.text_primary,
        borderRadius: 1,
    },
    contentCard: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.stoke_gray,
    },
    logo: {
        width: 36,
        height: 56,
    },
    narrativeBox: {
        backgroundColor: colors.orange_100,
        borderWidth: 1,
        borderColor: colors.orange_500,
    },
    navButtonContainer: {
        boxShadow: '0 -1px 22.4px 0 rgba(0, 0, 0, 0.15)'
    },
    navButton: {
        paddingVertical: 16,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonPrevious: {
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.button_orange,
    },
    navButtonNext: {
        backgroundColor: colors.button_orange,
    },
    navButtonDisabled: {
        backgroundColor: colors.button_disabled,
        borderWidth: 0,
    },
});

