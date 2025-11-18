import React, { useState } from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon, UserCircleIcon, MessageIcon, PhoneIcon } from '@components/Utils';
import Svg, { Path } from 'react-native-svg';

export interface Permission {
    id: string;
    label: string;
    enabled: boolean;
}


export interface ContactData {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    category: string;
}

interface ContactCardProps {
    contact: ContactData;
    onChat?: () => void;
    onCall?: () => void;
    initialExpanded?: boolean;
    permissions?: Permission[];
    onTogglePermission?: (id: string, value: boolean) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
    contact,
    onChat,
    onCall,
    initialExpanded = false,
    permissions,
    onTogglePermission,
}) => {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);

    return (
        <View className="mb-3 rounded-2xl">
            <Pressable
                className={`flex-col px-4 py-4 border ${isExpanded ? 'rounded-t-2xl rounded-b-0' : 'rounded-2xl'
                    }`}
                style={{ backgroundColor: colors.orange_50, borderColor: colors.orange_150 }}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View className='flex-row'>
                    <View className="flex-row items-center flex-1">
                        <View
                            className="w-10 h-10 rounded-full items-center justify-center mr-3"
                            style={{ backgroundColor: colors.orange_300 }}
                        >
                            <UserCircleIcon size={24} color={colors.white} />
                        </View>
                        <View className="flex-1">
                            <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                {contact.name}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center">
                        {onChat && (
                            <Pressable onPress={onChat} className="p-2 mr-2">
                                <MessageIcon size={18} color={colors.gray_medium} />
                            </Pressable>
                        )}
                        {onCall && (
                            <Pressable onPress={onCall} className="p-2 mr-2">
                                <PhoneIcon size={18} color={colors.gray_medium} />
                            </Pressable>
                        )}
                        {isExpanded ? (
                            <UpIcon size={14} color={colors.gray_medium} />
                        ) : (
                            <DownIcon size={14} color={colors.gray_medium} />
                        )}
                    </View>
                </View>
                <View className="flex-col mt-4">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-2">
                        {contact.role}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-1">
                        {contact.email}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {contact.phone}
                    </Text>
                </View>


            </Pressable>

            {isExpanded && (
                <View className="border border-gray-200 rounded-b-2xl border-t-0 pt-2 px-4 pb-4">
                    {/* Sharing Permissions */}
                    {permissions && permissions.length > 0 && onTogglePermission && (
                        <View className="mt-4">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                Sharing Permissions
                            </Text>
                            <View className="rounded-xl py-2 bg-white">
                                {permissions.map((permission, index) => (
                                    <View
                                        key={permission.id}
                                        className={`flex-row items-center justify-between ${index !== permissions.length - 1 ? 'pb-3' : ''
                                            }`}
                                    >
                                        <Text
                                            style={[t.textRegular, { color: colors.Text_Primary }]}
                                            className="flex-1"
                                        >
                                            {permission.label}
                                        </Text>
                                        <Switch
                                            value={permission.enabled}
                                            onValueChange={(value) => onTogglePermission(permission.id, value)}
                                            trackColor={{
                                                false: colors.gray_200,
                                                true: colors.orange_500,
                                            }}
                                            thumbColor={colors.white}
                                            ios_backgroundColor={colors.gray_200}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

