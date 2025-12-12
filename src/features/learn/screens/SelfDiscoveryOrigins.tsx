import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import { ArrowRightIcon, DownIcon, UpIcon } from '@components/Utils';
import selfDiscoveryOriginsData from '../data/selfDiscoveryOrigins.json';

interface UnhelpfulStory {
    id: number;
    story: string;
}

interface OriginStoryPair {
    id: number;
    story: string;
    origin: string;
}

export default function SelfDiscoveryOriginsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, intro, sections, buttons } = selfDiscoveryOriginsData;

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        origins: true,
        compassion: true,
    });

    const [unhelpfulStories, setUnhelpfulStories] = useState<UnhelpfulStory[]>([
        { id: 1, story: '' },
        { id: 2, story: '' },
        { id: 3, story: '' },
    ]);

    const [originStoryPairs, setOriginStoryPairs] = useState<OriginStoryPair[]>([
        { id: 1, story: '', origin: '' },
    ]);

    const [compassion, setCompassion] = useState('');

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const handleStoryChange = (id: number, text: string) => {
        setUnhelpfulStories(stories =>
            stories.map(s => s.id === id ? { ...s, story: text } : s)
        );
    };

    const handleAddStory = () => {
        const newId = unhelpfulStories.length > 0 ? Math.max(...unhelpfulStories.map(s => s.id)) + 1 : 1;
        setUnhelpfulStories([...unhelpfulStories, { id: newId, story: '' }]);
    };

    const handleOriginStoryChange = (id: number, field: 'story' | 'origin', text: string) => {
        setOriginStoryPairs(pairs =>
            pairs.map(p => p.id === id ? { ...p, [field]: text } : p)
        );
    };

    const handleAddOriginStoryPair = () => {
        const newId = originStoryPairs.length > 0 ? Math.max(...originStoryPairs.map(p => p.id)) + 1 : 1;
        setOriginStoryPairs([...originStoryPairs, { id: newId, story: '', origin: '' }]);
    };

    const handleSave = () => {
        // TODO: Save to storage/backend
        const data = {
            unhelpfulStories,
            originStoryPairs,
            compassion,
        };
        console.log('Saving Origins:', data);
        dissolveTo('Learn_SelfDiscoveryOriginEntries');
    };

    const handleView = () => {
        dissolveTo('Learn_SelfDiscoveryOriginEntries');
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
                    {/* Intro Card */}
                    <IntroCard text={intro.description} />

                    {/* Origins Section */}
                    {sections.map((section) => {
                        if (section.id === 'origins') {
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
                                            {section.subsections?.map((subsection: any) => {
                                                if (subsection.id === 'unhelpfulStories') {
                                                    return (
                                                        <View key={subsection.id} className="mb-6 border border-gray-200 rounded-2xl p-4">
                                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                                {subsection.title}
                                                            </Text>
                                                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                                                {subsection.prompt}
                                                            </Text>
                                                            {unhelpfulStories.map((story, index) => (
                                                                <TextInput
                                                                    key={story.id}
                                                                    value={story.story}
                                                                    onChangeText={(text) => handleStoryChange(story.id, text)}
                                                                    placeholder={`Unhelpful story ${index + 1}...`}
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
                                                                            marginBottom: 12,
                                                                            textAlignVertical: 'top',
                                                                        },
                                                                    ]}
                                                                    multiline
                                                                />
                                                            ))}
                                                            <Pressable
                                                                className="rounded-full py-3 px-4 flex-row items-center justify-center"
                                                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                                                onPress={handleAddStory}
                                                            >
                                                                <Text style={[t.textSemiBold, { color: colors.Text_Primary, fontSize: 18 }]} className="mr-2">
                                                                    +
                                                                </Text>
                                                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                                                    Add Story
                                                                </Text>
                                                            </Pressable>
                                                        </View>
                                                    );
                                                }

                                                if (subsection.id === 'storyOrigins') {
                                                    return (
                                                        <View key={subsection.id} className="mb-4 border border-gray-200 rounded-2xl p-4">
                                                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                                {subsection.title}
                                                            </Text>
                                                            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                                                {subsection.prompt}
                                                            </Text>
                                                            {originStoryPairs.map((pair) => (
                                                                <View key={pair.id} className="mb-6">
                                                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                                        Story
                                                                    </Text>
                                                                    <TextInput
                                                                        value={pair.story}
                                                                        onChangeText={(text) => handleOriginStoryChange(pair.id, 'story', text)}
                                                                        placeholder={subsection.storyPlaceholder}
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
                                                                                marginBottom: 12,
                                                                                textAlignVertical: 'top',
                                                                            },
                                                                        ]}
                                                                        multiline
                                                                    />
                                                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-2">
                                                                        Origin:
                                                                    </Text>
                                                                    <TextInput
                                                                        value={pair.origin}
                                                                        onChangeText={(text) => handleOriginStoryChange(pair.id, 'origin', text)}
                                                                        placeholder={subsection.originPlaceholder}
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
                                                                className="rounded-full py-3 px-4 flex-row items-center justify-center"
                                                                style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                                                                onPress={handleAddOriginStoryPair}
                                                            >
                                                                <Text style={[t.textSemiBold, { color: colors.Text_Primary, fontSize: 18 }]} className="mr-2">
                                                                    +
                                                                </Text>
                                                                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                                                                    Add Origin Story Pair
                                                                </Text>
                                                            </Pressable>
                                                        </View>
                                                    );
                                                }

                                                return null;
                                            })}
                                        </View>
                                    )}
                                </View>
                            );
                        }

                        if (section.id === 'compassion') {
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
                                                {section.description}
                                            </Text>
                                            <TextInput
                                                value={compassion}
                                                onChangeText={setCompassion}
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
                        }

                        return null;
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

