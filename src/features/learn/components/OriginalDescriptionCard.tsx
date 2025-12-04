import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface OriginalDescriptionCardProps {
    body: string;
    thoughts: string;
    urges: string;
    userGuess: string;
}

export const OriginalDescriptionCard: React.FC<OriginalDescriptionCardProps> = ({
    body,
    thoughts,
    urges,
    userGuess,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-4 border border-gray-200"
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                Your Original Description:
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className='mb-3'>
                Primary Emotion
            </Text>

            <View className="mb-3">
                <Text style={[t.textRegular]}>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>Body: </Text> <Text style={{ color: colors.Text_Primary }}>{body || 'Not provided'}</Text>
                </Text>
            </View>

            <View className="mb-3">
                <Text style={[t.textRegular]}>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>Thoughts: </Text> <Text style={{ color: colors.Text_Primary }}>{thoughts || 'Not provided'}</Text>
                </Text>
            </View>

            <View className="mb-3">
                <Text style={[t.textRegular]}>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>Urges: </Text> <Text style={{ color: colors.Text_Primary }}>{urges || 'Not provided'}</Text>
                </Text>
            </View>

            <View>
                <Text style={[t.textRegular]}>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>Your guess: </Text>
                    <Text style={{ color: colors.Text_Primary }}>{userGuess || 'Not provided'}</Text>
                </Text>
            </View>
        </View>
    );
};

