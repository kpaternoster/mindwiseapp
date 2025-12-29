import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { DialecticalThinkingPerspectiveEntryCard, DialecticalThinkingPerspectiveEntry } from '../components/DialecticalThinkingPerspectiveEntryCard';
import { 
    fetchExploringPerspectivesEntries, 
    deleteExploringPerspectivesEntry, 
    ExploringPerspectivesEntry as ApiExploringPerspectivesEntry 
} from '../api/dialecticalThinking';

export default function DialecticalThinkingPerspectiveEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<DialecticalThinkingPerspectiveEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiExploringPerspectivesEntry): DialecticalThinkingPerspectiveEntry => {
        // Combine alternative1 and alternative2 into alternativeViews
        const alternativeViews = [apiEntry.alternative1, apiEntry.alternative2]
            .filter(v => v && v.trim() !== '')
            .join(' | ') || undefined;

        return {
            id: apiEntry.id,
            date: new Date(apiEntry.time * 1000).toISOString(), // Convert timestamp to ISO string
            title: apiEntry.title || '', // Handle null title
            conflict: apiEntry.conflict,
            perspective: apiEntry.perspective,
            alternativeViews: alternativeViews,
            belief: apiEntry.personalBelief || undefined,
            opposite: apiEntry.oppositeSide || undefined,
            synthesis: apiEntry.truths || undefined,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchExploringPerspectivesEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load exploring perspectives entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
            
            // Delete from API
            await deleteExploringPerspectivesEntry(id);
        } catch (err) {
            console.error('Failed to delete entry:', err);
            // Reload entries on error to restore the deleted entry
            try {
                await loadEntries();
            } catch (reloadErr) {
                console.error('Failed to reload entries:', reloadErr);
            }
            setError('Failed to delete entry. Please try again.');
        }
    };

    const handleNewEntry = () => {
        dissolveTo('Learn_DialecticalThinkingExploringPerspectives');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_DialecticalThinkingExercises');
    };

    if (isLoading) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

            {error && (
                <View className="mx-5 mt-2 p-3 rounded-xl" style={{ backgroundColor: colors.red_50 }}>
                    <Text style={[t.textRegular, { color: colors.red_light }]}>
                        {error}
                    </Text>
                </View>
            )}

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
                        <DialecticalThinkingPerspectiveEntryCard
                            key={entry.id}
                            entry={entry}
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

