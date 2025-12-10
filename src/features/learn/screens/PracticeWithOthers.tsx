import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { PracticeIntroCard } from '../components/PracticeIntroCard';
import { HowToPracticeCard } from '../components/HowToPracticeCard';
import { FormInput } from '../components/FormInput';
import { SavedObservationsList } from '../components/SavedObservationsList';
import { ObservationEntry } from '../components/ObservationCard';

export default function PracticeWithOthersScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const [viewMode, setViewMode] = useState<'form' | 'saved'>('form');
    const [savedEntries, setSavedEntries] = useState<ObservationEntry[]>([]);

    // Form state
    const [person, setPerson] = useState('');
    const [observed, setObserved] = useState('');
    const [emotionGuess, setEmotionGuess] = useState('');
    const [theySaid, setTheySaid] = useState('');
    const [reflectionNotes, setReflectionNotes] = useState('');

    const handleSaveEntry = () => {
        if (!person.trim() || !observed.trim() || !emotionGuess.trim()) {
            // TODO: Show validation error
            return;
        }

        const newEntry: ObservationEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            person: person.trim(),
            observed: observed.trim(),
            guess: emotionGuess.trim(),
            theySaid: theySaid.trim() || undefined,
            notes: reflectionNotes.trim() || undefined,
        };

        setSavedEntries([newEntry, ...savedEntries]);

        // Reset form
        setPerson('');
        setObserved('');
        setEmotionGuess('');
        setTheySaid('');
        setReflectionNotes('');

        // Switch to saved view
        setViewMode('saved');
    };

    const handleDeleteEntry = (id: string) => {
        setSavedEntries(savedEntries.filter(entry => entry.id !== id));
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
                                }}
                                onPress={handleSaveEntry}
                            >
                                <Text style={[t.button, { color: colors.Text_Primary }]}>
                                    Save Entry
                                </Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 rounded-full py-4 items-center justify-center"
                                style={{ backgroundColor: colors.Button_Orange }}
                                onPress={() => setViewMode('saved')}
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
                                    onPress={() => setViewMode('form')}
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

