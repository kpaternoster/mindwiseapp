import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Five Senses ====================

export interface FiveSensesEntry {
    id: string;
    time: number;
    sight: string;
    sound: string;
    smell: string;
    taste: string;
    touch: string;
}

export interface FiveSensesCreateRequest {
    sight: string;
    sound: string;
    smell: string;
    taste: string;
    touch: string;
}

/**
 * Fetch list of all five senses entries
 */
export const fetchFiveSensesEntries = async (): Promise<FiveSensesEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.FIVE_SENSES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch five senses entries: ${response.statusText}`);
        }

        const data: FiveSensesEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching five senses entries:', error);
        throw error;
    }
};

/**
 * Create a new five senses entry
 * @param entry - Five senses entry data
 */
export const createFiveSensesEntry = async (entry: FiveSensesCreateRequest): Promise<FiveSensesEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.FIVE_SENSES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create five senses entry: ${response.statusText}`);
        }

        const data: FiveSensesEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating five senses entry:', error);
        throw error;
    }
};

/**
 * Delete a five senses entry by ID
 * @param id - Entry ID
 */
export const deleteFiveSensesEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.FIVE_SENSES_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete five senses entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting five senses entry:', error);
        throw error;
    }
};

// ==================== Reflection Journal ====================

export interface ReflectionJournalEntry {
    id: string;
    time: number;
    reflection: string;
}

export interface ReflectionJournalCreateRequest {
    reflection: string;
}

/**
 * Fetch list of all reflection journal entries
 */
export const fetchReflectionJournalEntries = async (): Promise<ReflectionJournalEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFLECTION_JOURNAL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reflection journal entries: ${response.statusText}`);
        }

        const data: ReflectionJournalEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching reflection journal entries:', error);
        throw error;
    }
};

/**
 * Create a new reflection journal entry
 * @param entry - Reflection journal entry data
 */
export const createReflectionJournalEntry = async (entry: ReflectionJournalCreateRequest): Promise<ReflectionJournalEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFLECTION_JOURNAL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create reflection journal entry: ${response.statusText}`);
        }

        const data: ReflectionJournalEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating reflection journal entry:', error);
        throw error;
    }
};

/**
 * Delete a reflection journal entry by ID
 * @param id - Entry ID
 */
export const deleteReflectionJournalEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFLECTION_JOURNAL_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete reflection journal entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting reflection journal entry:', error);
        throw error;
    }
};

