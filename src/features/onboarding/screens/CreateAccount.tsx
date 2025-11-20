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
import { signupWithPassword, ApiError } from '../api';
import { useAuth } from '@hooks/AuthContext';

export default function CreateAccountScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signUp } = useAuth();

    const canSubmit = useMemo(() => {
        const hasAt = email.includes('@') && email.includes('.');
        return hasAt && pw.length >= 4 && pw === confirmPw && !isLoading;
    }, [email, pw, confirmPw, isLoading]);

    const onSubmit = async () => {
        if (!canSubmit) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await signupWithPassword(email, pw);
            signUp(response.token);

            // Navigate to the next screen
            dissolveTo('PlanSelect');
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Failed to create account. Please try again.';
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
                <View className="items-center mt-10 mb-10">
                    <Text style={[t.title24SemiBold, { color: colors.text_primary }]}>
                        Create your account
                    </Text>
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
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoComplete="password"
                    returnKeyType="done"
                />

                <RoundedInputTW
                    value={confirmPw}
                    onChangeText={setConfirmPw}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoComplete="password"
                    returnKeyType="done"
                />

                {/* Error message */}
                {error && (
                    <View className="mt-2 mb-2 ml-2">
                        <Text style={[t.textMedium, { color: colors.black }]}>
                            {error}
                        </Text>
                    </View>
                )}

                {/* Continue button */}
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
                            Continue
                        </Text>
                    )}
                </Pressable>
            </View>


            {/* Bottom link */}
            <View className="mb-8 self-center flex-row items-baseline">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>Already have an account? </Text>
                <Pressable onPress={() => { dissolveTo('Login') }}>
                    <Text style={[t.textRegular, { color: colors.orange }]}>Login</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}


