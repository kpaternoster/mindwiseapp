import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Linking, Alert, Platform } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ScreenScroll } from '@components/ScreenScroll';
import { PageHeader } from '@features/home/components/PageHeader';
import {
    ContactCard,
    AddContactModal,
    ContactData,
    Permission,
} from '../components';
import contactsData from '../data/contactsData.json';
import {
    fetchSharingPermissions,
    updateSharingPermissions,
    SharingPermissionsResponse,
    fetchContacts,
    ContactAPIResponse,
    addContact,
    AddContactRequest
} from '../api';

// Map API response keys to Permission IDs
const PERMISSION_MAP: Record<string, { id: string; label: string }> = {
    exerciseData: { id: 'exerciseData', label: 'Exercise Data' },
    dailyCheckIn: { id: 'dailyCheckin', label: 'Daily Check-In Sharing' }, // API uses dailyCheckIn, but JSON uses dailyCheckin
    progressAnalytics: { id: 'progressAnalytics', label: 'Progress Analytics' },
    crisisPlans: { id: 'crisisPlans', label: 'Crisis Plans' },
    moodData: { id: 'moodData', label: 'Mood Data' },
    twoWayMessaging: { id: 'twoWayMessaging', label: 'Two-Way Messaging' },
};

// Reverse map: Permission ID to API key
const PERMISSION_ID_TO_API_KEY: Record<string, string> = {
    exerciseData: 'exerciseData',
    dailyCheckin: 'dailyCheckIn', // Map dailyCheckin (JSON) to dailyCheckIn (API)
    progressAnalytics: 'progressAnalytics',
    crisisPlans: 'crisisPlans',
    moodData: 'moodData',
    twoWayMessaging: 'twoWayMessaging',
};

// Convert API response to Permission array
const apiResponseToPermissions = (apiResponse: SharingPermissionsResponse): Permission[] => {
    return Object.entries(apiResponse).map(([key, enabled]) => {
        const mapping = PERMISSION_MAP[key];
        return {
            id: mapping?.id || key,
            label: mapping?.label || key,
            enabled: enabled,
        };
    });
};

// Convert Permission array to API request format
const permissionsToApiRequest = (permissions: Permission[]): Partial<SharingPermissionsResponse> => {
    const result: Partial<SharingPermissionsResponse> = {};
    permissions.forEach((perm) => {
        // Find the API key for this permission ID
        const apiKey = PERMISSION_ID_TO_API_KEY[perm.id];
        if (apiKey) {
            result[apiKey as keyof SharingPermissionsResponse] = perm.enabled;
        }
    });
    return result;
};

// Parse phone number string to internationalPrefix and number
const parsePhoneNumber = (phone: string): { internationalPrefix: number; number: number } => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // If 11 digits starting with 1, split into prefix (1) and 10-digit number
    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
        return {
            internationalPrefix: 1,
            number: parseInt(digitsOnly.substring(1), 10),
        };
    }
    
    // If 10 digits, assume US (prefix 1)
    if (digitsOnly.length === 10) {
        return {
            internationalPrefix: 1,
            number: parseInt(digitsOnly, 10),
        };
    }
    
    // Default: assume US prefix 1 and use all digits as number
    // This handles edge cases like international numbers entered incorrectly
    return {
        internationalPrefix: 1,
        number: parseInt(digitsOnly || '0', 10),
    };
};

// Convert API contact response to ContactData format
const mapContactToContactData = (apiContact: ContactAPIResponse): ContactData => {
    // Format phone number: +{internationalPrefix}{number}
    // Example: +15551234567
    const phoneNumber = `+${apiContact.internationalPrefix}${apiContact.number}`;
    // Format as (XXX) XXX-XXXX if US number (prefix 1)
    let formattedPhone = phoneNumber;
    if (apiContact.internationalPrefix === 1 && apiContact.number.toString().length === 10) {
        const numStr = apiContact.number.toString();
        formattedPhone = `(${numStr.slice(0, 3)}) ${numStr.slice(3, 6)}-${numStr.slice(6)}`;
    }

    // Generate ID for provider if null
    const contactId = apiContact.id || (apiContact.type === 'provider' ? 'provider' : `contact_${Date.now()}`);

    return {
        id: contactId,
        name: apiContact.name,
        role: apiContact.type === 'provider'
            ? 'Primary Therapist'
            : (apiContact.relationship || 'Contact'),
        email: apiContact.email || '',
        phone: formattedPhone,
        category: apiContact.category || apiContact.type,
    };
};

