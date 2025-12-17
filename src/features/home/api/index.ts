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
 * Diary API types and functions
 */
export interface DiaryEntry {
    distress: number;
    safety: number;
    emotions: {
        [key: string]: number;
    };
    urges: {
        [key: string]: number;
    };
    skillsUsed: string[];
    needHelpWith: string[];
    notes: string;
}

export interface MostRecentDiaryEntry {
    date: string;
    distress: number;
    safety: number;
}

export interface DiaryEntryRequest {
    distress: number;
    safety: number;
    emotions: {
        [key: string]: number;
    };
    urges: {
        [key: string]: number;
    };
    skillsUsed: string[];
    needHelpWith: string[];
    notes: string;
}

/**
 * Fetch diary entry for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 */
export const fetchDiaryEntry = async (date: string): Promise<DiaryEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }
        
        const response = await fetch(`${API_ENDPOINTS.DIARY}/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch diary entry: ${response.statusText}`);
        }

        const data: DiaryEntry = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching diary entry:', error);
        throw error;
    }
};

/**
 * Update or create diary entry for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 * @param entryData - Diary entry data
 */
export const updateDiaryEntry = async (
    date: string,
    entryData: DiaryEntryRequest
): Promise<DiaryEntry> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }
        
        const response = await fetch(`${API_ENDPOINTS.DIARY}/${date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(entryData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update diary entry: ${response.statusText}`);
        }

        const data: DiaryEntry = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating diary entry:', error);
        throw error;
    }
};

/**
 * Delete diary entry for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 */
export const deleteDiaryEntry = async (date: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }
        
        const response = await fetch(`${API_ENDPOINTS.DIARY}/${date}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete diary entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting diary entry:', error);
        throw error;
    }
};

/**
 * Fetch most recent diary entries
 */
export const fetchMostRecentDiaryEntries = async (): Promise<MostRecentDiaryEntry[]> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(`${API_ENDPOINTS.DIARY}/most-recent`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch most recent diary entries: ${response.statusText}`);
        }

        const data: MostRecentDiaryEntry[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching most recent diary entries:', error);
        throw error;
    }
};

/**
 * Today Status API types and functions
 */
export interface TodayStatus {
    todayStatus: string;
    streak: number;
    thisWeek: number;
    totalEntries: number;
}

/**
 * Fetch today's status for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 */
export const fetchTodayStatus = async (date: string): Promise<TodayStatus> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }
        
        const response = await fetch(`${API_ENDPOINTS.TODAY_STATUS}/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch today status: ${response.statusText}`);
        }

        const data: TodayStatus = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching today status:', error);
        throw error;
    }
};

/**
 * Progress Tracking API types and functions
 */
export interface ProgressTracking {
    distress: (number | null)[];
    totalPositiveEmotions: (number | null)[];
    totalNegativeEmotions: (number | null)[];
    totalUrges: (number | null)[];
    numberOfSkillsUsed: (number | null)[];
}

/**
 * Fetch progress tracking data for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 */
export const fetchProgressTracking = async (date: string): Promise<ProgressTracking> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }

        const response = await fetch(`${API_ENDPOINTS.PROGRESS_TRACKING}/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch progress tracking: ${response.statusText}`);
        }

        const data: ProgressTracking = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching progress tracking:', error);
        throw error;
    }
};

/**
 * Weekly Review API types and functions
 */
export interface TopEmotion {
    key: string;
    average: number;
}

export interface TopUrge {
    key: string;
    average: number;
}

export interface WeeklyReviewResponse {
    dailyDistress: (number | null)[];
    topEmotions: TopEmotion[];
    topUrges: TopUrge[];
    mostPracticedSkills: string[];
    reflection: string;
}

export interface WeeklyReviewRequest {
    reflection: string;
}

/**
 * Fetch weekly review data for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 */
export const fetchWeeklyReview = async (date: string): Promise<WeeklyReviewResponse> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }

        const response = await fetch(`${API_ENDPOINTS.WEEKLY_REVIEW}/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch weekly review: ${response.statusText}`);
        }

        const data: WeeklyReviewResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weekly review:', error);
        throw error;
    }
};

/**
 * Update weekly review reflection for a specific date
 * @param date - ISO date format (YYYY-MM-DD)
 * @param reviewData - Weekly review data containing reflection
 */
export const updateWeeklyReview = async (
    date: string,
    reviewData: WeeklyReviewRequest
): Promise<WeeklyReviewResponse> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Validate date format (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in ISO format (YYYY-MM-DD)');
        }

        const response = await fetch(`${API_ENDPOINTS.WEEKLY_REVIEW}/${date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update weekly review: ${response.statusText}`);
        }

        const data: WeeklyReviewResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating weekly review:', error);
        throw error;
    }
};

