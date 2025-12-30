import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ReflectionJournalEntryCard, ReflectionJournalEntry } from '../components';
import { fetchReflectionJournalEntries, deleteReflectionJournalEntry } from '../api/selfSoothing';

export default function ReflectionJournalEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<ReflectionJournalEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadEntries = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const apiEntries = await fetchReflectionJournalEntries();

            // Transform API entries to component format
            const transformedEntries: ReflectionJournalEntry[] = apiEntries.map((apiEntry) => {
                const date = new Date(apiEntry.time * 1000);
                const dateStr = date.toISOString().split('T')[0];
                const timeStr = date.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });

                return {
                    id: apiEntry.id,
                    date: dateStr,
                    time: timeStr,
                    reflection: apiEntry.reflection,
                };
            });

            // Sort by date (newest first)
            transformedEntries.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });

            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load reflection journal entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleDelete = async (entryId: string) => {
        // Optimistic update
        const previousEntries = [...entries];
        setEntries(entries.filter((entry) => entry.id !== entryId));

        try {
            await deleteReflectionJournalEntry(entryId);
        } catch (err) {
            console.error('Failed to delete entry:', err);
            // Revert on error
            setEntries(previousEntries);
            setError('Failed to delete entry. Please try again.');
        }
    };

    const handleView = (entryId: string) => {
        // TODO: Navigate to Reflection Journal Entry Detail screen when created
        console.log('View entry:', entryId);
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
                {isLoading ? (
                    <View className="items-center justify-center py-12">
                        <ActivityIndicator size="large" color={colors.Button_Orange} />
                    </View>
                ) : error ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.red_light }]} className="mb-4">
                            {error}
                        </Text>
                        <Pressable
                            className="rounded-full py-3 px-6"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={loadEntries}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]}>
                                Retry
                            </Text>
                        </Pressable>
                    </View>
                ) : entries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <ReflectionJournalEntryCard
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

