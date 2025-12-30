import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Identify Emotional Urges (Different Action) ====================

export interface IdentifyEmotionalUrgesEntry {
    id: string;
    time: number;
    urges: string;
    oppositeAction: string;
}

export interface IdentifyEmotionalUrgesCreateRequest {
    urges: string;
    oppositeAction: string;
}

/**
 * Fetch list of all identify emotional urges entries
 */
export const fetchIdentifyEmotionalUrgesEntries = async (): Promise<IdentifyEmotionalUrgesEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.IDENTIFY_EMOTIONAL_URGES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch identify emotional urges entries: ${response.statusText}`);
        }

        const data: IdentifyEmotionalUrgesEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching identify emotional urges entries:', error);
        throw error;
    }
};

/**
 * Create a new identify emotional urges entry
 * @param entry - Identify emotional urges entry data
 */
export const createIdentifyEmotionalUrgesEntry = async (entry: IdentifyEmotionalUrgesCreateRequest): Promise<IdentifyEmotionalUrgesEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.IDENTIFY_EMOTIONAL_URGES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create identify emotional urges entry: ${response.statusText}`);
        }

        const data: IdentifyEmotionalUrgesEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating identify emotional urges entry:', error);
        throw error;
    }
};

/**
 * Delete an identify emotional urges entry by ID
 * @param id - Entry ID
 */
export const deleteIdentifyEmotionalUrgesEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.IDENTIFY_EMOTIONAL_URGES_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete identify emotional urges entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting identify emotional urges entry:', error);
        throw error;
    }
};

