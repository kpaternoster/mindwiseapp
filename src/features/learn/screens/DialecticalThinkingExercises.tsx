import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { IntroCard } from '../components/IntroCard';
import { ExerciseCard } from '../components';
import { HeartIcon } from '@components/Utils';
import { Text } from 'react-native';
import dialecticalThinkingExercisesData from '../data/dialecticalThinkingExercises.json';

export default function DialecticalThinkingExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises, conclusion } = dialecticalThinkingExercisesData;

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'Dialectical Reframing') {
            dissolveTo('Learn_DialecticalThinkingReframing');
        } else if (exercise.title === 'Exploring Perspectives') {
            dissolveTo('Learn_DialecticalThinkingExploringPerspectives');
        } else {
            // TODO: Add navigation to other exercise screens when they are created
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
                <IntroCard text={introText} title="About Dialectical Thinking" />

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

                {/* Conclusion Card with Heart Icon */}
                <View
                    className="bg-white rounded-2xl p-4 mb-4"
                    style={{
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                        backgroundColor: colors.cream_40,
                    }}
                >
                    <View className="flex-row items-start mb-3">
                        <View className="mr-3 mt-1">
                            <HeartIcon size={24} color={colors.orange_500} />
                        </View>
                        <View className="flex-1">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {conclusion.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {conclusion.content}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

