import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon, UserCircleIcon } from '@components/Utils';

export interface Contact {
    id: string;
    name: string;
    role: string;
    lastActive: string;
}

interface ContactsSectionProps {
    contacts: Contact[];
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ contacts }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <View className="p-4 rounded-xl mt-3" style={{ backgroundColor: colors.orange_100 }}>
            <Pressable
                className="flex-row items-center justify-between"
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={[t.textBold, { color: colors.Text_Primary }]} >
                    My contacts
                </Text>
                {isExpanded ? (
                    <UpIcon size={14} color={colors.Text_Primary} />
                ) : (
                    <DownIcon size={14} color={colors.Text_Primary} />
                )}
            </Pressable>

            {isExpanded && contacts.length > 0 && (
                <View className="pt-3">
                    {contacts.map((contact) => (
                        <View key={contact.id} className="flex-row bg-white rounded-xl p-3 mb-2">
                            <View className="w-8 h-8 rounded-full items-center justify-center mr-4" style={{ backgroundColor: colors.orange_300 }}>
                                <UserCircleIcon size={20} color={colors.white} />
                            </View>
                            <View className="flex-1">
                                <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-1">
                                    {contact.name}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                                    {contact.role}
                                </Text>
                                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                    Last active: {contact.lastActive}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};
