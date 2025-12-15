import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, PlanYourResponseEntryCard, PlanYourResponseEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: PlanYourResponseEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        reviewSituation: 'I need to have a conversation with my roommate about cleaning responsibilities.',
        checkValuesAlignment: 'My goals align with my values because I value respect and shared responsibility.',
        confirmGoalsAlignment: 'My objective, relationship, and self-respect goals work together by maintaining clear communication.',
        planYourWords: 'I will say something like: "I wanted to talk with you about our cleaning schedule."',
        planYourTone: 'I want to sound calm, confident, and respectful.',
        desiredOutcome: 'Success would look like us agreeing on a fair cleaning schedule.',
        backupPlan: 'If they react negatively, I will stay calm and suggest we revisit the conversation later.',
        finalReflection: 'I feel confident about my plan and ready to have this conversation.',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        reviewSituation: 'I need to discuss work-life balance with my manager.',
        checkValuesAlignment: 'My goals align with my values because I value my well-being and professional growth.',
        confirmGoalsAlignment: 'My goals work together by advocating for myself while maintaining a good working relationship.',
        planYourWords: 'I will say something like: "I\'ve been thinking about how to better balance my workload."',
        planYourTone: 'I want to sound professional, assertive, and collaborative.',
        desiredOutcome: 'Success would look like my manager understanding my concerns and working with me on solutions.',
        backupPlan: 'If they don\'t understand, I can provide specific examples of what\'s been challenging.',
        finalReflection: 'I\'m a bit concerned about how they might react, but overall I think this plan will work.',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        reviewSituation: 'I want to talk to my friend about feeling left out of group activities.',
        checkValuesAlignment: 'My goals align with my values because I value friendship and open communication.',
        confirmGoalsAlignment: 'My goals work together by expressing my feelings while preserving our friendship.',
        planYourWords: 'I will say something like: "I wanted to talk with you about something that\'s been on my mind."',
        planYourTone: 'I want to sound vulnerable, honest, and non-accusatory.',
        desiredOutcome: 'Success would look like my friend understanding my feelings and us finding a way forward together.',
        backupPlan: 'If they react defensively, I will acknowledge their perspective and focus on understanding.',
        finalReflection: 'I feel confident about expressing my needs while being respectful of our friendship.',
    },
];

export default function PlanYourResponseEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Plan Your Response Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        console.log('Delete entry:', entryId);
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Practice Sessions" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {entries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet. Start your first practice!
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <PlanYourResponseEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}

