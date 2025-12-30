import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, GiveReframingEntryCard, GiveReframingEntry } from '../components';
import { 
    fetchGiveReframingEntries, 
    deleteGiveReframingEntry, 
    GiveReframingEntry as ApiGiveReframingEntry 
} from '../api/give';

export default function GiveReframingEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<GiveReframingEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiGiveReframingEntry): GiveReframingEntry => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            recallConversation: apiEntry.situation,
            withoutGive: apiEntry.howItWentWithout,
            gentle: apiEntry.beGentle,
            showInterest: apiEntry.showInterest,
            validate: apiEntry.validate,
            easyManner: apiEntry.easyManner,
            differences: apiEntry.differences,
            insights: apiEntry.insights,
            applyGive: apiEntry.future,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchGiveReframingEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load GIVE reframing entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleView = (entryId: string) => {
        // TODO: Navigate to GIVE Reframing Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = async (id: string) => {
        try {
            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
            
            // Delete from API
            await deleteGiveReframingEntry(id);
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
                <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.Button_Orange} />
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

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
                        <GiveReframingEntryCard
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

