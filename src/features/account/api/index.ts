import { API_ENDPOINTS } from '@config/env';
import { getAuthToken } from '@hooks/AuthContext';

/**
 * API response format for sharing permissions
 */
export interface SharingPermissionsResponse {
    exerciseData: boolean;
    dailyCheckIn: boolean;
    progressAnalytics: boolean;
    crisisPlans: boolean;
    moodData: boolean;
    twoWayMessaging: boolean;
}

/**
 * API response format for contact
 */
export interface ContactAPIResponse {
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

/**
 * Request body for adding an emergency contact
 */
export interface AddContactRequest {
    name: string;
    email: string;
    internationalPrefix: number;
    number: number;
    relationship: string;
    category: string;
}

/**
 * Response body for adding an emergency contact
 */
export interface AddContactResponse {
    id: string;
}


/**
 * Fetch sharing permissions for a specific contact/provider
 * @param contactId - The contact ID or "provider" for primary therapist
 * @returns Sharing permissions object
 */
export const fetchSharingPermissions = async (
    contactId: string
): Promise<SharingPermissionsResponse> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_ENDPOINTS.SHARING_PERMISSIONS}/${contactId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sharing permissions: ${response.statusText}`);
        }

        const data: SharingPermissionsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sharing permissions:', error);
        throw error;
    }
};

/**
 * Update sharing permissions for a specific contact/provider
 * @param contactId - The contact ID or "provider" for primary therapist
 * @param permissions - The permissions object to update
 * @returns Updated sharing permissions object
 */
export const updateSharingPermissions = async (
    contactId: string,
    permissions: Partial<SharingPermissionsResponse>
): Promise<SharingPermissionsResponse> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_ENDPOINTS.SHARING_PERMISSIONS}/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(permissions),
        });

        if (!response.ok) {
            throw new Error(`Failed to update sharing permissions: ${response.statusText}`);
        }

        const data: SharingPermissionsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating sharing permissions:', error);
        throw error;
    }
};

/**
 * Fetch all contacts (provider and emergency contacts)
 * @returns Array of contacts
 */
export const fetchContacts = async (): Promise<ContactAPIResponse[]> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_ENDPOINTS.CONTACTS}`, {
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
        return data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

/**
 * Add a new emergency contact
 * @param contactData - The contact data to add
 * @returns The created contact ID
 */
export const addContact = async (contactData: AddContactRequest): Promise<AddContactResponse> => {
    try {
        const token = await getAuthToken();

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_ENDPOINTS.EMERGENCY_CONTACT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(contactData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add contact: ${response.statusText}`);
        }

        const data: AddContactResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding contact:', error);
        throw error;
    }
};

