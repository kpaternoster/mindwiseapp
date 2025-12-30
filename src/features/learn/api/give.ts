import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== GIVE Reframing ====================

export interface GiveReframingEntry {
    id: string;
    time: number;
    situation: string;
    howItWentWithout: string;
    beGentle: string;
    showInterest: string;
    validate: string;
    easyManner: string;
    fullGIVEConversation: string;
    differences: string;
    insights: string;
    future: string;
}

export interface GiveReframingCreateRequest {
    situation: string;
    howItWentWithout: string;
    beGentle: string;
    showInterest: string;
    validate: string;
    easyManner: string;
    fullGIVEConversation: string;
    differences: string;
    insights: string;
    future: string;
}

/**
 * Fetch list of all GIVE reframing entries
 */
export const fetchGiveReframingEntries = async (): Promise<GiveReframingEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GIVE_REFRAMING, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch GIVE reframing entries: ${response.statusText}`);
        }

        const data: GiveReframingEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching GIVE reframing entries:', error);
        throw error;
    }
};

/**
 * Create a new GIVE reframing entry
 * @param entry - GIVE reframing entry data
 */
export const createGiveReframingEntry = async (entry: GiveReframingCreateRequest): Promise<GiveReframingEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GIVE_REFRAMING, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create GIVE reframing entry: ${response.statusText}`);
        }

        const data: GiveReframingEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating GIVE reframing entry:', error);
        throw error;
    }
};

/**
 * Delete a GIVE reframing entry by ID
 * @param id - Entry ID
 */
export const deleteGiveReframingEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GIVE_REFRAMING_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete GIVE reframing entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting GIVE reframing entry:', error);
        throw error;
    }
};

// ==================== GIVE Practice ====================

export interface GivePracticeEntry {
    id: string;
    time: number;
    validation1: string;
    validation1Response: string;
    validation2: string;
    validation2Response: string;
    validation3: string;
    validation3Response: string;
    who: string;
    checkInMessage: string;
    checkInResponse: string;
    connection: string;
    challenges: string;
    elements: string;
    differentNextTime: string;
    continuedPractice: string;
}

export interface GivePracticeCreateRequest {
    validation1: string;
    validation1Response: string;
    validation2: string;
    validation2Response: string;
    validation3: string;
    validation3Response: string;
    who: string;
    checkInMessage: string;
    checkInResponse: string;
    connection: string;
    challenges: string;
    elements: string;
    differentNextTime: string;
    continuedPractice: string;
}

/**
 * Fetch list of all GIVE practice entries
 */
export const fetchGivePracticeEntries = async (): Promise<GivePracticeEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GIVE_PRACTICE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch GIVE practice entries: ${response.statusText}`);
        }

        const data: GivePracticeEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching GIVE practice entries:', error);
        throw error;
    }
};

/**
 * Create a new GIVE practice entry
 * @param entry - GIVE practice entry data
 */
export const createGivePracticeEntry = async (entry: GivePracticeCreateRequest): Promise<GivePracticeEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GIVE_PRACTICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create GIVE practice entry: ${response.statusText}`);
        }

        const data: GivePracticeEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating GIVE practice entry:', error);
        throw error;
    }
};

/**
 * Delete a GIVE practice entry by ID
 * @param id - Entry ID
 */
export const deleteGivePracticeEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GIVE_PRACTICE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete GIVE practice entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting GIVE practice entry:', error);
        throw error;
    }
};

