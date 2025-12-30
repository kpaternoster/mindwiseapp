import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Reframe Negative Self Talk ====================

export interface ReframeNegativeSelfTalkEntry {
    id: string;
    time: number;
    negativeThoughts: string[];
    evidenceFor: string;
    evidenceAgainst: string;
    friendsPerspective: string;
    balancedThought: string;
}

export interface ReframeNegativeSelfTalkCreateRequest {
    negativeThoughts: string[];
    evidenceFor: string;
    evidenceAgainst: string;
    friendsPerspective: string;
    balancedThought: string;
}

/**
 * Fetch list of all reframe negative self talk entries
 */
export const fetchReframeNegativeSelfTalkEntries = async (): Promise<ReframeNegativeSelfTalkEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFRAME_NEGATIVE_SELF_TALK, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reframe negative self talk entries: ${response.statusText}`);
        }

        const data: ReframeNegativeSelfTalkEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching reframe negative self talk entries:', error);
        throw error;
    }
};

/**
 * Create a new reframe negative self talk entry
 * @param entry - Reframe negative self talk entry data
 */
export const createReframeNegativeSelfTalkEntry = async (entry: ReframeNegativeSelfTalkCreateRequest): Promise<ReframeNegativeSelfTalkEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFRAME_NEGATIVE_SELF_TALK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create reframe negative self talk entry: ${response.statusText}`);
        }

        const data: ReframeNegativeSelfTalkEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating reframe negative self talk entry:', error);
        throw error;
    }
};

/**
 * Delete a reframe negative self talk entry by ID
 * @param id - Entry ID
 */
export const deleteReframeNegativeSelfTalkEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFRAME_NEGATIVE_SELF_TALK_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete reframe negative self talk entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting reframe negative self talk entry:', error);
        throw error;
    }
};

// ==================== Self Talk Toolkit ====================

export interface SelfTalkToolkitEntry {
    id: string;
    time: number;
    accomplishments: string;
    encouragingPhrases: string;
    kindMessages: string;
    goodMemories: string;
    dailyPractice: string;
    practiceMethod: string;
}

export interface SelfTalkToolkitCreateRequest {
    accomplishments: string;
    encouragingPhrases: string;
    kindMessages: string;
    goodMemories: string;
    dailyPractice: string;
    practiceMethod: string;
}

/**
 * Fetch list of all self talk toolkit entries
 */
export const fetchSelfTalkToolkitEntries = async (): Promise<SelfTalkToolkitEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_TALK_TOOLKIT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch self talk toolkit entries: ${response.statusText}`);
        }

        const data: SelfTalkToolkitEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching self talk toolkit entries:', error);
        throw error;
    }
};

/**
 * Create a new self talk toolkit entry
 * @param entry - Self talk toolkit entry data
 */
export const createSelfTalkToolkitEntry = async (entry: SelfTalkToolkitCreateRequest): Promise<SelfTalkToolkitEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_TALK_TOOLKIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create self talk toolkit entry: ${response.statusText}`);
        }

        const data: SelfTalkToolkitEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating self talk toolkit entry:', error);
        throw error;
    }
};

/**
 * Delete a self talk toolkit entry by ID
 * @param id - Entry ID
 */
export const deleteSelfTalkToolkitEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_TALK_TOOLKIT_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete self talk toolkit entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting self talk toolkit entry:', error);
        throw error;
    }
};

