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

export interface LifeSituation {
    housing: string;
    work: string;
    food: string;
    healthcare: string;
}

export interface SafetyBehaviors {
    selfHarm: boolean;
    deathWish: boolean;
    suicidePlans: boolean;
    suicidePrep: boolean;
    suicideAttempts: boolean;
}

export interface EmotionalExperiences {
    sadDepressed: boolean;
    anxiousOnEdge: boolean;
    angryIrritable: boolean;
    panicFear: boolean;
    emptinessConfusion: boolean;
}

export interface BehavioralGoals {
    stopSubstancesForEmotions: boolean;
    stopBingeingOrRestrictingFood: boolean;
    stopRuminatingOverthinking: boolean;
    stopRiskyBehaviors: boolean;
    stopAvoidingResponsibilities: boolean;
    stopExcessiveSleepingResting: boolean;
    stopDistractionsAvoidFeelings: boolean;
    stopFoodForComfort: boolean;
    stopImpulsiveSpending: boolean;
    stopExcessiveWorkingBusy: boolean;
    stopCompulsiveCleaning: boolean;
}

export interface RelationshipGoals {
    improveRelationships: boolean;
    increaseSelfRespect: boolean;
    reduceSelfIsolation: boolean;
    stopLashingOut: boolean;
    stopSelfCriticism: boolean;
    stopSeekingRevenge: boolean;
    stopSeekingReassurance: boolean;
}

export interface TraumaRelatedGoals {
    reduceUnwantedMemories: boolean;
    feelLessOnGuard: boolean;
    reduceNightmaresImproveSleep: boolean;
}

export interface Goals {
    lifeSituation: LifeSituation;
    safetyBehaviors: SafetyBehaviors;
    emotionalExperiences: EmotionalExperiences;
    behavioralGoals: BehavioralGoals;
    relationshipGoals: RelationshipGoals;
    traumaRelatedGoals: TraumaRelatedGoals;
    other: string;
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

/**
 * Fetch goals data
 */
export const fetchGoals = async (): Promise<Goals> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GOALS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch goals: ${response.statusText}`);
        }

        const data: Goals = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching goals:', error);
        throw error;
    }
};

/**
 * Update goals data
 */
export const updateGoals = async (goals: Goals): Promise<Goals> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.GOALS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(goals),
        });

        if (!response.ok) {
            throw new Error(`Failed to update goals: ${response.statusText}`);
        }

        const data: Goals = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error updating goals:', error);
        throw error;
    }
};

export interface CurrentStrengths {
    exercise: boolean;
    meditation: boolean;
    creativeOutlets: boolean;
    journaling: boolean;
    supportFromOthers: boolean;
}

export interface MainTriggers {
    relationshipConflicts: boolean;
    workOrSchool: boolean;
    rejection: boolean;
    feelingOverwhelmed: boolean;
    beingAlone: boolean;
    pastTrauma: boolean;
    other: boolean;
}

export interface SupportSystem {
    family: boolean;
    friends: boolean;
    partner: boolean;
    therapist: boolean;
    supportGroup: boolean;
}

export interface StrengthsAndResources {
    currentStrengths: CurrentStrengths;
    mainTriggers: MainTriggers;
    supportSystem: SupportSystem;
    therapyExperience: string;
    notes: string;
}

/**
 * Fetch strengths and resources data
 */
export const fetchStrengthsAndResources = async (): Promise<StrengthsAndResources> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STRENGTHS_AND_RESOURCES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch strengths and resources: ${response.statusText}`);
        }

        const data: StrengthsAndResources = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching strengths and resources:', error);
        throw error;
    }
};

/**
 * Update strengths and resources data
 */
export const updateStrengthsAndResources = async (data: StrengthsAndResources): Promise<StrengthsAndResources> => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch(API_ENDPOINTS.STRENGTHS_AND_RESOURCES, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to update strengths and resources: ${response.statusText}`);
        }

        const result: StrengthsAndResources = await response.json();
        
        return result;
    } catch (error) {
        console.error('Error updating strengths and resources:', error);
        throw error;
    }
};

