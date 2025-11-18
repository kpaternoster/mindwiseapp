import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';

export interface Message {
    id: string;
    text: string;
    sender: 'grace' | 'user';
    timestamp: Date;
}

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isGrace = message.sender === 'grace';

    return (
        <View className={`flex-row mb-4 items-end ${isGrace ? '' : 'justify-end'}`}>
            {isGrace && (
                <View className="mr-2 mt-1 items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: colors.orange_100 }}>
                    <Image
                        source={images.leaf}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                    />
                </View>
            )}
            <View
                className="rounded-2xl px-4 py-3"
                style={{
                    backgroundColor: isGrace ? colors.orange_opacity_10 : colors.orange_500,
                    maxWidth: '75%',
                }}
            >
                <Text
                    style={[
                        t.textRegular,
                        {
                            color: isGrace ? colors.Text_Primary : colors.white,
                        },
                    ]}
                >
                    {message.text}
                </Text>
            </View>
        </View>
    );
};

