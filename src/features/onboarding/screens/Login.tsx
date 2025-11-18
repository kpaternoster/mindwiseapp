import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { images } from '@design/image';
import { Header } from '../components/Header';
import { t } from '@design/typography';
import { colors } from '@design/color';
import RoundedInputTW from '../components/RoundedInput';
import { useAuth } from '@hooks/AuthContext';
import { loginWithPassword, ApiError } from '../api';

export default function LoginScreen() {
  const { dissolveTo } = useDissolveNavigation();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const canSubmit = useMemo(() => {
    const hasAt = email.includes('@') && email.includes('.');
    return hasAt && pw.length >= 4 && !isLoading;
  }, [email, pw, isLoading]);

  const onSubmit = async () => {
    if (!canSubmit) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginWithPassword(email, pw);
      await signIn(response.token);
      // Navigation will happen automatically when isSignedIn becomes true
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.error || 'Failed to login. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white p-6 pt-9"
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header icon />
      <View className='flex-1'>
        <View className="items-center mt-4 mb-8">
          <Text style={[t.textMedium, { color: colors.text_secondary }]}>Welcome back</Text>
          <Text style={[t.title24SemiBold, { color: colors.text_primary }]} className='mt-2'>Login to Mindwise DBT</Text>
        </View>

        {/* Inputs */}
        <RoundedInputTW
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
        />

        <RoundedInputTW
          value={pw}
          onChangeText={setPw}
          placeholder="Enter password"
          secureTextEntry={!showPw}
          autoCapitalize="none"
          autoComplete="password"
          returnKeyType="done"
          rightAdornment={
            <Pressable
              onPress={() => setShowPw(s => !s)}
              accessibilityRole="button"
              accessibilityLabel={showPw ? 'Hide password' : 'Show password'}
              hitSlop={8}
              className='mr-2'
            >
              {
                showPw ? <Image source={images.hidden} className="w-[20px] h-[20px]" resizeMode="contain" /> :
                  <Image source={images.hidden} className="w-[20px] h-[20px]" resizeMode="contain" />
              }
            </Pressable>
          }
        />

        {/* Error message */}
        {error && (
          <View className="mt-2 mb-2 ml-2">
            <Text style={[t.textMedium, { color: colors.black }]}>
              {error}
            </Text>
          </View>
        )}

        {/* Login button */}
        <Pressable
          onPress={onSubmit}
          disabled={!canSubmit}
          style={[{ backgroundColor: canSubmit ? colors.button_orange : colors.button_disabled }]}
          className='mt-2 rounded-full items-center justify-center py-5'
        >
          {isLoading ? (
            <ActivityIndicator color={colors.warm_dark} />
          ) : (
            <Text style={[t.button, { color: canSubmit ? colors.warm_dark : colors.text_disabled }]}>
              Login
            </Text>
          )}
        </Pressable>

        {/* Forgot password */}
        <Pressable onPress={() => { dissolveTo('ForgotPassword') }} hitSlop={6} className="mt-4 self-center">
          <Text style={[t.textMedium, { color: colors.text_primary }]}>Forgot password?</Text>
        </Pressable>
      </View>


      {/* Bottom link */}
      <View className="mb-8 self-center flex-row items-baseline">
        <Text style={[t.textRegular, { color: colors.text_secondary }]}>Don’t have an account? </Text>
        <Pressable onPress={() => { dissolveTo('CreateAccount') }}>
          <Text style={[t.textRegular, { color: colors.orange }]}>Create one here</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}


