import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { ReminderCard } from '../components/ReminderCard';
import sudsExercisesData from '../data/sudsExercises.json';
import { ExerciseCard } from '../components';

export default function SUDSExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises, reminder } = sudsExercisesData;

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'SUDS Check-In') {
            dissolveTo('Learn_SUDSCheckIn');
        } else if (exercise.title === 'SUDS Coping Plan') {
            dissolveTo('Learn_SUDSCopingPlan');
        } else {
            // TODO: Navigate to other exercise screens
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
                {/* Intro Card */}
                <IntroCard text={introText} title={'About SUDS'} />

                {/* Exercise Cards */}
                {exercises.map((exercise) =>
                    <ExerciseCard
                        key={exercise.id}
                        number={exercise.number}
                        title={exercise.title}
                        description={exercise.description}
                        tags={exercise.tags}
                        onPress={() => handleExercisePress(exercise)}
                    />
                )}

                {/* Reminder Card */}
                <ReminderCard
                    title={reminder.title}
                    content={reminder.content}
                />
            </ScrollView>
        </View>
    );
}

