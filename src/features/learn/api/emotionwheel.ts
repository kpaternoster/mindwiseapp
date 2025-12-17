import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Emotions Wheel Reflections ====================

export interface EmotionsWheelReflection {
    id: string;
    time: number;
    body: string;
    thoughts: string;
    urges: string;
    guess: string;
    actual: string;
}

export interface EmotionsWheelReflectionCreateRequest {
    body: string;
    thoughts: string;
    urges: string;
    guess: string;
    actual: string;
}

/**
 * Fetch list of all emotions wheel reflections
 */
export const fetchEmotionsWheelReflections = async (): Promise<EmotionsWheelReflection[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTIONS_WHEEL_REFLECTIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch emotions wheel reflections: ${response.statusText}`);
        }

        const data: EmotionsWheelReflection[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching emotions wheel reflections:', error);
        throw error;
    }
};

/**
 * Create a new emotions wheel reflection
 * @param reflection - Emotions wheel reflection data
 */
export const createEmotionsWheelReflection = async (reflection: EmotionsWheelReflectionCreateRequest): Promise<EmotionsWheelReflection> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTIONS_WHEEL_REFLECTIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reflection),
        });

        if (!response.ok) {
            throw new Error(`Failed to create emotions wheel reflection: ${response.statusText}`);
        }

        const data: EmotionsWheelReflection = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating emotions wheel reflection:', error);
        throw error;
    }
};

/**
 * Delete an emotions wheel reflection by ID
 * @param id - Reflection ID
 */
export const deleteEmotionsWheelReflection = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTIONS_WHEEL_REFLECTIONS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete emotions wheel reflection: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting emotions wheel reflection:', error);
        throw error;
    }
};

// ==================== Emotions Tracking ====================

export interface EmotionTrackingEntry {
    primary: string;
    secondary: string;
    intensity: number;
}

export type EmotionTrackingDay = (EmotionTrackingEntry | null)[];

/**
 * Fetch emotions tracking data for a specific date
 * @param date - Date string in format YYYY-MM-DD
 */
export const fetchEmotionsTracking = async (date: string): Promise<EmotionTrackingDay> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTIONS_TRACKING(date), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch emotions tracking: ${response.statusText}`);
        }

        const data: EmotionTrackingDay = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching emotions tracking:', error);
        throw error;
    }
};

/**
 * Update or create emotions tracking entry for a specific date
 * @param date - Date string in format YYYY-MM-DD
 * @param entry - Emotion tracking entry data
 */
export const updateEmotionsTracking = async (date: string, entry: EmotionTrackingEntry): Promise<EmotionTrackingEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.EMOTIONS_TRACKING(date), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to update emotions tracking: ${response.statusText}`);
        }

        const data: EmotionTrackingEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error updating emotions tracking:', error);
        throw error;
    }
};

// ==================== Practice with Others ====================

export interface PracticeWithOthersEntry {
    id: string;
    time: number;
    who: string;
    what: string;
    guess: string;
    whatDidTheySay: string;
    notes: string;
}

export interface PracticeWithOthersCreateRequest {
    who: string;
    what: string;
    guess: string;
    whatDidTheySay: string;
    notes: string;
}

/**
 * Fetch list of all practice with others entries
 */
export const fetchPracticeWithOthers = async (): Promise<PracticeWithOthersEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PRACTICE_WITH_OTHERS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch practice with others entries: ${response.statusText}`);
        }

        const data: PracticeWithOthersEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching practice with others entries:', error);
        throw error;
    }
};

/**
 * Create a new practice with others entry
 * @param entry - Practice with others entry data
 */
export const createPracticeWithOthers = async (entry: PracticeWithOthersCreateRequest): Promise<PracticeWithOthersEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PRACTICE_WITH_OTHERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create practice with others entry: ${response.statusText}`);
        }

        const data: PracticeWithOthersEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating practice with others entry:', error);
        throw error;
    }
};

/**
 * Delete a practice with others entry by ID
 * @param id - Entry ID
 */
export const deletePracticeWithOthers = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PRACTICE_WITH_OTHERS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete practice with others entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting practice with others entry:', error);
        throw error;
    }
};

