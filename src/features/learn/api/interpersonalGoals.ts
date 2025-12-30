import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Clarify Your Goals ====================

export interface ClarifyYourGoalsEntry {
    id: string;
    time: number;
    situation: string;
    objectiveGoal: string;
    relationshipGoal: string;
    selfRespectGoal: string;
    goal1: string;
    goal2: string;
    goal3: string;
    priorityReasoning: string;
}

export interface ClarifyYourGoalsCreateRequest {
    situation: string;
    objectiveGoal: string;
    relationshipGoal: string;
    selfRespectGoal: string;
    goal1: string;
    goal2: string;
    goal3: string;
    priorityReasoning: string;
}

/**
 * Fetch list of all clarify your goals entries
 */
export const fetchClarifyYourGoalsEntries = async (): Promise<ClarifyYourGoalsEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CLARIFY_YOUR_GOALS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch clarify your goals entries: ${response.statusText}`);
        }

        const data: ClarifyYourGoalsEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching clarify your goals entries:', error);
        throw error;
    }
};

/**
 * Create a new clarify your goals entry
 * @param entry - Clarify your goals entry data
 */
export const createClarifyYourGoalsEntry = async (entry: ClarifyYourGoalsCreateRequest): Promise<ClarifyYourGoalsEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CLARIFY_YOUR_GOALS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create clarify your goals entry: ${response.statusText}`);
        }

        const data: ClarifyYourGoalsEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating clarify your goals entry:', error);
        throw error;
    }
};

/**
 * Delete a clarify your goals entry by ID
 * @param id - Entry ID
 */
export const deleteClarifyYourGoalsEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CLARIFY_YOUR_GOALS_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete clarify your goals entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting clarify your goals entry:', error);
        throw error;
    }
};

// ==================== Plan Your Response ====================

export interface PlanYourResponseEntry {
    id: string;
    time: number;
    situation: string;
    valuesAlignment: string;
    goalsAlignment: string;
    wordsPlan: string;
    tonePlan: string;
    desiredOutcome: string;
    backupPlan: string;
    reflection: string;
}

export interface PlanYourResponseCreateRequest {
    situation: string;
    valuesAlignment: string;
    goalsAlignment: string;
    wordsPlan: string;
    tonePlan: string;
    desiredOutcome: string;
    backupPlan: string;
    reflection: string;
}

/**
 * Fetch list of all plan your response entries
 */
export const fetchPlanYourResponseEntries = async (): Promise<PlanYourResponseEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PLAN_YOUR_RESPONSE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch plan your response entries: ${response.statusText}`);
        }

        const data: PlanYourResponseEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching plan your response entries:', error);
        throw error;
    }
};

/**
 * Create a new plan your response entry
 * @param entry - Plan your response entry data
 */
export const createPlanYourResponseEntry = async (entry: PlanYourResponseCreateRequest): Promise<PlanYourResponseEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PLAN_YOUR_RESPONSE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create plan your response entry: ${response.statusText}`);
        }

        const data: PlanYourResponseEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating plan your response entry:', error);
        throw error;
    }
};

/**
 * Delete a plan your response entry by ID
 * @param id - Entry ID
 */
export const deletePlanYourResponseEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PLAN_YOUR_RESPONSE_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete plan your response entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting plan your response entry:', error);
        throw error;
    }
};

