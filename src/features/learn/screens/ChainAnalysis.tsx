import React from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { ContentCard } from '../components/ContentCard';
import { ArrowRightIcon } from '@components/Utils';
import chainAnalysisData from '../data/chainAnalysis.json';

export default function ChainAnalysisScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttonText } = chainAnalysisData;

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
                        backgroundColor={section.backgroundColor ?? colors.white}
                    />
                ))}

                {/* Bottom Button */}
                <Pressable
                    className="rounded-full py-4 px-3 flex-row items-center justify-center mb-4"
                    style={{ backgroundColor: colors.Button_Orange }}
                    onPress={() => dissolveTo('Learn_ChainAnalysisExercises')}
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

