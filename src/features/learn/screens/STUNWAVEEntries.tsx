import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { STUNWAVEEntryCard, STUNWAVEEntry } from '../components/STUNWAVEEntryCard';

export default function STUNWAVEEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<STUNWAVEEntry[]>([]);

    useEffect(() => {
        // TODO: Load entries from storage/backend
        // For now, using mock data
        const mockEntries: STUNWAVEEntry[] = [
            {
                id: '1',
                date: new Date(2025, 10, 6).toISOString(), // Nov 6, 2025
                emotions: 'excited',
                reflection: 'joy',
                notes: 'lorem ipsum si amet',
            },
        ];
        setEntries(mockEntries);
    }, []);

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        console.log('Delete entry:', id);
    };

    const handleNewEntry = () => {
        dissolveTo('Learn_STUNWAVECheckIn');
    };

    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header Text */}
            <View className="px-5 pb-2">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    View saved entries
                </Text>
            </View>

            <PageHeader title="Saved STUNWAVE Entries" showHomeIcon={true} showLeafIcon={true} />

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
                        <STUNWAVEEntryCard
                            key={entry.id}
                            entry={entry}
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

