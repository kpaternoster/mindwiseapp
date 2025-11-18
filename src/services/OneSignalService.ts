import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';
import { provisionNotificationToken } from '@features/notifications/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '@config/env';
import type { NotificationClickEvent, NotificationWillDisplayEvent, PushSubscriptionChangedState } from 'react-native-onesignal';

const ONESIGNAL_APP_ID = ENV.ONESIGNAL_APP_ID || 'ONESIGNAL_APP_ID';

/**
 * Initialize OneSignal SDK
 */
export const initializeOneSignal = (): void => {
    try {
        OneSignal.initialize(ONESIGNAL_APP_ID);
        OneSignal.Notifications.requestPermission(false).then((accepted: boolean) => {
            console.log('OneSignal push notification permission:', accepted);
        });

        // Set up notification handlers
        OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event: NotificationWillDisplayEvent) => {
            console.log('OneSignal: notification will show in foreground:', event);
            event.getNotification().display();
        });

        OneSignal.Notifications.addEventListener('click', (event: NotificationClickEvent) => {
            console.log('OneSignal: notification opened:', event);
            // Handle notification opened event
        });

        // Handle when user subscribes/unsubscribes
        OneSignal.User.pushSubscription.addEventListener('change', (event: PushSubscriptionChangedState) => {
            console.log('OneSignal: subscription changed:', event);
            if (event.current.optedIn && event.current.id) {
                handleTokenProvision(event.current.id);
            }
        });

        // Get initial subscription state and provision token if already subscribed
        OneSignal.User.pushSubscription.getIdAsync().then((userId: string | null) => {
            if (userId) {
                OneSignal.User.pushSubscription.getOptedInAsync().then((optedIn: boolean) => {
                    if (optedIn) {
                        handleTokenProvision(userId);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error initializing OneSignal:', error);
    }
};

/**
 * Handle provisioning the notification token to the backend
 */
const handleTokenProvision = async (userId: string): Promise<void> => {
    try {
        // Check if user is authenticated
        const authToken = await AsyncStorage.getItem('auth_token');
        if (!authToken) {
            console.log('OneSignal: User not authenticated, skipping token provision');
            return;
        }

        // Check if we've already provisioned this token
        const lastProvisionedToken = await AsyncStorage.getItem('onesignal_last_provisioned_token');
        if (lastProvisionedToken === userId) {
            console.log('OneSignal: Token already provisioned');
            return;
        }

        // Provision token to backend
        const platform = Platform.OS === 'ios' ? 'ios' : 'android';
        await provisionNotificationToken(userId, platform);

        // Store the provisioned token
        await AsyncStorage.setItem('onesignal_last_provisioned_token', userId);
        console.log('OneSignal: Token provisioned successfully');
    } catch (error) {
        console.error('Error provisioning OneSignal token:', error);
    }
};

/**
 * Manually trigger token provisioning (useful after login)
 */
export const provisionTokenIfSubscribed = async (): Promise<void> => {
    try {
        const optedIn = await OneSignal.User.pushSubscription.getOptedInAsync();
        if (optedIn) {
            const userId = await OneSignal.User.pushSubscription.getIdAsync();
            if (userId) {
                await handleTokenProvision(userId);
            }
        }
    } catch (error) {
        console.error('Error in provisionTokenIfSubscribed:', error);
    }
};

/**
 * Get the current OneSignal user ID (push token)
 */
export const getOneSignalUserId = async (): Promise<string | null> => {
    try {
        return await OneSignal.User.pushSubscription.getIdAsync();
    } catch (error) {
        console.error('Error getting OneSignal user ID:', error);
        return null;
    }
};

/**
 * Set user email for OneSignal (optional, for email notifications)
 */
export const setOneSignalEmail = async (email: string): Promise<void> => {
    try {
        OneSignal.User.addEmail(email);
    } catch (error) {
        console.error('Error setting OneSignal email:', error);
    }
};

/**
 * Set user phone number for OneSignal (optional, for SMS notifications)
 */
export const setOneSignalPhoneNumber = async (phoneNumber: string): Promise<void> => {
    try {
        OneSignal.User.addSms(phoneNumber);
    } catch (error) {
        console.error('Error setting OneSignal phone number:', error);
    }
};

/**
 * Set external user ID (link OneSignal user to your backend user)
 */
export const setOneSignalExternalUserId = async (userId: string): Promise<void> => {
    try {
        OneSignal.login(userId);
    } catch (error) {
        console.error('Error setting OneSignal external user ID:', error);
    }
};

/**
 * Remove external user ID (when user logs out)
 */
export const removeOneSignalExternalUserId = async (): Promise<void> => {
    try {
        OneSignal.logout();
    } catch (error) {
        console.error('Error removing OneSignal external user ID:', error);
    }
};

