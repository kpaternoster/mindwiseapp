import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { CalendarBlankIcon } from '@components/Utils';

// Mock data - TODO: Replace with actual data from storage/backend
const mockEntry = {
    id: '1',
    date: '2025-11-17',
    time: '06:35 PM',
    yourselfReflection: 'lorem ipsum',
    lovedOneReflection: 'lorem ipsum',
    neutralPersonReflection: 'lorem ipsum',
    difficultPersonReflection: 'lorem ipsum',
    overallReflection: 'lorem ipsum',
};

type LovingKindnessPracticeEntryDetailRouteProp = RouteProp<HomeStackParams, 'Learn_LovingKindnessPracticeEntryDetail'>;

export default function LovingKindnessPracticeEntryDetailScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<LovingKindnessPracticeEntryDetailRouteProp>();
    const { entryId } = route.params;

    // TODO: Fetch entry from storage/backend using entryId
    const [entry] = useState(mockEntry);

    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        if (timeString) {
            return `${formattedDate}, ${timeString}`;
        }
        return formattedDate;
    };

    const handleDelete = () => {
        // TODO: Show confirmation dialog
        // TODO: Delete from storage/backend
        console.log('Delete entry:', entryId);
        // Navigate back after deletion
        dissolveTo('Learn_LovingKindnessPracticeEntries');
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Loving Kindness Entry" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
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

