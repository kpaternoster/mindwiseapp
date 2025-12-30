import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, RadicalAcceptanceCopingStatementsListEntryCard, RadicalAcceptanceCopingStatementsListEntry } from '../components';
import { 
    fetchCopingStatementsListEntries, 
    deleteCopingStatementsListEntry, 
    CopingStatementsListEntry as ApiCopingStatementsListEntry 
} from '../api/radicalAcceptance';

export default function RadicalAcceptanceCopingStatementsListEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<RadicalAcceptanceCopingStatementsListEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Group API entries by timestamp (same date/time) and combine into component format
    const groupAndTransformEntries = (apiEntries: ApiCopingStatementsListEntry[]): RadicalAcceptanceCopingStatementsListEntry[] => {
        // Group entries by timestamp (rounded to the nearest minute to account for slight timing differences)
        const grouped = new Map<string, ApiCopingStatementsListEntry[]>();
        
        apiEntries.forEach(entry => {
            // Round timestamp to nearest minute (60 seconds) to group entries created close together
            const roundedTime = Math.floor(entry.time / 60) * 60;
            const key = roundedTime.toString();
            
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key)!.push(entry);
        });

        // Transform grouped entries to component format
        const transformedEntries: RadicalAcceptanceCopingStatementsListEntry[] = [];
        
        grouped.forEach((group, key) => {
            // Use the first entry's timestamp for date/time
            const firstEntry = group[0];
            const date = new Date(firstEntry.time * 1000);
            const dateString = date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
            const timeString = date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });

            // Combine all statements from this group
            const statements = group.map(entry => entry.copingStatement);

            transformedEntries.push({
                id: firstEntry.id, // Use first entry's ID as the group ID
                date: dateString,
                time: timeString,
                statements: statements,
            });
        });

        return transformedEntries;
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchCopingStatementsListEntries();
            
            // Group and transform entries, then sort by date (newest first)
            const transformedEntries = groupAndTransformEntries(apiEntries)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load coping statements list entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Coping Statements List Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = async (entryId: string) => {
        try {
            // Find the entry to get all its statements
            const entryToDelete = entries.find(e => e.id === entryId);
            if (!entryToDelete) return;

            // Load all API entries to find which ones belong to this grouped entry
            const apiEntries = await fetchCopingStatementsListEntries();
            
            // Find entries that match the date/time of the entry to delete
            const date = new Date(entryToDelete.date);
            const targetTimestamp = Math.floor(date.getTime() / 1000);
            const roundedTargetTime = Math.floor(targetTimestamp / 60) * 60;
            
            // Find all API entries that belong to this group
            const entriesToDelete = apiEntries.filter(apiEntry => {
                const roundedTime = Math.floor(apiEntry.time / 60) * 60;
                return roundedTime === roundedTargetTime;
            });

            // Delete all entries in the group
            await Promise.all(
                entriesToDelete.map(apiEntry => deleteCopingStatementsListEntry(apiEntry.id))
            );

            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
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

    if (isLoading) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Entry" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.Button_Orange} />
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entry" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {error && (
                    <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.red_50 }}>
                        <Text style={[t.textRegular, { color: colors.red_light }]}>
                            {error}
                        </Text>
                    </View>
                )}

                {entries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <RadicalAcceptanceCopingStatementsListEntryCard
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

