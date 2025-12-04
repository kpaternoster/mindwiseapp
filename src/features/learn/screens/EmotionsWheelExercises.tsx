import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { ReminderCard } from '../components/ReminderCard';
import emotionsWheelExercisesData from '../data/emotionsWheelExercises.json';

export default function EmotionsWheelExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises, reminder } = emotionsWheelExercisesData;

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
                    const handleExercisePress = () => {
                        // Navigate based on exercise title
                        switch (exercise.title) {
                            case 'Name Your Emotion':
                                dissolveTo('Learn_NameYourEmotions');
                                break;
                            case 'Emotion Tracker':
                                dissolveTo('Learn_EmotionsTracker');
                                break;
                            case 'Practice With Others':
                                dissolveTo('Learn_PracticeWithOthers');
                                break;
                            default:
                                console.log('Exercise pressed:', exercise.title);
                                break;
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

