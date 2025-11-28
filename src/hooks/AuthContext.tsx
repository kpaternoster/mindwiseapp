import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { provisionTokenIfSubscribed, removeOneSignalExternalUserId } from "@services/OneSignalService";

type AuthContextType = {
    isSignedIn: boolean;
    loading: boolean;
    signIn: (token: string) => Promise<void>;
    signUp: (token: string) => Promise<void>;
    signInAterSignUp: () => Promise<void>;
    signOut: () => Promise<void>;
    getStoredToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Restore session on app start
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem("auth_token");
                if (stored) {
                    setToken(stored);
                    // Provision OneSignal token if user is already logged in
                    // provisionTokenIfSubscribed().catch((error) => {
                    //     console.error('Error provisioning OneSignal token on app start:', error);
                    // });
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const signIn = async (newToken: string) => {
        await AsyncStorage.setItem("auth_token", newToken);
        setToken(newToken);
        // Provision OneSignal token after login
        // provisionTokenIfSubscribed().catch((error) => {
        //     console.error('Error provisioning OneSignal token after login:', error);
        // });
    };

    const signUp = async (newToken: string) => {
        await AsyncStorage.setItem("auth_token", newToken);
    };

    const signInAterSignUp = async () => {
        const retrievedToken = await AsyncStorage.getItem("auth_token");
        setToken(retrievedToken);
    };

    const getStoredToken = async () => {
        return await AsyncStorage.getItem("auth_token");
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("auth_token");
        await AsyncStorage.removeItem("onesignal_last_provisioned_token");
        setToken(null);
        // Remove OneSignal external user ID on logout
        // removeOneSignalExternalUserId().catch((error) => {
        //     console.error('Error removing OneSignal external user ID on logout:', error);
        // });
    };

    const value = useMemo(
        () => ({ isSignedIn: !!token, loading, signIn, signOut, signUp, signInAterSignUp, getStoredToken }),
        [token, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
};


/**
 * Helper function to get auth token from AsyncStorage
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        return token;
    } catch (error) {
        console.error('Error retrieving auth token:', error);
        return null;
    }
};
