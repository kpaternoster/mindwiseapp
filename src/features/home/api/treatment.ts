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

export interface DbtOverviewPartsCompleted {
    understandYourself: number;
    understandEmotions: number;
    aboutDBT: number;
    dbtSkills: number;
    dbtJourney: number;
}

export interface PreTreatmentState {
    dbtOverviewPartsCompleted: DbtOverviewPartsCompleted;
    stepsCompleted: number;
}

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

/**
 * Fetch pre-treatment state data
 */
export const fetchPreTreatmentState = async (): Promise<PreTreatmentState> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PRE_TREATMENT_STATE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch pre-treatment state: ${response.statusText}`);
        }

        const data: PreTreatmentState = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching pre-treatment state:', error);
        throw error;
    }
};

/**
 * Update pre-treatment state data
 */
export const updatePreTreatmentState = async (state: PreTreatmentState): Promise<PreTreatmentState> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PRE_TREATMENT_STATE, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(state),
        });

        if (!response.ok) {
            throw new Error(`Failed to update pre-treatment state: ${response.statusText}`);
        }

        const data: PreTreatmentState = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error updating pre-treatment state:', error);
        throw error;
    }
};