export default function Contacts() {
    const [primaryTherapist, setPrimaryTherapist] = useState<ContactData | null>(null);
    const [emergencyContacts, setEmergencyContacts] = useState<ContactData[]>([]);
    // Store permissions per contact ID
    const [contactPermissions, setContactPermissions] = useState<Record<string, Permission[]>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [loadingPermissions, setLoadingPermissions] = useState<Record<string, boolean>>({});
    const [loadingContacts, setLoadingContacts] = useState(false);

    // Fetch contacts from API
    useEffect(() => {
        const loadContacts = async () => {
            try {
                setLoadingContacts(true);
                const apiContacts = await fetchContacts();

                // Separate provider and emergency contacts
                const providerContact = apiContacts.find(c => c.type === 'provider');
                const emergencyContactsList = apiContacts.filter(c => c.type === 'emergency');

                if (providerContact) {
                    const mappedProvider = mapContactToContactData(providerContact);
                    setPrimaryTherapist(mappedProvider);
                }

                if (emergencyContactsList.length > 0) {
                    const mappedEmergencyContacts = emergencyContactsList.map(mapContactToContactData);
                    setEmergencyContacts(mappedEmergencyContacts);
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
                // Keep default contacts on error
            } finally {
                setLoadingContacts(false);
            }
        };

        loadContacts();
    }, []);

    // Initialize permissions from default data
    useEffect(() => {
        if (!primaryTherapist) return;

        const defaultPermissions = contactsData.sharingPermissions as Permission[];
        const allContactIds = [primaryTherapist.id, ...emergencyContacts.map(c => c.id)];

        const initialPermissions: Record<string, Permission[]> = {};
        allContactIds.forEach(contactId => {
            initialPermissions[contactId] = [...defaultPermissions];
        });
        setContactPermissions(initialPermissions);

        // Fetch permissions from API for each contact
        const fetchAllPermissions = async () => {
            for (const contactId of allContactIds) {
                try {
                    setLoadingPermissions(prev => ({ ...prev, [contactId]: true }));
                    const apiPermissions = await fetchSharingPermissions(contactId);
                    console.log('apiPermissions', apiPermissions);
                    const permissions = apiResponseToPermissions(apiPermissions);
                    setContactPermissions(prev => ({
                        ...prev,
                        [contactId]: permissions,
                    }));
                } catch (error) {
                    console.error(`Error fetching permissions for ${contactId}:`, error);
                    // Keep default permissions on error
                } finally {
                    setLoadingPermissions(prev => ({ ...prev, [contactId]: false }));
                }
            }
        };

        fetchAllPermissions();
    }, [primaryTherapist, emergencyContacts.length]);

    const handleTogglePermission = async (contactId: string, permissionId: string, value: boolean) => {
        const currentPermissions = contactPermissions[contactId] || [];
        const updatedPermissions = currentPermissions.map((p) =>
            p.id === permissionId ? { ...p, enabled: value } : p
        );

        setContactPermissions((prev) => ({
            ...prev,
            [contactId]: updatedPermissions,
        }));

        try {
            const apiRequest = permissionsToApiRequest(updatedPermissions);
            await updateSharingPermissions(contactId, apiRequest);
        } catch (error) {
            console.error(`Error updating permissions for ${contactId}:`, error);
            // Revert on error
            setContactPermissions((prev) => ({
                ...prev,
                [contactId]: currentPermissions,
            }));
        }
    };

    // Helper function to normalize phone number for URLs
    // Different handling for SMS vs Phone calls
    const normalizePhoneForUrl = (phone: string, forSMS: boolean = false): string => {
        // Remove all non-digit characters except +
        const cleaned = phone.replace(/[^\d+]/g, '');
        
        // For SMS on Android, sometimes it's better without the + prefix
        if (Platform.OS === 'android' && forSMS) {
            // Remove + and return digits only for Android SMS
            const digitsOnly = cleaned.replace(/\+/g, '');
            // If it's 11 digits starting with 1, remove the leading 1
            if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
                return digitsOnly.substring(1);
            }
            return digitsOnly;
        }
        
        // For iOS and phone calls, keep the + format
        if (cleaned.startsWith('+')) {
            return cleaned;
        }
        // If it's 10 digits, assume US and add +1
        if (cleaned.length === 10) {
            return `+1${cleaned}`;
        }
        // If it's 11 digits starting with 1, add +
        if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `+${cleaned}`;
        }
        // Default: add +1 for US
        return `+1${cleaned}`;
    };

    const handleChat = async (contactId: string) => {
        try {
            // Find the contact by ID
            let contact: ContactData | undefined;
            if (primaryTherapist?.id === contactId) {
                contact = primaryTherapist;
            } else {
                contact = emergencyContacts.find(c => c.id === contactId);
            }

            if (!contact || !contact.phone) {
                Alert.alert('Error', 'Contact phone number not found');
                return;
            }

            // Normalize phone number for SMS URL (platform-specific)
            const phoneUrl = normalizePhoneForUrl(contact.phone, true);
            
            // Use different SMS URL schemes for different platforms
            let smsUrl: string;
            if (Platform.OS === 'android') {
                // Android: Use smsto: scheme (more reliable) or sms:
                // smsto: opens SMS app with pre-filled number
                smsUrl = `smsto:${phoneUrl}`;
            } else {
                // iOS: Use sms: scheme with + format
                const phoneUrlWithPlus = normalizePhoneForUrl(contact.phone, false);
                smsUrl = `sms:${phoneUrlWithPlus}`;
            }

            // Try to open directly - canOpenURL is unreliable for SMS on Android
            // We'll catch errors if it fails
            try {
                await Linking.openURL(smsUrl);
            } catch (openError) {
                // If smsto: fails on Android, try sms: as fallback
                if (Platform.OS === 'android') {
                    try {
                        const fallbackUrl = `sms:${phoneUrl}`;
                        await Linking.openURL(fallbackUrl);
                    } catch (fallbackError) {
                        console.error('Error opening SMS (both schemes failed):', fallbackError);
                        Alert.alert('Error', 'Failed to open SMS app. Please check if SMS is available on this device.');
                    }
                } else {
                    throw openError;
                }
            }
        } catch (error) {
            console.error('Error opening SMS:', error);
            Alert.alert('Error', 'Failed to open SMS app. Please check if SMS is available on this device.');
        }
    };

    const handleCall = async (contactId: string) => {
        try {
            // Find the contact by ID
            let contact: ContactData | undefined;
            if (primaryTherapist?.id === contactId) {
                contact = primaryTherapist;
            } else {
                contact = emergencyContacts.find(c => c.id === contactId);
            }

            if (!contact || !contact.phone) {
                Alert.alert('Error', 'Contact phone number not found');
                return;
            }

            // Normalize phone number for tel URL (not for SMS)
            const phoneUrl = normalizePhoneForUrl(contact.phone, false);
            const telUrl = `tel:${phoneUrl}`;

            // Try to open directly - canOpenURL can also be unreliable for tel on some devices
            try {
                await Linking.openURL(telUrl);
            } catch (openError) {
                // On Android, sometimes tel: needs digits only without +
                if (Platform.OS === 'android') {
                    try {
                        const digitsOnly = phoneUrl.replace(/\+/g, '');
                        const fallbackUrl = `tel:${digitsOnly}`;
                        await Linking.openURL(fallbackUrl);
                    } catch (fallbackError) {
                        console.error('Error making phone call (both formats failed):', fallbackError);
                        Alert.alert('Error', 'Failed to make phone call. Please check if phone calls are available on this device.');
                    }
                } else {
                    throw openError;
                }
            }
        } catch (error) {
            console.error('Error making phone call:', error);
            Alert.alert('Error', 'Failed to make phone call. Please check if phone calls are available on this device.');
        }
    };

    const handleAddContact = async (newContact: any) => {
        try {
            // Parse phone number
            const { internationalPrefix, number } = parsePhoneNumber(newContact.phone);

            // Prepare API request
            const contactRequest: AddContactRequest = {
                name: newContact.name,
                email: newContact.email || '',
                internationalPrefix,
                number,
                relationship: newContact.relationship || '',
                category: newContact.category || '',
            };

            // Call API to create contact
            const response = await addContact(contactRequest);
            const contactId = response.id;

            // Format phone number for display
            const phoneNumber = `+${internationalPrefix}${number}`;
            let formattedPhone = phoneNumber;
            if (internationalPrefix === 1 && number.toString().length === 10) {
                const numStr = number.toString();
                formattedPhone = `(${numStr.slice(0, 3)}) ${numStr.slice(3, 6)}-${numStr.slice(6)}`;
            }

            // Create contact data with API-returned ID
            const contact: ContactData = {
                id: contactId,
                name: newContact.name,
                role: newContact.relationship,
                email: newContact.email,
                phone: formattedPhone,
                category: newContact.category,
            };

            // Update state with new contact
            setEmergencyContacts([...emergencyContacts, contact]);

            // Initialize permissions for new contact
            const defaultPermissions = contactsData.sharingPermissions as Permission[];
            setContactPermissions(prev => ({
                ...prev,
                [contact.id]: [...defaultPermissions],
            }));

            // Fetch permissions from API for the new contact
            try {
                setLoadingPermissions(prev => ({ ...prev, [contact.id]: true }));
                const apiPermissions = await fetchSharingPermissions(contact.id);
                const permissions = apiResponseToPermissions(apiPermissions);
                setContactPermissions(prev => ({
                    ...prev,
                    [contact.id]: permissions,
                }));
            } catch (error) {
                console.error(`Error fetching permissions for new contact ${contact.id}:`, error);
                // Keep default permissions on error
            } finally {
                setLoadingPermissions(prev => ({ ...prev, [contact.id]: false }));
            }
        } catch (error) {
            console.error('Error adding contact:', error);
            // Re-throw to let the modal handle the error (e.g., show error message)
            throw error;
        }
    };

    return (
        <View className="flex-1 bg-white pt-9">
            <PageHeader title="Contacts & Sharing" showLeafIcon={true} />
            <ScreenScroll className="flex-1 bg-white">
                {/* Description */}
                <View className="px-6 mt-4 mb-4">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Manage contacts and sharing preferences
                    </Text>
                </View>

                {/* Primary Therapist Section */}
                {primaryTherapist && (
                    <View className="px-6 mb-4">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                            Primary Therapist
                        </Text>
                        <ContactCard
                            contact={primaryTherapist}
                            onChat={() => handleChat(primaryTherapist.id)}
                            onCall={() => handleCall(primaryTherapist.id)}
                            initialExpanded={true}
                            permissions={contactPermissions[primaryTherapist.id] || []}
                            onTogglePermission={(permissionId, value) =>
                                handleTogglePermission(primaryTherapist.id, permissionId, value)
                            }
                        />
                    </View>
                )}

                {/* Emergency Contacts Section */}
                <View className="px-6 mb-4">
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                        Emergency Contacts
                    </Text>
                    {emergencyContacts.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onChat={() => handleChat(contact.id)}
                            onCall={() => handleCall(contact.id)}
                            initialExpanded={false}
                            permissions={contactPermissions[contact.id] || []}
                            onTogglePermission={(permissionId, value) =>
                                handleTogglePermission(contact.id, permissionId, value)
                            }
                        />
                    ))}
                </View>


            </ScreenScroll>
            {/* Add Contact Button */}
            <View className="px-6 mb-12 mt-4">
                <Pressable
                    onPress={() => setShowAddModal(true)}
                    className="py-4 rounded-full items-center justify-center"
                    style={{ backgroundColor: colors.orange_500 }}
                >
                    <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                        + Add Contact
                    </Text>
                </Pressable>
            </View>

            {/* Add Contact Modal */}
            <AddContactModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddContact}
                categories={contactsData.categoryOptions}
            />
        </View>
    );
}

