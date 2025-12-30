import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Recognizing Dialectical Dilemmas ====================

export interface DialecticalDilemmaEntry {
    id: string;
    time: number;
    situation: string;
    extreme1: string;
    extreme2: string;
    truth1: string;
    truth2: string;
    perspective: string;
}

export interface DialecticalDilemmaCreateRequest {
    situation: string;
    extreme1: string;
    extreme2: string;
    truth1: string;
    truth2: string;
    perspective: string;
}

/**
 * Fetch list of all dialectical dilemma entries
 */
export const fetchDialecticalDilemmaEntries = async (): Promise<DialecticalDilemmaEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.RECOGNIZING_DIALECTICAL_DILEMMAS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch dialectical dilemma entries: ${response.statusText}`);
        }

        const data: DialecticalDilemmaEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching dialectical dilemma entries:', error);
        throw error;
    }
};

/**
 * Create a new dialectical dilemma entry
 * @param entry - Dialectical dilemma entry data
 */
export const createDialecticalDilemmaEntry = async (entry: DialecticalDilemmaCreateRequest): Promise<DialecticalDilemmaEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.RECOGNIZING_DIALECTICAL_DILEMMAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create dialectical dilemma entry: ${response.statusText}`);
        }

        const data: DialecticalDilemmaEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating dialectical dilemma entry:', error);
        throw error;
    }
};

/**
 * Delete a dialectical dilemma entry by ID
 * @param id - Entry ID
 */
export const deleteDialecticalDilemmaEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.RECOGNIZING_DIALECTICAL_DILEMMAS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete dialectical dilemma entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting dialectical dilemma entry:', error);
        throw error;
    }
};

// ==================== Acceptance and Change ====================

export interface AcceptanceAndChangeEntry {
    id: string;
    time: number;
    situation: string;
    partsThatNeedAcceptance: string;
    partsToChange: string;
    acceptanceSteps: string;
    changeSteps: string;
    reflection: string;
}

export interface AcceptanceAndChangeCreateRequest {
    situation: string;
    partsThatNeedAcceptance: string;
    partsToChange: string;
    acceptanceSteps: string;
    changeSteps: string;
    reflection: string;
}

/**
 * Fetch list of all acceptance and change entries
 */
export const fetchAcceptanceAndChangeEntries = async (): Promise<AcceptanceAndChangeEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ACCEPTANCE_AND_CHANGE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch acceptance and change entries: ${response.statusText}`);
        }

        const data: AcceptanceAndChangeEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching acceptance and change entries:', error);
        throw error;
    }
};

/**
 * Create a new acceptance and change entry
 * @param entry - Acceptance and change entry data
 */
export const createAcceptanceAndChangeEntry = async (entry: AcceptanceAndChangeCreateRequest): Promise<AcceptanceAndChangeEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ACCEPTANCE_AND_CHANGE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create acceptance and change entry: ${response.statusText}`);
        }

        const data: AcceptanceAndChangeEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating acceptance and change entry:', error);
        throw error;
    }
};

/**
 * Delete an acceptance and change entry by ID
 * @param id - Entry ID
 */
export const deleteAcceptanceAndChangeEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ACCEPTANCE_AND_CHANGE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete acceptance and change entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting acceptance and change entry:', error);
        throw error;
    }
};

