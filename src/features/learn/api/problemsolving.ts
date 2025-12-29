import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

// ==================== Problem Solving ====================

export interface ProblemSolvingEntry {
    id: string;
    time: number;
    problem: string;
    options: string[];
    pros: string[];
    cons: string[];
    choice: string;
    bestChoice: string;
    implementation: string;
    whyBestChoice: string;
    reflection: string;
}

export interface ProblemSolvingCreateRequest {
    problem: string;
    options: string[];
    pros: string[];
    cons: string[];
    choice: string;
    bestChoice: string;
    implementation: string;
    whyBestChoice: string;
    reflection: string;
}

/**
 * Fetch list of all problem solving entries
 */
export const fetchProblemSolvingEntries = async (): Promise<ProblemSolvingEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PROBLEM_SOLVING, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch problem solving entries: ${response.statusText}`);
        }

        const data: ProblemSolvingEntry[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching problem solving entries:', error);
        throw error;
    }
};

/**
 * Create a new problem solving entry
 * @param entry - Problem solving entry data
 */
export const createProblemSolvingEntry = async (entry: ProblemSolvingCreateRequest): Promise<ProblemSolvingEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PROBLEM_SOLVING, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error(`Failed to create problem solving entry: ${response.statusText}`);
        }

        const data: ProblemSolvingEntry = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error creating problem solving entry:', error);
        throw error;
    }
};

/**
 * Delete a problem solving entry by ID
 * @param id - Entry ID
 */
export const deleteProblemSolvingEntry = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PROBLEM_SOLVING_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete problem solving entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting problem solving entry:', error);
        throw error;
    }
};

