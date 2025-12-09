import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { CalendarBlankIcon } from '@components/Utils';
import { ProblemSolvingEntry } from '../components/ProblemSolvingEntryCard';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';

type ProblemSolvingEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_ProblemSolvingEntryDetail'>;

export default function ProblemSolvingEntryDetailScreen() {
    const route = useRoute<ProblemSolvingEntryDetailRouteProp>();
    const { dissolveTo } = useDissolveNavigation();
    const [entry, setEntry] = useState<ProblemSolvingEntry | null>(null);

    useEffect(() => {
        // TODO: Load entry from storage/backend using route.params.entryId
        // For now, using mock data
        const mockEntry: ProblemSolvingEntry = {
            id: route?.params?.entryId || '1',
            date: new Date(2025, 10, 8, 16, 25).toISOString(), // Nov 8, 2025, 04:25 PM
            problem: "I feel overwhelmed because I have three deadlines this week.",
            options: [
                "Lorem ipsum si amet",
                "Lorem ipsum si amet",
                "Lorem ipsum si amet",
                "Lorem ipsum si amet",
            ],
            chosenSolution: "Lorem ipsum si amet",
            implementation: "Lorem ipsum si amet",
            specificSteps: "Lorem ipsum si amet",
            reflection: "Lorem ipsum si amet",
        };
        setEntry(mockEntry);
    }, [route?.params?.entryId]);

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

    if (!entry) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Loading...
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

