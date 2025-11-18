import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { GreenLeafIcon, ShieldCheckIcon, SignInIcon } from '@components/Utils';
import { Notification } from '../api';

type Props = {
    notification: Notification;
    onPress?: () => void;
};

export const NotificationCard: React.FC<Props> = ({ notification, onPress }) => {
    const renderIcon = (isRead: boolean) => {
        switch (notification.type) {
            case 'reward':
                return (
                    <View style={[styles.iconContainer, isRead && styles.iconContainerRead]}>
                        <GreenLeafIcon size={24} />
                    </View>
                );
            case 'password_changed':
                return (
                    <View style={[styles.iconContainer, isRead && styles.iconContainerRead]}>
                        <ShieldCheckIcon size={18} color={colors.orange_500} />
                    </View>
                );
            case 'new_login':
                return (
                    <View style={[styles.iconContainer, isRead && styles.iconContainerRead]}>
                        <SignInIcon size={18} color={colors.muted_coral} />
                    </View>
                );
            default:
                return null;
        }
    };

    const renderBadge = () => {
        if (notification.type === 'reward' && notification.metadata?.leavesEarned) {
            return (
                <View style={styles.badge}>
                    <GreenLeafIcon size={12} />
                    <Text style={[t.textMedium, styles.badgeText]}>
                        +{notification.metadata.leavesEarned}
                    </Text>
                </View>
            );
        }
        return null;
    };

    return (
        <Pressable
            style={[styles.card, !notification.isRead && styles.cardUnread]}
            onPress={onPress}
        >
            {renderIcon(notification.isRead)}
            <View style={styles.content}>
                <Text style={[t.title16SemiBold, styles.title]}>
                    {notification.title}
                </Text>
                <Text style={[t.textMedium, styles.description]}>
                    {notification.description}
                </Text>
                <Text style={[t.footnoneMedium, styles.timestamp]}>
                    • {notification.timestamp}
                </Text>
            </View>
            {renderBadge()}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.stoke_gray,
    },
    cardUnread: {
        backgroundColor: colors.orange_50,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        backgroundColor: colors.white
    },
    iconContainerRead: {
        backgroundColor: colors.gray_100,
    },
    content: {
        flex: 1,
    },
    title: {
        color: colors.Text_Primary,
        marginBottom: 4,
    },
    description: {
        color: colors.text_secondary,
        marginBottom: 4,
    },
    timestamp: {
        color: colors.text_secondary,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.orange_opacity_10,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 8,
    },
    badgeText: {
        color: colors.button_orange,
        marginLeft: 4,
    },
});

