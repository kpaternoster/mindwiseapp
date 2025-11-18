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
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { AllStackParams } from '@app/navigation/types';
import { Header } from '../components/Header';
import { t } from '@design/typography';
import { colors } from '@design/color';
import RoundedInputTW from '../components/RoundedInput';
import { changeForgottenPassword, ApiError } from '../api';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';

type SetNewPasswordRouteProp = RouteProp<AllStackParams, 'SetNewPassword'>;

export default function SetNewPasswordScreen() {
    const route = useRoute<SetNewPasswordRouteProp>();
    const { changePasswordToken } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { dissolveTo } = useDissolveNavigation();
    const canSubmit = useMemo(() => {
        return password.length >= 4 && password === confirmPwd && !isLoading;
    }, [password, confirmPwd, isLoading]);

    const onSubmit = async () => {
        if (!canSubmit) return;
        setIsLoading(true);
        setError(null);

        try {
            await changeForgottenPassword(changePasswordToken, password);
            // await signIn(response.token);
            dissolveTo('Login');
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Failed to reset password. Please try again.';
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
                    <Text style={[t.title24SemiBold, { color: colors.text_primary }]} >Set a new password</Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mt-2 px-10 text-center'>
                        Your new password must be different from your old passwords
                    </Text>
                </View>

                {/* Inputs */}
                <RoundedInputTW
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoComplete="password"
                    returnKeyType="done"
                />

                <RoundedInputTW
                    value={confirmPwd}
                    onChangeText={setConfirmPwd}
                    placeholder="Confirm Password"
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


