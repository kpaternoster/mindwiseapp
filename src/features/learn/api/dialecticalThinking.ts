import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Dialectical Reframing ====================

export interface DialecticalReframingEntry {
    id: string;
    time: number;
    title: string | null;
    but: string;
    and: string;
    stuckSituation: string;
    reframe: string;
}

export interface DialecticalReframingCreateRequest {
    title?: string | null;
    but: string;
    and: string;
    stuckSituation: string;
    reframe: string;
}

/**
 * Fetch list of all dialectical reframing entries
 */
export const fetchDialecticalReframingEntries = async (): Promise<DialecticalReframingEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.DIALECTICAL_REFRAMING, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch dialectical reframing entries: ${response.statusText}`);
        }

        const data: DialecticalReframingEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching dialectical reframing entries:', error);
        throw error;
    }
};

/**
 * Create a new dialectical reframing entry
 * @param entry - Dialectical reframing entry data
 */
export const createDialecticalReframingEntry = async (entry: DialecticalReframingCreateRequest): Promise<DialecticalReframingEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.DIALECTICAL_REFRAMING, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create dialectical reframing entry: ${response.statusText}`);
        }

        const data: DialecticalReframingEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating dialectical reframing entry:', error);
        throw error;
    }
};

/**
 * Delete a dialectical reframing entry by ID
 * @param id - Entry ID
 */
export const deleteDialecticalReframingEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.DIALECTICAL_REFRAMING_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete dialectical reframing entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting dialectical reframing entry:', error);
        throw error;
    }
};

// ==================== Exploring Perspectives ====================

export interface ExploringPerspectivesEntry {
    id: string;
    time: number;
    title: string | null;
    conflict: string;
    perspective: string;
    alternative1: string;
    alternative2: string;
    personalBelief: string;
    oppositeSide: string;
    truths: string;
}

export interface ExploringPerspectivesCreateRequest {
    title?: string | null;
    conflict: string;
    perspective: string;
    alternative1: string;
    alternative2: string;
    personalBelief: string;
    oppositeSide: string;
    truths: string;
}

/**
 * Fetch list of all exploring perspectives entries
 */
export const fetchExploringPerspectivesEntries = async (): Promise<ExploringPerspectivesEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EXPLORING_PERSPECTIVES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch exploring perspectives entries: ${response.statusText}`);
        }

        const data: ExploringPerspectivesEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching exploring perspectives entries:', error);
        throw error;
    }
};

/**
 * Create a new exploring perspectives entry
 * @param entry - Exploring perspectives entry data
 */
export const createExploringPerspectivesEntry = async (entry: ExploringPerspectivesCreateRequest): Promise<ExploringPerspectivesEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EXPLORING_PERSPECTIVES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create exploring perspectives entry: ${response.statusText}`);
        }

        const data: ExploringPerspectivesEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating exploring perspectives entry:', error);
        throw error;
    }
};

/**
 * Delete an exploring perspectives entry by ID
 * @param id - Entry ID
 */
export const deleteExploringPerspectivesEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EXPLORING_PERSPECTIVES_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete exploring perspectives entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting exploring perspectives entry:', error);
        throw error;
    }
};

