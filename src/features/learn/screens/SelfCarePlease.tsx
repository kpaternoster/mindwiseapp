import React from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { ContentCard } from '../components/ContentCard';
import { ArrowRightIcon, HeartIcon } from '@components/Utils';
import selfCarePleaseData from '../data/selfCarePlease.json';

export default function SelfCarePleaseScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttonText } = selfCarePleaseData;

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
                    <View key={section.id} className="mb-4">
                        {section.id === 3 ? (
                            // Special styling for "Be Patient With Yourself" section with heart icon
                            <View
                                className="rounded-2xl p-4"
                                style={{ backgroundColor: section.backgroundColor ?? colors.white }}
                            >
                                <View className="flex-row items-center mb-3">
                                    <HeartIcon size={20} color={colors.orange_300} />
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-3">
                                        {section.title}
                                    </Text>
                                </View>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {section.content}
                                </Text>
                            </View>
                        ) : (
                            <ContentCard
                                title={section.title}
                                content={section.content}
                                backgroundColor={section.backgroundColor ?? colors.white}
                            />
                        )}
                    </View>
                ))}

                {/* Bottom Button */}
                <Pressable
                    className="rounded-full py-4 px-3 flex-row items-center justify-center mb-4"
                    style={{ backgroundColor: colors.Button_Orange }}
                    onPress={() => dissolveTo('Learn_SelfCarePleaseExercises')}
                >
                    <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                        {buttonText}
                    </Text>
                    <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                        <ArrowRightIcon size={16} color={colors.Text_Primary} />
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    );
}

