import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { SelfCarePleaseEntryCard, SelfCarePleaseEntry } from '../components/SelfCarePleaseEntryCard';

export default function SelfCarePleaseEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<SelfCarePleaseEntry[]>([]);

    useEffect(() => {
        // TODO: Load entries from storage/backend
        // For now, using mock data
        const mockEntries: SelfCarePleaseEntry[] = [
            {
                id: '1',
                date: new Date(2025, 10, 6).toISOString(), // Nov 6, 2025
                type: 'reflection',
                title: 'Self-Care Reflection',
            },
            {
                id: '2',
                date: new Date(2025, 10, 5).toISOString(), // Nov 5, 2025
                type: 'plan',
                title: 'Self-Care Plan',
            },
            {
                id: '3',
                date: new Date(2025, 10, 4).toISOString(), // Nov 4, 2025
                type: 'plan',
                title: 'Self-Care Plan',
            },
            {
                id: '4',
                date: new Date(2025, 10, 3).toISOString(), // Nov 3, 2025
                type: 'plan',
                title: 'Self-Care Plan',
            },
            {
                id: '5',
                date: new Date(2025, 10, 2).toISOString(), // Nov 2, 2025
                type: 'plan',
                title: 'Self-Care Plan',
            },
        ];
        setEntries(mockEntries);
    }, []);

    const handleView = (id: string) => {
        // TODO: Navigate to view entry detail screen
        const entry = entries.find(e => e.id === id);
        if (entry?.type === 'plan') {
            // Navigate to plan view
            console.log('View plan:', id);
        } else if (entry?.type === 'reflection') {
            // Navigate to reflection view
            console.log('View reflection:', id);
        }
    };

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        console.log('Delete entry:', id);
    };

    const handleNewEntry = () => {
        // TODO: Navigate to appropriate screen based on entry type
        dissolveTo('Learn_SelfCarePleaseExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved" showHomeIcon={true} showLeafIcon={true} />

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
                        <SelfCarePleaseEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>

            {/* New Entry Button */}
            {/* <View
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
            </View> */}
        </View>
    );
}

