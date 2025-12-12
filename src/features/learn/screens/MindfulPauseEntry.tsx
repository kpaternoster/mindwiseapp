import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { MindfulPauseEntry as MindfulPauseEntryType } from '../components/MindfulPauseEntryCard';

type MindfulPauseEntryRouteProp = RouteProp<HomeStackParams, 'Learn_MindfulPauseEntry'>;

export default function MindfulPauseEntryScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<MindfulPauseEntryRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<MindfulPauseEntryType | null>(null);

    useEffect(() => {
        // TODO: Load entry from storage/backend using entryId
        // For now, using mock data
        const mockEntry: MindfulPauseEntryType = {
            id: entryId,
            date: '2025-11-17',
            time: '04:25 PM',
            timerStatus: 'paused',
            reflection: 'Describe your experience... What sensations did you notice? How did your mind respond to the stillness? What thoughts arose',
        };
        setEntry(mockEntry);
    }, [entryId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getTimerStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Timer completed successfully';
            case 'paused':
                return 'Timer was paused before completion';
            case 'notStarted':
                return 'Timer was not started';
            default:
                return 'Timer status unknown';
        }
    };

    const handleDelete = () => {
        // TODO: Show confirmation dialog and delete from storage/backend
        // Then navigate back to entries screen
        console.log('Delete entry:', entryId);
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'mindfulPause' });
    };

    if (!entry) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Mindful Pause Entry" showHomeIcon={true} showLeafIcon={true} />
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
            <PageHeader title="Mindful Pause Entry" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Date */}
                <View className="flex-row items-center mb-4">
                    <Text style={[t.footnoteRegular, { color: colors.orange_600, backgroundColor: colors.orange_50 }]} className="rounded-full px-2 py-1 w-fit">
                        {formatDate(entry.date)}
                    </Text>
                </View>

                {/* Main Card */}
                <View
                    className="bg-white rounded-2xl p-4 mb-4"
                    style={{
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                    }}
                >
                    {/* Timer Status Section */}
                    <View className="mb-6">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Timer Status
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {getTimerStatusText(entry.timerStatus)}
                        </Text>
                    </View>

                    {/* Reflection Section */}
                    <View>
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Reflection
                        </Text>
                        {entry.reflection ? (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {entry.reflection}
                            </Text>
                        ) : (
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                No reflection entered.
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Delete Button */}
            <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                <Pressable
                    className="rounded-full py-4 px-3 flex-row items-center justify-center"
                    style={{
                        backgroundColor: colors.red_light_10,
                        borderColor: colors.red_light,
                        borderWidth: 1,
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

