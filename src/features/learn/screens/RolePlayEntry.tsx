import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '@app/navigation/types';
import { PageHeader } from '../components';
import { RolePlayEntry as RolePlayEntryType } from '../components/RolePlayEntryCard';

type RolePlayEntryRouteProp = RouteProp<HomeStackParams, 'Learn_RolePlayEntry'>;

export default function RolePlayEntryScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const route = useRoute<RolePlayEntryRouteProp>();
    const { entryId } = route.params;

    const [entry, setEntry] = useState<RolePlayEntryType | null>(null);

    useEffect(() => {
        // TODO: Load entry from storage/backend using entryId
        // For now, using mock data
        const mockEntry: RolePlayEntryType = {
            id: entryId,
            date: '2025-11-17',
            time: '04:25 PM',
            rolePlayPartner: '',
            scenarioContext: '',
            learningsReflections: '',
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
        dissolveTo('Learn_StopDrillEntries', { initialTab: 'rolePlay' });
    };

    if (!entry) {
        return (
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Role-Play Entry" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Loading...
                    </Text>
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

