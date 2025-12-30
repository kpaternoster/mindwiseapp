import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Wise Mind Practice ====================

export interface WiseMindEntry {
    id: string;
    time: number;
    breathing: string;
    visualization: string;
    guidance: string;
    currentSituation: string;
    emotionMind: string;
    reasonableMind: string;
    wiseMind: string;
    pastExperience: string;
}

export interface WiseMindCreateRequest {
    breathing: string;
    visualization: string;
    guidance: string;
    currentSituation: string;
    emotionMind: string;
    reasonableMind: string;
    wiseMind: string;
    pastExperience: string;
}

/**
 * Fetch list of all wise mind entries
 */
export const fetchWiseMindEntries = async (): Promise<WiseMindEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.WISE_MIND, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch wise mind entries: ${response.statusText}`);
        }

        const data: WiseMindEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching wise mind entries:', error);
        throw error;
    }
};

/**
 * Create a new wise mind entry
 * @param entry - Wise mind entry data
 */
export const createWiseMindEntry = async (entry: WiseMindCreateRequest): Promise<WiseMindEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('entry', entry);
        console.log('token', token);
        console.log('API_ENDPOINTS.WISE_MIND', API_ENDPOINTS.WISE_MIND);
        
        const response = await fetch(API_ENDPOINTS.WISE_MIND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create wise mind entry: ${response.statusText}`);
        }

        const data: WiseMindEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating wise mind entry:', error);
        throw error;
    }
};

/**
 * Delete a wise mind entry by ID
 * @param id - Entry ID
 */
export const deleteWiseMindEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.WISE_MIND_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete wise mind entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting wise mind entry:', error);
        throw error;
    }
};

// ==================== Past Decisions ====================

export interface PastDecisionEntry {
    id: string;
    time: number;
    situation: string;
    mindState: string;
    wiseMindPerspective: string;
    insights: string;
}

export interface PastDecisionCreateRequest {
    situation: string;
    mindState: string;
    wiseMindPerspective: string;
    insights: string;
}

/**
 * Fetch list of all past decision entries
 */
export const fetchPastDecisionEntries = async (): Promise<PastDecisionEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PAST_DECISIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch past decision entries: ${response.statusText}`);
        }

        const data: PastDecisionEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching past decision entries:', error);
        throw error;
    }
};

/**
 * Create a new past decision entry
 * @param entry - Past decision entry data
 */
export const createPastDecisionEntry = async (entry: PastDecisionCreateRequest): Promise<PastDecisionEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PAST_DECISIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create past decision entry: ${response.statusText}`);
        }

        const data: PastDecisionEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating past decision entry:', error);
        throw error;
    }
};

/**
 * Delete a past decision entry by ID
 * @param id - Entry ID
 */
export const deletePastDecisionEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PAST_DECISIONS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete past decision entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting past decision entry:', error);
        throw error;
    }
};

