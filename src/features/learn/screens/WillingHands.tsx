import React from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ContentCard } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import willingHandsData from '../data/willingHands.json';

export default function WillingHandsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttonText } = willingHandsData;

    const handleButtonPress = () => {
        // TODO: Navigate to Willing Hands Exercises screen when created
        console.log('Try Willing Hands Exercises pressed');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {sections.map((section, index) => (
                    <ContentCard
                        key={index}
                        title={section.title}
                        content={section.content}
                        backgroundColor={section.backgroundColor}
                    />
                ))}
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View
                className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4"
                style={{ backgroundColor: colors.white }}
            >
                <Pressable
                    className="rounded-full py-4 px-6 flex-row items-center justify-between"
                    style={{ backgroundColor: colors.Button_Orange }}
                    onPress={handleButtonPress}
                >
                    <Text style={[t.textSemiBold, { color: colors.white }]}>
                        {buttonText}
                    </Text>
                    <View
                        className="w-8 h-8 rounded-full items-center justify-center"
                        style={{ backgroundColor: colors.white }}
                    >
                        <ArrowRightIcon size={18} color={colors.Text_Primary} />
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

