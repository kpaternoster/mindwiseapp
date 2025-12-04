import React, { useState, useMemo } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { SUDSLevelSection, CopingSkill } from '../components/SUDSLevelSection';
import { ContentCard } from '../components/ContentCard';
import { EditSkillsModal } from '../components/EditSkillsModal';
import sudsCopingPlanData from '../data/sudsCopingPlan.json';
import allSkillsData from '../data/allSkills.json';
import { IntroCard } from '../components';

export default function SUDSCopingPlanScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sudsLevels: initialSudsLevels, howToUse } = sudsCopingPlanData;

    const [sudsLevels, setSudsLevels] = useState(initialSudsLevels);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        '1-3': true, // First section expanded by default
        '4-6': false,
        '7-8': false,
        '9-10': false,
    });
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Get all available skills
    const allSkills: CopingSkill[] = useMemo(() => {
        return allSkillsData as CopingSkill[];
    }, []);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleEdit = (sectionId: string) => {
        setEditingSectionId(sectionId);
        setShowEditModal(true);
    };

    const handleSaveSkills = (selectedSkillIds: string[]) => {
        if (!editingSectionId) return;

        // Find the skills that match the selected IDs
        const selectedSkills = allSkills.filter(skill => selectedSkillIds.includes(skill.id));

        // Update the skills for the specific section
        setSudsLevels((prev) =>
            prev.map((level) =>
                level.id === editingSectionId
                    ? { ...level, skills: selectedSkills }
                    : level
            )
        );

        setShowEditModal(false);
        setEditingSectionId(null);
    };

    const handleLearnMore = (skillId: string) => {
        // TODO: Navigate to skill detail page
        console.log('Learn more about skill:', skillId);
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

            {/* Edit Skills Modal */}
            {editingSectionId && (
                <EditSkillsModal
                    visible={showEditModal}
                    currentSkills={sudsLevels.find(level => level.id === editingSectionId)?.skills || []}
                    allSkills={allSkills}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingSectionId(null);
                    }}
                    onSave={handleSaveSkills}
                />
            )}
        </View>
    );
}

