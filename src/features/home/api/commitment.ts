import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

/**
 * Letter from Future Self API types and functions
 */
export interface LetterFromFutureSelfResponse {
    openingMessage: string;
    emotionHandling: string;
    relationshipChanges: string;
    selfTreatment: string;
}

export interface LetterFromFutureSelfRequest {
    openingMessage: string;
    emotionHandling: string;
    relationshipChanges: string;
    selfTreatment: string;
}

/**
 * Fetch letter from future self
 */
export const fetchLetterFromFutureSelf = async (): Promise<LetterFromFutureSelfResponse> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LETTER_FROM_FUTURE_SELF, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch letter from future self: ${response.statusText}`);
        }

        const data: LetterFromFutureSelfResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching letter from future self:', error);
        throw error;
    }
};

/**
 * Update letter from future self
 */
export const updateLetterFromFutureSelf = async (
    letterData: LetterFromFutureSelfRequest
): Promise<LetterFromFutureSelfResponse> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LETTER_FROM_FUTURE_SELF, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(letterData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update letter from future self: ${response.statusText}`);
        }

        const data: LetterFromFutureSelfResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating letter from future self:', error);
        throw error;
    }
};

/**
 * Sign commitment API types and functions
 */
export interface SignCommitmentRequest {
    name: string;
}

export interface SignCommitmentResponse {
    // Add response fields based on API response
    success?: boolean;
    message?: string;
}

/**
 * Sign commitment
 */
export const signCommitment = async (
    name: string
): Promise<SignCommitmentResponse> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SIGN_COMMITMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error(`Failed to sign commitment: ${response.statusText}`);
        }

        const data: SignCommitmentResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error signing commitment:', error);
        throw error;
    }
};

