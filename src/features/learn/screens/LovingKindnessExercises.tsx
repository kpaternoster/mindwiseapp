import React from 'react';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ExerciseCard } from '../components';
import { HeartIcon } from '@components/Utils';
import lovingKindnessExercisesData from '../data/lovingKindnessExercises.json';

export default function LovingKindnessExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, exercises, conclusion } = lovingKindnessExercisesData;

    const handleExercisePress = (exerciseTitle: string) => {
        switch (exerciseTitle) {
            case 'Loving Kindness Practice':
                dissolveTo('Learn_LovingKindnessPractice');
                break;
            default:
                console.log('Exercise pressed:', exerciseTitle);
                break;
        }
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_LovingKindness');
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
                <View
                    className="rounded-3xl p-5 mb-4"
                    style={{ backgroundColor: colors.cream_40 }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                        {intro.title}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {intro.content}
                    </Text>
                </View>

                {/* Exercise Cards */}
                {exercises.map((exercise, index) => (
                    <ExerciseCard
                        key={index}
                        title={exercise.title}
                        description={exercise.description}
                        number={exercise.number}
                        onPress={() => handleExercisePress(exercise.title)}
                    />
                ))}

                {/* Conclusion Card */}
                <View
                    className="rounded-3xl p-5 mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <View className="flex-row items-center mb-2">
                        <HeartIcon size={24} color={colors.muted_coral} />
                        <Text
                            style={[t.title16SemiBold, { color: colors.Text_Primary }]}
                            className="ml-4 flex-1"
                        >
                            {conclusion.title}
                        </Text>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {conclusion.content}
                    </Text>
                </View>

               
            </ScrollView>
        </View>
    );
}

