import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader, StopDrillEntryCard, StopDrillEntry, TabSwitcher } from '../components';

type StopDrillEntriesRouteProp = RouteProp<HomeStackParams, 'Learn_StopDrillEntries'>;

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: StopDrillEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'stopDrill',
        stopPlan: '',
        takeStepBackPlan: 'Leave the room for a moment, count to 10',
        observePlan: 'Notice my racing heart, anxious thoughts, and the situation',
        proceedMindfullyPlan: 'Ask myself what wise mind would do, consider consequences',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'stopDrill',
        stopPlan: '',
        takeStepBackPlan: 'Leave the room for a moment, count to 10',
        observePlan: 'Notice my racing heart, anxious thoughts, and the situation',
        proceedMindfullyPlan: 'Ask myself what wise mind would do, consider consequences',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'stopDrill',
        stopPlan: '',
        takeStepBackPlan: 'Leave the room for a moment, count to 10',
        observePlan: 'Notice my racing heart, anxious thoughts, and the situation',
        proceedMindfullyPlan: 'Ask myself what wise mind would do, consider consequences',
    },
    {
        id: '4',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'mindfulPause',
        stopPlan: '',
        takeStepBackPlan: 'Leave the room for a moment, count to 10',
        observePlan: 'Notice my racing heart, anxious thoughts, and the situation',
        proceedMindfullyPlan: 'Ask myself what wise mind would do, consider consequences',
    },
    {
        id: '5',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'rolePlay',
        stopPlan: '',
        takeStepBackPlan: 'Leave the room for a moment, count to 10',
        observePlan: 'Notice my racing heart, anxious thoughts, and the situation',
        proceedMindfullyPlan: 'Ask myself what wise mind would do, consider consequences',
    },
];

export default function StopDrillEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<StopDrillEntriesRouteProp>();
    const { initialTab } = route.params || {};
    const [entries, setEntries] = useState(mockEntries);
    const [activeTab, setActiveTab] = useState<'stopDrill' | 'mindfulPause' | 'rolePlay'>(initialTab || 'stopDrill');

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

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        console.log('Delete entry:', entryId);
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
                {filteredEntries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet. Start your first practice!
                        </Text>
                    </View>
                ) : (
                    filteredEntries.map((entry) => (
                        <StopDrillEntryCard
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

