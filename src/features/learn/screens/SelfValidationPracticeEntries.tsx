import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, SelfValidationPracticeEntryCard, SelfValidationPracticeEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: SelfValidationPracticeEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        acknowledge: 'I\'m noticing that I\'m feeling shame and self-hatred right now.',
        acceptEmotion: 'This is how I feel right now.',
        understandEmotion: 'Of course, I\'m feeling this way - I grew up believing I had to be perfect.',
        offerCompassion: 'I deserve kindness, especially from myself.',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        acknowledge: 'I\'m noticing feelings of anxiety and tightness in my chest.',
        acceptEmotion: 'I have experienced strong emotions before. This won\'t hurt me.',
        understandEmotion: 'My feelings are valid responses to real experiences.',
        offerCompassion: 'I\'m doing the best I can with what I have.',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        acknowledge: 'I\'m noticing sadness and a heavy feeling in my stomach.',
        acceptEmotion: 'This is how I feel right now, and that\'s okay.',
        understandEmotion: 'Anyone with my experiences might feel similar.',
        offerCompassion: 'I deserve compassion and understanding.',
    },
];

export default function SelfValidationPracticeEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Self-Validation Practice Entry Detail screen when created
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
                            No entries yet. Start your first practice!
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <SelfValidationPracticeEntryCard
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

