import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

export interface SudsCheckin {
    distress: number;
    bodySensations: string;
    thoughts: string;
    urges: string;
    triggers: string;
}

export interface SudsCheckinListItem {
    date: string;
    distress: number;
    bodySensations: string;
    thoughts: string;
    urges: string;
    triggers: string;
}

export interface SudsCopingPlan {
    mild: string[];
    moderate: string[];
    high: string[];
    extreme: string[];
}

/**
 * Fetch SUDS check-in data for a specific date
 * @param date - Date string in format YYYY-MM-DD
 */
export const fetchSudsCheckin = async (date: string): Promise<SudsCheckin> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SUDS_CHECKIN(date), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch SUDS check-in: ${response.statusText}`);
        }

        const data: SudsCheckin = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching SUDS check-in:', error);
        throw error;
    }
};

/**
 * Update or create SUDS check-in data for a specific date
 * @param date - Date string in format YYYY-MM-DD
 * @param checkin - SUDS check-in data
 */
export const updateSudsCheckin = async (date: string, checkin: SudsCheckin): Promise<SudsCheckin> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SUDS_CHECKIN(date), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(checkin),
        });

        if (!response.ok) {
            throw new Error(`Failed to update SUDS check-in: ${response.statusText}`);
        }

        const data: SudsCheckin = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error updating SUDS check-in:', error);
        throw error;
    }
};

/**
 * Fetch list of all SUDS check-in entries
 */
export const fetchSudsList = async (): Promise<SudsCheckinListItem[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SUDS_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch SUDS list: ${response.statusText}`);
        }

        const data: SudsCheckinListItem[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching SUDS list:', error);
        throw error;
    }
};

/**
 * Fetch SUDS calendar data for a specific month
 * @param month - Month string in format YYYY-MM
 */
export const fetchSudsCalendar = async (month: string): Promise<(number | null)[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SUDS_CALENDAR(month), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch SUDS calendar: ${response.statusText}`);
        }

        const data: (number | null)[] = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching SUDS calendar:', error);
        throw error;
    }
};

/**
 * Fetch SUDS coping plan
 */
export const fetchSudsCopingPlan = async (): Promise<SudsCopingPlan> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SUDS_COPING_PLAN, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch SUDS coping plan: ${response.statusText}`);
        }

        const data: SudsCopingPlan = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching SUDS coping plan:', error);
        throw error;
    }
};

/**
 * Update SUDS coping plan
 * @param copingPlan - SUDS coping plan data
 */
export const updateSudsCopingPlan = async (copingPlan: SudsCopingPlan): Promise<SudsCopingPlan> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.SUDS_COPING_PLAN, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(copingPlan),
        });

        if (!response.ok) {
            throw new Error(`Failed to update SUDS coping plan: ${response.statusText}`);
        }

        const data: SudsCopingPlan = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error updating SUDS coping plan:', error);
        throw error;
    }
};

