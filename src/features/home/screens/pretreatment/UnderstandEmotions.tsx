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
import { UmbrellaIcon } from '@components/Utils';
import {
    ContentCard,
    HighlightBox,
    ProgressHeader,
    PageHeader,
} from '../../components';
import { EmotionFunctionCard } from '../../components/EmotionFunctionCard';
import { DefinitionBlock } from '../../components/DefinitionBlock';
import { BulletPoint } from '../../components/BulletPoint';
import { handleScrollProgress } from '../../utils/scrollHelper';

export default function UnderstandEmotionsScreen() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        handleScrollProgress(event, 3, setCurrentStep);
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <PageHeader title="Understand Emotions" />
            
            {/* Progress Header */}
            <View className="px-6">
                <ProgressHeader
                    title="Emotion Understanding"
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
                {/* Your Internal Guidance System Card */}
                <ContentCard
                    icon={<UmbrellaIcon size={24} color={colors.orange_500} />}
                    title="Your Internal Guidance System"
                    readTime="1 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Emotions serve as your internal guidance system, providing valuable information about your environment and needs. They evolved to help you survive by motivating action.
                    </Text>

                    {/* Emotion Functions */}
                    <EmotionFunctionCard
                        emotion="Fear"
                        function="Keeps you safe"
                        backgroundColor={colors.orange_opacity_20}
                        textColor={colors.orange_500}
                    />
                    <EmotionFunctionCard
                        emotion="Anger"
                        function="Protects boundaries"
                        backgroundColor="#E67C7333"
                        textColor="#E67C73"
                    />
                    <EmotionFunctionCard
                        emotion="Joy"
                        function="Encourages connection"
                        backgroundColor="#F4C27F33"
                        textColor="#F1B86C"
                    />

                    <View className="mt-4">
                        <HighlightBox>
                            Emotions aren't random - they're your brain's way of helping you navigate life and relationships.
                        </HighlightBox>
                    </View>
                </ContentCard>

                {/* Where Emotions Come From Card */}
                <ContentCard
                    title="Where Emotions Come From"
                    readTime="1 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Emotions arise from a complex interaction of multiple factors working together in your mind and body.
                    </Text>
                    

                    <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                        <BulletPoint text="Your thoughts and interpretations" />
                        <BulletPoint text="Physical sensations in your body" />
                        <BulletPoint text="Past experiences and memories" />
                        <BulletPoint text="Your current situation and environment" isLast />
                    </View>

                    <HighlightBox textColor={colors.text_secondary}>
                        Unlike fleeting moods, emotions are specific responses to particular triggers that include both physical sensations and action urges.
                    </HighlightBox>
                </ContentCard>

                {/* Emotions vs Everything Else Card */}
                <ContentCard
                    title="Emotions vs Everything Else"
                    readTime="2 min read"
                >
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Understanding the difference between emotions and other mental experiences gives you power over your responses.
                    </Text>

                    {/* Definition Blocks */}
                    <DefinitionBlock
                        title="Emotion"
                        description="What you feel in your body and mind"
                        example="Example: Feeling angry"
                    />
                    <DefinitionBlock
                        title="Thought"
                        description="Your interpretation or mental commentary"
                        example='Example: "This is unfair"'
                    />
                    <DefinitionBlock
                        title="Urge"
                        description="Your impulse or desire to do something"
                        example="Example: Wanting to yell"
                    />
                    <DefinitionBlock
                        title="Action"
                        description="What you actually choose to do"
                        example="Example: Responding calmly"
                    />

                    <HighlightBox textColor={colors.text_secondary}>
                        You can feel angry, think "this is unfair," have an urge to yell, but still choose to respond calmly. This separation is where your power lies.
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

