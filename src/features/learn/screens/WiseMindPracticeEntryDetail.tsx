import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { CalendarBlankIcon } from '@components/Utils';

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

    useEffect(() => {
        // TODO: Load entry from storage/backend using entryId
        // For now, using mock data
        const mockEntry: WiseMindPracticeEntry = {
            id: entryId,
            date: '2025-11-06',
            time: '2025-11-06T16:25:00',
            breathingInsights: 'What insights arose during your breathing practice?',
            selectedVisualization: 'spiralStaircase',
            visualizationGuidance: 'What guidance did you receive?',
            currentSituation: '1 Current Situation',
            emotionMind: 'Emotion Mind',
            reasonableMind: 'Reasonable Mind',
            wiseMind: 'Wise Mind',
            pastExperience: 'past experience',
        };
        setEntry(mockEntry);
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

    const handleDelete = () => {
        // TODO: Show confirmation dialog and delete from storage/backend
        // Then navigate back to entries screen
        console.log('Delete entry:', entryId);
    };

    if (!entry) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Entry Details" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Loading...
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

