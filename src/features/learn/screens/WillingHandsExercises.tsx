import React from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ExerciseCard } from '../components';
import willingHandsExercisesData from '../data/willingHandsExercises.json';

export default function WillingHandsExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, introTitle, exercises, buttonText } = willingHandsExercisesData;

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'Willing Hands Practice') {
            dissolveTo('Learn_WillingHandsPractice');
        } else if (exercise.title === 'Saved Entries') {
            dissolveTo('Learn_WillingHandsEntries');
        } else {
            console.log('Exercise pressed:', exercise.title);
        }
    };

    const handleBackToOverview = () => {
        dissolveTo('Learn_WillingHands');
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
                {/* Intro Card with custom background */}
                <View
                    className="rounded-2xl p-4 mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    {introTitle && (
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                            {introTitle}
                        </Text>
                    )}
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {introText}
                    </Text>
                </View>

                {/* Exercise Cards */}
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        number={exercise.number}
                        title={exercise.title}
                        description={exercise.description}
                        tags={exercise.tags}
                        onPress={exercise.hasNavigation !== false ? () => handleExercisePress(exercise) : undefined}
                    />
                ))}
            </ScrollView>

            {/* Bottom Button */}
            <View className="px-5 pb-6 pt-4 bg-white">
                <Pressable
                    className="rounded-full py-3 px-3 items-center justify-center"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleBackToOverview}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        {buttonText}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

