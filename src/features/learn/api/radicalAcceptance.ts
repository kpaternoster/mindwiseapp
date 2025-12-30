import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Acceptance Journal ====================

export interface AcceptanceJournalEntry {
    id: string;
    time: number;
    situation: string;
    copingStatement: string;
}

export interface AcceptanceJournalCreateRequest {
    situation: string;
    copingStatement: string;
}

/**
 * Fetch list of all acceptance journal entries
 */
export const fetchAcceptanceJournalEntries = async (): Promise<AcceptanceJournalEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ACCEPTANCE_JOURNAL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch acceptance journal entries: ${response.statusText}`);
        }

        const data: AcceptanceJournalEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching acceptance journal entries:', error);
        throw error;
    }
};

/**
 * Create a new acceptance journal entry
 * @param entry - Acceptance journal entry data
 */
export const createAcceptanceJournalEntry = async (entry: AcceptanceJournalCreateRequest): Promise<AcceptanceJournalEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ACCEPTANCE_JOURNAL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create acceptance journal entry: ${response.statusText}`);
        }

        const data: AcceptanceJournalEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating acceptance journal entry:', error);
        throw error;
    }
};

/**
 * Delete an acceptance journal entry by ID
 * @param id - Entry ID
 */
export const deleteAcceptanceJournalEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ACCEPTANCE_JOURNAL_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete acceptance journal entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting acceptance journal entry:', error);
        throw error;
    }
};

// ==================== Coping Statements List ====================

export interface CopingStatementsListEntry {
    id: string;
    time: number;
    copingStatement: string;
}

export interface CopingStatementsListCreateRequest {
    copingStatement: string;
}

/**
 * Fetch list of all coping statements list entries
 */
export const fetchCopingStatementsListEntries = async (): Promise<CopingStatementsListEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.COPING_STATEMENTS_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch coping statements list entries: ${response.statusText}`);
        }

        const data: CopingStatementsListEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching coping statements list entries:', error);
        throw error;
    }
};

/**
 * Create a new coping statements list entry
 * @param entry - Coping statements list entry data
 */
export const createCopingStatementsListEntry = async (entry: CopingStatementsListCreateRequest): Promise<CopingStatementsListEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.COPING_STATEMENTS_LIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create coping statements list entry: ${response.statusText}`);
        }

        const data: CopingStatementsListEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating coping statements list entry:', error);
        throw error;
    }
};

/**
 * Delete a coping statements list entry by ID
 * @param id - Entry ID
 */
export const deleteCopingStatementsListEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.COPING_STATEMENTS_LIST_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete coping statements list entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting coping statements list entry:', error);
        throw error;
    }
};

