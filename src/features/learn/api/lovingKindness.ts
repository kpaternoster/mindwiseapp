import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Loving Kindness ====================

export interface LovingKindnessEntry {
    id: string;
    time: number;
    yourself: string;
    lovedOne: string;
    neutral: string;
    difficult: string;
    overallReflection: string;
}

export interface LovingKindnessCreateRequest {
    yourself: string;
    lovedOne: string;
    neutral: string;
    difficult: string;
    overallReflection: string;
}

/**
 * Fetch list of all loving kindness entries
 */
export const fetchLovingKindnessEntries = async (): Promise<LovingKindnessEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LOVING_KINDNESS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch loving kindness entries: ${response.statusText}`);
        }

        const data: LovingKindnessEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching loving kindness entries:', error);
        throw error;
    }
};

/**
 * Create a new loving kindness entry
 * @param entry - Loving kindness entry data
 */
export const createLovingKindnessEntry = async (entry: LovingKindnessCreateRequest): Promise<LovingKindnessEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LOVING_KINDNESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create loving kindness entry: ${response.statusText}`);
        }

        const data: LovingKindnessEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating loving kindness entry:', error);
        throw error;
    }
};

/**
 * Delete a loving kindness entry by ID
 * @param id - Entry ID
 */
export const deleteLovingKindnessEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LOVING_KINDNESS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete loving kindness entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting loving kindness entry:', error);
        throw error;
    }
};

