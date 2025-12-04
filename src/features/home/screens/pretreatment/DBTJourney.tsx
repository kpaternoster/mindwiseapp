import React, { useState, useEffect, useRef } from 'react';
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
import { ArrowBendUpRightIcon, ArrowRightIcon } from '@components/Utils';
import {
    ContentCard,
    HighlightBox,
    ProgressHeader,
    PageHeader,
} from '../../components';
import { StageCard } from '../../components/StageCard';
import { InfoBlock } from '../../components/InfoBlock';
import { fetchPreTreatmentState, updatePreTreatmentState } from '../../api/treatment';
import { handleScrollProgress } from '../../utils/scrollHelper';
import dbtJourneyData from '../../data/pretreatment/dbtJourney.json';

const STAGES = dbtJourneyData.stages;
const THERAPY_EXPERIENCE = dbtJourneyData.therapyExperience;
const TIME_INVESTMENT = dbtJourneyData.timeInvestment;

export default function DBTJourneyScreen() {
    const [currentStep, setCurrentStep] = useState(1);
    const previousStepRef = useRef(1);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        handleScrollProgress(event, 4, setCurrentStep);
    };

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
                    
                    // Update only the dbtJourney field
                    const updatedState = {
                        ...currentState,
                        dbtOverviewPartsCompleted: {
                            ...currentState.dbtOverviewPartsCompleted,
                            dbtJourney: currentStep,
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
            <PageHeader title="DBT Journey" />

            {/* Progress Header */}
            <View className="px-6">
                <ProgressHeader
                    title="Journey Overview"
                    currentStep={currentStep}
                    totalSteps={4}
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
                {/* Your Path Forward Card */}
                <ContentCard
                    icon={
                        <View
                            className="w-10 h-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: colors.gray_100 }}
                        >
                            <ArrowBendUpRightIcon size={20} color={colors.orange_500} />
                        </View>
                    }
                    title="Your Path Forward"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        DBT is a structured journey through four distinct stages, each building on the previous one. Your progress through these stages will be guided by your individual needs and goals.
                    </Text>

                    <HighlightBox textColor={colors.text_secondary}>
                        This isn't a race - it's your personal journey toward building a life worth living. Every step matters.
                    </HighlightBox>
                </ContentCard>

                {/* The Four Stages of DBT Card */}
                <ContentCard
                    title="The Four Stages of DBT"
                    readTime="4 min read"
                >
                    {STAGES.map((stage, index) => (
                        <StageCard
                            key={stage.id}
                            label={stage.label}
                            title={stage.title}
                            keyPhrase={stage.keyPhrase}
                            description={stage.description}
                            isLast={index === STAGES.length - 1}
                        />
                    ))}
                </ContentCard>

                {/* What Therapy Feels Like Card */}
                <ContentCard
                    title="What Therapy Feels Like"
                    readTime="2 min read"
                >
                    {THERAPY_EXPERIENCE.map((item, index) => (
                        <InfoBlock
                            key={index}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                    <HighlightBox textColor={colors.text_secondary}>
                        You'll receive encouragement and validation while being gently challenged to grow. It's supportive, not judgmental.
                    </HighlightBox>
                </ContentCard>

                {/* Time & Energy Investment Card */}
                <ContentCard
                    title="Time & Energy Investment"
                    readTime="2 min read"
                >
                    {TIME_INVESTMENT.map((item, index) => (
                        <InfoBlock
                            key={index}
                            title={item.title}
                            description={item.description}
                        />
                    ))}

                    <HighlightBox textColor={colors.text_secondary}>
                        The investment is significant, but so are the results. You're building skills that will serve you for life.
                    </HighlightBox>
                </ContentCard>

                {/* Your Unique Path Card */}
                <ContentCard
                    title="Your Unique Path"
                    readTime="2 min read"
                >
                    <InfoBlock
                        description="Remember, this is your journey. Progress isn't always linear - you might move through stages at different paces or revisit earlier stages as needed."
                        textColor={colors.Text_Primary}
                    />

                    <View className="mt-3">
                        <HighlightBox
                            backgroundColor={colors.gray_100}
                            textColor={colors.text_secondary}
                        >
                            What matters most is your commitment to building the life you want to live. Every step forward counts, no matter how small.
                        </HighlightBox>
                    </View>
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

