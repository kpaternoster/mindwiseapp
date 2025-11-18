import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface StageCardProps {
    label: string;
    title: string;
    keyPhrase: string;
    description: string;
    isLast?: boolean;
}

export const StageCard: React.FC<StageCardProps> = ({
    label,
    title,
    keyPhrase,
    description,
    isLast = false,
}) => {
    return (
        <View className="flex-row" style={{ marginBottom: isLast ? 0 : 24 }}>
            {/* Timeline indicator */}
            <View className="items-center mr-4">
                <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: colors.orange_500 }}
                >
                    <Text style={[t.textSemiBold, { color: colors.white }]}>
                        {label}
                    </Text>
                </View>
                {!isLast && (
                    <View
                        className="flex-1 w-0.5 mt-2"
                        style={{ backgroundColor: colors.orange_300, minHeight: 60 }}
                    />
                )}
            </View>

            {/* Content */}
            <View className="flex-1 rounded-lg p-4" style={{ backgroundColor: colors.orange_50}}>
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                    {title}
                </Text>
                
                <View
                    className="px-3 py-2 rounded-lg mb-2"
                    style={{ backgroundColor: colors.white }}
                >
                    <Text style={[t.textMedium, { color: colors.green }]}>
                        {keyPhrase}
                    </Text>
                </View>
                
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

