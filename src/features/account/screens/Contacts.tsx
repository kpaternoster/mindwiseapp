import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
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

export default function Contacts() {
    const [primaryTherapist] = useState<ContactData>(contactsData.primaryTherapist as ContactData);
    const [emergencyContacts, setEmergencyContacts] = useState<ContactData[]>(
        contactsData.emergencyContacts as ContactData[]
    );
    const [permissions, setPermissions] = useState<Permission[]>(
        contactsData.sharingPermissions as Permission[]
    );
    const [showAddModal, setShowAddModal] = useState(false);

    const handleTogglePermission = (id: string, value: boolean) => {
        setPermissions((prev) =>
            prev.map((p) => (p.id === id ? { ...p, enabled: value } : p))
        );
    };

    const handleChat = (contactId: string) => {
        console.log('Chat with:', contactId);
        // TODO: Implement chat functionality
    };

    const handleCall = (contactId: string) => {
        console.log('Call:', contactId);
        // TODO: Implement call functionality
    };

    const handleAddContact = (newContact: any) => {
        const contact: ContactData = {
            id: `contact_${Date.now()}`,
            name: newContact.name,
            role: newContact.relationship,
            email: newContact.email,
            phone: newContact.phone,
            category: newContact.category,
        };
        setEmergencyContacts([...emergencyContacts, contact]);
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
                <View className="px-6 mb-4">
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                        Primary Therapist
                    </Text>
                    <ContactCard
                        contact={primaryTherapist}
                        onChat={() => handleChat(primaryTherapist.id)}
                        onCall={() => handleCall(primaryTherapist.id)}
                        initialExpanded={true}
                        permissions={permissions}
                        onTogglePermission={handleTogglePermission}
                    />
                </View>

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
                            permissions={permissions}
                            onTogglePermission={handleTogglePermission}
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

