import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

export interface UserProfile {
    name: string;
    memberSince: string;
    avatar?: string;
}

interface UserProfileAPIResponse {
    email: string;
    createdAt: number;
    name: string;
    preferredLearningStyle: string;
    englishFluency: string;
    uiContrast: string;
    uiFont: string;
    collectivist: boolean | null;
    emotional: boolean | null;
    impatient: boolean | null;
}

export interface Contact {
    id: string;
    name: string;
    role: string;
    lastActive: string;
    avatar?: string;
}

interface ContactAPIResponse {
    type: 'provider' | 'emergency';
    id: string | null;
    nickname: string | null;
    name: string;
    email: string | null;
    internationalPrefix: number;
    number: number;
    relationship: string | null;
    category: string | null;
    lastActive: number | null;
}

interface RecentReward {
    id: string;
    name: string;
    leaves: number;
    timeEarned: number;
}

interface ProgressAPIResponse {
    stage: number;
    leaves: number;
    leavesRemainingUntilNextStage: number;
    recentRewards: RecentReward[];
}

export interface Progress {
    level: string;
    currentStage: number;
    totalStages: number;
    currentLeaves: number;
    leavesToNextStage: number;
    progressPercentage: number;
}

/**
 * Helper function to generate a simple UUID
 */
const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

/**
 * Helper function to convert Unix timestamp to human-readable format
 */
const formatLastActive = (timestamp: number | null): string => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
};


/**
 * Helper function to map stage number to level name
 */
const getStageName = (stage: number): string => {
    const stageNames: { [key: number]: string } = {
        1: 'Seedling',
        2: 'Sprout',
        3: 'Young Plant',
        4: 'Mature Plant',
        5: 'Flowering',
        6: 'Full Bloom',
    };
    return stageNames[stage] || 'Seedling';
};

/**
 * Helper function to calculate progress percentage
 * Based on total leaves needed per stage (500) and leaves remaining
 */
const calculateProgressPercentage = (currentStage: number, totalStages: number = 6): number => {
    const percentage = Math.round((currentStage / totalStages) * 100);
    return Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100
};

/**
 * Fetch user profile information
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PROFILE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }

        const data: UserProfileAPIResponse = await response.json();
        
        // Calculate year from createdAt timestamp (Unix timestamp in seconds)
        const memberSinceYear = new Date(data.createdAt * 1000).getFullYear().toString();

        return {
            name: data.name ?? data.email,
            memberSince: memberSinceYear,
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

/**
 * Fetch user contacts
 */
export const fetchUserContacts = async (): Promise<Contact[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.CONTACTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch contacts: ${response.statusText}`);
        }

        const data: ContactAPIResponse[] = await response.json();
        // Filter only emergency contacts and map to Contact interface
        const emergencyContacts = data
            .filter(contact => contact.type === 'emergency')
            .map(contact => ({
                id: contact.id || generateUUID(), // Generate ID if null
                name: contact.name,
                role: contact.relationship || 'Contact',
                lastActive: formatLastActive(contact.lastActive),
            }));
        return emergencyContacts;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

/**
 * Fetch user progress
 */
export const fetchUserProgress = async (): Promise<Progress> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.PROGRESS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch progress: ${response.statusText}`);
        }

        const data: ProgressAPIResponse = await response.json();

        // Map API response to Progress interface
        return {
            level: getStageName(data.stage),
            currentStage: data.stage,
            totalStages: 6, // Total number of stages
            currentLeaves: data.leaves,
            leavesToNextStage: data.leavesRemainingUntilNextStage,
            progressPercentage: calculateProgressPercentage(data.stage),
        };
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
    }
};

/**
 * Letter from Future Self API types and functions
 */
export interface LetterFromFutureSelfResponse {
    openingMessage: string;
    emotionHandling: string;
    relationshipChanges: string;
    selfTreatment: string;
}

export interface LetterFromFutureSelfRequest {
    openingMessage: string;
    emotionHandling: string;
    relationshipChanges: string;
    selfTreatment: string;
}

/**
 * Fetch letter from future self
 */
export const fetchLetterFromFutureSelf = async (): Promise<LetterFromFutureSelfResponse> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LETTER_FROM_FUTURE_SELF, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch letter from future self: ${response.statusText}`);
        }

        const data: LetterFromFutureSelfResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching letter from future self:', error);
        throw error;
    }
};

/**
 * Update letter from future self
 */
export const updateLetterFromFutureSelf = async (
    letterData: LetterFromFutureSelfRequest
): Promise<LetterFromFutureSelfResponse> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.LETTER_FROM_FUTURE_SELF, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(letterData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update letter from future self: ${response.statusText}`);
        }

        const data: LetterFromFutureSelfResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating letter from future self:', error);
        throw error;
    }
};

