import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StatusBar,
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { BookOpenIcon, CloverIcon } from '@components/Utils';
import {
    ContentCard,
    HighlightBox,
    ProgressHeader,
    PageHeader,
} from '../../components';
import { SkillModuleAccordion } from '../../components/SkillModuleAccordion';
import { LearningApproachCard } from '../../components/LearningApproachCard';
import { fetchPreTreatmentState, updatePreTreatmentState } from '../../api/treatment';
import dbtSkillsData from '../../data/pretreatment/dbtSkills.json';

const SKILL_MODULES = dbtSkillsData.skillModules;
const LEARNING_APPROACHES = dbtSkillsData.learningApproaches;

export default function DBTSkillsScreen() {
    const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({
        0: true, // First module is expanded by default
    });
    const [viewedModules, setViewedModules] = useState<Set<number>>(new Set()); // Track which modules have been viewed
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

    // Mark the first module as viewed on mount since it's expanded by default
    useEffect(() => {
        setViewedModules(new Set([0]));
    }, []);

    const toggleModule = (index: number) => {
        setExpandedModules((prev) => {
            const newState = {
                ...prev,
                [index]: !prev[index],
            };

            // Mark module as viewed when expanded
            if (!prev[index]) {
                setViewedModules((prevViewed) => new Set(prevViewed).add(index));
            }

            return newState;
        });
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollY = contentOffset.y;
        const scrollHeight = contentSize.height;
        const viewportHeight = layoutMeasurement.height;

        // Calculate if user has scrolled to near bottom (within 50px)
        const isNearBottom = scrollY + viewportHeight >= scrollHeight - 50;
        
        if (isNearBottom && !hasScrolledToBottom) {
            setHasScrolledToBottom(true);
        }
    };

    // Calculate current step based on viewed modules
    const viewedCount = viewedModules.size;
    const totalModules = SKILL_MODULES.length;
    
    // Calculate progress:
    // - Each module opened = 1 step (1/6, 2/6, 3/6, 4/6, 5/6)
    // - Final step (6/6) requires: all 6 modules opened + scrolled to bottom
    const currentStep = useMemo(() => {
        if (viewedCount === totalModules && hasScrolledToBottom) {
            // ✅ Complete: All modules viewed AND scrolled to bottom (6/6)
            return totalModules;
        } else if (viewedCount === totalModules && !hasScrolledToBottom) {
            // ⚠️ Almost complete: All modules opened but need to scroll to bottom (5/6)
            // This ensures users can't get 6/6 without scrolling through all content
            return totalModules - 1;
        } else {
            // 📖 In progress: Show number of unique modules opened (1-5)
            return viewedCount;
        }
    }, [viewedCount, totalModules, hasScrolledToBottom]);

    const previousStepRef = useRef(1);

    // Update API when currentStep changes
    useEffect(() => {
        const updateProgress = async () => {
            // Skip if step hasn't changed
            if (currentStep === previousStepRef.current) {
                return;
            }

            // Only update if step has increased
            if (currentStep > previousStepRef.current) {
                previousStepRef.current = currentStep;

                try {
                    // Fetch current state
                    const currentState = await fetchPreTreatmentState();
                    
                    // Update only the dbtSkills field
                    const updatedState = {
                        ...currentState,
                        dbtOverviewPartsCompleted: {
                            ...currentState.dbtOverviewPartsCompleted,
                            dbtSkills: currentStep,
                        },
                    };

                    // Send updated state to API
                    await updatePreTreatmentState(updatedState);
                } catch (error) {
                    console.error('Error updating pre-treatment state:', error);
                    // Revert the ref if update failed
                    previousStepRef.current = currentStep - 1;
                } 
            }
        };

        updateProgress();
    }, [currentStep]);

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <PageHeader title="DBT Skills" />
            
            {/* Progress Header */}
            <View className="px-6">
                <ProgressHeader
                    title="Skill Modules"
                    currentStep={currentStep}
                    totalSteps={6}
                />
            </View>

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-6 mb-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Your Complete Toolkit Card */}
                <ContentCard
                    icon={<CloverIcon size={19} color={colors.orange_500} />}
                    title="Your Complete Toolkit"
                    readTime="1 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        DBT teaches six comprehensive skill modules that work together to help you build a life worth living. These skills are practical, evidence-based techniques you can use in real-world situations.
                    </Text>

                    <HighlightBox textColor={colors.text_secondary}>
                        Each skill module builds on the others, creating a comprehensive toolkit for managing emotions, relationships, and life challenges effectively.
                    </HighlightBox>
                </ContentCard>

                {/* The Six Skill Modules Card */}
                <ContentCard title="The Six Skill Modules" readTime='8 min read'>
                    {SKILL_MODULES.map((module, index) => (
                        <SkillModuleAccordion
                            key={index}
                            number={module.number}
                            title={module.title}
                            subtitle={module.subtitle}
                            description={module.description}
                            skills={module.skills}
                            isExpanded={expandedModules[index] || false}
                            onToggle={() => toggleModule(index)}
                        />
                    ))}
                </ContentCard>

                {/* How You'll Master These Skills Card */}
                <ContentCard
                    title="How You'll Master These Skills"
                    readTime="2 min read"
                >
                    {LEARNING_APPROACHES.map((approach, index) => (
                        <LearningApproachCard
                            key={index}
                            title={approach.title}
                            description={approach.description}
                        />
                    ))}

                    <HighlightBox textColor={colors.text_secondary}>
                        <Text>
                            <Text style={[t.textMedium, { color: colors.text_secondary }]}>
                            Remember:  These aren't just concepts to understand - they're practical tools to practice daily until they become second nature.
                            </Text>
                        </Text>
                    </HighlightBox>
                </ContentCard>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
});

