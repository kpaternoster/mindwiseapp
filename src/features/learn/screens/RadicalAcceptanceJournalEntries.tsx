import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, RadicalAcceptanceJournalEntryCard, RadicalAcceptanceJournalEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: RadicalAcceptanceJournalEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        situation: 'My partner ended our relationship unexpectedly.',
        copingStatement: 'I cannot change what happened, but I can choose how I respond and move forward.',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        situation: 'I didn\'t get the promotion I was hoping for.',
        copingStatement: 'This is disappointing, but I can learn from this experience and continue to grow.',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        situation: 'A close friend canceled our plans at the last minute.',
        copingStatement: 'I feel hurt, but I can accept that things don\'t always go as planned.',
    },
];

export default function RadicalAcceptanceJournalEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Acceptance Journal Entry Detail screen when created
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
            <PageHeader title="Saved Entry" showHomeIcon={true} showLeafIcon={true} />

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
                        <RadicalAcceptanceJournalEntryCard
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

