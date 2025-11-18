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

// Send Icon
const SendIcon = ({ size = 20, color = colors.orange_500 }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
            d="M18.75 1.25L9.375 10.625M18.75 1.25L12.5 18.75L9.375 10.625M18.75 1.25L1.25 7.5L9.375 10.625"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

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

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage: Message = {
                id: `user_${Date.now()}`,
                text: inputMessage,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, newMessage]);
            setInputMessage('');

            // Simulate Grace's response
            setTimeout(() => {
                const graceResponse: Message = {
                    id: `grace_${Date.now()}`,
                    text: "I'm here to help! Let me assist you with that.",
                    sender: 'grace',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, graceResponse]);
            }, 1000);
        }
    };

    const handleResourcePress = (route: string) => {
        console.log('Navigate to:', route);
        // TODO: Implement navigation
    };

    const selectedQuickAction = helpData.quickActions.find((a) => a.id === selectedAction);

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white pt-9"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <PageHeader title="Chat with Grace" showLeafIcon={true} />
            <View className="px-6 mt-4 mb-4">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    Get help and contact support
                </Text>
            </View>

            <ScreenScroll className="flex-1 bg-white mb-10">
                {/* Description */}
                <View className='flex-1 mx-6 pt-4 rounded-2xl' style={{ backgroundColor: colors.orange_50, maxHeight: '60%' }}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={{ maxHeight: 400 }}
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
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
                        {!selectedAction && (
                            <View className="px-6 mb-4">
                                {helpData.quickActions.map((action) => (
                                    <QuickActionButton
                                        key={action.id}
                                        label={action.label}
                                        onPress={() => handleQuickAction(action.id)}
                                    />
                                ))}
                            </View>
                        )}

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
                    {/* Message Input */}
                    <View className="px-6 mb-2 pt-4 flex-row items-center">
                        <View
                            className="flex-row items-center rounded-full px-4 py-1 border flex-1 mr-2"
                            style={{ backgroundColor: colors.white, borderColor: colors.gray_200 }}
                        >
                            <TextInput
                                value={inputMessage}
                                onChangeText={setInputMessage}
                                placeholder="Type your message to Grace..."
                                placeholderTextColor={colors.text_secondary}
                                style={[t.textRegular, { color: colors.Text_Primary, flex: 1 }]}
                                multiline
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
        </KeyboardAvoidingView>
    );
}

