import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { SkillCard, KeepLearningCard, PageHeader, ProgressSection } from '../components';
import buildDistressToleranceData from '../data/buildDistressTolerance.json';
import { PlantIcon } from '@components/Utils';

export default function BuildDistressToleranceScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, totalSkills, completedSkills, progressPercentage, sections, skills, keepLearning } = buildDistressToleranceData;

    const handleSkillPress = (skill: any) => {
        // TODO: Navigate to specific skill screens when created
        console.log('Skill pressed:', skill.title);
        switch (skill.title) {
            case 'TIPP':
                dissolveTo('Learn_TIPP');
                break;
            case 'STOP':
                dissolveTo('Learn_STOP');
                break;
            case 'Self-Soothing':
                dissolveTo('Learn_SelfSoothing');
                break;
            case 'IMPROVE':
                dissolveTo('Learn_Improve');
                break;
            case 'Radical Acceptance':
                dissolveTo('Learn_RadicalAcceptance');
                break;
            case 'Different Action':
                dissolveTo('Learn_DifferentAction');
                break;
            case 'Half-Smiling':
                dissolveTo('Learn_HalfSmiling');
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
                            backgroundColor: colors.white,
                        }}
                    >
                        {/* Header with icon and title */}
                        <View className="flex-row items-center mb-3">
                            {section.icon && (
                                <View
                                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                                    style={{ backgroundColor: colors.orange_50 }}
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

