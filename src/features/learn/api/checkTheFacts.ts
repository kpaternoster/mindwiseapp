import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Check the Facts ====================

export interface CheckTheFactsEntry {
    id: string;
    time: number;
    describe: string;
    facts: string;
    assumptions: string;
    alternativeExplanations: string;
    emotionAndFactsCheck: string;
}

export interface CheckTheFactsCreateRequest {
    describe: string;
    facts: string;
    assumptions: string;
    alternativeExplanations: string;
    emotionAndFactsCheck: string;
}

/**
 * Fetch list of all check the facts entries
 */
export const fetchCheckTheFactsEntries = async (): Promise<CheckTheFactsEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CHECK_THE_FACTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch check the facts entries: ${response.statusText}`);
        }

        const data: CheckTheFactsEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching check the facts entries:', error);
        throw error;
    }
};

/**
 * Create a new check the facts entry
 * @param entry - Check the facts entry data
 */
export const createCheckTheFactsEntry = async (entry: CheckTheFactsCreateRequest): Promise<CheckTheFactsEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CHECK_THE_FACTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create check the facts entry: ${response.statusText}`);
        }

        const data: CheckTheFactsEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating check the facts entry:', error);
        throw error;
    }
};

/**
 * Delete a check the facts entry by ID
 * @param id - Entry ID
 */
export const deleteCheckTheFactsEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CHECK_THE_FACTS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete check the facts entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting check the facts entry:', error);
        throw error;
    }
};

