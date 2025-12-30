import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Identify Triggers ====================

export interface IdentifyTriggersEntry {
    id: string;
    time: number;
    overwhelmingSituation: string;
    strategies: string;
}

export interface IdentifyTriggersCreateRequest {
    overwhelmingSituation: string;
    strategies: string;
}

/**
 * Fetch list of all identify triggers entries
 */
export const fetchIdentifyTriggersEntries = async (): Promise<IdentifyTriggersEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.IDENTIFY_TRIGGERS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch identify triggers entries: ${response.statusText}`);
        }

        const data: IdentifyTriggersEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching identify triggers entries:', error);
        throw error;
    }
};

/**
 * Create a new identify triggers entry
 * @param entry - Identify triggers entry data
 */
export const createIdentifyTriggersEntry = async (entry: IdentifyTriggersCreateRequest): Promise<IdentifyTriggersEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.IDENTIFY_TRIGGERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create identify triggers entry: ${response.statusText}`);
        }

        const data: IdentifyTriggersEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating identify triggers entry:', error);
        throw error;
    }
};

/**
 * Delete an identify triggers entry by ID
 * @param id - Entry ID
 */
export const deleteIdentifyTriggersEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.IDENTIFY_TRIGGERS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete identify triggers entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting identify triggers entry:', error);
        throw error;
    }
};

// ==================== Create Personalized Toolkit ====================

export interface CreatePersonalizedToolkitEntry {
    id: string;
    time: number;
    parts: string;
}

export interface CreatePersonalizedToolkitCreateRequest {
    parts: string;
}

/**
 * Fetch list of all create personalized toolkit entries
 */
export const fetchCreatePersonalizedToolkitEntries = async (): Promise<CreatePersonalizedToolkitEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CREATE_PERSONALIZED_TOOLKIT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch create personalized toolkit entries: ${response.statusText}`);
        }

        const data: CreatePersonalizedToolkitEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching create personalized toolkit entries:', error);
        throw error;
    }
};

/**
 * Create a new create personalized toolkit entry
 * @param entry - Create personalized toolkit entry data
 */
export const createCreatePersonalizedToolkitEntry = async (entry: CreatePersonalizedToolkitCreateRequest): Promise<CreatePersonalizedToolkitEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CREATE_PERSONALIZED_TOOLKIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create create personalized toolkit entry: ${response.statusText}`);
        }

        const data: CreatePersonalizedToolkitEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating create personalized toolkit entry:', error);
        throw error;
    }
};

/**
 * Delete a create personalized toolkit entry by ID
 * @param id - Entry ID
 */
export const deleteCreatePersonalizedToolkitEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CREATE_PERSONALIZED_TOOLKIT_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete create personalized toolkit entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting create personalized toolkit entry:', error);
        throw error;
    }
};

