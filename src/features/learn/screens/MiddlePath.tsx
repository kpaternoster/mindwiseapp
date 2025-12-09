import React from 'react';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ContentCard } from '../components';
import { ArrowRightIcon } from '@components/Utils';
import middlePathData from '../data/middlePath.json';

export default function MiddlePathScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttonText } = middlePathData;

    const handleButtonPress = () => {
        dissolveTo('Learn_MiddlePathExercises');
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
                        backgroundColor={section.backgroundColor?? colors.white}
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
                    <Text style={[t.textSemiBold, { color: colors.white }]} className='flex-1 text-center items-center'>
                        {buttonText}
                    </Text>
                    <View
                        className="w-9 h-9 rounded-full items-center justify-center"
                        style={{ backgroundColor: colors.white }}
                    >
                        <ArrowRightIcon size={16} color={colors.icon} />
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

