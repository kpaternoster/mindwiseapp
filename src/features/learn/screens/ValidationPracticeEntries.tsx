import React, { useState, useMemo } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ValidationPracticeEntryCard, ValidationPracticeEntry } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries: ValidationPracticeEntry[] = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'activeListening',
        describeConversation: 'Active listening skills practice...',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'strengthenValidation',
        emotionalSituation: 'Active listening skills practice...',
    },
    {
        id: '3',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'strengthenValidation',
        emotionalSituation: 'Active listening skills practice...',
    },
    {
        id: '4',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'selfReflection',
        describeConversation: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    },
    {
        id: '5',
        date: '2025-11-06',
        time: '04:25 PM',
        type: 'selfReflection',
        describeConversation: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    },
];

export default function ValidationPracticeEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    // Group entries by type
    const groupedEntries = useMemo(() => {
        const groups: {
            activeListening: ValidationPracticeEntry[];
            strengthenValidation: ValidationPracticeEntry[];
            selfReflection: ValidationPracticeEntry[];
        } = {
            activeListening: [],
            strengthenValidation: [],
            selfReflection: [],
        };

        entries.forEach((entry) => {
            groups[entry.type].push(entry);
        });

        return groups;
    }, [entries]);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Validation Practice Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        console.log('Delete entry:', entryId);
    };

    const renderSection = (
        title: string,
        sectionEntries: ValidationPracticeEntry[]
    ) => {
        if (sectionEntries.length === 0) return null;

        return (
            <View key={title} className="mb-6">
                {/* Section Header */}
                <Text
                    style={[t.title20SemiBold, { color: colors.warm_dark }]}
                    className="mb-3"
                >
                    {title}
                </Text>

                {/* Section Entries */}
                {sectionEntries.map((entry) => (
                    <ValidationPracticeEntryCard
                        key={entry.id}
                        entry={entry}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                ))}
            </View>
        );
    };

    const hasEntries = entries.length > 0;

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {!hasEntries ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet. Start your first practice!
                        </Text>
                    </View>
                ) : (
                    <>
                        {renderSection('Active Listening Practice', groupedEntries.activeListening)}
                        {renderSection('Strengthen Your Validation', groupedEntries.strengthenValidation)}
                        {renderSection('Self Reflection', groupedEntries.selfReflection)}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

