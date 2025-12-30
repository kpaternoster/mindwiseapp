import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Reflective Practice ====================

export interface ReflectivePracticeEntry {
    id: string;
    time: number;
    situation: string;
    reflection: string;
}

export interface ReflectivePracticeCreateRequest {
    situation: string;
    reflection: string;
}

/**
 * Fetch list of all reflective practice entries
 */
export const fetchReflectivePracticeEntries = async (): Promise<ReflectivePracticeEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFLECTIVE_PRACTICE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reflective practice entries: ${response.statusText}`);
        }

        const data: ReflectivePracticeEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching reflective practice entries:', error);
        throw error;
    }
};

/**
 * Create a new reflective practice entry
 * @param entry - Reflective practice entry data
 */
export const createReflectivePracticeEntry = async (entry: ReflectivePracticeCreateRequest): Promise<ReflectivePracticeEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFLECTIVE_PRACTICE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create reflective practice entry: ${response.statusText}`);
        }

        const data: ReflectivePracticeEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating reflective practice entry:', error);
        throw error;
    }
};

/**
 * Delete a reflective practice entry by ID
 * @param id - Entry ID
 */
export const deleteReflectivePracticeEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.REFLECTIVE_PRACTICE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete reflective practice entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting reflective practice entry:', error);
        throw error;
    }
};

// ==================== STOP Drill ====================

export interface StopDrillEntry {
    id: string;
    time: number;
    stopPlan: string;
    takeAStepBackPlan: string;
    observePlan: string;
    proceedMindfullyPlan: string;
}

export interface StopDrillCreateRequest {
    stopPlan: string;
    takeAStepBackPlan: string;
    observePlan: string;
    proceedMindfullyPlan: string;
}

/**
 * Fetch list of all STOP drill entries
 */
export const fetchStopDrillEntries = async (): Promise<StopDrillEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STOP_DRILL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch STOP drill entries: ${response.statusText}`);
        }

        const data: StopDrillEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching STOP drill entries:', error);
        throw error;
    }
};

/**
 * Create a new STOP drill entry
 * @param entry - STOP drill entry data
 */
export const createStopDrillEntry = async (entry: StopDrillCreateRequest): Promise<StopDrillEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STOP_DRILL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create STOP drill entry: ${response.statusText}`);
        }

        const data: StopDrillEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating STOP drill entry:', error);
        throw error;
    }
};

/**
 * Delete a STOP drill entry by ID
 * @param id - Entry ID
 */
export const deleteStopDrillEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STOP_DRILL_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete STOP drill entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting STOP drill entry:', error);
        throw error;
    }
};

// ==================== Mindful Pause Timer ====================

export interface MindfulPauseTimerEntry {
    id: string;
    time: number;
    completed: boolean;
    reflection: string;
}

export interface MindfulPauseTimerCreateRequest {
    completed: boolean;
    reflection: string;
}

/**
 * Fetch list of all mindful pause timer entries
 */
export const fetchMindfulPauseTimerEntries = async (): Promise<MindfulPauseTimerEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.MINDFUL_PAUSE_TIMER, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch mindful pause timer entries: ${response.statusText}`);
        }

        const data: MindfulPauseTimerEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching mindful pause timer entries:', error);
        throw error;
    }
};

/**
 * Create a new mindful pause timer entry
 * @param entry - Mindful pause timer entry data
 */
export const createMindfulPauseTimerEntry = async (entry: MindfulPauseTimerCreateRequest): Promise<MindfulPauseTimerEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.MINDFUL_PAUSE_TIMER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create mindful pause timer entry: ${response.statusText}`);
        }

        const data: MindfulPauseTimerEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating mindful pause timer entry:', error);
        throw error;
    }
};

/**
 * Delete a mindful pause timer entry by ID
 * @param id - Entry ID
 */
export const deleteMindfulPauseTimerEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.MINDFUL_PAUSE_TIMER_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete mindful pause timer entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting mindful pause timer entry:', error);
        throw error;
    }
};

// ==================== Role Play ====================

export interface RolePlayEntry {
    id: string;
    time: number;
    who: string;
    scenario: string;
    reflection: string;
}

export interface RolePlayCreateRequest {
    who: string;
    scenario: string;
    reflection: string;
}

/**
 * Fetch list of all role play entries
 */
export const fetchRolePlayEntries = async (): Promise<RolePlayEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ROLE_PLAY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch role play entries: ${response.statusText}`);
        }

        const data: RolePlayEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching role play entries:', error);
        throw error;
    }
};

/**
 * Create a new role play entry
 * @param entry - Role play entry data
 */
export const createRolePlayEntry = async (entry: RolePlayCreateRequest): Promise<RolePlayEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ROLE_PLAY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create role play entry: ${response.statusText}`);
        }

        const data: RolePlayEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating role play entry:', error);
        throw error;
    }
};

/**
 * Delete a role play entry by ID
 * @param id - Entry ID
 */
export const deleteRolePlayEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.ROLE_PLAY_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete role play entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting role play entry:', error);
        throw error;
    }
};

