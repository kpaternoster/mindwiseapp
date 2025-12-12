import React from 'react';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard, ExerciseCard } from '../components';
import { HeartIcon } from '@components/Utils';
import selfValidationExercisesData from '../data/selfValidationExercises.json';

export default function SelfValidationExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, introTitle, exercises, bePatientCard } = selfValidationExercisesData;

    const handleExercisePress = (exercise: any) => {
        // TODO: Navigate to specific exercise screens when created
        console.log('Exercise pressed:', exercise.title);
        switch (exercise.title) {
            case 'Self-Validation Practice':
                dissolveTo('Learn_SelfValidationPractice');
                break;
            default:
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
                <IntroCard
                    title={introTitle}
                    text={introText}
                />

                {/* Exercise Cards */}
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        number={exercise.number}
                        title={exercise.title}
                        description={exercise.description}
                        onPress={exercise.hasNavigation ? () => handleExercisePress(exercise) : undefined}
                    />
                ))}

                {/* Be Patient With Yourself Card */}
                {bePatientCard && (
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                            backgroundColor: colors.cream_40,
                        }}
                    >
                        <View className="flex-row items-start mb-3">
                            <View className="mr-3">
                                <HeartIcon size={24} color={colors.orange_500} />
                            </View>
                            <View className="flex-1">
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                    {bePatientCard.title}
                                </Text>

                            </View>
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {bePatientCard.description}
                        </Text>
                    </View>
                )}
                <View className='mb-20'></View>
            </ScrollView>
        </View>
    );
}

