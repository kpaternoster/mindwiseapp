import React from 'react';
import { Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface QuickActionButtonProps {
    label: string;
    onPress: () => void;
    selected?: boolean;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
    label,
    onPress,
    selected = false,
}) => {
    return (
        <Pressable
            onPress={onPress}
            className="rounded-xl px-4 py-3 mb-2"
            style={{
                backgroundColor: selected ? colors.orange_500 : colors.orange_100,
            }}
        >
            <Text
                style={[
                    t.textMedium,
                    {
                        color: selected ? colors.white : colors.Text_Primary,
                    },
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
};

