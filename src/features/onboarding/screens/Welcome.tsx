import React, { useMemo, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Slide = {
    id: string;
    title: string;
    body: string;
};

const SLIDES: Slide[] = [
    {
        id: 'welcome',
        title: 'Proven Skills For Big Feelings',
        body:
            'Learn proven skills to manage emotions, improve relationships, and create a life you want. Developed with leading experts.',
    },
    {
        id: 'about dbt',
        title: 'About DBT',
        body:
            'Dialectical Behavior Therapy helps people who experience intense emotions learn practical skills for emotional regulation and distress tolerance.',
    },
    {
        id: 'dbt skills',
        title: 'DBT Skills',
        body:
            'Six core skill categories teach you to understand emotions, regulate feelings, practice mindfulness, improve relationships, tolerate distress, and build self-love.',
    },
    {
        id: 'about',
        title: 'About Mindwise DBT',
        body:
            'A medically validated DBT app created with Dr. Blaise Aguirre of McLean Hospital, offering complete therapy experience with daily planning and skill practice.',
    },
];

export default function WelcomeScreen() {
    const { opacity, dissolveTo } = useDissolveNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView>(null);
    const [scrollKey, setScrollKey] = useState(0);

    // Reset scroll position when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            // Force remount of ScrollView and reset scroll position
            setScrollKey(prev => prev + 1);
            scrollX.setValue(0);
            
            // Add a small delay to ensure ScrollView is ready
            setTimeout(() => {
                scrollRef.current?.scrollTo({ x: 0, animated: false });
            }, 50);
        }, [scrollX])
    );

    const onScroll = useMemo(
        () =>
            Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            ),
        [scrollX]
    );

    const onStart = () => {
        dissolveTo('CreateAccount');
    };

    const onLogin = () => {
        dissolveTo('Login');
    };


    return (
        <AnimatedLinearGradient
            colors={[colors.background_screen_orange_200, colors.background_screen_orange_200, colors.background_screen_white, colors.background_screen_white]}
            style={styles.flex}
        >
            <StatusBar barStyle="dark-content" backgroundColor={colors.background_screen_orange_200} />
            <Animated.View style={[styles.flex, { opacity }]}>
                <Animated.ScrollView
                    key={scrollKey}
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.slide_container}
                >
                    {SLIDES.map((slide) => (
                        <View key={slide.id} style={[styles.slide, { width: SCREEN_WIDTH }]}>
                            <Image source={images.leaf_big} style={styles.leaf} resizeMode="contain" />

                            <View className='mt-3' style={styles.slideBody}>
                                {!!(slide.id === 'welcome') && (
                                    <Text style={[t.title24SemiBold, { color: colors.orange_500 }]} className='mb-3'>
                                        Welcome to {" "}
                                        <Text style={{ color: colors.orange_800 }}>
                                            Mindwise DBT.
                                        </Text>
                                    </Text>
                                )}

                                <Text style={[t.title26SemiBold, { color: colors.orange_500 }]} className='mb-3'>
                                    {slide.title}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>{slide.body}</Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
                {/* dots */}
                <Dots scrollX={scrollX} count={SLIDES.length} />

                {/* CTA buttons */}
                <View className='mx-5 mb-8'>
                    <Pressable style={styles.primaryCta} onPress={onStart} android_ripple={{ color: '#ffffff22' }}>
                        <Text style={[t.button, styles.primaryCtaText]}>
                            Start your journey
                        </Text>
                    </Pressable>

                    <Pressable style={styles.secondaryCta} onPress={onLogin}>
                        <Text style={[t.button, styles.secondaryCtaText]}>Log In</Text>
                    </Pressable>

                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]} className='text-center mt-4'>
                        Trusted by healthcare professionals • Clinically validated
                    </Text>
                </View>
            </Animated.View>
        </AnimatedLinearGradient>
    );
}

function Dots({ scrollX, count }: { scrollX: Animated.Value; count: number }) {
    const dotWidth = 8;
    const dotSpacing = 8;

    const inputRange = Array.from({ length: count }).map((_, i) => i * SCREEN_WIDTH);

    return (
        <View style={styles.dotsRow}>
            {Array.from({ length: count }).map((_, i) => {
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: inputRange.map((x, idx) => (idx === i ? 1 : 1)),
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: inputRange.map((x, idx) => (idx === i ? 1 : 0.45)),
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                width: dotWidth,
                                height: dotWidth,
                                marginHorizontal: dotSpacing / 2,
                                transform: [{ scale }],
                                opacity,
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },

    slide_container: {
        alignItems: 'stretch'
    },

    slide: {
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
    },

    leaf: {
        width: 79,
        height: 119,
    },

    slideBody: {
        height: 240
    },


    dotsRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 24,
    },
    dot: {
        borderRadius: 999,
        backgroundColor: colors.orange_medium,
    },

    primaryCta: {
        backgroundColor: colors.button_orange,
        paddingVertical: 16,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    primaryCtaText: {
        color: colors.warm_dark,
    },

    secondaryCta: {
        marginTop: 12,
        borderWidth: 2,
        borderColor: colors.button_orange,
        paddingVertical: 15,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryCtaText: {
        color: colors.warm_dark,
    },
});