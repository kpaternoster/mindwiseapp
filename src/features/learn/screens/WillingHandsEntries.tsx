import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import WillingHandsEntryCard from '../components/WillingHandsEntryCard';

// Mock data - replace with actual data from storage/backend
const mockEntries = [
    {
        id: '1',
        date: '2025-11-06',
        time: '2025-11-06T16:24:00',
        title: 'Willing Hands Practice',
        preview: 'Where did you notice tension in you...',
    },
    {
        id: '2',
        date: '2025-11-05',
        time: '2025-11-05T14:30:00',
        title: 'Willing Hands Practice',
        preview: 'Where did you notice tension in you...',
    },
    {
        id: '3',
        date: '2025-11-04',
        time: '2025-11-04T10:15:00',
        title: 'Willing Hands Practice',
        preview: 'Where did you notice tension in you...',
    },
];

export default function WillingHandsEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState(mockEntries);

    const handleView = (entryId: string) => {
        dissolveTo('Learn_WillingHandsEntryDetail', { entryId });
    };

    const handleDelete = (entryId: string) => {
        // TODO: Show confirmation dialog and delete from storage/backend
        setEntries(entries.filter(entry => entry.id !== entryId));
        console.log('Delete entry:', entryId);
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
                {entries.length === 0 ? (
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

