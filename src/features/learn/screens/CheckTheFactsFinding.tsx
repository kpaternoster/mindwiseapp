import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components/PageHeader';
import { CollapsibleInputWithTags } from '../components/CollapsibleInputWithTags';
import { TrophyIcon } from '@components/Utils';
import checkTheFactsFindingData from '../data/checkTheFactsFinding.json';

export default function CheckTheFactsFindingScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, greatWork } = checkTheFactsFindingData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        describeSituation: true,
        factsVsAssumptions: false,
        alternativeExplanations: false,
        emotionFactsCheck: false,
    });

    const [formData, setFormData] = useState<{ [key: string]: string }>({
        describeSituation: '',
        facts: '',
        assumptions: '',
        alternativeExplanations: '',
        emotionFactsCheck: '',
    });

    const [selectedTags, setSelectedTags] = useState<{ [key: string]: string | null }>({});

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleInputChange = (fieldId: string, text: string) => {
        setFormData((prev) => ({
            ...prev,
            [fieldId]: text,
        }));
    };

    const handleTagPress = (fieldId: string, tagOrEmpty: string) => {
        // If tagOrEmpty is empty string, it means deselect
        // Otherwise, it's the tag to select
        const isDeselect = tagOrEmpty === '';
        const currentTag = selectedTags[fieldId];
        
        setSelectedTags((prev) => {
            if (isDeselect) {
                const newTags = { ...prev };
                delete newTags[fieldId];
                return newTags;
            } else {
                return {
                    ...prev,
                    [fieldId]: tagOrEmpty,
                };
            }
        });
        
        // Update form data with the tag value or empty string
        handleInputChange(fieldId, isDeselect ? '' : tagOrEmpty);
    };

    const handleClearForm = () => {
        setFormData({
            describeSituation: '',
            facts: '',
            assumptions: '',
            alternativeExplanations: '',
            emotionFactsCheck: '',
        });
        setSelectedTags({});
    };

    const handleSaveEntry = () => {
        // TODO: Save entry to storage/backend
        console.log('Saving Fact Finding entry:', formData);
    };

    const handleViewSaved = () => {
        dissolveTo('Learn_CheckTheFactsEntries');
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

                <ScrollView
                    className="flex-1 px-5"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Sections */}
                    {sections.map((section) => {
                        if (section.subsections) {
                            // Section with subsections
                            const subsectionValues: { [key: string]: string } = {};
                            section.subsections.forEach((sub: any) => {
                                subsectionValues[sub.id] = formData[sub.id] || '';
                            });
                            
                            return (
                                <CollapsibleInputWithTags
                                    key={section.id}
                                    id={section.id}
                                    title={section.title}
                                    subsections={section.subsections}
                                    subsectionValues={subsectionValues}
                                    onChangeText={handleInputChange}
                                    isExpanded={expandedSections[section.id]}
                                    onToggle={() => toggleSection(section.id)}
                                    subsectionSelectedTags={selectedTags}
                                    onTagPress={handleTagPress}
                                />
                            );
                        } else {
                            // Regular section
                            return (
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
                                    selectedTag={selectedTags[section.id]}
                                    onTagPress={handleTagPress}
                                />
                            );
                        }
                    })}

                    {/* Great Work Section */}
                    <View
                        className="rounded-2xl p-4 mb-4"
                        style={{
                            backgroundColor: colors.gray_100,
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <View className="flex-row items-center mb-2">
                            <TrophyIcon size={24} color={colors.orange_500} />
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="ml-3">
                                {greatWork.title}
                            </Text>
                        </View>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {greatWork.content}
                        </Text>
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
                            <Text style={[t.button, { color: colors.Button_Orange }]}>
                                Clear Form
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSaveEntry}
                        >
                            <Text style={[t.button, { color: colors.white }]}>
                                Save Entry
                            </Text>
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
                        <Text style={[t.button, { color: colors.Button_Orange }]}>
                            View Saved Entries
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

