import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader, HalfSmilingEntryCard, HalfSmilingEntry, TabSwitcher } from '../components';
import {
    fetchMindfulHalfSmilePracticeEntries,
    deleteMindfulHalfSmilePracticeEntry,
    fetchEmotionMappingEntries,
    deleteEmotionMappingEntry,
    fetchHalfSmileInActionEntries,
    deleteHalfSmileInActionEntry,
    fetchAnchorPromptsEntries,
    deleteAnchorPromptsEntry,
    MindfulHalfSmilePracticeEntry as ApiPracticeEntry,
    EmotionMappingEntry as ApiEmotionMappingEntry,
    HalfSmileInActionEntry as ApiInActionEntry,
    AnchorPromptsEntry as ApiAnchorPromptsEntry,
} from '../api/halfSmiling';

type HalfSmilingEntriesRouteProp = RouteProp<HomeStackParams, 'Learn_HalfSmilingEntries'>;

export default function HalfSmilingEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<HalfSmilingEntriesRouteProp>();
    const { initialTab } = route.params || {};
    const [entries, setEntries] = useState<HalfSmilingEntry[]>([]);
    const [activeTab, setActiveTab] = useState<'practice' | 'emotionMapping' | 'inAction' | 'anchorPrompts'>(initialTab || 'practice');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entries to component format
    const transformPracticeEntry = (apiEntry: ApiPracticeEntry): HalfSmilingEntry => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0];
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            type: 'practice',
            visualization: apiEntry.calmingVisualization,
            bodyResponse: apiEntry.bodyResponse,
            reflection: apiEntry.reflection,
        };
    };

    const transformEmotionMappingEntry = (apiEntry: ApiEmotionMappingEntry): HalfSmilingEntry => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0];
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            type: 'emotionMapping',
            emotionMapping: apiEntry.situation || apiEntry.emotions || apiEntry.bodyResponse,
            situation: apiEntry.situation,
            emotions: apiEntry.emotions,
            bodyResponse: apiEntry.bodyResponse,
            howHalfSmileCouldHelp: apiEntry.howHalfSmileCouldHelp,
            futurePlan: apiEntry.futurePlan,
        };
    };

    const transformInActionEntry = (apiEntry: ApiInActionEntry): HalfSmilingEntry => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0];
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            type: 'inAction',
            inAction: apiEntry.activity || apiEntry.before || apiEntry.during,
            activity: apiEntry.activity,
            before: apiEntry.before,
            during: apiEntry.during,
            after: apiEntry.after,
            whatChanged: apiEntry.whatChanged,
        };
    };

    const transformAnchorPromptsEntry = (apiEntry: ApiAnchorPromptsEntry): HalfSmilingEntry => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0];
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            type: 'anchorPrompts',
            prompts: apiEntry.prompts,
            reflection: apiEntry.reflection,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Fetch all entry types in parallel
            const [practiceEntries, emotionMappingEntries, inActionEntries, anchorPromptsEntries] = await Promise.all([
                fetchMindfulHalfSmilePracticeEntries(),
                fetchEmotionMappingEntries(),
                fetchHalfSmileInActionEntries(),
                fetchAnchorPromptsEntries(),
            ]);
            
            // Transform and combine all entries
            const allEntries: HalfSmilingEntry[] = [
                ...practiceEntries.map(transformPracticeEntry),
                ...emotionMappingEntries.map(transformEmotionMappingEntry),
                ...inActionEntries.map(transformInActionEntry),
                ...anchorPromptsEntries.map(transformAnchorPromptsEntry),
            ];
            
            // Sort by date (newest first)
            allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(allEntries);
        } catch (err) {
            console.error('Failed to load half smiling entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    useEffect(() => {
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    const filteredEntries = useMemo(() => {
        return entries.filter(entry => entry.type === activeTab);
    }, [entries, activeTab]);

    const handleView = (entryId: string) => {
        // TODO: Navigate to entry detail screen when created
        const entry = entries.find(e => e.id === entryId);
        console.log('View entry:', entry);
    };

    const handleDelete = async (entryId: string) => {
        try {
            // Find the entry to determine its type
            const entry = entries.find(e => e.id === entryId);
            if (!entry) return;

            // Optimistically update UI
            setEntries((prev) => prev.filter((e) => e.id !== entryId));

            // Delete from appropriate API endpoint
            switch (entry.type) {
                case 'practice':
                    await deleteMindfulHalfSmilePracticeEntry(entryId);
                    break;
                case 'emotionMapping':
                    await deleteEmotionMappingEntry(entryId);
                    break;
                case 'inAction':
                    await deleteHalfSmileInActionEntry(entryId);
                    break;
                case 'anchorPrompts':
                    await deleteAnchorPromptsEntry(entryId);
                    break;
            }
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

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entry" showHomeIcon={true} showLeafIcon={true} />

            <View className="px-5">
                {/* Tab Switcher */}
                <TabSwitcher
                    tabs={[
                        { label: 'Practice', value: 'practice' },
                        { label: 'Emotion Mapping', value: 'emotionMapping' },
                        { label: 'In Action', value: 'inAction' },
                        { label: 'Anchor Prompts', value: 'anchorPrompts' },
                    ]}
                    activeTab={activeTab}
                    onTabChange={(value) => setActiveTab(value as 'practice' | 'emotionMapping' | 'inAction' | 'anchorPrompts')}
                />
            </View>

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
                    <View className="items-center justify-center py-12">
                        <ActivityIndicator size="large" color={colors.Button_Orange} />
                    </View>
                ) : filteredEntries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    filteredEntries.map((entry) => (
                        <HalfSmilingEntryCard
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

