import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { ExerciseCard } from '../components';
import selfCarePleaseExercisesData from '../data/selfCarePleaseExercises.json';

export default function SelfCarePleaseExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises } = selfCarePleaseExercisesData;

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'Self-Care (PLEASE) Plan') {
            dissolveTo('Learn_SelfCarePleasePlan');
        } else if (exercise.title === 'Self-Care (PLEASE) Reflection') {
            dissolveTo('Learn_SelfCarePleaseReflection');
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
                <IntroCard text={introText} />

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
            </ScrollView>
        </View>
    );
}

