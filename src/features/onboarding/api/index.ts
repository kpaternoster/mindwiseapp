import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '@config/env';

const apiClient = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Helper to create authenticated API client
const createAuthenticatedClient = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    return axios.create({
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export interface SignupRequest {
    email: string;
    password: string;
}

export interface SignupResponse {
    token: string;
}

export interface LoginResponse {
    token: string;
}

export interface ApiError {
    error: string;
}

export const loginWithPassword = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>(
            API_ENDPOINTS.LOGIN,
            { email, password }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred. Please try again.',
        } as ApiError;
    }
};

export const signupWithPassword = async (
    email: string,
    password: string
): Promise<SignupResponse> => {
    try {
        const response = await apiClient.post<SignupResponse>(
            API_ENDPOINTS.SIGNUP,
            { email, password }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred. Please try again.',
        } as ApiError;
    }
};

export interface BuySubscriptionRequest {
    plan: 'individual' | 'therapistPractice';
    billingPeriod: 'monthly' | 'yearly';
    successRedirectURL: string;
    cancelRedirectURL: string;
}

export interface BuySubscriptionResponse {
    checkoutURL: string;
    sessionId?: string;
}

export const buySubscription = async (
    plan: 'individual' | 'therapistPractice',
    billingPeriod: 'monthly' | 'yearly',
    successRedirectURL: string,
    cancelRedirectURL: string
): Promise<BuySubscriptionResponse> => {
    try {
        const authClient = await createAuthenticatedClient();
        const response = await authClient.post<BuySubscriptionResponse>(
            API_ENDPOINTS.BUY_SUBSCRIPTION,
            { 
                plan, 
                billingPeriod, 
                successRedirectURL, 
                cancelRedirectURL 
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred. Please try again.',
        } as ApiError;
    }
};

export const logout = async (): Promise<void> => {
    try {
        const authClient = await createAuthenticatedClient();
        await authClient.post(API_ENDPOINTS.LOGOUT, {});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred during logout.',
        } as ApiError;
    }
};

export interface ForgotPasswordResponse {
    verificationToken: string;
}

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
    try {
        const response = await apiClient.post<ForgotPasswordResponse>(
            API_ENDPOINTS.FORGOT_PASSWORD,
            { email }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred. Please try again.',
        } as ApiError;
    }
};

export interface VerifyForgotPasswordResponse {
    changePasswordToken: string;
}

export const verifyForgotPassword = async (
    verificationToken: string,
    pin: string
): Promise<VerifyForgotPasswordResponse> => {
    try {
        const response = await apiClient.post<VerifyForgotPasswordResponse>(
            API_ENDPOINTS.VERIFY_FORGOT_PASSWORD,
            { verificationToken, pin: parseInt(pin, 10) }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred. Please try again.',
        } as ApiError;
    }
};

export interface ChangeForgottenPasswordResponse {
    token: string;
}

export const changeForgottenPassword = async (
    changePasswordToken: string,
    password: string
): Promise<ChangeForgottenPasswordResponse> => {
    try {
        const response = await apiClient.post<ChangeForgottenPasswordResponse>(
            API_ENDPOINTS.CHANGE_FORGOTTEN_PASSWORD,
            { changePasswordToken, password }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error?: string; message?: string }>;
            
            if (axiosError.code === 'ERR_NETWORK' || !axiosError.response) {
                throw {
                    error: 'Unable to connect to server. Please check your internet connection and try again.',
                } as ApiError;
            }
            
            if (axiosError.response?.data) {
                throw {
                    error: axiosError.response.data.error || 
                           axiosError.response.data.message || 
                           `HTTP ${axiosError.response.status}`,
                } as ApiError;
            }
        }

        throw {
            error: 'An unexpected error occurred. Please try again.',
        } as ApiError;
    }
};

