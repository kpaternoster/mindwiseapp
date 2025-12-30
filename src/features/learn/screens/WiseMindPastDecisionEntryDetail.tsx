import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { CalendarBlankIcon } from '@components/Utils';
import { 
    fetchPastDecisionEntries, 
    deletePastDecisionEntry, 
    PastDecisionEntry as ApiPastDecisionEntry 
} from '../api/wiseMind';

interface WiseMindPastDecisionEntry {
    id: string;
    date: string;
    time?: string;
    situation?: string;
    mindStateAnalysis?: string;
    wiseMindPerspective?: string;
    insightsLearning?: string;
}

type WiseMindPastDecisionEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_WiseMindPastDecisionEntryDetail'>;

export default function WiseMindPastDecisionEntryDetailScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<WiseMindPastDecisionEntryDetailRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<WiseMindPastDecisionEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiPastDecisionEntry): WiseMindPastDecisionEntry => {
        const date = new Date(apiEntry.time * 1000);
        const timeString = date.toISOString();
        
        return {
            id: apiEntry.id,
            date: date.toISOString().split('T')[0], // Extract date part (YYYY-MM-DD)
            time: timeString, // Full ISO string for time formatting
            situation: apiEntry.situation || undefined,
            mindStateAnalysis: apiEntry.mindState || undefined,
            wiseMindPerspective: apiEntry.wiseMindPerspective || undefined,
            insightsLearning: apiEntry.insights || undefined,
        };
    };

    useEffect(() => {
        const loadEntry = async () => {
            if (!entryId) {
                setError('Entry ID is missing');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                
                // Fetch all entries and find the one with matching ID
                const apiEntries = await fetchPastDecisionEntries();
                const foundEntry = apiEntries.find(e => e.id === entryId);
                
                if (!foundEntry) {
                    setError('Entry not found');
                    setIsLoading(false);
                    return;
                }
                
                // Transform API entry to component format
                const transformedEntry = transformApiEntry(foundEntry);
                setEntry(transformedEntry);
            } catch (err) {
                console.error('Failed to load past decision entry:', err);
                setError('Failed to load entry. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadEntry();
    }, [entryId]);

    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        if (timeString) {
            const time = new Date(timeString);
            return date.toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
            });
        }
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleDelete = async () => {
        if (!entryId) {
            return;
        }

        try {
            // Delete from API
            await deletePastDecisionEntry(entryId);
            
            // Navigate back to entries screen
            dissolveTo('Learn_WiseMindPastDecisionEntries');
        } catch (err) {
            console.error('Failed to delete entry:', err);
            setError('Failed to delete entry. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Entry Details" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            </View>
        );
    }

    if (error || !entry) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Entry Details" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center px-5">
                    <Text style={[t.textRegular, { color: colors.red_light, textAlign: 'center' }]}>
                        {error || 'Entry not found'}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Entry Details" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Date Badge */}
                <View className="flex-row items-center mb-4">
                    <View
                        className="flex-row items-center px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: colors.orange_50 }}
                    >
                        <CalendarBlankIcon size={14} color={colors.orange_600} />
                        <Text
                            style={[t.footnoteBold, { color: colors.orange_600 }]}
                            className="ml-2"
                        >
                            {formatDate(entry.date, entry.time)}
                        </Text>
                    </View>
                </View>

                {/* Content Card */}
                <View
                    className="bg-white rounded-2xl p-4 mb-4"
                    style={{
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                    }}
                >
                    {/* Past Decision */}
                    {entry.situation && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Past Decision:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.situation}
                            </Text>
                        </View>
                    )}

                    {/* Mind State */}
                    {entry.mindStateAnalysis && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Mind State:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.mindStateAnalysis}
                            </Text>
                        </View>
                    )}

                    {/* Wise Mind Influence */}
                    {entry.wiseMindPerspective && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Wise Mind Influence:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.wiseMindPerspective}
                            </Text>
                        </View>
                    )}

                    {/* Lessons Learned */}
                    {entry.insightsLearning && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Lessons Learned:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.insightsLearning}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Delete Button */}
            <View className="px-5 pb-6 pt-4 bg-white">
                <Pressable
                    className="rounded-full py-3 px-3 items-center justify-center"
                    style={{
                        borderColor: colors.red_light,
                        borderWidth: 2,
                        backgroundColor: colors.red_light_10,
                    }}
                    onPress={handleDelete}
                >
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                        Delete Entry
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

