import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { CollapsibleInputWithTags } from '../components/CollapsibleInputWithTags';
import { WaveTimer } from '../components/WaveTimer';
import { UpIcon, DownIcon } from '@components/Utils';
import stunwaveCheckInData from '../data/stunwaveCheckIn.json';
import { createStunwave } from '../api/stunwave';

export default function STUNWAVECheckInScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, surfTheWave, reflection } = stunwaveCheckInData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        sensations: true,
        thoughts: true,
        urges: false,
        emotions: false,
        surfTheWave: false,
        reflection: false,
    });

    const [formData, setFormData] = useState<{ [key: string]: string }>({
        sensations: '',
        thoughts: '',
        urges: '',
        emotions: '',
        waveReflection: '',
        reflection: '',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleInputChange = (sectionId: string, text: string) => {
        setFormData((prev) => ({
            ...prev,
            [sectionId]: text,
        }));
        // Clear error message when user starts typing
        if (error) {
            setError(null);
        }
    };

    const handleClearForm = () => {
        setFormData({
            sensations: '',
            thoughts: '',
            urges: '',
            emotions: '',
            waveReflection: '',
            reflection: '',
        });
        // Clear messages when clearing form
        setError(null);
        setSuccessMessage(null);
    };

    const handleSaveEntry = async () => {
        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Validate required fields (at least one field should be filled)
        const hasData = Object.values(formData).some(value => value.trim().length > 0);
        if (!hasData) {
            setError('Please fill in at least one field before saving.');
            return;
        }

        setIsSaving(true);

        try {
            // Map form data to API format
            const entryData = {
                bodySensations: formData.sensations || '',
                thoughts: formData.thoughts || '',
                urges: formData.urges || '',
                emotions: formData.emotions || '',
                surfTheWave: formData.waveReflection || '',
                reflection: formData.reflection || '',
            };

            await createStunwave(entryData);
            
            // Success - clear form and show message
            setSuccessMessage('Entry saved successfully!');
            handleClearForm();
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to save STUNWAVE entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_STUNWAVEEntries');
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
                <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

                {/* Success/Error Messages */}
                {/* {successMessage && (
                    <View className="mx-5 mt-2 p-3 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            {successMessage}
                        </Text>
                    </View>
                )} */}
                {/* {error && (
                    <View className="mx-5 mt-2 p-3 rounded-xl" style={{ backgroundColor: colors.orange_50 }}>
                        <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                            {error}
                        </Text>
                    </View>
                )} */}

                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                >
                    {/* STUNWAVE Sections */}
                    {sections.map((section) => (
                        <CollapsibleInputWithTags
                            key={section.id}
                            id={section.id}
                            title={section.title}
                            prompt={section.prompt}
                            placeholder={section.placeholder}
                            tags={section.tags}
                            value={formData[section.id]}
                            onChangeText={handleInputChange}
                            isExpanded={expandedSections[section.id]}
                            onToggle={() => toggleSection(section.id)}
                        />
                    ))}

                    {/* Surf the Wave Section */}
                    <View className="mb-4">
                        <Pressable
                            className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.surfTheWave ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                            style={{
                                backgroundColor: colors.orange_50,
                            }}
                            onPress={() => toggleSection('surfTheWave')}
                        >
                            <View className="flex-1">
                                <View className="flex-row items-center justify-between mb-1">
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                        {surfTheWave.title}
                                    </Text>
                                    <View className="ml-3">
                                        {expandedSections.surfTheWave ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {surfTheWave.reminder}
                                </Text>
                            </View>
                        </Pressable>

                        {expandedSections.surfTheWave && (
                            <View
                                className="rounded-b-2xl px-4 pb-4 pt-4"
                                style={{
                                    backgroundColor: colors.white,
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                    borderTopWidth: 0,
                                }}
                            >
                                <View
                                    className='rounded-2xl px-4 py-4'
                                     style={{
                                        backgroundColor: colors.orange_50,
                                    }}
                                > 
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                        Wave Surfing Steps:
                                    </Text>
                                    {surfTheWave.steps.map((step) => (
                                        <View key={step.number} className="flex-row items-start mb-2">
                                            <Text style={[t.textRegular, { color: colors.Text_Primary, marginRight: 8 }]}>
                                                {step.number}.
                                            </Text>
                                            <Text style={[t.textRegular, { color: colors.Text_Primary, flex: 1 }]}>
                                                {step.text}
                                            </Text>
                                        </View>
                                    ))}
                                </View>


                                {/* Timer */}
                                <WaveTimer
                                    duration={surfTheWave.timerDuration}
                                    onComplete={() => {
                                        console.log('Wave timer completed');
                                    }}
                                />

                              
                                <TextInput
                                    className="rounded-xl p-4 mb-3"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.stoke_gray,
                                        backgroundColor: colors.white,
                                        minHeight: 90,
                                    }}
                                    placeholder={surfTheWave.reflectionPlaceholder}
                                    placeholderTextColor={colors.text_secondary}
                                    value={formData.waveReflection}
                                    onChangeText={(text) => handleInputChange('waveReflection', text)}
                                    multiline
                                    textAlignVertical="top"
                                />
                            </View>
                        )}
                    </View>

                    {/* Reflection & Save Section */}
                    <View className="mb-4">
                        <Pressable
                            className={`flex-row items-center justify-between px-4 py-4 ${expandedSections.reflection ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                            style={{
                                backgroundColor: colors.orange_50,
                            }}
                            onPress={() => toggleSection('reflection')}
                        >
                            <View className="flex-1">
                                <View className="flex-row items-center justify-between mb-1">
                                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                        {reflection.title}
                                    </Text>
                                    <View className="ml-3">
                                        {expandedSections.reflection ? (
                                            <UpIcon size={12} color={colors.Text_Primary} />
                                        ) : (
                                            <DownIcon size={12} color={colors.Text_Primary} />
                                        )}
                                    </View>
                                </View>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    {reflection.prompt}
                                </Text>
                            </View>
                        </Pressable>

                        {expandedSections.reflection && (
                            <View
                                className="rounded-b-2xl px-4 pb-4 pt-4"
                                style={{
                                    backgroundColor: colors.white,
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                    borderTopWidth: 0,
                                }}
                            >
                                <TextInput
                                    className="rounded-xl p-4 mb-3"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: colors.stoke_gray,
                                        backgroundColor: colors.white,
                                        minHeight: 90,
                                    }}
                                    placeholder={reflection.placeholder}
                                    placeholderTextColor={colors.text_secondary}
                                    value={formData.reflection}
                                    onChangeText={(text) => handleInputChange('reflection', text)}
                                    multiline
                                    textAlignVertical="top"
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Footer Buttons */}
                <View className="px-5 pb-6 pt-4" style={{ backgroundColor: colors.white }}>
                    <View className="flex-row gap-3 mb-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{
                                borderWidth: 2,
                                borderColor: colors.Button_Orange,
                                backgroundColor: colors.white,
                            }}
                            onPress={handleClearForm}
                        >
                            <Text style={[t.button, { color: colors.Text_Primary }]}>
                                Clear Form
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{ 
                                backgroundColor: isSaving ? colors.text_secondary : colors.Button_Orange,
                                opacity: isSaving ? 0.6 : 1,
                            }}
                            onPress={handleSaveEntry}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <ActivityIndicator size="small" color={colors.white} />
                            ) : (
                                <Text style={[t.button, { color: colors.white }]}>
                                    Save Entry
                                </Text>
                            )}
                        </Pressable>
                    </View>
                    <Pressable
                        className="rounded-full py-4 items-center justify-center"
                        style={{
                            borderWidth: 2,
                            borderColor: colors.Button_Orange,
                            backgroundColor: colors.white,
                        }}
                        onPress={handleViewSaved}
                    >
                        <Text style={[t.button, { color: colors.Text_Primary }]}>
                            View Saved Entries
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

