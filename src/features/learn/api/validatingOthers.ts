import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Self Reflection ====================

export interface SelfReflectionEntry {
    id: string;
    time: number;
    unheardOrInvalidatedTime: string;
    emotions: string;
    response: string;
    reflection: string;
}

export interface SelfReflectionCreateRequest {
    unheardOrInvalidatedTime: string;
    emotions: string;
    response: string;
    reflection: string;
}

/**
 * Fetch list of all self reflection entries
 */
export const fetchSelfReflectionEntries = async (): Promise<SelfReflectionEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_REFLECTION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch self reflection entries: ${response.statusText}`);
        }

        const data: SelfReflectionEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching self reflection entries:', error);
        throw error;
    }
};

/**
 * Create a new self reflection entry
 * @param entry - Self reflection entry data
 */
export const createSelfReflectionEntry = async (entry: SelfReflectionCreateRequest): Promise<SelfReflectionEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_REFLECTION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create self reflection entry: ${response.statusText}`);
        }

        const data: SelfReflectionEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating self reflection entry:', error);
        throw error;
    }
};

/**
 * Delete a self reflection entry by ID
 * @param id - Entry ID
 */
export const deleteSelfReflectionEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SELF_REFLECTION_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete self reflection entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting self reflection entry:', error);
        throw error;
    }
};

// ==================== Validation Practice ====================

export interface ValidationPracticeEntry {
    id: string;
    time: number;
    recentConversation: string;
    challenges: string;
    engagementTechniques: string;
    topic: string;
    speakerFeelings: string;
    listenerFeelings: string;
    learnings: string;
    areas: string;
    practice: string;
    emotionalSituation: string;
    emotions: string;
    validatingResponse: string;
    advice: string;
    dismissivePhrase1: string;
    validatingResponse1: string;
    dismissivePhrase2: string;
    validatingResponse2: string;
    dismissivePhrase3: string;
    validatingResponse3: string;
    practiceScenario: string;
    validationApproach: string;
    reflection: string;
}

export interface ValidationPracticeCreateRequest {
    recentConversation: string;
    challenges: string;
    engagementTechniques: string;
    topic: string;
    speakerFeelings: string;
    listenerFeelings: string;
    learnings: string;
    areas: string;
    practice: string;
    emotionalSituation: string;
    emotions: string;
    validatingResponse: string;
    advice: string;
    dismissivePhrase1: string;
    validatingResponse1: string;
    dismissivePhrase2: string;
    validatingResponse2: string;
    dismissivePhrase3: string;
    validatingResponse3: string;
    practiceScenario: string;
    validationApproach: string;
    reflection: string;
}

/**
 * Fetch list of all validation practice entries
 */
export const fetchValidationPracticeEntries = async (): Promise<ValidationPracticeEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.VALIDATION_PRACTICE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch validation practice entries: ${response.statusText}`);
        }

        const data: ValidationPracticeEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching validation practice entries:', error);
        throw error;
    }
};

/**
 * Create a new validation practice entry
 * @param entry - Validation practice entry data
 */
export const createValidationPracticeEntry = async (entry: ValidationPracticeCreateRequest): Promise<ValidationPracticeEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.VALIDATION_PRACTICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create validation practice entry: ${response.statusText}`);
        }

        const data: ValidationPracticeEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating validation practice entry:', error);
        throw error;
    }
};

/**
 * Delete a validation practice entry by ID
 * @param id - Entry ID
 */
export const deleteValidationPracticeEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.VALIDATION_PRACTICE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete validation practice entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting validation practice entry:', error);
        throw error;
    }
};

