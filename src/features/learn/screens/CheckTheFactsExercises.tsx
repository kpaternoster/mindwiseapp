import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { ReminderCard } from '../components/ReminderCard';
import checkTheFactsExercisesData from '../data/checkTheFactsExercises.json';

export default function CheckTheFactsExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises, reminder } = checkTheFactsExercisesData;

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'Fact Finding') {
            dissolveTo('Learn_CheckTheFactsFinding');
        } else {
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
                <IntroCard text={introText} title={'About Check the Facts'} />

                {/* Exercise Cards */}
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        number={exercise.number}
                        title={exercise.title}
                        description={exercise.description}
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

