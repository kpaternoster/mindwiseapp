import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Self-Care PLEASE ====================

export interface PleaseCategory {
    value: number;
    ideas: string;
}

export interface PleaseEntry {
    id: string;
    time: number;
    physicalIllness: PleaseCategory;
    sleep: PleaseCategory;
    eating: PleaseCategory;
    substances: PleaseCategory;
    exercise: PleaseCategory;
}

export interface PleaseCreateRequest {
    physicalIllness: PleaseCategory;
    sleep: PleaseCategory;
    eating: PleaseCategory;
    substances: PleaseCategory;
    exercise: PleaseCategory;
}

/**
 * Fetch list of all PLEASE entries
 */
export const fetchPleaseEntries = async (): Promise<PleaseEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PLEASE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch PLEASE entries: ${response.statusText}`);
        }

        const data: PleaseEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching PLEASE entries:', error);
        throw error;
    }
};

/**
 * Create a new PLEASE entry
 * @param entry - PLEASE entry data
 */
export const createPleaseEntry = async (entry: PleaseCreateRequest): Promise<PleaseEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PLEASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create PLEASE entry: ${response.statusText}`);
        }

        const data: PleaseEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating PLEASE entry:', error);
        throw error;
    }
};

/**
 * Delete a PLEASE entry by ID
 * @param id - Entry ID
 */
export const deletePleaseEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PLEASE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete PLEASE entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting PLEASE entry:', error);
        throw error;
    }
};

