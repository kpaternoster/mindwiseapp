import React from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { ReminderCard } from '../components/ReminderCard';
import chainAnalysisExercisesData from '../data/chainAnalysisExercises.json';
import { ExerciseCard } from '../components';

export default function ChainAnalysisExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, exercises, reminder } = chainAnalysisExercisesData;

    const handleExercisePress = (exercise: any) => {
        // TODO: Navigate to specific exercise screen
        console.log('Exercise pressed:', exercise.title);
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
                {/* Intro Card with Tip */}
                <View
                    className="rounded-2xl p-4 mb-4"
                    style={{ backgroundColor: colors.cream_40 }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                        {intro.title}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        {intro.description}
                    </Text>
                    {/* Tip Box */}
                    {intro.tip && (
                        <View
                            className="rounded-xl p-3"
                            style={{ backgroundColor: colors.orange_50 }}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {intro.tip.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {intro.tip.content}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Exercise Cards */}
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        number={exercise.number}
                        title={exercise.title}
                        description={exercise.description}
                        duration={exercise.duration}
                        difficulty={exercise.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'}
                        tags={exercise.tags}
                        onPress={() => handleExercisePress(exercise)}
                    />
                ))}

                {/* Reminder Card */}
                <ReminderCard
                    title={reminder.title}
                    content={reminder.content}
                />
            </ScrollView>
        </View>
    );
}

