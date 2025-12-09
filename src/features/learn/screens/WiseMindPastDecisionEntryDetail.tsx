import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { CalendarBlankIcon } from '@components/Utils';

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

    useEffect(() => {
        // TODO: Load entry from storage/backend using entryId
        // For now, using mock data
        const mockEntry: WiseMindPastDecisionEntry = {
            id: entryId,
            date: '2025-11-17',
            time: '2025-11-17T10:00:00',
            situation: 'Describe the situation and decision you made',
            mindStateAnalysis: 'Analyze which mind state you were in',
            wiseMindPerspective: 'What would Wise Mind have done differently',
            insightsLearning: 'What insights or lessons did you gain?',
        };
        setEntry(mockEntry);
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

    const handleDelete = () => {
        // TODO: Show confirmation dialog and delete from storage/backend
        // Then navigate back to entries screen
        console.log('Delete entry:', entryId);
        dissolveTo('Learn_WiseMindPastDecisionEntries');
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

