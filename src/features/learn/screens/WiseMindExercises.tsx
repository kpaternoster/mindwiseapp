import React from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ExerciseCard } from '../components';
import { HeartIcon } from '@components/Utils';
import wiseMindExercisesData from '../data/wiseMindExercises.json';

export default function WiseMindExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, introTitle, exercises } = wiseMindExercisesData;

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'Wise Mind Practice') {
            dissolveTo('Learn_WiseMindPractice');
        } else if (exercise.title === 'Past Decisions') {
            dissolveTo('Learn_WiseMindPastDecisions');
        } else {
            // Finding Your Inner Wisdom doesn't have navigation
            console.log('Exercise pressed:', exercise.title);
        }
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
                {exercises.map((exercise) => {
                    if (exercise.hasHeartIcon) {
                        // Custom card for "Finding Your Inner Wisdom" with heart icon
                        return (
                            <View
                                key={exercise.id}
                                className="bg-white rounded-2xl p-4 mb-4"
                                style={{
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                    backgroundColor: colors.orange_50,
                                }}
                            >
                                <View className="flex-row items-center mb-3">
                                    <View className="mr-3">
                                        <HeartIcon size={24} color={colors.orange_500} />
                                    </View>
                                    <View className="flex-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {exercise.title}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {exercise.description}
                                </Text>
                            </View>
                        );
                    } else {
                        // Regular exercise card with number badge
                        return (
                            <ExerciseCard
                                key={exercise.id}
                                number={exercise.number}
                                title={exercise.title}
                                description={exercise.description}
                                onPress={exercise.hasNavigation !== false ? () => handleExercisePress(exercise) : undefined}
                            />
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
}

