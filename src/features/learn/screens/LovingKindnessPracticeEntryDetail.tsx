import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { CalendarBlankIcon } from '@components/Utils';
import { 
    fetchLovingKindnessEntries, 
    deleteLovingKindnessEntry, 
    LovingKindnessEntry as ApiLovingKindnessEntry 
} from '../api/lovingKindness';

interface LovingKindnessPracticeEntry {
    id: string;
    date: string;
    time?: string;
    yourselfReflection?: string;
    lovedOneReflection?: string;
    neutralPersonReflection?: string;
    difficultPersonReflection?: string;
    overallReflection?: string;
}

type LovingKindnessPracticeEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_LovingKindnessPracticeEntryDetail'>;

export default function LovingKindnessPracticeEntryDetailScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<LovingKindnessPracticeEntryDetailRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<LovingKindnessPracticeEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiLovingKindnessEntry): LovingKindnessPracticeEntry => {
        const date = new Date(apiEntry.time * 1000);
        const dateString = date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        return {
            id: apiEntry.id,
            date: dateString,
            time: timeString,
            yourselfReflection: apiEntry.yourself,
            lovedOneReflection: apiEntry.lovedOne,
            neutralPersonReflection: apiEntry.neutral,
            difficultPersonReflection: apiEntry.difficult,
            overallReflection: apiEntry.overallReflection,
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
                const apiEntries = await fetchLovingKindnessEntries();
                const foundEntry = apiEntries.find(e => e.id === entryId);
                
                if (!foundEntry) {
                    setError('Entry not found');
                    setIsLoading(false);
                    return;
                }

                const transformedEntry = transformApiEntry(foundEntry);
                setEntry(transformedEntry);
            } catch (err) {
                console.error('Failed to load loving kindness entry:', err);
                setError('Failed to load entry. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadEntry();
    }, [entryId]);

    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        if (timeString) {
            return `${formattedDate}, ${timeString}`;
        }
        return formattedDate;
    };

    const handleDelete = async () => {
        if (!entryId) return;

        try {
            await deleteLovingKindnessEntry(entryId);
            // Navigate back after successful deletion
            dissolveTo('Learn_LovingKindnessPracticeEntries');
        } catch (err) {
            console.error('Failed to delete entry:', err);
            setError('Failed to delete entry. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Loving Kindness Entry" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.Button_Orange} />
                </View>
            </View>
        );
    }

    if (error && !entry) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Loving Kindness Entry" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center px-5">
                    <Text style={[t.textRegular, { color: colors.red_light }]} className="text-center">
                        {error}
                    </Text>
                </View>
            </View>
        );
    }

    if (!entry) {
        return null;
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Loving Kindness Entry" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {error && (
                    <View className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.red_50 }}>
                        <Text style={[t.textRegular, { color: colors.red_light }]}>
                            {error}
                        </Text>
                    </View>
                )}
                {/* Date Badge */}
                <View
                    className="flex-row items-center px-3 py-1.5 rounded-lg mb-4 self-start"
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

                {/* Content Card */}
                <View
                    className="bg-white rounded-2xl p-4 mb-4"
                    style={{
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                    }}
                >
                    {/* Self Reflection */}
                    {entry.yourselfReflection && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Self Reflection
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.yourselfReflection}
                            </Text>
                        </View>
                    )}

                    {/* Loved One Reflection */}
                    {entry.lovedOneReflection && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Loved One Reflection
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.lovedOneReflection}
                            </Text>
                        </View>
                    )}

                    {/* Neutral Person Reflection */}
                    {entry.neutralPersonReflection && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Neutral Person Reflection
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.neutralPersonReflection}
                            </Text>
                        </View>
                    )}

                    {/* Difficult Person Reflection */}
                    {entry.difficultPersonReflection && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Difficult Person Reflection
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.difficultPersonReflection}
                            </Text>
                        </View>
                    )}

                    {/* Overall Reflection */}
                    {entry.overallReflection && (
                        <View className="mb-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                Overall Reflection
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.overallReflection}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Delete Entry Button */}
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
            </ScrollView>
        </View>
    );
}

