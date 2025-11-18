import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './types';
import OnboardingNavigator from './onboarding';
import HomeNavigator from './home';
import { useAuth } from '@hooks/AuthContext';

const Root = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  const { isSignedIn, loading } = useAuth();
  if (loading) return null;

  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Root.Screen name="Home" component={HomeNavigator} />
      ) : (
        <Root.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
    </Root.Navigator>
  );
}
