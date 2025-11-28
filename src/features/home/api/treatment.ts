import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

export interface TreatmentPlanSubsection {
    type: string;
    numberOfDays: number;
    items: string[];
}

export interface TreatmentPlanSection {
    numberOfDays: number;
    objective: string;
    subsections: TreatmentPlanSubsection[];
}

export type TreatmentPlan = TreatmentPlanSection[];

/**
 * Fetch treatment plan data
 */
export const fetchTreatmentPlan = async (): Promise<TreatmentPlan> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.TREATMENT_PLAN, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch treatment plan: ${response.statusText}`);
        }

        const data: TreatmentPlan = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching treatment plan:', error);
        throw error;
    }
};

