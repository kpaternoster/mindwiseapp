import React from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import ArrowRightIcon from '@assets/icons/next.svg';

const TOUR_ITEMS = [
    'Track your daily progress',
    'Learn and practice DBT skills',
    'Use skills in real-life situations',
    'Access crisis support when needed',
];

export default function TutorialIntroScreen() {
    const { dissolveTo } = useDissolveNavigation();

    const onStartTutorial = () => {
        // Navigate to first tutorial screen
        dissolveTo('Tutorial', { stepId: 1 });
    };

    const onSkipTutorial = () => {
        // Skip tutorial and go directly to app
        dissolveTo('Home');
    };

    return (
        <View className='flex-1 bg-white -z-20 pt-9'>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {/* Logo */}
            <View className='items-center mt-16'>
                <Image
                    source={images.leaf}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Title & Subtitle */}
            <View className='px-6 mt-8 items-center'>
                <Text style={[t.title24SemiBold, { color: colors.orange_500 }]}>
                    Ready to begin?
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mt-3 text-center'>
                    Let's get you oriented to your healing journey
                </Text>
            </View>

            {/* Tour Card */}
            <View className='flex-1 px-9 mt-8'>
                <View
                    className='rounded-3xl border p-6'
                    style={styles.tourCard}
                >
                    <Text style={[t.title20SemiBold, { color: colors.text_primary }]} className='text-center'>
                        Ready for a Quick Tour?
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mt-2'>
                        We'll show you around Mindwise DBT in just a few minutes. Learn how to:
                    </Text>

                    {/* Numbered List */}
                    <View className='mt-8'>
                        {TOUR_ITEMS.map((item, index) => (
                            <View key={index} className='flex-row items-center mb-8'>
                                <View style={styles.numberCircle}>
                                    <Text style={[t.button, { color: colors.text_primary }]}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text style={[t.textRegular, { color: colors.black }]} className='flex-1 ml-3'>
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Buttons */}
            <View className='px-6 mb-8'>
                <Pressable
                    style={styles.primaryButton}
                    onPress={onStartTutorial}
                >
                    <Text style={[t.button, { color: colors.white }]} className='flex-1 text-center'>
                        Start App Tutorial
                    </Text>
                    <View style={styles.arrowCircle}>
                        <ArrowRightIcon width={28} height={28} fill={colors.white} />
                    </View>
                </Pressable>

                <Pressable
                    style={styles.secondaryButton}
                    onPress={onSkipTutorial}
                >
                    <Text style={[t.button, { color: colors.warm_dark }]}>
                        Skip Tutorial, Go to App
                    </Text>
                </Pressable>
            </View>

            {/* Decorative Leaf */}
            <Image
                source={images.bg_leaf}
                style={styles.decorativeLeaf}
                resizeMode="contain"
                className='-z-10'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 49,
        height: 76,
    },
    tourCard: {
        borderColor: colors.orange_200,
        backgroundColor: colors.white,
    },
    numberCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.orange_500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: colors.button_orange,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    secondaryButton: {
        marginTop: 12,
        borderWidth: 2,
        borderColor: colors.button_orange,
        paddingVertical: 15,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    decorativeLeaf: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});

