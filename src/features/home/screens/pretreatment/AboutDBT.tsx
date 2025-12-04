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
import { GreenLeafIcon, PlantIcon } from '@components/Utils';
import {
    ContentCard,
    HighlightBox,
    ProgressHeader,
    PageHeader,
} from '../../components';
import { SkillCard } from '../../components/SkillCard';
import { AssumptionAccordion } from '../../components/AssumptionAccordion';
import { fetchPreTreatmentState, updatePreTreatmentState } from '../../api/treatment';
import aboutDBTData from '../../data/pretreatment/aboutDBT.json';

const CORE_SKILLS = aboutDBTData.coreSkills;
const CORE_ASSUMPTIONS = aboutDBTData.coreAssumptions;

export default function AboutDBTScreen() {
    const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({
        0: true, // First section is expanded by default
    });
    const [viewedSections, setViewedSections] = useState<Set<number>>(new Set()); // Track which sections have been viewed
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

    // Mark the first section as viewed on mount since it's expanded by default
    useEffect(() => {
        setViewedSections(new Set([0]));
    }, []);

    const toggleSection = (index: number) => {
        setExpandedSections((prev) => {
            const newState = {
                ...prev,
                [index]: !prev[index],
            };

            // Mark section as viewed when expanded
            if (!prev[index]) {
                setViewedSections((prevViewed) => new Set(prevViewed).add(index));
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

    // Calculate current step based on viewed sections
    const viewedCount = viewedSections.size;
    const totalSections = CORE_ASSUMPTIONS.length; // Count all sections, even if empty
    
    // Calculate progress:
    // - Step 1: Based on scroll position through content
    // - Step 2: All expandable sections viewed
    // - Step 3: Scrolled to bottom
    const currentStep = useMemo(() => {
        if (viewedCount >= totalSections && hasScrolledToBottom) {
            // ✅ Complete: All sections expanded AND scrolled to bottom (3/3)
            return 3;
        } else if (viewedCount >= totalSections && !hasScrolledToBottom) {
            // ⚠️ Almost complete: All sections opened but need to scroll to bottom (2/3)
            return 2;
        } else {
            // 📖 In progress: Show step 1 until all sections are opened
            return 1;
        }
    }, [viewedCount, totalSections, hasScrolledToBottom]);

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
                    
                    // Update only the aboutDBT field
                    const updatedState = {
                        ...currentState,
                        dbtOverviewPartsCompleted: {
                            ...currentState.dbtOverviewPartsCompleted,
                            aboutDBT: currentStep,
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
            <PageHeader title="About DBT" />
            
            {/* Progress Header */}
            <View className="px-6">
                <ProgressHeader
                    title="About DBT Sections"
                    currentStep={currentStep}
                    totalSteps={3}
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
                {/* What is DBT? Card */}
                <ContentCard
                    icon={<PlantIcon size={24} />}
                    title="What is DBT?"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Dialectical Behavior Therapy (DBT) serves as an effective mental health toolbox for individuals, including many of us, who struggle with intense emotions. This program is a superpower training, helping you navigate and harness emotional waves instead of being overwhelmed by them.
                    </Text>

                    <HighlightBox textColor={colors.text_secondary}>
                        Think of DBT as emotional martial arts - you'll cultivate strength, flexibility, and inner stability while balancing self-acceptance with positive change.
                    </HighlightBox>
                </ContentCard>

                {/* Why We Use DBT Card */}
                <ContentCard
                    title="Why We Use DBT"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        DBT knows that some people are more emotionally sensitive than others, may have experienced an invalidating or traumatic past, and may not have the skills to manage the resulting emotions and their consequences.
                    </Text>

                    <HighlightBox textColor={colors.text_secondary} borderColor={colors.text_secondary}>
                        DBT is scientifically proven to help reduce unproductive behavior, manage extreme emotions, and create a balanced life - especially when other therapies feel too challenging during emotional crises.
                    </HighlightBox>
                </ContentCard>

                {/* How We Use DBT Card */}
                <ContentCard
                    title="How We Use DBT"
                    readTime="3 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        DBT will teach you core skills in six critical areas and then support you in applying them to challenging situations:
                    </Text>

                    {CORE_SKILLS.map((skill, index) => (
                        <SkillCard
                            key={index}
                            title={skill.title}
                            description={skill.description}
                        />
                    ))}
                </ContentCard>

                {/* DBT Core Assumptions Card */}
                <ContentCard
                    title="DBT Core Assumptions"
                    readTime="4 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        DBT's approach is founded on key ideas that guide your improvement journey. These assumptions create a supportive framework for growth:
                    </Text>

                    {CORE_ASSUMPTIONS.map((section, index) => (
                        <AssumptionAccordion
                            key={index}
                            sectionTitle={section.sectionTitle}
                            assumptions={section.assumptions}
                            isExpanded={expandedSections[index] || false}
                            onToggle={() => toggleSection(index)}
                        />
                    ))}
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

