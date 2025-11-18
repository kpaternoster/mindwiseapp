import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AllStackParams } from '@app/navigation/types';




export function useDissolveNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<AllStackParams>>();
  const opacity = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      opacity.setValue(1);
    }, [opacity])
  );

  /** Fade out and navigate (keeps previous screen in stack) */
  const dissolveTo = <T extends keyof AllStackParams>(
    screen: T,
    ...[params]: undefined extends AllStackParams[T]
      ? []
      : [AllStackParams[T]]
  ) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(screen as any, params as any);
      opacity.setValue(0);
    });
  };


  /** Fade out and replace (removes current screen from stack) */
  const dissolveReplace = <T extends keyof AllStackParams>(
    screen: T,
    ...[params]: undefined extends AllStackParams[T]
      ? []
      : [AllStackParams[T]]
  ) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      navigation.replace(screen as any, params as any);
      opacity.setValue(0);
    });
  };

    /** Fade out and go back to previous screen */
    const dissolveGoBack = useCallback(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
        opacity.setValue(0);
      });
    }, [navigation, opacity]);

  return { opacity, dissolveTo, dissolveReplace, dissolveGoBack };
}
