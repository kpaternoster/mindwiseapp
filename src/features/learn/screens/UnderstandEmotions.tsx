import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StatusBar } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { SkillCard, KeepLearningCard, PageHeader, ProgressSection } from '../components';
import understandEmotionsData from '../data/understandEmotions.json';
import { PlantIcon } from '@components/Utils';

export default function UnderstandEmotionsScreen() {
    const { dissolveGoBack, dissolveTo } = useDissolveNavigation();
    const { title, totalSkills, completedSkills, progressPercentage, sections, skills, keepLearning } = understandEmotionsData;

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
                                <View className="flex-row items-center justify-between">
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="flex-1">
                                        {section.title}
                                    </Text>
                                    {section.readTime && (
                                        <View
                                            className="px-3 py-1 rounded-full ml-2"
                                            style={{ backgroundColor: colors.orange_opacity_10 }}
                                        >
                                            <Text style={[t.footnoteBold, { color: colors.orange_600 }]}>
                                                {section.readTime}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Description */}
                        {section.description && (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                {section.description}
                            </Text>
                        )}

                        {/* Paragraphs */}
                        {section.paragraphs && section.paragraphs.map((paragraph, index) => {
                            if (index === 1 && section.type === 'info') {
                                // Second paragraph with indented background box
                                return (
                                    <View
                                        key={index}
                                        className="ml-4 p-3 rounded-md mb-0 border-l-2 pl-4"
                                        style={{ backgroundColor: colors.gray_100, borderLeftColor: colors.text_secondary }}
                                    >
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                            {paragraph}
                                        </Text>
                                    </View>
                                );
                            }
                            return (
                                <Text
                                    key={index}
                                    style={[t.textRegular, { color: colors.text_secondary }]}
                                    className={index === 0 ? "mb-3" : "mb-0"}
                                >
                                    {paragraph}
                                </Text>
                            );
                        })}
                    </View>
                ))}

                {/* Skill Cards */}
                {skills && skills.map((skill) => {
                    const handleSkillPress = () => {
                        // Navigate based on skill title
                        switch (skill.title) {
                            case 'Emotions Wheel':
                                dissolveTo('Learn_EmotionsWheel');
                                break;
                            case 'SUDS':
                                dissolveTo('Learn_AboutSUDS');
                                break;
                            case 'Stun Wave':
                                dissolveTo('Learn_AboutSTUNWAVE');
                                break;
                            default:
                                console.log('Exercise pressed:', skill.title);
                                break;
                        }
                    };

                    return (
                        <SkillCard
                            key={skill.id}
                            title={skill.title}
                            duration={skill.duration}
                            difficulty={skill.difficulty as 'Beginner' | 'Intermediate' | 'Advanced'}
                            description={skill.description}
                            tags={skill.tags}
                            onPress={handleSkillPress}
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

