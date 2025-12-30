import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import WiseMindPastDecisionEntryCard from '../components/WiseMindPastDecisionEntryCard';
import { 
    fetchPastDecisionEntries, 
    deletePastDecisionEntry, 
    PastDecisionEntry as ApiPastDecisionEntry 
} from '../api/wiseMind';

interface WiseMindPastDecisionEntry {
    id: string;
    date: string;
    time?: string;
    title: string;
}

export default function WiseMindPastDecisionEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<WiseMindPastDecisionEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiPastDecisionEntry): WiseMindPastDecisionEntry => {
        const date = new Date(apiEntry.time * 1000);
        const timeString = date.toISOString();
        
        return {
            id: apiEntry.id,
            date: date.toISOString().split('T')[0], // Extract date part (YYYY-MM-DD)
            time: timeString, // Full ISO string for time formatting
            title: 'Past Decisions',
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchPastDecisionEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load past decision entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleView = (entryId: string) => {
        dissolveTo('Learn_WiseMindPastDecisionEntryDetail', { entryId });
    };

    const handleDelete = async (id: string) => {
        try {
            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
            
            // Delete from API
            await deletePastDecisionEntry(id);
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
        dissolveTo('Learn_WiseMindPastDecisions');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_WiseMindExercises');
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
                    <View className="items-center justify-center py-20">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No saved entries yet
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <WiseMindPastDecisionEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>

            {/* Action Buttons */}
            <View
                className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4"
                style={{ backgroundColor: colors.white }}
            >
                <View className="flex-row gap-3">
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleNewEntry}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            New Entry
                        </Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ backgroundColor: colors.Button_Orange }}
                        onPress={handleBackToMenu}
                    >
                        <Text style={[t.textSemiBold, { color: colors.white }]}>
                            Back to Menu
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

