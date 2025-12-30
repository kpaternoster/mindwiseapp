import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, RecognizingDialecticalDilemmasEntryCard } from '../components';
import { 
    fetchDialecticalDilemmaEntries, 
    deleteDialecticalDilemmaEntry, 
    DialecticalDilemmaEntry as ApiDialecticalDilemmaEntry 
} from '../api/middlePath';

interface RecognizingDialecticalDilemmasEntry {
    id: string;
    date: string;
    time?: string;
    situationDilemma?: string;
    extreme1?: string;
    extreme2?: string;
    truth1?: string;
    truth2?: string;
    middlePathPerspective?: string;
}

export default function RecognizingDialecticalDilemmasEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<RecognizingDialecticalDilemmasEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiDialecticalDilemmaEntry): RecognizingDialecticalDilemmasEntry => {
        const date = new Date(apiEntry.time * 1000);
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: date.toISOString(), // Convert timestamp to ISO string
            time: timeString,
            situationDilemma: apiEntry.situation || undefined,
            extreme1: apiEntry.extreme1 || undefined,
            extreme2: apiEntry.extreme2 || undefined,
            truth1: apiEntry.truth1 || undefined,
            truth2: apiEntry.truth2 || undefined,
            middlePathPerspective: apiEntry.perspective || undefined,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchDialecticalDilemmaEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load dialectical dilemma entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Recognizing Dialectical Dilemmas Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = async (id: string) => {
        try {
            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
            
            // Delete from API
            await deleteDialecticalDilemmaEntry(id);
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
        dissolveTo('Learn_RecognizingDialecticalDilemmas');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_MiddlePathExercises');
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
                        <RecognizingDialecticalDilemmasEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
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

