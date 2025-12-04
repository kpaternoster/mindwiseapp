import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { LearningPreferenceButton } from './LearningPreferenceButton';
import { ArrowRightIcon } from '@components/Utils';

export const GettingStartedCard: React.FC = () => {
    const [selectedPreference, setSelectedPreference] = useState<'read' | 'watch' | 'listen' | 'chat'>('read');

    const handlePreferencePress = (type: 'read' | 'watch' | 'listen' | 'chat') => {
        setSelectedPreference(type);
    };

    return (
        <View className='mx-5 mb-4 p-4 rounded-2xl' style={{ backgroundColor: colors.orange_50 }}>
            <View className='mb-4'>
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className='mb-2'>
                    How do you like to learn?
                </Text>
                <Text style={[t.footnoteBold, { color: colors.text_secondary }]} className='mb-4'>
                    These will be your default skill category settings, but you can update them anytime.
                </Text>

                <View className='flex-row justify-between flex-wrap'>
                    <LearningPreferenceButton
                        type="read"
                        isSelected={selectedPreference === 'read'}
                        onPress={() => handlePreferencePress('read')}
                    />
                    <LearningPreferenceButton
                        type="watch"
                        isSelected={selectedPreference === 'watch'}
                        onPress={() => handlePreferencePress('watch')}
                    />
                    <LearningPreferenceButton
                        type="listen"
                        isSelected={selectedPreference === 'listen'}
                        onPress={() => handlePreferencePress('listen')}
                    />
                    <LearningPreferenceButton
                        type="chat"
                        isSelected={selectedPreference === 'chat'}
                        onPress={() => handlePreferencePress('chat')}
                    />
                </View>
            </View>

            <Pressable
                className='rounded-full py-4 items-center justify-center flex-row px-3'
                style={[{backgroundColor: colors.Button_Orange}]}
                onPress={() => {
                    console.log('Do Exercise pressed');
                }}
            >
                <Text style={[t.button, { color: colors.white }]} className='flex-1 text-center'>
                    Do Exercise
                </Text>
                <View className='w-9 h-9 justify-center items-center bg-white rounded-full'>
                    <ArrowRightIcon size={16} color={colors.Text_Primary} />
                </View>
            </Pressable>
        </View>
    );
};
