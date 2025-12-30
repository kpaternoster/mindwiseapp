import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Here and Now ====================

export interface HereAndNowEntry {
    id: string;
    time: number;
    body: string;
    object: string;
    observation: string;
    thoughts: string;
    reflection: string;
}

export interface HereAndNowCreateRequest {
    body: string;
    object: string;
    observation: string;
    thoughts: string;
    reflection: string;
}

/**
 * Fetch list of all here and now entries
 */
export const fetchHereAndNowEntries = async (): Promise<HereAndNowEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.HERE_AND_NOW, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch here and now entries: ${response.statusText}`);
        }

        const data: HereAndNowEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching here and now entries:', error);
        throw error;
    }
};

/**
 * Create a new here and now entry
 * @param entry - Here and now entry data
 */
export const createHereAndNowEntry = async (entry: HereAndNowCreateRequest): Promise<HereAndNowEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.HERE_AND_NOW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create here and now entry: ${response.statusText}`);
        }

        const data: HereAndNowEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating here and now entry:', error);
        throw error;
    }
};

/**
 * Delete a here and now entry by ID
 * @param id - Entry ID
 */
export const deleteHereAndNowEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.HERE_AND_NOW_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete here and now entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting here and now entry:', error);
        throw error;
    }
};

