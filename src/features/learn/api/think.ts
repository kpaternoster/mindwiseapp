import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Think ====================

export interface ThinkEntry {
    id: string;
    time: number;
    who: string;
    positiveQualities: string;
    interaction: string;
    application: string;
    whatHappened: string;
    response: string;
    connection: string;
    reflection: string;
}

export interface ThinkCreateRequest {
    who: string;
    positiveQualities: string;
    interaction: string;
    application: string;
    whatHappened: string;
    response: string;
    connection: string;
    reflection: string;
}

/**
 * Fetch list of all think entries
 */
export const fetchThinkEntries = async (): Promise<ThinkEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.THINK, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch think entries: ${response.statusText}`);
        }

        const data: ThinkEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching think entries:', error);
        throw error;
    }
};

/**
 * Create a new think entry
 * @param entry - Think entry data
 */
export const createThinkEntry = async (entry: ThinkCreateRequest): Promise<ThinkEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.THINK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create think entry: ${response.statusText}`);
        }

        const data: ThinkEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating think entry:', error);
        throw error;
    }
};

/**
 * Delete a think entry by ID
 * @param id - Entry ID
 */
export const deleteThinkEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.THINK_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete think entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting think entry:', error);
        throw error;
    }
};

