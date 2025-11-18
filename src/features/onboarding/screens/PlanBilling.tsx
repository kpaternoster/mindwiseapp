import React, { useMemo, useState, useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    ActivityIndicator,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { Header } from '../components/Header';
import ProgressSteps from '../components/ProgressSteps';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import { buySubscription, ApiError } from '../api';
import type { OnboardingStackParams } from '@app/navigation/types';
import ArrowLeftIcon from '@assets/icons/previous.svg';

type PaymentMethodKey = 'card' | 'mobile';

const PAYMENT_METHODS: Record<
    PaymentMethodKey,
    { title: string; subtitle: string }
> = {
    card: {
        title: 'Credit/Debit Card',
        subtitle: 'Visa, Mastercard, American Express',
    },
    mobile: {
        title: 'Mobile Payment',
        subtitle: 'Apple Pay, Google Pay, PayPal',
    },
};

const PAYMENT_SUCCESS_URL = 'https://example.mindwisedbt.com/buy-subscription-success';
const  PAYMENT_CANCEL_URL = 'https://example.mindwisedbt.com/buy-subscription-cancel';

export default function PlanBillingScreen() {
    const route = useRoute<RouteProp<OnboardingStackParams, 'PlanBilling'>>();
    const { plan, billingPeriod } = route.params;
    const { dissolveTo, dissolveGoBack } = useDissolveNavigation();
    const [selected, setSelected] = useState<PaymentMethodKey | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checkoutURL, setCheckoutURL] = useState<string | null>(null);
    const [webviewLoading, setWebviewLoading] = useState(true);
    const webViewRef = useRef<WebView>(null);

    const canContinue = useMemo(() => !!selected && !isLoading, [selected, isLoading]);

    const onContinue = async () => {
        if (!selected || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            // Call the buy subscription API
            const response = await buySubscription(
                plan,
                billingPeriod,
                PAYMENT_SUCCESS_URL,
                PAYMENT_CANCEL_URL
            );

            // Show WebView with checkout URL
            if (response.checkoutURL) {
                setCheckoutURL(response.checkoutURL);
            } else {
                setError('No checkout URL received from server');
            }
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Failed to process payment. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigationStateChange = (navState: any) => { 
        const currentUrl = navState.url;
 
        if (currentUrl.startsWith(PAYMENT_SUCCESS_URL)) {
            // Payment successful, navigate to next screen
            dissolveTo('PersonaliseExperience');
        }
 
        // Check if URL is the actual cancel page (not just a parameter)
        if (currentUrl.startsWith(PAYMENT_CANCEL_URL)) {
            setCheckoutURL(null);
        }
    };
   
    return (
        <View className='flex-1 pt-9 px-6 pb-12 bg-white'>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Header text='Payment Method' icon />
            {/* Progress (2–3) */}
            <ProgressSteps current={2} total={3} />
            {
                checkoutURL ? (
                    <>
                        {/* WebView */}
                        <WebView
                            ref={webViewRef}
                            source={{ uri: checkoutURL }}
                            onLoadStart={() => setWebviewLoading(true)}
                            onLoadEnd={() => setWebviewLoading(false)}
                            onNavigationStateChange={handleNavigationStateChange}
                            style={styles.webview}
                            startInLoadingState={true}
                        />

                        {/* Loading Overlay */}
                        {webviewLoading && (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color={colors.button_orange} />
                                <Text style={[t.textMedium, styles.loadingText]}>
                                    Loading checkout...
                                </Text>
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        {/* Cards */}
                        <View className="flex-1 mt-4">
                            <PaymentMethodCard
                                active={selected === 'card'}
                                onPress={() => setSelected('card')}
                                type='card'
                                title={PAYMENT_METHODS.card.title}
                                subtitle={PAYMENT_METHODS.card.subtitle}
                            />
                            <PaymentMethodCard
                                active={selected === 'mobile'}
                                onPress={() => setSelected('mobile')}
                                type='mobile'
                                title={PAYMENT_METHODS.mobile.title}
                                subtitle={PAYMENT_METHODS.mobile.subtitle}
                            />
                        </View>

                        {/* Error message */}
                        {error && (
                            <View className="mt-2 mb-2 ml-2">
                                <Text style={[t.textMedium, { color: colors.black }]}>
                                    {error}
                                </Text>
                            </View>
                        )}

                        {/* Bottom Actions */}
                        <View className="flex-row justify-between items-center">
                            <Pressable onPress={dissolveGoBack} className='w-1/2 items-center justify-center'>
                                <Text style={[t.button, { color: colors.warm_dark }]}>
                                    Back
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={onContinue}
                                disabled={!canContinue}
                                style={[{ backgroundColor: canContinue ? colors.button_orange : colors.gray_300, }]}
                                className='w-1/2 rounded-full py-5 items-center justify-center mx-2'
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={colors.warm_dark} />
                                ) : (
                                    <Text style={[t.button, { color: canContinue ? colors.warm_dark : colors.black_40 }]} >
                                        Continue
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </>
                )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_300,
        backgroundColor: colors.white,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: colors.Text_Primary,
    },
    webview: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        top: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    loadingText: {
        marginTop: 12,
        color: colors.text_secondary,
    },
});

function PaymentMethodCard({
    active,
    onPress,
    type,
    title,
    subtitle,
}: {
    active: boolean;
    onPress: () => void;
    type: PaymentMethodKey;
    title: string;
    subtitle: string;
}) {
    return (
        <Pressable
            onPress={onPress}
            className='w-full rounded-2xl border px-4 py-5 mb-4'
            style={[{ backgroundColor: active ? colors.orange_50 : colors.white, borderColor: active ? colors.orange_500 : colors.stoke_gray }]}
        >
            <View className="flex-row items-center">
                {/* Icon */}
                <View className="mr-4 pb-6">
                    {type === 'card' ?
                        <Image source={images.card} className="w-[24px] h-[24px]" resizeMode="contain" />
                        : <Image source={images.phone} className="w-[24px] h-[24px]" resizeMode="contain" />}
                </View>

                {/* Text */}
                <View className="flex-1">
                    <Text
                        style={[{ color: colors.text_primary }, t.title16SemiBold]}
                    >
                        {title}
                    </Text>
                    <Text style={[t.textMedium, { color: colors.text_secondary }]} className='mt-1'>
                        {subtitle}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}



