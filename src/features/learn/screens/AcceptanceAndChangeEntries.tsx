import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, AcceptanceAndChangeEntryCard } from '../components';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntries = [
    {
        id: '1',
        date: '2025-11-06',
        time: '04:25 PM',
        describeSituation: 'Describe your either/or dilemma',
        partsNeedAcceptance: 'Create your balanced "both/and" perspective',
        partsCanChange: 'Create your balanced "both/and" perspective',
    },
    {
        id: '2',
        date: '2025-11-06',
        time: '04:25 PM',
        describeSituation: 'Describe your either/or dilemma',
        partsNeedAcceptance: 'Create your balanced "both/and" perspective',
        partsCanChange: 'Create your balanced "both/and" perspective',
    },
];

export default function AcceptanceAndChangeEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Acceptance & Change Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        console.log('Delete entry:', entryId);
    };

    const handleNewEntry = () => {
        dissolveTo('Learn_AcceptanceAndChange');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_MiddlePathExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {entries.length === 0 ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet. Start your first practice!
                        </Text>
                    </View>
                ) : (
                    entries.map((entry) => (
                        <AcceptanceAndChangeEntryCard
                            key={entry.id}
                            entry={entry}
                            onView={handleView}
                            onDelete={handleDelete}
                        />
                    ))
                )}

                {/* Action Buttons */}
                {/* <View className="flex-row gap-3 mb-3">
                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ backgroundColor: colors.Button_Orange }}
                        onPress={handleNewEntry}
                    >
                        <Text style={[t.textSemiBold, { color: colors.white }]}>
                            New Entry
                        </Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 rounded-full py-3 px-3 items-center justify-center"
                        style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                        onPress={handleBackToMenu}
                    >
                        <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                            Back to Menu
                        </Text>
                    </Pressable>
                </View> */}
            </ScrollView>
        </View>
    );
}

