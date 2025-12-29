import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { CalendarBlankIcon } from '@components/Utils';
import { ProblemSolvingEntry } from '../components/ProblemSolvingEntryCard';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { 
    fetchProblemSolvingEntries, 
    ProblemSolvingEntry as ApiProblemSolvingEntry 
} from '../api/problemsolving';

type ProblemSolvingEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_ProblemSolvingEntryDetail'>;

export default function ProblemSolvingEntryDetailScreen() {
    const route = useRoute<ProblemSolvingEntryDetailRouteProp>();
    const { dissolveTo } = useDissolveNavigation();
    const [entry, setEntry] = useState<ProblemSolvingEntry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const entryId = route?.params?.entryId;

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiProblemSolvingEntry): ProblemSolvingEntry => {
        return {
            id: apiEntry.id,
            date: new Date(apiEntry.time * 1000).toISOString(), // Convert timestamp to ISO string
            problem: apiEntry.problem,
            options: apiEntry.options,
            chosenSolution: apiEntry.choice || undefined,
            implementation: apiEntry.implementation || undefined,
            specificSteps: undefined, // Not in API response
            reflection: apiEntry.reflection || undefined,
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
                const apiEntries = await fetchProblemSolvingEntries();
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
                console.error('Failed to load problem solving entry:', err);
                setError('Failed to load entry. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadEntry();
    }, [entryId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${month} ${day}, ${year}, ${displayHours}:${displayMinutes} ${ampm}`;
    };

    if (isLoading) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            </View>
        );
    }

    if (error || !entry) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center px-5">
                    <Text style={[t.textRegular, { color: colors.red_light, textAlign: 'center' }]}>
                        {error || 'Entry not found'}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Title */}
                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                    Problem Solving Entry
                </Text>

                {/* Date */}
                <View className="flex-row items-center mb-6">
                    <CalendarBlankIcon size={16} color={colors.text_secondary} />
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]} className="ml-2">
                        {formatDate(entry.date)}
                    </Text>
                </View>

                {/* Problem Section */}
                <View
                    className="rounded-2xl p-4 mb-4 bg-white"
                    style={{
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                    }}
                >
                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                        Problem
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {entry.problem || 'No problem stated'}
                    </Text>
                </View>

                {/* Options Section */}
                {entry.options && entry.options.length > 0 && (
                    <View
                        className="rounded-2xl p-4 mb-4 bg-white"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                            Options
                        </Text>
                        {entry.options.map((option, index) => (
                            <View key={index} className="mb-2 flex-row">
                                <Text style={[t.textRegular, { color: colors.Button_Orange }]} className="mr-2">
                                    {index + 1}.
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary, flex: 1 }]}>
                                    {option || 'Lorem ipsum si amet'}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Best Solution Section */}
                {entry.chosenSolution && (
                    <View
                        className="rounded-2xl p-4 mb-4 bg-white"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Best Solution
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {entry.chosenSolution}
                        </Text>
                    </View>
                )}

                {/* Execution Plan Section */}
                {(entry.implementation || entry.specificSteps) && (
                    <View
                        className="rounded-2xl p-4 mb-4 bg-white"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Execution Plan
                        </Text>
                        {entry.implementation && (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                {entry.implementation}
                            </Text>
                        )}
                        {entry.specificSteps && (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.specificSteps}
                            </Text>
                        )}
                    </View>
                )}

                {/* Evaluation Section */}
                {entry.reflection && (
                    <View
                        className="rounded-2xl p-4 mb-4 bg-white"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Evaluation
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {entry.reflection}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

