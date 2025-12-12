import React from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ExerciseCard, IntroCard } from '../components';
import { HeartIcon } from '@components/Utils';
import stopExercisesData from '../data/stopExercises.json';

export default function STOPExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises } = stopExercisesData;

    const handleExercisePress = (exercise: any) => {
        switch (exercise.title) {
            case 'Reflective Practice':
                dissolveTo('Learn_ReflectivePractice');
                break;
            case 'STOP Drill':
                dissolveTo('Learn_StopDrill');
                break;
            case 'Mindful Pause Timer':
                dissolveTo('Learn_MindfulPauseTimer');
                break;
            case 'Role-Play Exercise':
                dissolveTo('Learn_RolePlayExercise');
                break;
            default:
                // TODO: Navigate to other exercise screens when created
                console.log('Exercise pressed:', exercise.title);
                break;
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
                {/* Intro Card */}
                <IntroCard text={introText} />

                {/* Exercise Cards */}
                {exercises.map((exercise) => {
                    if (exercise.hasHeartIcon) {
                        // Custom card for "Be Patient With Yourself" with heart icon and orange background
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
                                <View className="flex-row items-start">
                                    <View className="mr-3">
                                        <HeartIcon size={24} color={colors.orange_500} />
                                    </View>
                                    <View className="flex-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
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

