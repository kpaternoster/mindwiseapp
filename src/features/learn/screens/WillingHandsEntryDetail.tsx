import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { CalendarBlankIcon } from '@components/Utils';

interface WillingHandsEntry {
    id: string;
    date: string;
    time?: string;
    bodyTension?: string;
    tensionRelease?: string;
    stressfulSituation?: string;
    acceptanceIntention?: string;
    reflection?: string;
}

type WillingHandsEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_WillingHandsEntryDetail'>;

export default function WillingHandsEntryDetailScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<WillingHandsEntryDetailRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<WillingHandsEntry | null>(null);

    useEffect(() => {
        // TODO: Load entry from storage/backend using entryId
        // For now, using mock data
        const mockEntry: WillingHandsEntry = {
            id: entryId,
            date: '2025-11-17',
            time: '2025-11-17T18:35:00',
            bodyTension: 'Where did you notice tension in your body?',
            tensionRelease: 'lorem ipusm',
            stressfulSituation: 'lorem ipusm',
            acceptanceIntention: 'lorem ipusm',
            reflection: 'lorem ipusm',
        };
        setEntry(mockEntry);
    }, [entryId]);

    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        if (timeString) {
            const time = new Date(timeString);
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
            const formattedTime = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            return `${formattedDate}, ${formattedTime}`;
        }
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleDelete = () => {
        // TODO: Show confirmation dialog and delete from storage/backend
        // Then navigate back to entries screen
        console.log('Delete entry:', entryId);
        dissolveTo('Learn_WillingHandsEntries');
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
                    {/* Body Tension */}
                    {entry.bodyTension && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Body Tension:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.bodyTension}
                            </Text>
                        </View>
                    )}

                    {/* Tension Release */}
                    {entry.tensionRelease && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Tension Release:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.tensionRelease}
                            </Text>
                        </View>
                    )}

                    {/* Stressful Situation */}
                    {entry.stressfulSituation && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Stressful Situation:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.stressfulSituation}
                            </Text>
                        </View>
                    )}

                    {/* Acceptance Intention */}
                    {entry.acceptanceIntention && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Acceptance Intention:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.acceptanceIntention}
                            </Text>
                        </View>
                    )}

                    {/* Reflection */}
                    {entry.reflection && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Reflection:
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.reflection}
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
                        backgroundColor: colors.red_light_10 || colors.white,
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

