import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    Image,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, ChatTeardropIcon, UpIcon, DownIcon, GreenLeafIcon, ChartsCircleIcon, RecordIcon } from '@components/Utils';
import { PageHeader } from '../../components';
import { images } from '@design/image';
import buildingCommitmentData from '../../data/pretreatment/buildingCommitment.json';

interface Concern {
    id: string;
    title: string;
    response: string;
}

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

export default function BuildingCommitmentScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [userInput, setUserInput] = useState('');
    const [expandedConcerns, setExpandedConcerns] = useState<{ [key: string]: boolean }>({});

    const concerns: Concern[] = buildingCommitmentData.concerns;

    const toggleConcern = (id: string) => {
        setExpandedConcerns((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleWriteLetter = () => {
        navigation.navigate('LetterFromFutureSelf');
    };

    const handleReviewCommitments = () => {
        navigation.navigate('SignYourCommitments');
    };

    const handleSendMessage = () => {
        if (userInput.trim()) {
            console.log('Send message:', userInput);
            // Handle sending message
            setUserInput('');
        }
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            
            {/* Header */}
            <PageHeader title="Building Commitment" />

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-6 mb-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Chat with Grace Section */}
                <View className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: colors.orange_50 }}>
                    {/* Section Title */}
                    <View className="flex-row items-center mb-3">
                        <ChartsCircleIcon size={32} color={colors.warm_dark} />
                        <Text
                            style={[t.title24SemiBold, { color: colors.Text_Primary }]}
                            className="ml-2"
                        >
                            Chat with Grace
                        </Text>
                    </View>

                    {/* Introductory Text */}
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Share your concerns about starting your DBT journey or pick one or more of the "Common Concerns" listed below. If you are ready to start and have no concerns, click on the 'Review and Sign Commitments' box.
                    </Text>

                    {/* Grace's Message Bubble */}
                    <View className="flex-row mb-4 items-end">
                        <View className="w-10 h-10 justify-center items-center rounded-full mr-3" style={{ backgroundColor: colors.orange_100 }}>
                            <Image
                                source={images.leaf}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <View
                            className="flex-1 p-3 rounded-2xl"
                            style={{ backgroundColor: colors.orange_opacity_10, borderWidth: 1, borderColor: colors.orange_opacity_20 }}
                        >
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                Hi, I'm Grace, your DBT companion throughout this app. I'm here to help you explore your commitment to this journey. What's on your mind about starting DBT?
                            </Text>
                        </View>
                    </View>

                    {/* User Input Field */}
                    <View className="flex-row items-center">
                        <View
                            className="flex-row flex-1 items-center p-1 px-4 rounded-xl"
                            style={styles.inputContainer}
                        >
                            <TextInput
                                className="flex-1"
                                style={[t.textRegular, { color: colors.Text_Primary }]}
                                placeholder="Type your thoughts here..."
                                placeholderTextColor={colors.text_secondary}
                                value={userInput}
                                onChangeText={setUserInput}
                                multiline
                            />
                        </View>
                        <Pressable
                            className="w-12 h-12 rounded-full items-center justify-center ml-4"
                            style={{ backgroundColor: colors.warm_dark }}
                            onPress={handleSendMessage}
                        >
                            <RecordIcon size={16} color={colors.white} />
                        </Pressable>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="mt-4 mb-6">
                    <Pressable
                        className="rounded-full py-4 px-6 flex-row justify-center items-center mb-3"
                        style={{ backgroundColor: colors.button_orange }}
                        onPress={handleWriteLetter}
                    >
                        <Text
                            style={[t.title16SemiBold, { color: colors.white }]}
                            className="flex-1 text-center"
                        >
                            Write Letter From Future Self
                        </Text>
                        <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                            <ArrowRightIcon size={16} color={colors.Text_Primary} />
                        </View>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-6 items-center"
                        style={{
                            borderWidth: 1,
                            borderColor: colors.orange_500,
                            backgroundColor: colors.white,
                        }}
                        onPress={handleReviewCommitments}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                            Review and Sign Commitments
                        </Text>
                    </Pressable>
                </View>


                {/* Common Concerns Section */}
                <View className="mb-2 mt-2 border border-gray-200 rounded-xl p-4">
                    <Text
                        style={[t.title16SemiBold, { color: colors.Text_Primary }]}
                        className="mb-2 mt-2"
                    >
                        Common Concerns
                    </Text>
                    <Text
                        style={[t.textRegular, { color: colors.text_secondary }]}
                        className="mb-4"
                    >
                        Click on any concern that resonates with you
                    </Text>

                    {/* Concerns List */}
                    <View>
                        {concerns.map((concern) => (
                            <View
                                key={concern.id}
                                className="rounded-xl mb-3 border border-gray-200"
                            >
                                <Pressable
                                    className={`p-4 rounded-xl ${expandedConcerns[concern.id] ? 'rounded-b-none' : ''}`}
                                    style={{
                                        backgroundColor: expandedConcerns[concern.id]
                                            ? colors.white
                                            : colors.white,
                                    }}
                                    onPress={() => toggleConcern(concern.id)}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <Text
                                            style={[
                                                t.textMedium,
                                                { color: colors.Text_Primary, flex: 1 },
                                            ]}
                                        >
                                            {concern.title}
                                        </Text>

                                    </View>
                                </Pressable>
                                {expandedConcerns[concern.id] && (
                                    <View className='px-2 pb-2'>
                                        <View
                                            className="p-4 rounded-b-xl rounded-lg"
                                            style={{ backgroundColor: colors.orange_50 }}
                                        >
                                            <Text
                                                style={[t.textRegular, { color: colors.Text_Primary }]}
                                            >
                                                {concern.response}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    logo: {
        width: 16,
        height: 24,
        borderRadius: 12,
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: 40
    }
});

