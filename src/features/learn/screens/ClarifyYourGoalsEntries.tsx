import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ClarifyYourGoalsEntryCard, ClarifyYourGoalsEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: ClarifyYourGoalsEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        describeSituation: 'I need to have a conversation with ...',
        objectiveGoal: 'I want to establish a fair cleaning schedule.',
        relationshipGoal: 'I want them to feel respected and heard.',
        selfRespectGoal: 'I want to feel confident and assertive.',
        mostImportant: 'My top priority is maintaining our friendship while addressing the issue.',
        secondPriority: 'My second priority is getting a fair cleaning schedule.',
        thirdPriority: 'My third priority is feeling good about how I handled the conversation.',
        priorityReasoning: 'I prioritized my goals this way because our friendship matters most to me.',
    },
    
];

export default function ClarifyYourGoalsEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Clarify Your Goals Entry Detail screen when created
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
            <PageHeader title="Saved Plans" showHomeIcon={true} showLeafIcon={true} />

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
                        <ClarifyYourGoalsEntryCard
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

