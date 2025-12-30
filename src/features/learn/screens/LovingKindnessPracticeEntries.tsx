import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, LovingKindnessPracticeEntryCard } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        yourselfReflection: 'I felt a sense of warmth and peace when sending loving kindness to myself.',
        lovedOneReflection: 'I chose my mother and felt deep gratitude for her presence in my life.',
        neutralPersonReflection: 'I practiced with the barista at my local coffee shop.',
        difficultPersonReflection: 'This was challenging, but I noticed my resistance softening slightly.',
        overallReflection: 'Overall, this practice helped me feel more connected to myself and others. I noticed how my feelings changed throughout the practice, starting with some resistance but ending with more openness.',
    },
    {
        id: '2',
        date: '2025-11-05',
        time: '02:15 PM',
        yourselfReflection: 'I found it easier to be kind to myself today.',
        lovedOneReflection: 'I sent wishes to my best friend.',
        overallReflection: 'A gentle practice that left me feeling lighter.',
    },
    {
        id: '3',
        date: '2025-11-04',
        time: '10:30 AM',
        yourselfReflection: 'Starting with self-compassion felt grounding.',
        lovedOneReflection: 'I thought of my partner and felt warmth.',
        neutralPersonReflection: 'I practiced with a coworker I don\'t know well.',
        overallReflection: 'The practice helped me shift my perspective toward connection.',
    },
];

export default function LovingKindnessPracticeEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        dissolveTo('Learn_LovingKindnessPracticeEntryDetail', { entryId });
    };

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        console.log('Delete entry:', entryId);
    };

    const handleNewEntry = () => {
        dissolveTo('Learn_LovingKindnessPractice');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_LovingKindnessExercises');
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
                        <LovingKindnessPracticeEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}

                {/* Action Buttons */}
                {/* <View className="flex-row gap-3 mb-3">
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ backgroundColor: colors.Button_Orange }}
                        onPress={handleNewEntry}
                    >
                        <Text style={[t.textSemiBold, { color: colors.white }]}>
                            New Entry
                        </Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleBackToMenu}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            Back to Menu
                        </Text>
                    </Pressable>
                </View> */}
            </ScrollView>
        </View>
    );
}

