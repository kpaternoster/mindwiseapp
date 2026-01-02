import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

export interface Category {
    category: string;
    completed: boolean;
}

export interface BroadCategory {
    broadCategory: string;
    categories: Category[];
    numberOfCategories: number;
    numberOfCategoriesCompleted: number;
}

export interface LearningProgress {
    broadCategories: BroadCategory[];
    totalProgress: number;
}

/**
 * Fetch learning progress data
 */
export const fetchLearningProgress = async (): Promise<LearningProgress> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LEARNING_PROGRESS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch learning progress: ${response.statusText}`);
        }

        const data: LearningProgress = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching learning progress:', error);
        throw error;
    }
};

/**
 * Mark a category as completed
 * @param category - The category name to mark as completed
 */
export const markCategoryCompleted = async (category: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LEARNING_PROGRESS_MARK_COMPLETED(category), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to mark category as completed: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error marking category as completed:', error);
        throw error;
    }
};

