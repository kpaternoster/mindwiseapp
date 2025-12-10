import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ScreenScroll } from '@components/ScreenScroll';
import { PageHeader } from '@features/home/components/PageHeader';
import Svg, { Path } from 'react-native-svg';
import {
    ChatMessage,
    QuickActionButton,
    AdditionalResource,
    Message,
} from '../components';
import helpData from '../data/helpData.json';
import { PaperPlaneRight } from '@components/Utils';
import { sendGraceMessage, fetchGraceMessages, GraceMessage } from '../api';


export default function HelpSupport() {
    const scrollViewRef = useRef<ScrollView>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: helpData.graceGreeting.initialMessage,
            sender: 'grace',
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [showFollowUp, setShowFollowUp] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);

    // Load initial messages from API on mount
    useEffect(() => {
        const loadInitialMessages = async () => {
            try {
                setLoadingMessages(true);
                const graceMessages = await fetchGraceMessages();
                
                if (graceMessages.length > 0) {
                    // Convert GraceMessage[] to Message[] format
                    const baseTimestamp = Date.now();
                    const convertedMessages: Message[] = graceMessages.map((msg, index) => ({
                        id: `${msg.sender}_${baseTimestamp}_${index}`,
                        text: msg.contents,
                        sender: msg.sender,
                        timestamp: new Date(baseTimestamp + index),
                    }));
                    setMessages(convertedMessages);
                }
            } catch (error) {
                console.error('Error loading initial messages:', error);
                // Keep the default greeting message if API fails
            } finally {
                setLoadingMessages(false);
            }
        };

        loadInitialMessages();
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    const handleQuickAction = (actionId: string) => {
        setSelectedAction(actionId);
        const action = helpData.quickActions.find((a) => a.id === actionId);

        if (action) {
            // Add user's selection as a message
            const userMessage: Message = {
                id: `user_${Date.now()}`,
                text: action.label,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMessage]);

            // Add Grace's follow-up if available
            if (action.followUpMessage) {
                setTimeout(() => {
                    const graceMessage: Message = {
                        id: `grace_${Date.now()}`,
                        text: action.followUpMessage!,
                        sender: 'grace',
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, graceMessage]);
                    setShowFollowUp(true);
                }, 500);
            }
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const messageText = inputMessage.trim();
            setInputMessage('');

            // Optimistically add user message
            const userMessage: Message = {
                id: `user_${Date.now()}`,
                text: messageText,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMessage]);

            try {
                // Send POST request to Grace API
                await sendGraceMessage({ contents: messageText });

                // After POST succeeds, fetch all messages with GET request
                const graceMessages = await fetchGraceMessages();

                // Convert GraceMessage[] to Message[] format
                const baseTimestamp = Date.now();
                const convertedMessages: Message[] = graceMessages.map((msg, index) => ({
                    id: `${msg.sender}_${baseTimestamp}_${index}`,
                    text: msg.contents,
                    sender: msg.sender,
                    timestamp: new Date(baseTimestamp + index),
                }));

                // Update messages state with all messages from API
                setMessages(convertedMessages);
            } catch (error) {
                console.error('Error sending message to Grace:', error);
                // On error, remove the optimistically added message
                setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
                // Restore input message
                setInputMessage(messageText);
            }
        }
    };

    const handleResourcePress = (route: string) => {
        console.log('Navigate to:', route);
        // TODO: Implement navigation
    };

    const selectedQuickAction = helpData.quickActions.find((a) => a.id === selectedAction);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <PageHeader title="Chat with Grace" showLeafIcon={true} />
                <View className="px-6 mt-4 mb-4">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Get help and contact support
                    </Text>
                </View>

                <ScreenScroll className="flex-1 bg-white" keyboardShouldPersistTaps="handled">
                    {/* Description */}
                    <View className='mx-6 pt-4 rounded-2xl mb-4' style={{ backgroundColor: colors.orange_50 }}>
                        <ScrollView
                            ref={scrollViewRef}
                            style={{ maxHeight: 400, minHeight: 400 }}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"
                            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                        >
                            {/* Grace Introduction */}
                            <View className="px-2 mb-4">
                                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                                    {helpData.graceGreeting.title}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                                    {helpData.graceGreeting.description}
                                </Text>
                            </View>

                            {/* Chat Messages */}
                            <View className="px-6 mb-4">
                                {messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                            </View>

                            {/* Quick Actions */}
                            {/* {!selectedAction && (
                                <View className="px-6 mb-4">
                                    {helpData.quickActions.map((action) => (
                                        <QuickActionButton
                                            key={action.id}
                                            label={action.label}
                                            onPress={() => handleQuickAction(action.id)}
                                        />
                                    ))}
                                </View>
                            )} */}

                            {/* Follow-up Options */}
                            {showFollowUp && selectedQuickAction?.followUpOptions && (
                                <View className="px-6 mb-4">
                                    {selectedQuickAction.followUpOptions.map((option) => (
                                        <QuickActionButton
                                            key={option.id}
                                            label={option.label}
                                            onPress={() => console.log('Selected:', option.id)}
                                        />
                                    ))}
                                </View>
                            )}
                        </ScrollView>
                    </View>

                    {/* Message Input */}
                    <View className="px-6 mb-4 flex-row items-center">
                        <View
                            className="flex-row items-center rounded-full px-4 py-1 border flex-1 mr-2"
                            style={{ backgroundColor: colors.white, borderColor: colors.gray_200 }}
                        >
                            <TextInput
                                value={inputMessage}
                                onChangeText={setInputMessage}
                                placeholder="Type your message to Grace..."
                                placeholderTextColor={colors.text_secondary}
                                style={[t.textRegular, { color: colors.Text_Primary, flex: 1, textAlignVertical: 'top' }]}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>
                        <Pressable 
                            onPress={() => {
                                if (inputMessage.trim()) {
                                    handleSendMessage();
                                }
                            }}
                            className="w-12 h-12 items-center justify-center rounded-full"
                            style={{ backgroundColor: inputMessage.trim() ? colors.orange_dark : colors.button_disabled }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <PaperPlaneRight
                                size={24}
                                color={colors.white}
                            />
                        </Pressable>
                    </View>

                    {/* Additional Resources */}
                    <View className="px-6 mb-6 mt-6">
                        <Text style={[t.button, { color: colors.Text_Primary }]} className="mb-3">
                            Additional Resources
                        </Text>
                        <View className="rounded-2xl" style={{ backgroundColor: colors.white }}>
                            {helpData.additionalResources.map((resource, index) => (
                                <AdditionalResource
                                    key={resource.id}
                                    title={resource.title}
                                    description={resource.description}
                                    onPress={() => handleResourcePress(resource.route)}
                                />
                            ))}
                        </View>
                    </View>
                </ScreenScroll>
            </View>
        </KeyboardAvoidingView>
    );
}

