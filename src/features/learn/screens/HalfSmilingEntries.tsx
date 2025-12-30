import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader, HalfSmilingEntryCard, HalfSmilingEntry, TabSwitcher } from '../components';

type HalfSmilingEntriesRouteProp = RouteProp<HomeStackParams, 'Learn_HalfSmilingEntries'>;

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: HalfSmilingEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'practice',
        visualization: 'A quiet beach at sunrise with gentle waves',
        bodyResponse: 'My shoulders dropped, my jaw relaxed, I felt lighter',
        reflection: 'I noticed I was much more relaxed after the practice. The tension in my shoulders completely disappeared.',
        timerStatus: 'completed',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'practice',
        visualization: 'A warm color washing over me',
        bodyResponse: 'My breathing became deeper and more regular',
        reflection: 'The practice helped me feel more centered and calm.',
        timerStatus: 'completed',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'practice',
        visualization: 'A peaceful forest with sunlight filtering through trees',
        bodyResponse: 'I felt a sense of peace and tranquility',
        reflection: 'This was a very grounding experience.',
        timerStatus: 'paused',
    },
    {
        id: '4',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'emotionMapping',
        visualization: 'A peaceful forest with sunlight filtering through trees',
        bodyResponse: 'I felt a sense of peace and tranquility',
        reflection: 'This was a very grounding experience.',
        timerStatus: 'paused',
    },
    {
        id: '5',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'inAction',
        visualization: 'A peaceful forest with sunlight filtering through trees',
        bodyResponse: 'I felt a sense of peace and tranquility',
        reflection: 'This was a very grounding experience.',
        timerStatus: 'paused',
    },
];

export default function HalfSmilingEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<HalfSmilingEntriesRouteProp>();
    const { initialTab } = route.params || {};
    const [entries, setEntries] = useState(mockEntries);
    const [activeTab, setActiveTab] = useState<'practice' | 'emotionMapping' | 'inAction' | 'anchorPrompts'>(initialTab || 'practice');

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

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        console.log('Delete entry:', entryId);
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
                {filteredEntries.length === 0 ? (
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

