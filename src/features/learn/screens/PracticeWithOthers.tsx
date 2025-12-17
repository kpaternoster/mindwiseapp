import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { PracticeIntroCard } from '../components/PracticeIntroCard';
import { HowToPracticeCard } from '../components/HowToPracticeCard';
import { FormInput } from '../components/FormInput';
import { SavedObservationsList } from '../components/SavedObservationsList';
import { ObservationEntry } from '../components/ObservationCard';
import { fetchPracticeWithOthers, createPracticeWithOthers, deletePracticeWithOthers, PracticeWithOthersEntry as ApiPracticeEntry } from '../api/emotionwheel';

export default function PracticeWithOthersScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [viewMode, setViewMode] = useState<'form' | 'saved'>('form');
    const [savedEntries, setSavedEntries] = useState<ObservationEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [person, setPerson] = useState('');
    const [observed, setObserved] = useState('');
    const [emotionGuess, setEmotionGuess] = useState('');
    const [theySaid, setTheySaid] = useState('');
    const [reflectionNotes, setReflectionNotes] = useState('');

    // Transform API entry to component format
    const transformApiEntry = (apiEntry: ApiPracticeEntry): ObservationEntry => {
        return {
            id: apiEntry.id,
            date: new Date(apiEntry.time * 1000).toISOString(), // Convert timestamp to ISO string
            person: apiEntry.who,
            observed: apiEntry.what,
            guess: apiEntry.guess,
            theySaid: apiEntry.whatDidTheySay || undefined,
            notes: apiEntry.notes || undefined,
        };
    };

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const apiEntries = await fetchPracticeWithOthers();
            
            // Transform and sort by date (newest first)
            const transformedEntries = apiEntries
                .map(transformApiEntry)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            setSavedEntries(transformedEntries);
        } catch (err) {
            console.error('Failed to load practice entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    // Load entries from API
    useEffect(() => {
        loadEntries();
    }, []);

    const handleSaveEntry = async () => {
        // Clear previous errors
        setError(null);
        
        if (!person.trim() || !observed.trim() || !emotionGuess.trim()) {
            setError('Please fill in all required fields (Who, What, and Your guess).');
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            // Map form data to API format
            const entryData = {
                who: person.trim(),
                what: observed.trim(),
                guess: emotionGuess.trim(),
                whatDidTheySay: theySaid.trim() || '',
                notes: reflectionNotes.trim() || '',
            };

            // Save to API
            await createPracticeWithOthers(entryData);

            // Reload entries
            await loadEntries();
            
            // Reset form
            setPerson('');
            setObserved('');
            setEmotionGuess('');
            setTheySaid('');
            setReflectionNotes('');

            // Switch to saved view
            setViewMode('saved');
        } catch (err) {
            console.error('Failed to save entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteEntry = async (id: string) => {
        // Store previous state for potential revert
        const previousEntries = savedEntries;
        
        // Optimistically update UI
        setSavedEntries(savedEntries.filter(entry => entry.id !== id));

        try {
            // Delete from API
            await deletePracticeWithOthers(id);
        } catch (err) {
            console.error('Failed to delete entry:', err);
            // Revert on error
            setSavedEntries(previousEntries);
            setError('Failed to delete entry. Please try again.');
        }
    };

    const practiceSteps = [
        "Observe someone's behavior, expressions, and body language",
        "Guess what emotion they might be feeling",
        "Optionally, ask them to check your accuracy",
    ];

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title="Practice with Others" showHomeIcon={true} showLeafIcon={true} />

                {/* {error && (
                    <View className="mx-5 mt-2 p-3 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            {error}
                        </Text>
                    </View>
                )} */}

                {isLoading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color={colors.button_orange} />
                    </View>
                ) : (
                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                >
                    {viewMode === 'form' ? (
                        <>
                            {/* Practice Observing Others Card */}
                            <PracticeIntroCard
                                title="Practice Observing Others"
                                description="Build empathy by observing and understanding emotions in others"
                            />

                            {/* How to Practice Card */}
                            <HowToPracticeCard steps={practiceSteps} />

                            {/* Who are you observing? */}
                            <FormInput
                                title="Who are you observing?"
                                placeholder="e.g. Sarah, J.D., Mom, coworker..."
                                value={person}
                                onChangeText={setPerson}
                            />

                            {/* What did you observe? */}
                            <FormInput
                                title="What did you observe?"
                                placeholder="Describe their facial expressions, body language, tone of voice, what they said or did..."
                                value={observed}
                                onChangeText={setObserved}
                                multiline
                                instruction="Focus on observable facts, not interpretations"
                            />

                            {/* Your emotion guess */}
                            <FormInput
                                title="Your emotion guess"
                                placeholder="What emotions do you think they were feeling?..."
                                value={emotionGuess}
                                onChangeText={setEmotionGuess}
                                multiline
                            />

                            {/* Optional: Check Your Accuracy */}
                            <View className="mb-6 border border-gray-200 rounded-xl p-4">
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                                    Optional: Check Your Accuracy
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                    If you asked them directly about their feelings
                                </Text>
                                {/* What did they say they were feeling? */}
                                <FormInput
                                    title="What did they say they were feeling?"
                                    placeholder="Their actual emotions (if they shared)..."
                                    value={theySaid}
                                    onChangeText={setTheySaid}
                                    isBorder={false}
                                />

                                {/* Reflection Notes */}
                                <FormInput
                                    title="Reflection Notes"
                                    placeholder="How accurate was your guess? What did you learn? How did asking affect your relationship?..."
                                    value={reflectionNotes}
                                    onChangeText={setReflectionNotes}
                                    multiline
                                    isBorder={false}
                                />
                            </View>


                        </>
                    ) : (
                        <SavedObservationsList
                            entries={savedEntries}
                            onDelete={handleDeleteEntry}
                        />
                    )}
                </ScrollView>
                )}

                {/* Footer Buttons */}
                <View className="px-5 pb-6 pt-4" style={{ backgroundColor: colors.white }}>
                    {viewMode === 'form' ? (
                        <View className="flex-row gap-3">
                            <Pressable
                                className="flex-1 rounded-full py-4 items-center justify-center"
                                style={{
                                    borderWidth: 2,
                                    borderColor: colors.button_orange,
                                    backgroundColor: colors.white,
                                    opacity: isSaving ? 0.6 : 1,
                                }}
                                onPress={handleSaveEntry}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <ActivityIndicator size="small" color={colors.button_orange} />
                                ) : (
                                    <Text style={[t.button, { color: colors.Text_Primary }]}>
                                        Save Entry
                                    </Text>
                                )}
                            </Pressable>
                            <Pressable
                                className="flex-1 rounded-full py-4 items-center justify-center"
                                style={{ 
                                    backgroundColor: isSaving ? colors.text_secondary : colors.Button_Orange,
                                    opacity: isSaving ? 0.6 : 1,
                                }}
                                onPress={() => setViewMode('saved')}
                                disabled={isSaving}
                            >
                                <Text style={[t.button, { color: colors.white }]}>
                                    View Saved
                                </Text>
                            </Pressable>
                        </View>
                    ) : (
                        savedEntries.length == 0 ? (
                            <View className="flex-row gap-3 justify-between">
                                <Pressable
                                    className="flex-1 rounded-full py-4 items-center justify-center"
                                    style={{
                                        borderWidth: 2,
                                        borderColor: colors.button_orange,
                                        backgroundColor: colors.white,
                                    }}
                                    onPress={() => {
                                        setError(null);
                                        setViewMode('form');
                                    }}
                                >
                                    <Text style={[t.button, { color: colors.Text_Primary }]}>
                                        New Entry
                                    </Text>
                                </Pressable>
                                <Pressable
                                    className="rounded-full flex-1 py-4 items-center justify-center"
                                    style={{ backgroundColor: colors.Button_Orange }}
                                    onPress={() => setViewMode('form')}
                                >
                                    <Text style={[t.button, { color: colors.white }]}>
                                        Save Entry
                                    </Text>
                                </Pressable>
                            </View>

                        ) : (
                            <Pressable
                                className="rounded-full py-4 items-center justify-center"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={() => setViewMode('form')}
                            >
                                <Text style={[t.button, { color: colors.white }]}>
                                    New Entry
                                </Text>
                            </Pressable>
                        ))
                    }
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

