import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { ProblemSolvingEntryCard, ProblemSolvingEntry } from '../components/ProblemSolvingEntryCard';

export default function ProblemSolvingEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<ProblemSolvingEntry[]>([]);

    useEffect(() => {
        // TODO: Load entries from storage/backend
        // For now, using mock data
        const mockEntries: ProblemSolvingEntry[] = [
            {
                id: '1',
                date: new Date(2025, 10, 6, 16, 25).toISOString(), // Nov 6, 2025, 04:25 PM
                problem: '[State the Problem Clearly]',
                options: ['Option 1', 'Option 2', 'Option 3'],
                chosenSolution: 'Solution text',
            },
            {
                id: '2',
                date: new Date(2025, 10, 6, 16, 25).toISOString(),
                problem: '[State the Problem Clearly]',
                options: ['Option 1', 'Option 2', 'Option 3'],
                chosenSolution: 'Solution text',
            },
            {
                id: '3',
                date: new Date(2025, 10, 6, 16, 25).toISOString(),
                problem: '[State the Problem Clearly]',
                options: ['Option 1', 'Option 2', 'Option 3'],
                chosenSolution: 'Solution text',
            },
        ];
        setEntries(mockEntries);
    }, []);

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality with confirmation
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        console.log('Delete entry:', id);
    };

    const handleView = (id: string) => {
        dissolveTo('Learn_ProblemSolvingEntryDetail', { entryId: id });
    };

    const handleNewEntry = () => {
        dissolveTo('Learn_ProblemSolvingExercise');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_ProblemSolving');
    };

    return (
        <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {entries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries saved yet
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <ProblemSolvingEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View
                className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4"
                style={{ backgroundColor: colors.white }}
            >
                <Pressable
                    className="rounded-full py-4 items-center justify-center mb-3"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleNewEntry}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        New Entry
                    </Text>
                </Pressable>

                <Pressable
                    className="rounded-full py-4 items-center justify-center"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleBackToMenu}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        Back to Menu
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

