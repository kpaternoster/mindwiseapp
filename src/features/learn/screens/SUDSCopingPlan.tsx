import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { SUDSLevelSection, CopingSkill } from '../components/SUDSLevelSection';
import { ContentCard } from '../components/ContentCard';
import sudsCopingPlanData from '../data/sudsCopingPlan.json';
import allSkillsData from '../data/allSkills.json';
import { IntroCard } from '../components';
import { fetchSudsCopingPlan, updateSudsCopingPlan, SudsCopingPlan as ApiSudsCopingPlan } from '../api/suds';

interface SudsLevel {
    id: string;
    range: string;
    label: string;
    description: string;
    skills: CopingSkill[];
}

export default function SUDSCopingPlanScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sudsLevels: defaultSudsLevels, howToUse } = sudsCopingPlanData;

    const [sudsLevels, setSudsLevels] = useState<SudsLevel[]>(defaultSudsLevels);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        '1-3': true, // First section expanded by default
        '4-6': false,
        '7-8': false,
        '9-10': false,
    });
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get all available skills
    const allSkills: CopingSkill[] = useMemo(() => {
        return allSkillsData as CopingSkill[];
    }, []);

    // Create a map of skill IDs to full skill objects
    const skillsMap = useMemo(() => {
        const map = new Map<string, CopingSkill>();
        allSkills.forEach(skill => {
            map.set(skill.id, skill);
        });
        return map;
    }, [allSkills]);

    // Transform API data (skill IDs) to component format (full skill objects)
    const transformApiDataToComponentFormat = useCallback((apiData: ApiSudsCopingPlan): SudsLevel[] => {
        return defaultSudsLevels.map((level) => {
            let skillIds: string[] = [];
            
            // Map API keys to level IDs
            switch (level.id) {
                case '1-3':
                    skillIds = apiData.mild || [];
                    break;
                case '4-6':
                    skillIds = apiData.moderate || [];
                    break;
                case '7-8':
                    skillIds = apiData.high || [];
                    break;
                case '9-10':
                    skillIds = apiData.extreme || [];
                    break;
            }

            // Convert skill IDs to full skill objects
            const skills = skillIds
                .map(id => skillsMap.get(id))
                .filter((skill): skill is CopingSkill => skill !== undefined);

            return {
                ...level,
                skills,
            };
        });
    }, [defaultSudsLevels, skillsMap]);

    // Transform component format to API format (skill IDs only)
    const transformComponentFormatToApiData = useCallback((levels: SudsLevel[]): ApiSudsCopingPlan => {
        const apiData: ApiSudsCopingPlan = {
            mild: [],
            moderate: [],
            high: [],
            extreme: [],
        };

        levels.forEach((level) => {
            const skillIds = level.skills.map(skill => skill.id);
            
            switch (level.id) {
                case '1-3':
                    apiData.mild = skillIds;
                    break;
                case '4-6':
                    apiData.moderate = skillIds;
                    break;
                case '7-8':
                    apiData.high = skillIds;
                    break;
                case '9-10':
                    apiData.extreme = skillIds;
                    break;
            }
        });

        return apiData;
    }, []);

    // Fetch coping plan from API
    useEffect(() => {
        const loadCopingPlan = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const apiData = await fetchSudsCopingPlan();
                const transformedData = transformApiDataToComponentFormat(apiData);
                setSudsLevels(transformedData);
            } catch (err) {
                console.error('Failed to load coping plan:', err);
                setError('Failed to load coping plan. Using default data.');
                // Keep default data on error
            } finally {
                setIsLoading(false);
            }
        };

        loadCopingPlan();
    }, [transformApiDataToComponentFormat]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleEdit = (sectionId: string) => {
        if (editingSectionId === sectionId) {
            // If clicking edit on the same section, exit edit mode
            setEditingSectionId(null);
        } else {
            // Enter edit mode for this section
            setEditingSectionId(sectionId);
        }
    };

    const handleRemoveSkill = async (sectionId: string, skillId: string) => {
        // Store previous state for potential revert
        const previousLevels = sudsLevels;
        
        const updatedLevels = sudsLevels.map((level) =>
            level.id === sectionId
                ? { ...level, skills: level.skills.filter(skill => skill.id !== skillId) }
                : level
        );
        
        setSudsLevels(updatedLevels);

        // Update API
        try {
            const apiData = transformComponentFormatToApiData(updatedLevels);
            await updateSudsCopingPlan(apiData);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Failed to update coping plan:', err);
            // Revert on error
            setSudsLevels(previousLevels);
            setError('Failed to save changes. Please try again.');
        }
    };

    const handleAddSkill = async (sectionId: string, skillId: string) => {
        const skillToAdd = allSkills.find(skill => skill.id === skillId);
        if (!skillToAdd) return;

        // Check if skill already exists in this section
        const currentSection = sudsLevels.find(level => level.id === sectionId);
        if (currentSection?.skills.some(skill => skill.id === skillId)) {
            return; // Skill already exists
        }

        // Store previous state for potential revert
        const previousLevels = sudsLevels;

        const updatedLevels = sudsLevels.map((level) =>
            level.id === sectionId
                ? { ...level, skills: [...level.skills, skillToAdd] }
                : level
        );

        setSudsLevels(updatedLevels);

        // Update API
        try {
            const apiData = transformComponentFormatToApiData(updatedLevels);
            await updateSudsCopingPlan(apiData);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Failed to update coping plan:', err);
            // Revert on error
            setSudsLevels(previousLevels);
            setError('Failed to save changes. Please try again.');
        }
    };

    // Get available skills for dropdown (skills not already in the current section)
    const getAvailableSkills = (sectionId: string): CopingSkill[] => {
        const currentSection = sudsLevels.find(level => level.id === sectionId);
        const currentSkillIds = currentSection?.skills.map(skill => skill.id) || [];
        return allSkills.filter(skill => !currentSkillIds.includes(skill.id));
    };

    const handleLearnMore = (skillId: string) => {
        // TODO: Navigate to skill detail page
        console.log('Learn more about skill:', skillId);
    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.button_orange} />
                    <Text style={[t.textRegular, { color: colors.text_secondary, marginTop: 16 }]}>
                        Loading your coping plan...
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

            {error && (
                <View className="mx-5 mt-2 p-3 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                        {error}
                    </Text>
                </View>
            )}

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Intro Card */}
                <IntroCard 
                    title={intro.title}
                    text={intro.description}
                />

                {/* SUDS Level Sections */}
                {sudsLevels.map((level) => (
                    <SUDSLevelSection
                        key={level.id}
                        range={level.range}
                        label={level.label}
                        description={level.description}
                        skills={level.skills}
                        isExpanded={expandedSections[level.id]}
                        onToggle={() => toggleSection(level.id)}
                        onEdit={() => handleEdit(level.id)}
                        onLearnMore={handleLearnMore}
                        isEditMode={editingSectionId === level.id}
                        onRemoveSkill={(skillId) => handleRemoveSkill(level.id, skillId)}
                        availableSkills={allSkills}
                        onAddSkill={(skillId) => handleAddSkill(level.id, skillId)}
                    />
                ))}

                {/* How to Use Your Plan */}
                <View
                    className="rounded-2xl p-4 mb-4"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                        {howToUse.title}
                    </Text>
                    {howToUse.instructions.map((instruction, index) => (
                        <View key={index} className="flex-row items-start mb-2">
                            <Text style={[t.textRegular, { color: colors.Text_Primary, marginRight: 8 }]}>
                                •
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                {instruction}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

