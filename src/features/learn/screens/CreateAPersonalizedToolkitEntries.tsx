import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, CreateAPersonalizedToolkitEntryCard, CreateAPersonalizedToolkitEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: CreateAPersonalizedToolkitEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        toolkit: 'I - Imagery: Visualizing my favorite peaceful place\nM - Meaning: Finding purpose in difficult moments\nR - Relaxation: Deep breathing and progressive muscle relaxation\nE - Encouragement: Supportive self-talk and affirmations',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        toolkit: 'I - Imagery: Visualizing my favorite peaceful place\nM - Meaning: Finding purpose in difficult moments\nR - Relaxation: Deep breathing and progressive muscle relaxation\nE - Encouragement: Supportive self-talk and affirmations',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        toolkit: 'I - Imagery: Visualizing my favorite peaceful place\nM - Meaning: Finding purpose in difficult moments\nR - Relaxation: Deep breathing and progressive muscle relaxation\nE - Encouragement: Supportive self-talk and affirmations',
    },
];

export default function CreateAPersonalizedToolkitEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Create a Personalized Toolkit Entry Detail screen when created
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
            <PageHeader title="Saved" showHomeIcon={true} showLeafIcon={true} />

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
                        <CreateAPersonalizedToolkitEntryCard
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

