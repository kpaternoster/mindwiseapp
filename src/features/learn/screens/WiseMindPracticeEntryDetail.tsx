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
    fetchWiseMindEntries, 
    deleteWiseMindEntry, 
    WiseMindEntry as ApiWiseMindEntry 
} from '../api/wiseMind';

interface WiseMindPracticeEntry {
    id: string;
    date: string;
    time?: string;
    breathingInsights?: string;
    selectedVisualization?: string;
    visualizationGuidance?: string;
    currentSituation?: string;
    emotionMind?: string;
    reasonableMind?: string;
    wiseMind?: string;
    pastExperience?: string;
}

type WiseMindPracticeEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_WiseMindPracticeEntryDetail'>;

export default function WiseMindPracticeEntryDetailScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<WiseMindPracticeEntryDetailRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<WiseMindPracticeEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiWiseMindEntry): WiseMindPracticeEntry => {
        const date = new Date(apiEntry.time * 1000);
        const timeString = date.toISOString();
        
        // Map visualization value back to component format
        const mapVisualization = (vis: string): string => {
            if (vis === 'staircase') {
                return 'spiralStaircase';
            } else if (vis === 'calmLake') {
                return 'calmLake';
            }
            return vis;
        };
        
        return {
            id: apiEntry.id,
            date: date.toISOString().split('T')[0], // Extract date part (YYYY-MM-DD)
            time: timeString, // Full ISO string for time formatting
            breathingInsights: apiEntry.breathing || undefined,
            selectedVisualization: mapVisualization(apiEntry.visualization) || undefined,
            visualizationGuidance: apiEntry.guidance || undefined,
            currentSituation: apiEntry.currentSituation || undefined,
            emotionMind: apiEntry.emotionMind || undefined,
            reasonableMind: apiEntry.reasonableMind || undefined,
            wiseMind: apiEntry.wiseMind || undefined,
            pastExperience: apiEntry.pastExperience || undefined,
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
                const apiEntries = await fetchWiseMindEntries();
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
                console.error('Failed to load wise mind entry:', err);
                setError('Failed to load entry. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadEntry();
    }, [entryId]);

    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        
        if (timeString) {
            const time = new Date(timeString);
            const formattedTime = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            return `${formattedDate}, ${formattedTime}`;
        }
        return formattedDate;
    };

    const getVisualizationLabel = (visualizationId?: string) => {
        if (visualizationId === 'spiralStaircase') {
            return 'staircase';
        } else if (visualizationId === 'calmLake') {
            return 'lake';
        }
        return '';
    };

    const handleDelete = async () => {
        if (!entryId) {
            return;
        }

        try {
            // Delete from API
            await deleteWiseMindEntry(entryId);
            
            // Navigate back to entries screen
            dissolveTo('Learn_WiseMindPracticeEntries');
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
                    {/* Breathing Reflection */}
                    {entry.breathingInsights && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Breathing Reflection:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.breathingInsights}
                            </Text>
                        </View>
                    )}

                    {/* Visualization */}
                    {entry.visualizationGuidance && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Visualization {entry.selectedVisualization && `(${getVisualizationLabel(entry.selectedVisualization)})`}:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.visualizationGuidance}
                            </Text>
                        </View>
                    )}

                    {/* Current Situation */}
                    {entry.currentSituation && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Current Situation:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.currentSituation}
                            </Text>
                        </View>
                    )}

                    {/* Emotion Mind */}
                    {entry.emotionMind && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Emotion Mind:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.emotionMind}
                            </Text>
                        </View>
                    )}

                    {/* Reasonable Mind */}
                    {entry.reasonableMind && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Reasonable Mind:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.reasonableMind}
                            </Text>
                        </View>
                    )}

                    {/* Wise Mind */}
                    {entry.wiseMind && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Wise Mind:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.wiseMind}
                            </Text>
                        </View>
                    )}

                    {/* Past Experience */}
                    {entry.pastExperience && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Past Experience:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.pastExperience}
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

