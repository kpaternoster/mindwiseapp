import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '../components';
import { ArrowRightIcon, DownIcon, UpIcon } from '@components/Utils';
import reframeNegativeSelfTalkData from '../data/reframeNegativeSelfTalk.json';

interface NegativeThought {
    id: number;
    thought: string;
}

export default function ReframeNegativeSelfTalkScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, sections, buttons } = reframeNegativeSelfTalkData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        catchNegativeThoughts: true,
        evidenceFor: true,
        evidenceAgainst: true,
        friendsPerspective: true,
        balancedThought: true,
    });

    const [negativeThoughts, setNegativeThoughts] = useState<NegativeThought[]>([
        { id: 1, thought: '' },
    ]);

    const [evidenceFor, setEvidenceFor] = useState('');
    const [evidenceAgainst, setEvidenceAgainst] = useState('');
    const [friendsPerspective, setFriendsPerspective] = useState('');
    const [balancedThought, setBalancedThought] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleThoughtChange = (id: number, text: string) => {
        setNegativeThoughts(thoughts =>
            thoughts.map(t => t.id === id ? { ...t, thought: text } : t)
        );
    };

    const handleAddThought = () => {
        const newId = negativeThoughts.length > 0 ? Math.max(...negativeThoughts.map(t => t.id)) + 1 : 1;
        setNegativeThoughts([...negativeThoughts, { id: newId, thought: '' }]);
    };

    const handleSave = () => {
        // TODO: Save to storage/backend
        const data = {
            negativeThoughts,
            evidenceFor,
            evidenceAgainst,
            friendsPerspective,
            balancedThought,
        };
        console.log('Saving Reframe Negative Self-Talk:', data);
        dissolveTo('Learn_ReframeNegativeSelfTalkEntries');
    };

    const handleView = () => {
        dissolveTo('Learn_ReframeNegativeSelfTalkEntries');
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
                    contentContainerStyle={{ paddingBottom: 24 }}
                >
                    {sections.map((section) => {
                        if (section.id === 'catchNegativeThoughts') {
                            return (
                                <View key={section.id} className="mb-4">
                                    <Pressable
                                        className={`flex-row items-center justify-between px-4 py-4 ${expandedSections[section.id] ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                        style={{
                                            backgroundColor: colors.orange_50,
                                        }}
                                        onPress={() => toggleSection(section.id)}
                                    >
                                        <View className="flex-1">
                                            <View className="flex-row items-center justify-between mb-1">
                                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                                    {section.title}
                                                </Text>
                                                <View className="ml-3">
                                                    {expandedSections[section.id] ? (
                                                        <UpIcon size={12} color={colors.Text_Primary} />
                                                    ) : (
                                                        <DownIcon size={12} color={colors.Text_Primary} />
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </Pressable>

                                    {expandedSections[section.id] && (
                                        <View
                                            className="rounded-b-2xl px-4 py-4"
                                            style={{
                                                backgroundColor: colors.white,
                                                borderColor: colors.stoke_gray,
                                                borderWidth: 1,
                                                borderTopWidth: 0,
                                            }}
                                        >
                                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                                {section.instruction}
                                            </Text>
                                            {negativeThoughts.map((thought, index) => (
                                                <View key={thought.id} className="mb-4 border border-gray-200 rounded-2xl p-4">
                                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                        Negative Thought {index + 1}
                                                    </Text>
                                                    <TextInput
                                                        value={thought.thought}
                                                        onChangeText={(text) => handleThoughtChange(thought.id, text)}
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
                                            <Pressable
                                                className="rounded-full py-3 px-4 flex-row items-center justify-start"
                                                onPress={handleAddThought}
                                            >
                                                <Text style={[t.textSemiBold, { color: colors.warm_dark, fontSize: 18 }]} className="mr-2">
                                                    +
                                                </Text>
                                                <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                                    {section.addButtonText}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </View>
                            );
                        }

                        // Other sections (Evidence For, Evidence Against, Friend's Perspective, Balanced Thought)
                        return (
                            <View key={section.id} className="mb-4">
                                <Pressable
                                    className={`flex-row items-center justify-between px-4 py-4 ${expandedSections[section.id] ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                                    style={{
                                        backgroundColor: colors.orange_50
                                    }}
                                    onPress={() => toggleSection(section.id)}
                                >
                                    <View className="flex-1">
                                        <View className="flex-row items-center justify-between mb-1">
                                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                                {section.title}
                                            </Text>
                                            <View className="ml-3">
                                                {expandedSections[section.id] ? (
                                                    <UpIcon size={12} color={colors.Text_Primary} />
                                                ) : (
                                                    <DownIcon size={12} color={colors.Text_Primary} />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>

                                {expandedSections[section.id] && (
                                    <View
                                        className="rounded-b-2xl px-4 py-4"
                                        style={{
                                            backgroundColor: colors.white,
                                            borderColor: colors.stoke_gray,
                                            borderWidth: 1,
                                            borderTopWidth: 0,
                                        }}
                                    >
                                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                                            {section.instruction}
                                        </Text>
                                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                            {section.subheading}
                                        </Text>
                                        <TextInput
                                            value={
                                                section.id === 'evidenceFor' ? evidenceFor :
                                                section.id === 'evidenceAgainst' ? evidenceAgainst :
                                                section.id === 'friendsPerspective' ? friendsPerspective :
                                                balancedThought
                                            }
                                            onChangeText={(text) => {
                                                if (section.id === 'evidenceFor') setEvidenceFor(text);
                                                else if (section.id === 'evidenceAgainst') setEvidenceAgainst(text);
                                                else if (section.id === 'friendsPerspective') setFriendsPerspective(text);
                                                else setBalancedThought(text);
                                            }}
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
                                )}
                            </View>
                        );
                    })}
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
                            <Text style={[t.textSemiBold, { color: colors.white }]} className="mr-2 flex-1 text-center">
                                {buttons.save}
                            </Text>
                            
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

