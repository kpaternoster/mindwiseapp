import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Self Validation Practice ====================

export interface SelfValidationPracticeEntry {
    id: string;
    time: number;
    acknowledge: string;
    acceptEmotion: string;
    understandEmotion: string;
    respond: string;
}

export interface SelfValidationPracticeCreateRequest {
    acknowledge: string;
    acceptEmotion: string;
    understandEmotion: string;
    respond: string;
}

/**
 * Fetch list of all self validation practice entries
 */
export const fetchSelfValidationPracticeEntries = async (): Promise<SelfValidationPracticeEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_VALIDATION_PRACTICE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch self validation practice entries: ${response.statusText}`);
        }

        const data: SelfValidationPracticeEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching self validation practice entries:', error);
        throw error;
    }
};

/**
 * Create a new self validation practice entry
 * @param entry - Self validation practice entry data
 */
export const createSelfValidationPracticeEntry = async (entry: SelfValidationPracticeCreateRequest): Promise<SelfValidationPracticeEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_VALIDATION_PRACTICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create self validation practice entry: ${response.statusText}`);
        }

        const data: SelfValidationPracticeEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating self validation practice entry:', error);
        throw error;
    }
};

/**
 * Delete a self validation practice entry by ID
 * @param id - Entry ID
 */
export const deleteSelfValidationPracticeEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_VALIDATION_PRACTICE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete self validation practice entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting self validation practice entry:', error);
        throw error;
    }
};

