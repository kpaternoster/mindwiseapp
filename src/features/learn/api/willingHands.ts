import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Willing Hands ====================

export interface WillingHandsEntry {
    id: string;
    time: number;
    tension: string;
    tensionRelease: string;
    situation: string;
    intention: string;
    reflection: string;
}

export interface WillingHandsCreateRequest {
    tension: string;
    tensionRelease: string;
    situation: string;
    intention: string;
    reflection: string;
}

/**
 * Fetch list of all willing hands entries
 */
export const fetchWillingHandsEntries = async (): Promise<WillingHandsEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.WILLING_HANDS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch willing hands entries: ${response.statusText}`);
        }

        const data: WillingHandsEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching willing hands entries:', error);
        throw error;
    }
};

/**
 * Create a new willing hands entry
 * @param entry - Willing hands entry data
 */
export const createWillingHandsEntry = async (entry: WillingHandsCreateRequest): Promise<WillingHandsEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.WILLING_HANDS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create willing hands entry: ${response.statusText}`);
        }

        const data: WillingHandsEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating willing hands entry:', error);
        throw error;
    }
};

/**
 * Delete a willing hands entry by ID
 * @param id - Entry ID
 */
export const deleteWillingHandsEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.WILLING_HANDS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete willing hands entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting willing hands entry:', error);
        throw error;
    }
};

