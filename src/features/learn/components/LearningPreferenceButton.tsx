import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import Svg, { Path } from 'react-native-svg';
import { BookIcon, ChartsCircleDotsIcon, HeadPhonesIcon, MonitorPlayIcon } from '@components/Utils';

interface LearningPreferenceButtonProps {
    type: 'read' | 'watch' | 'listen' | 'chat';
    isSelected: boolean;
    onPress: () => void;
    isButtonStyle?: boolean
}

const Icons = {
    read: BookIcon,
    watch: MonitorPlayIcon,
    listen: HeadPhonesIcon,
    chat: ChartsCircleDotsIcon,
};

const labels = {
    read: 'Read',
    watch: 'Watch',
    listen: 'Listen',
    chat: 'Chat',
};

export const LearningPreferenceButton: React.FC<LearningPreferenceButtonProps> = ({
    type,
    isSelected,
    onPress,
    isButtonStyle = true
}) => {
    const Icon = Icons[type];
    const label = labels[type];

    return (
        <Pressable
            style={[
                styles.button,
                isSelected && isButtonStyle && styles.buttonSelected,
            ]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Icon
                    size={20}
                    color={isSelected && isButtonStyle ? colors.white : colors.warm_dark}
                />
            </View>
            <Text
                style={[
                    t.textRegular,
                    styles.label,
                    isSelected && isButtonStyle && styles.labelSelected,
                    isSelected && !isButtonStyle && { color: colors.warm_dark }
                ]}
                className='mt-1'
            >
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    buttonSelected: {
        backgroundColor: colors.warm_dark,
    },
    iconContainer: {
        marginBottom: 4,
    },
    label: {
        color: colors.text_secondary,
        fontSize: 12,
    },
    labelSelected: {
        color: colors.white,
    },
});

