import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Self-Care Reflection ====================

export interface SelfCareReflectionEntry {
    id: string;
    time: number;
    physicalIllness: string;
    sleep: string;
    eating: string;
    substances: string;
    adequateSleep: string;
    exercise: string;
    insights: string;
    plan: string;
}

export interface SelfCareReflectionCreateRequest {
    physicalIllness: string;
    sleep: string;
    eating: string;
    substances: string;
    adequateSleep: string;
    exercise: string;
    insights: string;
    plan: string;
}

/**
 * Fetch list of all self-care reflection entries
 */
export const fetchSelfCareReflectionEntries = async (): Promise<SelfCareReflectionEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_CARE_REFLECTION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch self-care reflection entries: ${response.statusText}`);
        }

        const data: SelfCareReflectionEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching self-care reflection entries:', error);
        throw error;
    }
};

/**
 * Create a new self-care reflection entry
 * @param entry - Self-care reflection entry data
 */
export const createSelfCareReflectionEntry = async (entry: SelfCareReflectionCreateRequest): Promise<SelfCareReflectionEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_CARE_REFLECTION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create self-care reflection entry: ${response.statusText}`);
        }

        const data: SelfCareReflectionEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating self-care reflection entry:', error);
        throw error;
    }
};

/**
 * Delete a self-care reflection entry by ID
 * @param id - Entry ID
 */
export const deleteSelfCareReflectionEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_CARE_REFLECTION_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete self-care reflection entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting self-care reflection entry:', error);
        throw error;
    }
};

