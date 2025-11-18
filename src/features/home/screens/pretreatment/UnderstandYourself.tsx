import React, { useState } from 'react';
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
import { HeartIcon } from '@components/Utils';
import {
    ContentCard,
    HighlightBox,
    CharacteristicCard,
    ProgressHeader,
    PageHeader,
} from '../../components';
import { BulletPoint } from '../../components/BulletPoint';
import understandYourselfData from '../../data/pretreatment/understandYourself.json';
import { handleScrollProgress } from '../../utils/scrollHelper';

const CHARACTERISTICS_DATA = understandYourselfData.characteristics;

export default function UnderstandYourselfScreen() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        handleScrollProgress(event, 3, setCurrentStep);
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <PageHeader title="Understand Yourself" />
            {/* Progress Header */}
            <View className="px-6">
                <ProgressHeader
                    title="Self-Understanding Journey"
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


                {/* You're Not Alone Card */}
                <ContentCard
                    icon={<HeartIcon size={24} color={colors.orange_500} />}
                    title="You're Not Alone"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        If you're reading this, you're probably dealing with some heavy stuff - significant mood swings, feeling out of control, or maybe even messed up thoughts. It's tough, but you're not alone; we estimate that almost 10% of people deal with these kinds of challenges.
                    </Text>
                    <HighlightBox>
                        Your struggles are real and valid. Recognizing these patterns is the first brave step toward healing.
                    </HighlightBox>
                </ContentCard>

                {/* Do These Sound Like You Card */}
                <ContentCard
                    title="Do These Sound Like You?"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Check out these descriptions - do any of them resonate with your experience?
                    </Text>
                    {CHARACTERISTICS_DATA.map((characteristic) => (
                        <CharacteristicCard
                            key={characteristic.id}
                            title={characteristic.title}
                            description={characteristic.description}
                            leftBorder={true}
                        />
                    ))}
                </ContentCard>

                {/* Why Am I Like This Card */}
                <ContentCard
                    title="Why Am I Like This?"
                    readTime="3 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        It's not your fault. Some of us are born with brains that feel everything more intensely - like having an emotional speaker system permanently set to max volume.
                    </Text>
                    <CharacteristicCard
                        title="The Science Behind It"
                        description="Our brains are wired differently - some of us have a super sensitive emotional alarm system (the amygdala) and a less developed calming system (the prefrontal cortex). That makes it tough to handle big feelings."
                        leftBorder={false}
                    />

                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        On top of that, if you grew up feeling like your emotions weren't understood or accepted, or if you've been through tough experiences like trauma or chronic illness, it can make things even harder.
                    </Text>

                    <HighlightBox>
                        All feelings and behaviors have a function and source. Approach your own with gentle curiosity and compassion rather than judgment.
                    </HighlightBox>
                </ContentCard>

                {/* Why I Always Feel This Way Card */}
                <ContentCard
                    title="Why I Always Feel This Way?"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Feeling overwhelmed and wondering if things will ever get better is natural. But guess what? Experts have devised a way to help you manage those intense emotions and struggles.
                    </Text>

                    {/* DBT Success Stories */}
                    <CharacteristicCard
                        title="DBT Success Stories"
                        description=""
                        leftBorder={false}
                    >
                        <BulletPoint text="Can help cut suicidal thoughts in half" />
                        <BulletPoint text="Makes anxiety way less intense" />
                        <BulletPoint text="Proven effective for anxiety, depression, and ADHD" />
                        <BulletPoint text="Developed with McLean Hospital experts" isLast />
                    </CharacteristicCard>

                    {/* App Creation Information */}
                    <HighlightBox>
                        This app was created with Dr. Blaise Aguirre and his colleagues at McLean Hospital - a place that knows DBT inside and out. You can be sure it's rigorous and based on proven techniques.
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

