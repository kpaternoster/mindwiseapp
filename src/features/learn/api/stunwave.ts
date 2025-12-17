import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

export interface StunwaveEntry {
    id: string;
    time: number;
    bodySensations: string;
    thoughts: string;
    urges: string;
    emotions: string;
    surfTheWave: string;
    reflection: string;
}

export interface StunwaveCreateRequest {
    bodySensations: string;
    thoughts: string;
    urges: string;
    emotions: string;
    surfTheWave: string;
    reflection: string;
}

/**
 * Fetch list of all stunwave entries
 */
export const fetchStunwaveList = async (): Promise<StunwaveEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STUNWAVE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch stunwave list: ${response.statusText}`);
        }

        const data: StunwaveEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching stunwave list:', error);
        throw error;
    }
};

/**
 * Create a new stunwave entry
 * @param entry - Stunwave entry data
 */
export const createStunwave = async (entry: StunwaveCreateRequest): Promise<StunwaveEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STUNWAVE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create stunwave entry: ${response.statusText}`);
        }

        const data: StunwaveEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating stunwave entry:', error);
        throw error;
    }
};

/**
 * Delete a stunwave entry by ID
 * @param id - Stunwave entry ID
 */
export const deleteStunwave = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STUNWAVE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete stunwave entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting stunwave entry:', error);
        throw error;
    }
};

