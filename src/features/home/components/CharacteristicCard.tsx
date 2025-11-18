import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface CharacteristicCardProps {
    title: string;
    description?: string;
    leftBorder?: boolean;
    children?: React.ReactNode;
}

export const CharacteristicCard: React.FC<CharacteristicCardProps> = ({
    title,
    description,
    leftBorder = true,
    children,
}) => {
    return (
        <View
            className="p-4 mb-3"
            style={[styles.characterBox, leftBorder && styles.leftBorder]}
        >
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                {title}
            </Text>
            {description && (
                <Text style={[t.textMedium, { color: colors.text_secondary }]}>
                    {description}
                </Text>
            )}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    characterBox: {
        backgroundColor: colors.orange_50,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    leftBorder: {
        borderLeftWidth: 2,
        borderLeftColor: colors.orange_300,
    },
});
