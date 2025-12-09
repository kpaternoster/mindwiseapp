import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { SkillCard, KeepLearningCard, PageHeader, ProgressSection } from '../components';
import regulateEmotionsData from '../data/regulateEmotions.json';
import { PlantIcon } from '@components/Utils';

export default function RegulateEmotionsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSkills, completedSkills, progressPercentage, sections, skills, keepLearning } = regulateEmotionsData;

    const handleSkillPress = (skill: any) => {
        switch (skill.title) {
            case 'Check the Facts':
                dissolveTo('Learn_CheckTheFacts');
                break;
            case 'Chain Analysis':
                dissolveTo('Learn_ChainAnalysis');
                break;
            case "Self-Care (PLEASE)":
                dissolveTo('Learn_SelfCarePlease');
            case "Dialectical Thinking":
                dissolveTo('Learn_DialecticalThinking');
                break;
            case "Problem Solving":
                dissolveTo('Learn_ProblemSolving');
                break;
            default:
                console.log('Exercise pressed:', skill.title);
                break;
        }
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

            <ProgressSection
                completedSkills={completedSkills}
                totalSkills={totalSkills}
                progressPercentage={progressPercentage}
            />

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {sections.map((section) => (
                    <View
                        key={section.id}
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        {/* Header with icon and title */}
                        <View className="flex-row items-center mb-3">
                            {section.icon && (
                                <View
                                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                                    style={{ backgroundColor: colors.gray_100 }}
                                >
                                    <PlantIcon size={24} color={colors.orange_500} />
                                </View>
                            )}
                            <View className="flex-1">
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                    {section.title}
                                </Text>
                            </View>
                        </View>

                        {/* Description */}
                        {section.description && (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {section.description}
                            </Text>
                        )}
                    </View>
                ))}

                {/* Skill Cards */}
                {skills && skills.map((skill) => {
                    return (
                        <SkillCard
                            key={skill.id}
                            title={skill.title}
                            duration={skill.duration}
                            difficulty={skill.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'}
                            description={skill.description}
                            tags={skill.tags}
                            onPress={() => handleSkillPress(skill)}
                        />
                    );
                })}

                {/* Keep Learning Card */}
                {keepLearning && (
                    <KeepLearningCard
                        title={keepLearning.title}
                        description={keepLearning.description}
                    />
                )}
                <View className='mb-20'></View>
            </ScrollView>
        </View>
    );
}

