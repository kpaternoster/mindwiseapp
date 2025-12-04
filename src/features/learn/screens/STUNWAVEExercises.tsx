import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { ReminderCard } from '../components/ReminderCard';
import stunwaveExercisesData from '../data/stunwaveExercises.json';

export default function STUNWAVEExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises, reminder } = stunwaveExercisesData;

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
                <IntroCard text={introText} title='About STUNWAVE'/>

                {/* Exercise Cards */}
                {exercises.map((exercise) => {
                    const handleExercisePress = () => {
                        // TODO: Navigate to STUNWAVE Check-In screen
                        if (exercise.title === 'STUNWAVE Check-In') {
                            dissolveTo('Learn_STUNWAVECheckIn');
                        } else {
                            console.log('Exercise pressed:', exercise.title);
                        }
                    };

                    return (
                        <ExerciseCard
                            key={exercise.id}
                            number={exercise.number}
                            title={exercise.title}
                            description={exercise.description}
                            onPress={handleExercisePress}
                        />
                    );
                })}

                {/* Reminder Card */}
                <ReminderCard
                    title={reminder.title}
                    content={reminder.content}
                />
            </ScrollView>
        </View>
    );
}

