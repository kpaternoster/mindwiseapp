import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { Header } from '../components/Header';
import { fonts, t } from '@design/typography';
import { colors } from '@design/color';
import { OtpInput } from "react-native-otp-entry";
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { AllStackParams } from '@app/navigation/types';
import { verifyForgotPassword, forgotPassword, ApiError } from '../api';

const OTP_LENGTH = 6;
const SECONDS = 60;

function formatSec(s: number) {
    const mm = '00';
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
}

type OtpRouteProp = RouteProp<AllStackParams, 'Otp'>;

export default function OtpScreen() {
    const route = useRoute<OtpRouteProp>();
    const { email, verificationToken } = route.params;

    const { dissolveTo } = useDissolveNavigation();
    const [code, setCode] = useState('');
    const [sec, setSec] = useState<number>(SECONDS);
    const [isResending, setIsResending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentVerificationToken, setCurrentVerificationToken] = useState(verificationToken);

    useEffect(() => {
        if (sec <= 0) return;
        const id = setInterval(() => setSec((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [sec]);

    const onVerify = async () => {
        if (code.length !== OTP_LENGTH || isVerifying) return;
        setIsVerifying(true);
        setError(null);

        try {
            const response = await verifyForgotPassword(currentVerificationToken, code);
            dissolveTo("SetNewPassword", { changePasswordToken: response.changePasswordToken });
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Invalid code. Please try again.';
            setError(errorMessage);
        } finally {
            setIsVerifying(false);
        }
    };

    const onResend = async () => {
        if (sec > 0 || isResending) return;
        try {
            setIsResending(true);
            setError(null);
            const response = await forgotPassword(email);
            setCurrentVerificationToken(response.verificationToken);
            setSec(SECONDS);
            setCode('');
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Failed to resend code. Please try again.';
            setError(errorMessage);
        } finally {
            setIsResending(false);
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
                <View className="items-center mt-4">
                    <Text style={[t.title24SemiBold, { color: colors.text_primary }]} >
                        Check your email
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mt-2 px-10 text-center'>
                        Input the code that was sent to

                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mt-1 px-10 text-center'>
                        {email}
                    </Text>

                </View>

                {/* OTP INPUT BOXES */}
                <View className='mt-10'>
                    <OtpInput
                        numberOfDigits={6}
                        onTextChange={(text) => setCode(text)}
                        onFilled={(text) => setCode(text)}
                        type='numeric'
                        focusStickBlinkingDuration={500}
                        focusColor={colors.text_primary}
                        theme={{
                            pinCodeContainerStyle: styles.pinCodeContainer,
                            pinCodeTextStyle: styles.pinCodeText,
                            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                        }}
                    />
                </View>

                {/* Resend / timer */}
                <View className="items-center mt-4 mb-8">
                    {sec > 0 ? (
                        <Text style={[t.textRegular, { color: colors.text_tetriary }]} className='mt-2 px-10 text-center'>
                            Don't receive the code? Resend in {formatSec(sec)}
                        </Text>
                    ) : (
                        <Pressable onPress={onResend} disabled={isResending}>
                            <Text style={[t.textRegular, { color: colors.text_primary }]} className='mt-2 px-10 text-center'>
                                {isResending ? 'Resending…' : 'Resend code'}
                            </Text>
                        </Pressable>
                    )}
                </View>

                {/* Error message */}
                {error && (
                    <View className="mb-2 ml-2 items-center">
                        <Text style={[t.textMedium, { color: colors.black }]}>
                            {error}
                        </Text>
                    </View>
                )}

                {/* Verify button */}
                <Pressable
                    onPress={onVerify}
                    disabled={code.length !== OTP_LENGTH || isVerifying}
                    style={[{ backgroundColor: (code.length === OTP_LENGTH && !isVerifying) ? colors.button_orange : colors.button_disabled }]}
                    className='mt-2 rounded-full items-center justify-center py-5'
                >
                    {isVerifying ? (
                        <ActivityIndicator color={colors.warm_dark} />
                    ) : (
                        <Text style={[t.button, { color: code.length === OTP_LENGTH ? colors.warm_dark : colors.text_disabled }]}>
                            Verify
                        </Text>
                    )}
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    title: {
        color: colors.text_primary,
        textAlign: 'center',
    },

    primaryButton: { backgroundColor: colors.button_orange },
    primaryButtonDisabled: { backgroundColor: colors.text_tetriary },

    pinCodeContainer: {
        width: 52,
        height: 52,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.stoke_gray,
        backgroundColor: colors.background_screen_white,
        fontFamily: fonts.nunitoSemiBold,
    },
    pinCodeText: {
        color: colors.text_primary
    },
    activePinCodeContainer: {
        borderColor: colors.stoke_gray,
        color: colors.text_primary
    }
});