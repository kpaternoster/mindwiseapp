import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    ActivityIndicator,
    Image,
    StatusBar
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { NotificationCard } from '../components/NotificationCard';
import { EmptyState } from '../components/EmptyState';
import { fetchNotifications, markAsRead, Notification } from '../api';
import { BackIcon } from '@components/Utils';
import { images } from '@design/image';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader } from '@features/home/components';

type FilterType = 'all' | 'unread';

export const NotificationsScreen: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const { dissolveGoBack } = useDissolveNavigation();

    useEffect(() => {
        initNotifications();
    }, []);

    const initNotifications = async () => {
        try {
            setIsLoading(true);
            const data = await fetchNotifications();
            setNotifications([...data]);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNotificationPress = async (notificationId: string) => {
        try {
            // Mark as read in API
            await markAsRead(notificationId);

            // Update local state
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const filteredNotifications = notifications.filter((notification) => {
        if (activeFilter === 'unread') {
            return !notification.isRead;
        }
        return true;
    });


    return (
        <View className="flex-1 bg-white pt-9 pb-20" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title="Notifications & Reminders" />
            {/* Filter Tabs */}
            <View style={styles.filterWrapper}>
                <View style={styles.filterContainer}>
                    <Pressable
                        style={[
                            styles.filterTab,
                            activeFilter === 'all' && styles.filterTabActive,
                        ]}
                        onPress={() => setActiveFilter('all')}
                    >
                        <Text
                            style={[
                                t.textMedium,
                                styles.filterTabText,
                                activeFilter === 'all' && styles.filterTabTextActive,
                            ]}
                        >
                            All
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.filterTab,
                            activeFilter === 'unread' && styles.filterTabActive,
                        ]}
                        onPress={() => setActiveFilter('unread')}
                    >
                        <Text
                            style={[
                                t.textMedium,
                                styles.filterTabText,
                                activeFilter === 'unread' && styles.filterTabTextActive,
                            ]}
                        >
                            Unread
                        </Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    {/* Content */}
                    <View style={styles.content}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={colors.orange_500} />
                            </View>
                        ) : filteredNotifications.length > 0 ? (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.listContent}
                            >
                                {filteredNotifications.map((notification) => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onPress={() => handleNotificationPress(notification.id)}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <EmptyState />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: colors.white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: colors.Text_Primary,
        marginHorizontal: 16,
    },
    headerIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterWrapper: {
        paddingHorizontal: 16,
        marginBottom: 16,
        width: 200
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.stoke_gray,
    },
    filterTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    filterTabActive: {
        backgroundColor: colors.text_gray,
    },
    filterTabText: {
        color: colors.text_gray,
    },
    filterTabTextActive: {
        color: colors.white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    listContent: {
        paddingBottom: 120,
    },
    leafIcon: {
        width: 15,
        height: 24
    }
});

