import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import halfSmilingActionData from '../data/halfSmilingAction.json';

export default function HalfSmilingActionScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, activities, sections, buttons } = halfSmilingActionData;

    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [customActivity, setCustomActivity] = useState<string>('');
    const [inputs, setInputs] = useState<Record<string, string>>(
        sections.reduce((acc, section) => {
            acc[section.id] = '';
            return acc;
        }, {} as Record<string, string>)
    );

    const handleInputChange = (id: string, value: string) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    const handleActivitySelect = (activity: string) => {
        setSelectedActivity(activity);
        setCustomActivity(''); // Clear custom activity when selecting a preset
    };

    const handleSave = () => {
        // TODO: Save inputs to storage/backend
        const activity = selectedActivity || customActivity;
        console.log('Saving Half-Smile in Action:', { activity, inputs });
        dissolveTo('Learn_HalfSmilingEntries', { initialTab: 'inAction' });
    };

    const handleView = () => {
        dissolveTo('Learn_HalfSmilingEntries', { initialTab: 'inAction' });
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
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {/* Intro Card */}
                    <IntroCard text={introText} />

                    {/* Choose Your Activity Section */}
                    <View
                        className="bg-white rounded-2xl p-4 mb-4"
                        style={{
                            borderColor: colors.stoke_gray,
                            borderWidth: 1,
                        }}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                            Choose Your Activity
                        </Text>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                            Select a daily activity to practice Half-Smile with:
                        </Text>

                        {/* Activity Buttons Grid */}
                        <View className="flex-row flex-wrap mb-4" style={{ gap: 8 }}>
                            {activities.map((activity) => {
                                const isSelected = selectedActivity === activity;
                                return (
                                    <Pressable
                                        key={activity}
                                        onPress={() => handleActivitySelect(activity)}
                                        className="rounded-full px-4 py-2"
                                        style={{
                                            backgroundColor: isSelected ? colors.Button_Orange : colors.white,
                                            borderColor: colors.stoke_gray,
                                            borderWidth: 1,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                t.textSemiBold,
                                                {
                                                    color: isSelected ? colors.white : colors.text_secondary,
                                                },
                                            ]}
                                        >
                                            {activity}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        {/* Custom Activity Input */}
                        <View>
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-2">
                                Or enter your own activity:
                            </Text>
                            <TextInput
                                value={customActivity}
                                onChangeText={(value) => {
                                    setCustomActivity(value);
                                    setSelectedActivity(null); // Clear selected activity when typing custom
                                }}
                                placeholder="Type a custom activity...."
                                placeholderTextColor={colors.text_secondary}
                                style={[
                                    t.textRegular,
                                    {
                                        color: colors.Text_Primary,
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        padding: 12,
                                        minHeight: 48,
                                    },
                                ]}
                            />
                        </View>
                    </View>

                    {/* Form Sections */}
                    {sections.map((section) => (
                        <View
                            key={section.id}
                            className="bg-white rounded-2xl p-4 mb-4"
                            style={{
                                borderColor: colors.stoke_gray,
                                borderWidth: 1,
                            }}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                {section.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                {section.description}
                            </Text>
                            <TextInput
                                value={inputs[section.id] || ''}
                                onChangeText={(value) => handleInputChange(section.id, value)}
                                placeholder={section.placeholder}
                                placeholderTextColor={colors.text_secondary}
                                style={[
                                    t.textRegular,
                                    {
                                        color: colors.Text_Primary,
                                        backgroundColor: colors.white,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        padding: 12,
                                        minHeight: 100,
                                        textAlignVertical: 'top',
                                    },
                                ]}
                                multiline
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Bottom Action Buttons */}
                <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                    <View className="flex-row gap-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                            onPress={handleView}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                                {buttons.view}
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 rounded-full py-4 px-3 flex-row items-center justify-center"
                            style={{ backgroundColor: colors.Button_Orange }}
                            onPress={handleSave}
                        >
                            <Text style={[t.textSemiBold, { color: colors.white }]}>
                                {buttons.save}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

