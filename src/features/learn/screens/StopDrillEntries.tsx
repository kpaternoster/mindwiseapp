import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, ActivityIndicator, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader, StopDrillEntryCard, StopDrillEntry, TabSwitcher } from '../components';
import { 
    fetchStopDrillEntries, 
    deleteStopDrillEntry,
    fetchMindfulPauseTimerEntries,
    deleteMindfulPauseTimerEntry,
    fetchRolePlayEntries,
    deleteRolePlayEntry
} from '../api/stop';

type StopDrillEntriesRouteProp = RouteProp<HomeStackParams, 'Learn_StopDrillEntries'>;

export default function StopDrillEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<StopDrillEntriesRouteProp>();
    const { initialTab } = route.params || {};
    const [entries, setEntries] = useState<StopDrillEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'stopDrill' | 'mindfulPause' | 'rolePlay'>(initialTab || 'stopDrill');

    const loadEntries = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch all 3 types in parallel
            const [stopDrillEntries, mindfulPauseEntries, rolePlayEntries] = await Promise.all([
                fetchStopDrillEntries(),
                fetchMindfulPauseTimerEntries(),
                fetchRolePlayEntries(),
            ]);

            // Transform and combine all entries
            const allEntries: StopDrillEntry[] = [];

            // Transform STOP Drill entries
            stopDrillEntries.forEach((apiEntry) => {
                const date = new Date(apiEntry.time * 1000);
                const dateStr = date.toISOString().split('T')[0];
                const timeStr = date.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });

                allEntries.push({
                    id: apiEntry.id,
                    date: dateStr,
                    time: timeStr,
                    type: 'stopDrill',
                    stopPlan: apiEntry.stopPlan,
                    takeStepBackPlan: apiEntry.takeAStepBackPlan,
                    observePlan: apiEntry.observePlan,
                    proceedMindfullyPlan: apiEntry.proceedMindfullyPlan,
                });
            });

            // Transform Mindful Pause entries
            mindfulPauseEntries.forEach((apiEntry) => {
                const date = new Date(apiEntry.time * 1000);
                const dateStr = date.toISOString().split('T')[0];
                const timeStr = date.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });

                allEntries.push({
                    id: apiEntry.id,
                    date: dateStr,
                    time: timeStr,
                    type: 'mindfulPause',
                    // Store reflection in a way that can be accessed later if needed
                    // For now, we'll use proceedMindfullyPlan as a placeholder field
                    proceedMindfullyPlan: apiEntry.reflection,
                });
            });

            // Transform Role Play entries
            rolePlayEntries.forEach((apiEntry) => {
                const date = new Date(apiEntry.time * 1000);
                const dateStr = date.toISOString().split('T')[0];
                const timeStr = date.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });

                allEntries.push({
                    id: apiEntry.id,
                    date: dateStr,
                    time: timeStr,
                    type: 'rolePlay',
                    // Store role play data in available fields
                    stopPlan: apiEntry.who,
                    takeStepBackPlan: apiEntry.scenario,
                    observePlan: apiEntry.reflection,
                });
            });

            // Sort by date (newest first)
            allEntries.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });

            setEntries(allEntries);
        } catch (err) {
            console.error('Failed to load STOP drill entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleDelete = async (entryId: string, entryType: 'stopDrill' | 'mindfulPause' | 'rolePlay') => {
        // Optimistic update
        const previousEntries = [...entries];
        setEntries(entries.filter((entry) => entry.id !== entryId));

        try {
            // Delete based on entry type
            if (entryType === 'stopDrill') {
                await deleteStopDrillEntry(entryId);
            } else if (entryType === 'mindfulPause') {
                await deleteMindfulPauseTimerEntry(entryId);
            } else if (entryType === 'rolePlay') {
                await deleteRolePlayEntry(entryId);
            }
        } catch (err) {
            console.error('Failed to delete entry:', err);
            // Revert on error
            setEntries(previousEntries);
            setError('Failed to delete entry. Please try again.');
        }
    };

    useEffect(() => {
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    const filteredEntries = useMemo(() => {
        return entries.filter(entry => entry.type === activeTab);
    }, [entries, activeTab]);

    const handleView = (entryId: string) => {
        const entry = entries.find(e => e.id === entryId);
        if (entry?.type === 'mindfulPause') {
            dissolveTo('Learn_MindfulPauseEntry', { entryId });
        } else if (entry?.type === 'rolePlay') {
            dissolveTo('Learn_RolePlayEntry', { entryId });
        } else {
            dissolveTo('Learn_StopDrillEntry', { entryId });
        }
    };

    const handleDeleteEntry = (entryId: string) => {
        const entry = entries.find(e => e.id === entryId);
        if (entry) {
            handleDelete(entryId, entry.type);
        }
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Plans" showHomeIcon={true} showLeafIcon={true} />

            <View className="px-5">
                {/* Tab Switcher */}
                <TabSwitcher
                    tabs={[
                        { label: 'STOP Drill', value: 'stopDrill' },
                        { label: 'Mindful Pause', value: 'mindfulPause' },
                        { label: 'Role-Play', value: 'rolePlay' },
                    ]}
                    activeTab={activeTab}
                    onTabChange={(value) => setActiveTab(value as 'stopDrill' | 'mindfulPause' | 'rolePlay')}
                />
            </View>

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
                ) : filteredEntries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet.
                        </Text>
                    </View>
                ) : (
                    filteredEntries.map((entry) => (
                        <StopDrillEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDeleteEntry}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}

