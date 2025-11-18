import React, { useMemo, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { Header } from '../components/Header';
import { t } from '@design/typography';
import { colors } from '@design/color';
import RoundedInputTW from '../components/RoundedInput';
import { forgotPassword, ApiError } from '../api';

export default function ForgotPasswordScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        const hasAt = email.includes('@') && email.includes('.');
        return hasAt && !isLoading;
    }, [email, isLoading]);

    const onSubmit = async () => {
        if (!canSubmit) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await forgotPassword(email);
            dissolveTo('Otp', { email, verificationToken: response.verificationToken });
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Failed to send reset code. Please try again.';
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
            <Header />
            <View className='flex-1'>
                <View className="items-center mt-4 mb-8">
                    <Text style={[t.title24SemiBold, { color: colors.text_primary }]} >Forgot your password?</Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mt-2 px-10 text-center'>A code will be send to your email to help reset password</Text>

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

                {/* Error message */}
                {error && (
                    <View className="mt-2 mb-2 ml-2">
                        <Text style={[t.textMedium, { color: colors.black }]}>
                            {error}
                        </Text>
                    </View>
                )}

                {/* Reset button */}
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
                            Reset Password
                        </Text>
                    )}
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}


