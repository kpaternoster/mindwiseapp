import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StatusBar,
} from 'react-native';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { Header } from '../components/Header';
import ProgressSteps from '../components/ProgressSteps';
import { colors } from '@design/color';
import { t } from '@design/typography';

type PlanKey = 'individual' | 'therapistPractice';

const PLANS: Record<
    PlanKey,
    { title: string; subtitle: string; monthly: string; yearly: string }
> = {
    individual: {
        title: 'Individual Plan',
        subtitle: 'Perfect for personal DBT practice',
        monthly: '$5.99/month',
        yearly: '$49.99/year',
    },
    therapistPractice: {
        title: 'Therapist Practice Plan',
        subtitle: 'Up to 20 practice members',
        monthly: '$99/month',
        yearly: '$999/year',
    },
};

export default function PlanSelectScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [selected, setSelected] = useState<PlanKey | null>(null);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const canContinue = useMemo(() => !!selected, [selected]);

    const onContinue = () => {
        if (!selected) return;
        dissolveTo('PlanBilling', {
            plan: selected,
            billingPeriod: billingPeriod,
        });
    };

    return (
        <View className='flex-1 pt-9 px-6 pb-12 bg-white'
        >
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Header text='Choose your plan' icon />
            {/* Progress (1–3) */}
            <ProgressSteps current={1} total={3} />

            {/* Billing Period Toggle */}
            <View className="mt-6 mb-4">
                <BillingToggle
                    selected={billingPeriod}
                    onSelect={setBillingPeriod}
                />
            </View>

            {/* Cards */}
            <View className="flex-1 mt-4">
                <PlanCard
                    active={selected === 'individual'}
                    onPress={() => setSelected('individual')}
                    title={PLANS.individual.title}
                    subtitle={PLANS.individual.subtitle}
                    priceMonthly={PLANS.individual.monthly}
                    priceYearly={PLANS.individual.yearly}
                    billingPeriod={billingPeriod}
                />
                <PlanCard
                    active={selected === 'therapistPractice'}
                    onPress={() => setSelected('therapistPractice')}
                    title={PLANS.therapistPractice.title}
                    subtitle={PLANS.therapistPractice.subtitle}
                    priceMonthly={PLANS.therapistPractice.monthly}
                    priceYearly={PLANS.therapistPractice.yearly}
                    billingPeriod={billingPeriod}
                />
            </View>

            {/* Continue */}
            <Pressable
                onPress={onContinue}
                disabled={!canContinue}
                style={[{ backgroundColor: canContinue ? colors.button_orange : colors.gray_300 }]}
                className='rounded-full py-5 items-center justify-center mx-2'
            >
                <Text style={[t.button, { color: canContinue ? colors.warm_dark : colors.black_40 }]}>
                    Continue
                </Text>
            </Pressable>
        </View>
    );
}


function BillingToggle({
    selected,
    onSelect,
}: {
    selected: 'monthly' | 'yearly';
    onSelect: (value: 'monthly' | 'yearly') => void;
}) {
    const containerStyle = { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.stoke_gray };
    const monthlyBgStyle = { backgroundColor: selected === 'monthly' ? colors.orange_dark : 'transparent' };
    const yearlyBgStyle = { backgroundColor: selected === 'yearly' ? colors.orange_dark : 'transparent' };
    const monthlyTextStyle = { color: selected === 'monthly' ? colors.white : colors.gray_medium };
    const yearlyTextStyle = { color: selected === 'yearly' ? colors.white : colors.gray_medium };

    return (
        <View className='flex-row justify-center'>
            <View
                className="flex-row rounded-full w-64"
                style={containerStyle}
            >
                <Pressable
                    onPress={() => onSelect('monthly')}
                    className="flex-1 py-3 rounded-full items-center justify-center"
                    style={monthlyBgStyle}
                >
                    <Text style={[t.title16SemiBold, monthlyTextStyle]}>
                        Monthly
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => onSelect('yearly')}
                    className="flex-1 py-3 rounded-full items-center justify-center"
                    style={yearlyBgStyle}
                >
                    <Text style={[t.title16SemiBold, yearlyTextStyle]}>
                        Yearly
                    </Text>
                </Pressable>
            </View>
        </View>

    );
}

function PlanCard({
    active,
    onPress,
    title,
    subtitle,
    priceMonthly,
    priceYearly,
    billingPeriod,
}: {
    active: boolean;
    onPress: () => void;
    title: string;
    subtitle: string;
    priceMonthly: string;
    priceYearly: string;
    billingPeriod: 'monthly' | 'yearly';
}) {
    const isMonthly = billingPeriod === 'monthly';
    
    return (
        <Pressable
            onPress={onPress}
            className='w-full rounded-2xl border px-4 py-4 mb-4'
            style={[{ backgroundColor: active ? colors.orange_50 : colors.white, borderColor: active ? colors.orange_500 : colors.stoke_gray }]}
        >
            <View className="flex-row">
                <View className="flex-1">
                    <Text
                        style={[{ color: colors.text_primary }, t.title16SemiBold]}
                    >
                        {title}
                    </Text>
                    <Text style={[t.textMedium, { color: colors.text_secondary }]} className='mt-4 pr-12'>{subtitle}</Text>
                </View>
                <View className="items-end">
                    <Text style={[{ color: colors.text_primary }, t.title16SemiBold]}>
                        {isMonthly ? priceMonthly : priceYearly}
                    </Text>
                    <Text className="mt-4" style={[t.textMedium, { color: colors.text_secondary }]}>
                        or {""} {isMonthly ? priceYearly : priceMonthly}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
