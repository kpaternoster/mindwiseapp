// API functions for notifications

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS, ENV } from '@config/env';

export type NotificationType = 'reward' | 'password_changed' | 'new_login';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    metadata?: {
        leavesEarned?: number;
        device?: string;
        country?: string;
    };
}

interface NotificationAPIResponse {
    id: string;
    type: string;
    title: string;
    body: string;
    leaves: number;
    sentAt: number;
    read: boolean;
}

/**
 * Helper function to get auth token from AsyncStorage
 */
const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        return token;
    } catch (error) {
        console.error('Error retrieving auth token:', error);
        return null;
    }
};

/**
 * Helper function to convert Unix timestamp to relative time format (e.g., "1 hour ago")
 */
const formatTimestamp = (sentAt: number): string => {
    const date = new Date(sentAt * 1000); // Convert from seconds to milliseconds
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
        return 'Just now';
    } else if (diffMinutes < 60) {
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
        return date.toLocaleDateString();
    }
};

/**
 * Helper function to map API notification type to NotificationType
 */
const mapNotificationType = (apiType: string): NotificationType => {
    const typeMap: { [key: string]: NotificationType } = {
        'newLogin': 'new_login',
        'rewardEarned': 'reward',
        'passwordChanged': 'password_changed',
    };
    return typeMap[apiType] || 'new_login';
};

/**
 * Fetch user notifications
 */
export const fetchNotifications = async (): Promise<Notification[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.NOTIFICATIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch notifications: ${response.statusText}`);
        }

        const data: NotificationAPIResponse[] = await response.json();
        
        // Sort by sentAt timestamp (most recent first) before mapping
        const sortedData = [...data].sort((a, b) => b.sentAt - a.sentAt);
        
        // Map API response to Notification interface
        return sortedData.map((item) => {
            const notification: Notification = {
                id: item.id,
                type: mapNotificationType(item.type),
                title: item.title,
                description: item.body,
                timestamp: formatTimestamp(item.sentAt),
                isRead: item.read,
            };

            // Add metadata if leaves > 0
            if (item.leaves > 0) {
                notification.metadata = {
                    leavesEarned: item.leaves,
                };
            }

            return notification;
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

/**
 * Mark notification as read
 */
export const markAsRead = async (notificationId: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${ENV.API_URL}/notification/${notificationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ read: true }),
        });

        if (!response.ok) {
            throw new Error(`Failed to mark notification as read: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

/**
 * Notification delivery method types
 */
export type NotificationDeliveryMethod = 'email' | 'push' | 'text' | 'in_app';

/**
 * Notification settings interface
 */
export interface NotificationSettings {
    email: boolean;
    push: boolean;
    text: boolean;
    in_app?: boolean;
}

/**
 * Fetch user notification settings
 */
export const fetchNotificationSettings = async (): Promise<NotificationSettings> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.NOTIFICATION_SETTINGS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch notification settings: ${response.statusText}`);
        }

        const data: NotificationSettings = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notification settings:', error);
        throw error;
    }
};

/**
 * Update user notification settings
 */
export const updateNotificationSettings = async (
    settings: Partial<NotificationSettings>
): Promise<NotificationSettings> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.NOTIFICATION_SETTINGS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(settings),
        });

        if (!response.ok) {
            throw new Error(`Failed to update notification settings: ${response.statusText}`);
        }

        const data: NotificationSettings = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating notification settings:', error);
        throw error;
    }
};

/**
 * Provision notification token to backend
 */
export const provisionNotificationToken = async (
    token: string,
    platform: 'ios' | 'android'
): Promise<void> => {
    try {
        const authToken = await getAuthToken();
        
        if (!authToken) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.NOTIFICATION_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                token,
                platform,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to provision notification token: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error provisioning notification token:', error);
        throw error;
    }
};

