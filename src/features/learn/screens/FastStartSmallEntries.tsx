import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, FastStartSmallEntryCard, FastStartSmallEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: FastStartSmallEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        smallRequest: '...',
        outcome: 'Describe the outcome. How did the other person respond? How did you feel?',
        reflection: 'How well did you use FAST? What felt natural? What was challenging?',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        smallRequest: '...',
        outcome: 'Describe the outcome. How did the other person respond? How did you feel?',
        reflection: 'How well did you use FAST? What felt natural? What was challenging?',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        smallRequest: '...',
        outcome: 'Describe the outcome. How did the other person respond? How did you feel?',
        reflection: 'How well did you use FAST? What felt natural? What was challenging?',
    },
];

export default function FastStartSmallEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Fast Start Small Entry Detail screen when created
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
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <FastStartSmallEntryCard
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

