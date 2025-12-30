import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Start Small ====================

export interface StartSmallEntry {
    id: string;
    time: number;
    smallRequest: string;
    smallOutcome: string;
    smallReflection: string;
    biggerSituation: string;
    practice: string;
    biggerReflection: string;
    overallReflection: string;
    nextSteps: string;
}

export interface StartSmallCreateRequest {
    smallRequest: string;
    smallOutcome: string;
    smallReflection: string;
    biggerSituation: string;
    practice: string;
    biggerReflection: string;
    overallReflection: string;
    nextSteps: string;
}

/**
 * Fetch list of all start small entries
 */
export const fetchStartSmallEntries = async (): Promise<StartSmallEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.START_SMALL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch start small entries: ${response.statusText}`);
        }

        const data: StartSmallEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching start small entries:', error);
        throw error;
    }
};

/**
 * Create a new start small entry
 * @param entry - Start small entry data
 */
export const createStartSmallEntry = async (entry: StartSmallCreateRequest): Promise<StartSmallEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.START_SMALL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create start small entry: ${response.statusText}`);
        }

        const data: StartSmallEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating start small entry:', error);
        throw error;
    }
};

/**
 * Delete a start small entry by ID
 * @param id - Entry ID
 */
export const deleteStartSmallEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.START_SMALL_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete start small entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting start small entry:', error);
        throw error;
    }
};

// ==================== Fast Plan ====================

export interface FastPlanEntry {
    id: string;
    time: number;
    situation: string;
    request: string;
    fair: string;
    apologies: string;
    stickToValues: string;
    truthful: string;
    confidence: string;
    notes: string;
}

export interface FastPlanCreateRequest {
    situation: string;
    request: string;
    fair: string;
    apologies: string;
    stickToValues: string;
    truthful: string;
    confidence: string;
    notes: string;
}

/**
 * Fetch list of all fast plan entries
 */
export const fetchFastPlanEntries = async (): Promise<FastPlanEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.FAST_PLAN, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch fast plan entries: ${response.statusText}`);
        }

        const data: FastPlanEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching fast plan entries:', error);
        throw error;
    }
};

/**
 * Create a new fast plan entry
 * @param entry - Fast plan entry data
 */
export const createFastPlanEntry = async (entry: FastPlanCreateRequest): Promise<FastPlanEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.FAST_PLAN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create fast plan entry: ${response.statusText}`);
        }

        const data: FastPlanEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating fast plan entry:', error);
        throw error;
    }
};

/**
 * Delete a fast plan entry by ID
 * @param id - Entry ID
 */
export const deleteFastPlanEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.FAST_PLAN_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete fast plan entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting fast plan entry:', error);
        throw error;
    }
};

