import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ExerciseCard, IntroCard } from '../components';
import { HeartIcon, CheckIcon } from '@components/Utils';
import differentActionExercisesData from '../data/differentActionExercises.json';

export default function DifferentActionExercisesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, exercises } = differentActionExercisesData;
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleExercisePress = (exercise: any) => {
        if (exercise.title === 'Identify Emotional Urges') {
            dissolveTo('Learn_DifferentActionIdentifyEmotionalUrges');
        } else if (exercise.title === 'Flash Card Prompts') {
            dissolveTo('Learn_DifferentActionFlashCardPrompts');
        } else {
            // TODO: Navigate to other exercise screens when created
            console.log('Exercise pressed:', exercise.title);
        }
    };

    const handleOptionSelect = (optionId: number) => {
        setSelectedOption(optionId);
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
                                <View className="flex-row items-start mb-2">
                                    <View className="mr-3">
                                        <HeartIcon size={24} color={colors.orange_500} />
                                    </View>
                                    <View className="flex-1">
                                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                            {exercise.title}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {exercise.description}
                                </Text>
                            </View>
                        );
                    } else if ((exercise as any).hasOptions) {
                        return (
                            <View
                                key={exercise.id}
                                className="bg-white rounded-2xl p-4 mb-4 flex-col"
                                style={{
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                }}
                            >
                                <View className='flex-row w-full items-center justify-between mb-3'>
                                    <View className='flex-row items-center'>
                                        <View
                                            className="w-8 h-8 rounded-full items-center justify-center mr-4"
                                            style={{ backgroundColor: colors.Button_Orange }}
                                        >
                                            <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                                {exercise.number}
                                            </Text>
                                        </View>

                                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="">
                                            {exercise.title}
                                        </Text>
                                    </View>
                                </View>
                                
                                <View className="flex-1 mb-3">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                        {exercise.description}
                                    </Text>
                                </View>
                                
                                {/* Selectable Options */}
                                {((exercise as any).options || []).map((option: any, index: number) => {
                                    const isSelected = selectedOption === option.id;
                                    const isLast = index === ((exercise as any).options || []).length - 1;
                                    
                                    return (
                                        <Pressable
                                            key={option.id}
                                            onPress={() => handleOptionSelect(option.id)}
                                            className={isLast ? "rounded-xl p-3 flex-row items-center" : "rounded-xl p-3 flex-row items-center mb-3"}
                                            style={{
                                                backgroundColor: isSelected ? colors.cream_40 : colors.white,
                                                borderColor: colors.stoke_gray,
                                                borderWidth: 1,
                                            }}
                                        >
                                            {/* Radio Button Circle */}
                                            <View
                                                className="w-6 h-6 rounded-full items-center justify-center mr-3"
                                                style={{
                                                    backgroundColor: colors.white,
                                                    borderColor: colors.stoke_gray,
                                                    borderWidth: 1,
                                                }}
                                            >
                                                {isSelected && (
                                                    <CheckIcon size={16} color={colors.Button_Orange} />
                                                )}
                                            </View>
                                            
                                            {/* Option Text */}
                                            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="flex-1">
                                                {option.title}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
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
                                isNavigation={exercise.hasNavigation !== false}
                            />
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
}

