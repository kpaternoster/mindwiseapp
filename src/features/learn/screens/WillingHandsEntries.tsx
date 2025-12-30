import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import WillingHandsEntryCard from '../components/WillingHandsEntryCard';
import { 
    fetchWillingHandsEntries, 
    deleteWillingHandsEntry, 
    WillingHandsEntry as ApiWillingHandsEntry 
} from '../api/willingHands';

interface WillingHandsEntryCardData {
    id: string;
    date: string;
    time?: string;
    title: string;
    preview?: string;
}

export default function WillingHandsEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<WillingHandsEntryCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiWillingHandsEntry): WillingHandsEntryCardData => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
        const timeString = date.toISOString(); // Full ISO string for time
        
        // Create preview from tension or reflection
        const preview = apiEntry.tension || apiEntry.reflection || '';
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            title: 'Willing Hands Practice',
            preview: preview,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchWillingHandsEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load willing hands entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleView = (entryId: string) => {
        dissolveTo('Learn_WillingHandsEntryDetail', { entryId });
    };

    const handleDelete = async (entryId: string) => {
        try {
            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
            
            // Delete from API
            await deleteWillingHandsEntry(entryId);
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
        dissolveTo('Learn_WillingHandsPractice');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_WillingHandsExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Practices" showHomeIcon={true} showLeafIcon={true} />

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

                {isLoading ? (
                    <View className="items-center justify-center py-20">
                        <ActivityIndicator size="large" color={colors.Button_Orange} />
                    </View>
                ) : entries.length === 0 ? (
                    <View className="items-center justify-center py-20">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No saved practices yet
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <WillingHandsEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>

            {/* Action Buttons */}
            <View className="px-5 pb-6 pt-4 bg-white">
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

