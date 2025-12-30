import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Origins (Self Discovery) ====================

export interface OriginStoryPair {
    story: string;
    origin: string;
}

export interface OriginsEntry {
    id: string;
    time: number;
    stories: string[];
    originStoryPairs: OriginStoryPair[];
    compassion: string;
}

export interface OriginsCreateRequest {
    stories: string[];
    originStoryPairs: OriginStoryPair[];
    compassion: string;
}

/**
 * Fetch list of all origins entries
 */
export const fetchOriginsEntries = async (): Promise<OriginsEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ORIGINS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch origins entries: ${response.statusText}`);
        }

        const data: OriginsEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching origins entries:', error);
        throw error;
    }
};

/**
 * Create a new origins entry
 * @param entry - Origins entry data
 */
export const createOriginsEntry = async (entry: OriginsCreateRequest): Promise<OriginsEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ORIGINS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create origins entry: ${response.statusText}`);
        }

        const data: OriginsEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating origins entry:', error);
        throw error;
    }
};

/**
 * Delete an origins entry by ID
 * @param id - Entry ID
 */
export const deleteOriginsEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ORIGINS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete origins entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting origins entry:', error);
        throw error;
    }
};

