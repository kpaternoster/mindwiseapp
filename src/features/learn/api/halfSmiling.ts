import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Mindful Half Smile Practice ====================

export interface MindfulHalfSmilePracticeEntry {
    id: string;
    time: number;
    calmingVisualization: string;
    bodyResponse: string;
    reflection: string;
}

export interface MindfulHalfSmilePracticeCreateRequest {
    calmingVisualization: string;
    bodyResponse: string;
    reflection: string;
}

/**
 * Fetch list of all mindful half smile practice entries
 */
export const fetchMindfulHalfSmilePracticeEntries = async (): Promise<MindfulHalfSmilePracticeEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.MINDFUL_HALF_SMILE_PRACTICE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch mindful half smile practice entries: ${response.statusText}`);
        }

        const data: MindfulHalfSmilePracticeEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching mindful half smile practice entries:', error);
        throw error;
    }
};

/**
 * Create a new mindful half smile practice entry
 * @param entry - Mindful half smile practice entry data
 */
export const createMindfulHalfSmilePracticeEntry = async (entry: MindfulHalfSmilePracticeCreateRequest): Promise<MindfulHalfSmilePracticeEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.MINDFUL_HALF_SMILE_PRACTICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create mindful half smile practice entry: ${response.statusText}`);
        }

        const data: MindfulHalfSmilePracticeEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating mindful half smile practice entry:', error);
        throw error;
    }
};

/**
 * Delete a mindful half smile practice entry by ID
 * @param id - Entry ID
 */
export const deleteMindfulHalfSmilePracticeEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.MINDFUL_HALF_SMILE_PRACTICE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete mindful half smile practice entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting mindful half smile practice entry:', error);
        throw error;
    }
};

// ==================== Emotion Mapping ====================

export interface EmotionMappingEntry {
    id: string;
    time: number;
    situation: string;
    emotions: string;
    bodyResponse: string;
    howHalfSmileCouldHelp: string;
    futurePlan: string;
}

export interface EmotionMappingCreateRequest {
    situation: string;
    emotions: string;
    bodyResponse: string;
    howHalfSmileCouldHelp: string;
    futurePlan: string;
}

/**
 * Fetch list of all emotion mapping entries
 */
export const fetchEmotionMappingEntries = async (): Promise<EmotionMappingEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTION_MAPPING, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch emotion mapping entries: ${response.statusText}`);
        }

        const data: EmotionMappingEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching emotion mapping entries:', error);
        throw error;
    }
};

/**
 * Create a new emotion mapping entry
 * @param entry - Emotion mapping entry data
 */
export const createEmotionMappingEntry = async (entry: EmotionMappingCreateRequest): Promise<EmotionMappingEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTION_MAPPING, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create emotion mapping entry: ${response.statusText}`);
        }

        const data: EmotionMappingEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating emotion mapping entry:', error);
        throw error;
    }
};

/**
 * Delete an emotion mapping entry by ID
 * @param id - Entry ID
 */
export const deleteEmotionMappingEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTION_MAPPING_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete emotion mapping entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting emotion mapping entry:', error);
        throw error;
    }
};

// ==================== Half Smile in Action ====================

export interface HalfSmileInActionEntry {
    id: string;
    time: number;
    activity: string;
    before: string;
    during: string;
    after: string;
    whatChanged: string;
}

export interface HalfSmileInActionCreateRequest {
    activity: string;
    before: string;
    during: string;
    after: string;
    whatChanged: string;
}

/**
 * Fetch list of all half smile in action entries
 */
export const fetchHalfSmileInActionEntries = async (): Promise<HalfSmileInActionEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.HALF_SMILE_IN_ACTION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch half smile in action entries: ${response.statusText}`);
        }

        const data: HalfSmileInActionEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching half smile in action entries:', error);
        throw error;
    }
};

/**
 * Create a new half smile in action entry
 * @param entry - Half smile in action entry data
 */
export const createHalfSmileInActionEntry = async (entry: HalfSmileInActionCreateRequest): Promise<HalfSmileInActionEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.HALF_SMILE_IN_ACTION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create half smile in action entry: ${response.statusText}`);
        }

        const data: HalfSmileInActionEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating half smile in action entry:', error);
        throw error;
    }
};

/**
 * Delete a half smile in action entry by ID
 * @param id - Entry ID
 */
export const deleteHalfSmileInActionEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.HALF_SMILE_IN_ACTION_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete half smile in action entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting half smile in action entry:', error);
        throw error;
    }
};

// ==================== Anchor Prompts ====================

export interface AnchorPromptsEntry {
    id: string;
    time: number;
    prompts: string[];
    reflection: string;
}

export interface AnchorPromptsCreateRequest {
    prompts: string[];
    reflection: string;
}

/**
 * Fetch list of all anchor prompts entries
 */
export const fetchAnchorPromptsEntries = async (): Promise<AnchorPromptsEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ANCHOR_PROMPTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch anchor prompts entries: ${response.statusText}`);
        }

        const data: AnchorPromptsEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching anchor prompts entries:', error);
        throw error;
    }
};

/**
 * Create a new anchor prompts entry
 * @param entry - Anchor prompts entry data
 */
export const createAnchorPromptsEntry = async (entry: AnchorPromptsCreateRequest): Promise<AnchorPromptsEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ANCHOR_PROMPTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create anchor prompts entry: ${response.statusText}`);
        }

        const data: AnchorPromptsEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating anchor prompts entry:', error);
        throw error;
    }
};

/**
 * Delete an anchor prompts entry by ID
 * @param id - Entry ID
 */
export const deleteAnchorPromptsEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ANCHOR_PROMPTS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete anchor prompts entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting anchor prompts entry:', error);
        throw error;
    }
};

