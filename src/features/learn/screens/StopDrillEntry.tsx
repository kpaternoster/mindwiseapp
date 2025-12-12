import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { StopDrillEntry as StopDrillEntryType } from '../components/StopDrillEntryCard';

type StopDrillEntryRouteProp = RouteProp<HomeStackParams, 'Learn_StopDrillEntry'>;

export default function StopDrillEntryScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<StopDrillEntryRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<StopDrillEntryType | null>(null);

    useEffect(() => {
        // TODO: Load entry from storage/backend using entryId
        // For now, using mock data
        const mockEntry: StopDrillEntryType = {
            id: entryId,
            date: '2025-11-17',
            time: '04:25 PM',
            type: 'stopDrill',
            stopPlan: '',
            takeStepBackPlan: '',
            observePlan: '',
            proceedMindfullyPlan: '',
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

    const handleDelete = () => {
        // TODO: Show confirmation dialog and delete from storage/backend
        // Then navigate back to entries screen
        console.log('Delete entry:', entryId);
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'stopDrill' });
    };

    if (!entry) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="STOP Drill Entry" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Loading...
                    </Text>
                </View>
            </View>
        );
    }

    const steps = [
        {
            id: 'stop',
            letter: 'S',
            title: 'Stop Plan',
            plan: entry.stopPlan,
            prompt: 'Describe the situation and decision you made',
        },
        {
            id: 'takeStepBack',
            letter: 'T',
            title: 'Take a Step Back Plan',
            plan: entry.takeStepBackPlan,
            prompt: 'Analyze which mind state you were in',
        },
        {
            id: 'observe',
            letter: 'O',
            title: 'Observe Plan',
            plan: entry.observePlan,
            prompt: 'What would Wise Mind have done differently',
        },
        {
            id: 'proceedMindfully',
            letter: 'P',
            title: 'Proceed Mindfully Plan',
            plan: entry.proceedMindfullyPlan,
            prompt: 'What insights or lessons did you gain?',
        },
    ];

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="STOP Drill Entry" showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Date */}
                <View className="flex-row items-center">
                    <Text style={[t.footnoteRegular, { color: colors.orange_600, backgroundColor: colors.orange_50 }]} className="mb-4 rounded-full px-2 py-1 w-fit">
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
                    {/* STOP Steps */}
                    {steps.map((step) => (
                        <View key={step.id} className="mb-6 last:mb-0">
                            {/* Badge and Title */}
                            <View className="flex-row items-center mb-2">
                                <View
                                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                                    style={{ backgroundColor: colors.warm_dark }}
                                >
                                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                                        {step.letter}
                                    </Text>
                                </View>
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                    {step.title}
                                </Text>
                            </View>

                            {/* Prompt */}
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                {step.prompt}
                            </Text>

                            {/* Plan Content */}
                            {step.plan ? (
                                <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                    {step.plan}
                                </Text>
                            ) : (
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    No plan entered.
                                </Text>
                            )}
                        </View>
                    ))}
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

