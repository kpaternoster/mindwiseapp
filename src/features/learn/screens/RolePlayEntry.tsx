import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { RolePlayEntry as RolePlayEntryType } from '../components/RolePlayEntryCard';
import { fetchRolePlayEntries, deleteRolePlayEntry } from '../api/stop';

type RolePlayEntryRouteProp = RouteProp<HomeStackParams, 'Learn_RolePlayEntry'>;

export default function RolePlayEntryScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<RolePlayEntryRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<RolePlayEntryType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadEntry = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const apiEntries = await fetchRolePlayEntries();
            const apiEntry = apiEntries.find(e => e.id === entryId);

            if (!apiEntry) {
                setError('Entry not found.');
                return;
            }

            const date = new Date(apiEntry.time * 1000);
            const dateStr = date.toISOString().split('T')[0];
            const timeStr = date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });

            setEntry({
                id: apiEntry.id,
                date: dateStr,
                time: timeStr,
                rolePlayPartner: apiEntry.who,
                scenarioContext: apiEntry.scenario,
                learningsReflections: apiEntry.reflection,
            });
        } catch (err) {
            console.error('Failed to load role-play entry:', err);
            setError('Failed to load entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntry();
    }, [entryId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleDelete = async () => {
        try {
            await deleteRolePlayEntry(entryId);
            dissolveTo('Learn_StopDrillEntries', { initialTab: 'rolePlay' });
        } catch (err) {
            console.error('Failed to delete entry:', err);
            setError('Failed to delete entry. Please try again.');
        }
    };

    if (isLoading || !entry) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Role-Play Entry" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    {error ? (
                        <>
                            <Text style={[t.textRegular, { color: colors.red_light }]} className="mb-4">
                                {error}
                            </Text>
                            <Pressable
                                className="rounded-full py-3 px-6"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={loadEntry}
                            >
                                <Text style={[t.textSemiBold, { color: colors.white }]}>
                                    Retry
                                </Text>
                            </Pressable>
                        </>
                    ) : (
                        <ActivityIndicator size="large" color={colors.Button_Orange} />
                    )}
                </View>
            </View>
        );
    }

    const sections = [
        {
            id: 'rolePlayPartner',
            title: 'Role-Play Partner',
            prompt: 'Who are you role-playing with?',
            content: entry.rolePlayPartner,
        },
        {
            id: 'scenarioContext',
            title: 'Scenario Context',
            prompt: 'What scenario are you practicing?',
            content: entry.scenarioContext,
        },
        {
            id: 'learningsReflections',
            title: 'Learnings',
            prompt: 'What did you learn from this role-play?',
            content: entry.learningsReflections,
        },
    ];

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Role-Play Entry" showHomeIcon={true} showLeafIcon={true} />

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
                    {sections.map((section, index) => (
                        <View key={section.id} className={index < sections.length - 1 ? 'mb-6' : ''}>
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {section.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                {section.prompt}
                            </Text>
                            {section.content ? (
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {section.content}
                                </Text>
                            ) : (
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    No content entered.
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

