import React from 'react';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ContentCard } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import radicalAcceptanceData from '../data/radicalAcceptance.json';

export default function RadicalAcceptanceScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttonText } = radicalAcceptanceData;

    const handleButtonPress = () => {
        dissolveTo('Learn_RadicalAcceptanceExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {sections.map((section) => (
                    <ContentCard
                        key={section.id}
                        title={section.title}
                        content={section.content}
                        backgroundColor={(section as any).backgroundColor}
                    />
                ))}
            </ScrollView>

            {/* Bottom Action Button */}
            <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                <Pressable
                    className="rounded-full py-4 px-3 flex-row items-center justify-center"
                    style={{ backgroundColor: colors.Button_Orange }}
                    onPress={handleButtonPress}
                >
                    <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                        {buttonText}
                    </Text>
                    <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                        <ArrowRightIcon size={16} color={colors.Text_Primary} />
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

