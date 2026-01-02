import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { HomePage } from "@components/HomePage";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";
import { GettingStartedCard } from "../components/GettingStartedCard";
import { SkillCategoryCard } from "../components/SkillCategoryCard";
import { LearningTipCard } from "../components/LearningTipCard";
import { images } from "@design/image";
import skillCategoriesData from "../data/skillCategories.json";
import { fetchLearningProgress, LearningProgress } from "../api/learning";

interface SkillCategory {
    id: string;
    title: string;
    description: string;
    skillCount: number;
    progressPercentage: number;
}

// Map API broadCategory to category ID
const mapBroadCategoryToId = (broadCategory: string): string => {
    const mapping: { [key: string]: string } = {
        'understand-emotions': '1',
        'regulate-emotions': '2',
        'be-mindful': '3',
        'improve-interpersonal-effectiveness': '4',
        'build-distress-tolerance': '5',
        'build-self-love': '6',
    };
    return mapping[broadCategory] || '';
};

export default function Learn() {
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [learningTip, setLearningTip] = useState<string>("");
    const [overallProgress, setOverallProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load data from JSON
        try {
            if (skillCategoriesData && skillCategoriesData.categories) {
                setCategories(skillCategoriesData.categories as SkillCategory[]);
            }
            if (skillCategoriesData && skillCategoriesData.learningTip) {
                setLearningTip(skillCategoriesData.learningTip);
            }
        } catch (error) {
            console.error("Error loading skill categories data:", error);
        }
    }, []);

    // Fetch learning progress from API
    useEffect(() => {
        const loadLearningProgress = async () => {
            try {
                setIsLoading(true);
                const progressData: LearningProgress = await fetchLearningProgress();
                
                // Update overall progress from API
                const totalProgressPercentage = Math.round(progressData.totalProgress * 100);
                setOverallProgress(totalProgressPercentage);
                
                // Update categories with progress from API
                setCategories((prevCategories) => {
                    return prevCategories.map((category) => {
                        // Find matching broad category from API
                        const broadCategory = progressData.broadCategories.find(
                            (bc) => mapBroadCategoryToId(bc.broadCategory) === category.id
                        );
                        
                        if (broadCategory) {
                            // Calculate progress percentage
                            const progressPercentage = broadCategory.numberOfCategories > 0
                                ? Math.round((broadCategory.numberOfCategoriesCompleted / broadCategory.numberOfCategories) * 100)
                                : 0;
                            
                            return {
                                ...category,
                                progressPercentage,
                            };
                        }
                        
                        return category;
                    });
                });
            } catch (error) {
                console.error("Error fetching learning progress:", error);
                // Keep default values if API fails
            } finally {
                setIsLoading(false);
            }
        };

        loadLearningProgress();
    }, []);

    const { dissolveTo } = useDissolveNavigation();

    const handleCategoryPress = (categoryId: string) => {
        // Navigate to category detail screen
        switch (categoryId) {
            case "1":
                dissolveTo('Learn_UnderstandEmotions');
                break;
            case "2":
                dissolveTo('Learn_RegulateEmotions');
                break;
            case "3":
                dissolveTo('Learn_BeMindful');
                break;
            case "4":
                dissolveTo('Learn_ImproveInterpersonalEffectiveness');
                break;
            case "5":
                dissolveTo('Learn_BuildDistressTolerance');
                break;
            case "6":
                dissolveTo('Learn_BuildSelfLove');
                break;
            default:
                console.log("Navigate to category:", categoryId);
                break;
        }
    };

    // Calculate progress percentage and width
    const progressPercentage = overallProgress;
    const progressWidth = `${progressPercentage}%` as `${number}%`;
    const indicatorLeftPosition = (progressPercentage === 0 ? 0 : `${progressPercentage}%`) as `${number}%` | 0;

    // Calculate total skills across all categories
    const totalSkills = categories.reduce((sum, category) => sum + category.skillCount, 0);
    const completedSkills = Math.round((progressPercentage / 100) * totalSkills);

    return (
        <HomePage active="learn">
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            {/* Header */}
            <View className="flex-row justify-between items-start px-7 pt-9 pb-4">
                <View className="flex-1">
                    <Text style={[t.title32SemiBold, { color: colors.Text_Primary }]} className='mb-1'>
                        Learn
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Build your DBT skills toolkit
                    </Text>
                </View>
                <Image
                    source={images.leaf_big}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <ScrollView className="flex-1 bg-white pt-4 pb-4 px-2 mb-12" showsVerticalScrollIndicator={false}>
                {/* Your Learning Progress Card */}
                <View className="mx-5 mb-4 p-4 rounded-2xl" style={{ backgroundColor: colors.orange_50 }}>
                    <View className="flex-row justify-between items-center">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className='mb-2'>
                            Your Learning Progress
                        </Text>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={colors.orange_500} />
                        ) : (
                            <Text style={[t.title24SemiBold, { color: colors.orange_500 }]}>
                                {progressPercentage}%
                            </Text>
                        )}
                    </View>

                    <View className="flex-row justify-between items-center mb-3">
                        <Text style={[t.textMedium, { color: colors.text_secondary }]}>
                            Skills mastered across all categories
                        </Text>
                        <View className="items-end">
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>Complete</Text>
                        </View>
                    </View>
                    <View className="h-1.5 bg-white rounded mb-2">
                        <View
                            className="h-full rounded absolute left-0"
                            style={{ width: progressWidth, backgroundColor: colors.orange }}
                        />
                        {/* Progress Indicator Dot */}
                        <View
                            className="absolute -top-1 -ml-1.5"
                            style={{
                                left: indicatorLeftPosition,
                            }}
                        >
                            <View
                                className="w-3.5 h-3.5 rounded-full border-2"
                                style={{
                                    backgroundColor: colors.orange,
                                    borderColor: colors.white,
                                }}
                            />
                        </View>
                    </View>
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]} className="mt-1">
                        Keep practicing to strengthen your skills.
                    </Text>
                </View>

                {/* Getting Started Section */}
                <View className="flex-row justify-between items-start px-5 pb-4">
                    <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className='mt-5 mb-4'>
                        Getting Started
                    </Text>
                </View>

                <GettingStartedCard />

                {/* Skill Categories Section */}
                <View className="flex-row justify-between items-start px-5 pb-4">
                    <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className='mt-5 mb-4'>
                        Skill Categories
                    </Text>
                </View>

                {categories.length > 0 ? (
                    <>
                        {categories.map((category) => (
                            <SkillCategoryCard
                                key={category.id}
                                title={category.title}
                                description={category.description}
                                skillCount={category.skillCount}
                                progressPercentage={category.progressPercentage}
                                onPress={() => handleCategoryPress(category.id)}
                            />
                        ))}

                        {learningTip && (
                            <LearningTipCard tip={learningTip} />
                        )}
                    </>
                ) : null}

                <View className="h-24" />
            </ScrollView>
        </HomePage>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 35,
        height: 55,
    },
});