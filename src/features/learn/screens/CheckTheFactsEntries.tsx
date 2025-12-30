import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { CheckTheFactsEntryCard, CheckTheFactsEntry } from '../components/CheckTheFactsEntryCard';
import { 
    fetchCheckTheFactsEntries, 
    deleteCheckTheFactsEntry, 
    CheckTheFactsEntry as ApiCheckTheFactsEntry 
} from '../api/checkTheFacts';

export default function CheckTheFactsEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<CheckTheFactsEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiCheckTheFactsEntry): CheckTheFactsEntry => {
        return {
            id: apiEntry.id,
            date: new Date(apiEntry.time * 1000).toISOString(), // Convert timestamp to ISO string
            describeSituation: apiEntry.describe || undefined,
            facts: apiEntry.facts || undefined,
            assumptions: apiEntry.assumptions || undefined,
            alternativeExplanations: apiEntry.alternativeExplanations || undefined,
            emotionFactsCheck: apiEntry.emotionAndFactsCheck || undefined,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchCheckTheFactsEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load check the facts entries:', err);
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
            await deleteCheckTheFactsEntry(id);
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
        dissolveTo('Learn_CheckTheFactsFinding');
    };

    if (isLoading) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Fact Finding Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Fact Finding Entries" showHomeIcon={true} showLeafIcon={true} />

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
                        <CheckTheFactsEntryCard
                            key={entry.id}
                            entry={entry}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>

            {/* New Entry Button */}
            <View
                className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4"
                style={{ backgroundColor: colors.white }}
            >
                <Pressable
                    className="rounded-full py-4 items-center justify-center"
                    style={{ backgroundColor: colors.Button_Orange }}
                    onPress={handleNewEntry}
                >
                    <Text style={[t.button, { color: colors.white }]}>
                        New Entry
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

