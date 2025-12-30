import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, SelfTalkToolkitEntryCard, SelfTalkToolkitEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: SelfTalkToolkitEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        listAccomplishments: 'Graduated high school, learned to cook',
        createEncouragingPhrases: "I'm learning and growing every day",
        saveKindMessages: 'Thank you for being such a supportive friend',
        collectGoodMemories: 'The day I got my first job offer',
        chooseDailyPractice: "I'm doing the best I can with what I have",
        practiceMethod: 'Say it in the mirror each morning',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        listAccomplishments: 'Helped a friend through a tough time',
        createEncouragingPhrases: "I deserve kindness, especially from myself",
        saveKindMessages: 'You have a great sense of humor',
        collectGoodMemories: 'Celebrating my birthday with family',
        chooseDailyPractice: "I'm learning and growing every day",
        practiceMethod: 'Write it in a journal',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        listAccomplishments: 'Got through a difficult period',
        createEncouragingPhrases: "I'm capable of handling challenges",
        saveKindMessages: 'Your kindness makes a difference',
        collectGoodMemories: 'The moment I achieved my goal',
        chooseDailyPractice: "I deserve kindness, especially from myself",
        practiceMethod: 'Read it before bed',
    },
];

export default function SelfTalkToolkitEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Self-Talk Toolkit Entry Detail screen when created
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
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {entries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <SelfTalkToolkitEntryCard
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

