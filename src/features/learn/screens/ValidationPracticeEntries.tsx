import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StatusBar, Text, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, ValidationPracticeEntryCard, ValidationPracticeEntry } from '../components';
import { 
    fetchValidationPracticeEntries, 
    deleteValidationPracticeEntry, 
    ValidationPracticeEntry as ApiValidationPracticeEntry 
} from '../api/validatingOthers';

export default function ValidationPracticeEntriesScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [entries, setEntries] = useState<ValidationPracticeEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Determine entry type based on content
    const determineEntryType = (apiEntry: ApiValidationPracticeEntry): ValidationPracticeEntry['type'] => {
        // If it has practiceScenario or validationApproach, it's likely selfReflection
        if (apiEntry.practiceScenario?.trim() || apiEntry.validationApproach?.trim()) {
            return 'selfReflection';
        }
        // If it has emotionalSituation or dismissive phrases, it's likely strengthenValidation
        if (apiEntry.emotionalSituation?.trim() || apiEntry.dismissivePhrase1?.trim()) {
            return 'strengthenValidation';
        }
        // Otherwise, it's activeListening
        return 'activeListening';
    };

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiValidationPracticeEntry): ValidationPracticeEntry => {
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
            type: determineEntryType(apiEntry),
            // Step 1 fields
            describeConversation: apiEntry.recentConversation,
            specificChallenges: apiEntry.challenges,
            engagementTechniques: apiEntry.engagementTechniques,
            // Step 2 fields
            practiceTopic: apiEntry.topic,
            asSpeaker: apiEntry.speakerFeelings,
            asListener: apiEntry.listenerFeelings,
            // Step 3 fields
            keyLearnings: apiEntry.learnings,
            areasToImprove: apiEntry.areas,
            practiceThisWeek: apiEntry.practice,
            // Step 4 fields
            emotionalSituation: apiEntry.emotionalSituation,
            emotionsIdentified: apiEntry.emotions,
            validatingResponse: apiEntry.validatingResponse,
            supportOrAdvice: apiEntry.advice,
            // Step 5 fields
            dismissivePhrase1: apiEntry.dismissivePhrase1,
            reframe1: apiEntry.validatingResponse1,
            dismissivePhrase2: apiEntry.dismissivePhrase2,
            reframe2: apiEntry.validatingResponse2,
            dismissivePhrase3: apiEntry.dismissivePhrase3,
            reframe3: apiEntry.validatingResponse3,
            // Step 6 fields
            practiceScenario: apiEntry.practiceScenario,
            validationApproach: apiEntry.validationApproach,
            impactOnRelationships: apiEntry.reflection,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchValidationPracticeEntries();
            
            // Transform API entries to component format and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load validation practice entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    // Group entries by type
    const groupedEntries = useMemo(() => {
        const groups: {
            activeListening: ValidationPracticeEntry[];
            strengthenValidation: ValidationPracticeEntry[];
            selfReflection: ValidationPracticeEntry[];
        } = {
            activeListening: [],
            strengthenValidation: [],
            selfReflection: [],
        };

        entries.forEach((entry) => {
            groups[entry.type].push(entry);
        });

        return groups;
    }, [entries]);

    const handleView = (entryId: string) => {
        // TODO: Navigate to Validation Practice Entry Detail screen when created
        console.log('View entry:', entryId);
    };

    const handleDelete = async (id: string) => {
        try {
            // Optimistically update UI
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
            
            // Delete from API
            await deleteValidationPracticeEntry(id);
        } catch (err) {
            console.error('Failed to delete entry:', err);
            // Reload entries on error to restore the deleted entry
            try {
                await loadEntries();
            } catch (reloadErr) {
                console.error('Failed to reload entries:', reloadErr);
            }
            setError('Failed to delete entry. Please try again.');
        }
    };

    const renderSection = (
        title: string,
        sectionEntries: ValidationPracticeEntry[]
    ) => {
        if (sectionEntries.length === 0) return null;

        return (
            <View key={title} className="mb-6">
                {/* Section Header */}
                <Text
                    style={[t.title20SemiBold, { color: colors.warm_dark }]}
                    className="mb-3"
                >
                    {title}
                </Text>

                {/* Section Entries */}
                {sectionEntries.map((entry) => (
                    <ValidationPracticeEntryCard
                        key={entry.id}
                        entry={entry}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                ))}
            </View>
        );
    };

    const hasEntries = entries.length > 0;

    if (isLoading) {
        return (
            <View className="flex-1 pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.Button_Orange} />
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Saved Entries" showHomeIcon={true} showLeafIcon={true} />

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

                {!hasEntries ? (
                    <View className="items-center justify-center py-12">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No entries yet. Start your first practice!
                        </Text>
                    </View>
                ) : (
                    <>
                        {renderSection('Active Listening Practice', groupedEntries.activeListening)}
                        {renderSection('Strengthen Your Validation', groupedEntries.strengthenValidation)}
                        {renderSection('Self Reflection', groupedEntries.selfReflection)}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

