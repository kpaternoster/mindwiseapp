import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== DEAR MAN ====================

export interface DearManEntry {
    id: string;
    time: number;
    script: string;
    reflection: string;
}

export interface DearManCreateRequest {
    script: string;
    reflection: string;
}

/**
 * Fetch list of all DEAR MAN entries
 */
export const fetchDearManEntries = async (): Promise<DearManEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.DEAR_MAN, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch DEAR MAN entries: ${response.statusText}`);
        }

        const data: DearManEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching DEAR MAN entries:', error);
        throw error;
    }
};

/**
 * Create a new DEAR MAN entry
 * @param entry - DEAR MAN entry data
 */
export const createDearManEntry = async (entry: DearManCreateRequest): Promise<DearManEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.DEAR_MAN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create DEAR MAN entry: ${response.statusText}`);
        }

        const data: DearManEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating DEAR MAN entry:', error);
        throw error;
    }
};

/**
 * Delete a DEAR MAN entry by ID
 * @param id - Entry ID
 */
export const deleteDearManEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.DEAR_MAN_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete DEAR MAN entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting DEAR MAN entry:', error);
        throw error;
    }
};

