import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';


const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function SplashScreen() {
  const { opacity, dissolveReplace } = useDissolveNavigation();
  const hasNavigatedRef = useRef(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        dissolveReplace('Welcome');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [dissolveReplace]);

  return (
    <AnimatedLinearGradient colors={[colors.background_screen_white, colors.background_screen_orange]} style={styles.fill}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.background_screen_white}
        translucent={Platform.OS === 'android'}
      />
      <Animated.View style={[styles.fill, { opacity, paddingTop: insets.top }]} className="items-center justify-center px-6">
        <Image
          source={images.leaf}
          style={styles.image} />
        <Text className="text-2xl" style={[t.title32SemiBold, styles.title]}>
          Mindwise DBT
        </Text>
      </Animated.View>
    </AnimatedLinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  title: {
    color: colors.text_primary,
  },
  image: {
    width: 70,
    height: 104,
    marginBottom: 16
  }
});
