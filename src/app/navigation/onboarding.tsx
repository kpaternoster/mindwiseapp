import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParams } from './types';
import SplashScreen from '@features/onboarding/screens/Splash';
import LoginScreen from '@features/onboarding/screens/Login';
import OtpScreen from '@features/onboarding/screens/Otp';
import WelcomeScreen from '@features/onboarding/screens/Welcome';
import TutorialIntroScreen from '@features/tutorial/screens/TutorialIntro';
import TutorialScreen from '@features/tutorial/screens/Tutorial';
import ForgotPasswordScreen from '@features/onboarding/screens/ForgotPassword';
import SetNewPasswordScreen from '@features/onboarding/screens/SetNewPassword';
import CreateAccountScreen from '@features/onboarding/screens/CreateAccount';
import PlanSelectScreen from '@features/onboarding/screens/PlanSelect';
import PlanBillingScreen from '@features/onboarding/screens/PlanBilling';
import PersonaliseExperienceScreen from '@features/onboarding/screens/PersonaliseExperience';

const Stack = createNativeStackNavigator<OnboardingStackParams>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      {/* Login */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
      {/* Create Account */}
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="PlanSelect" component={PlanSelectScreen} />
      <Stack.Screen name="PlanBilling" component={PlanBillingScreen} />
      <Stack.Screen name="PersonaliseExperience" component={PersonaliseExperienceScreen} />

    </Stack.Navigator>
  );
}
