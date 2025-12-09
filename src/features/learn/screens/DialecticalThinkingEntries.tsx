import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { DialecticalThinkingEntryCard, DialecticalThinkingEntry } from '../components/DialecticalThinkingEntryCard';

export default function DialecticalThinkingEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<DialecticalThinkingEntry[]>([]);

    useEffect(() => {
        // TODO: Load entries from storage/backend
        // For now, using mock data
        const mockEntries: DialecticalThinkingEntry[] = [
            {
                id: '1',
                date: new Date(2025, 10, 6).toISOString(), // Nov 6, 2025
                title: 'Co-worker Eddy',
                butStatement: 'excited',
                andStatement: 'joy',
                situation: 'joy and excited they shared',
                reframe: 'joy and excited they shared',
            },
           
        ];
        setEntries(mockEntries);
    }, []);

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality with confirmation
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        console.log('Delete entry:', id);
    };

    const handleNewEntry = () => {
        dissolveTo('Learn_DialecticalThinkingReframing');
    };

    const handleBackToMenu = () => {
        dissolveTo('Learn_DialecticalThinkingExercises');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

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
                        <DialecticalThinkingEntryCard
                            key={entry.id}
                            entry={entry}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View
                className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-4"
                style={{ backgroundColor: colors.white }}
            >
                <Pressable
                    className="rounded-full py-4 items-center justify-center mb-3"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleNewEntry}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        New Entry
                    </Text>
                </Pressable>

                <Pressable
                    className="rounded-full py-4 items-center justify-center"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleBackToMenu}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        Back to Menu
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

