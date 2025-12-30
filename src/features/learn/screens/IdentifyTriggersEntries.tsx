import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IdentifyTriggersEntryCard, IdentifyTriggersEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: IdentifyTriggersEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        overwhelmingSituation: 'Had a difficult conversation with my manager about workload',
        improveStrategies: 'I - Imagery: Picture a calm beach scene\nM - Meaning: This conversation helps me set boundaries\nP - Prayer: Take a moment for spiritual grounding\nR - Relaxation: Deep breathing exercises\nO - One thing: Focus on organizing my desk\nV - Vacation: Step outside for fresh air\nE - Encouragement: Tell myself "I handled this well"',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        overwhelmingSituation: 'Had a difficult conversation with my manager about workload',
        improveStrategies: 'I - Imagery: Picture a calm beach scene\nM - Meaning: This conversation helps me set boundaries\nP - Prayer: Take a moment for spiritual grounding\nR - Relaxation: Deep breathing exercises\nO - One thing: Focus on organizing my desk\nV - Vacation: Step outside for fresh air\nE - Encouragement: Tell myself "I handled this well"',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        overwhelmingSituation: 'Had a difficult conversation with my manager about workload',
        improveStrategies: 'I - Imagery: Picture a calm beach scene\nM - Meaning: This conversation helps me set boundaries\nP - Prayer: Take a moment for spiritual grounding\nR - Relaxation: Deep breathing exercises\nO - One thing: Focus on organizing my desk\nV - Vacation: Step outside for fresh air\nE - Encouragement: Tell myself "I handled this well"',
    },
];

export default function IdentifyTriggersEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Identify Triggers Entry Detail screen when created
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
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <IdentifyTriggersEntryCard
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

