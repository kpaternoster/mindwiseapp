import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, ScrollView, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon } from '@components/Utils';

interface CategoryOption {
    value: string;
    label: string;
}

interface AddContactModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (contact: any) => void;
    categories: CategoryOption[];
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
    visible,
    onClose,
    onAdd,
    categories,
}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [relationship, setRelationship] = useState('');
    const [category, setCategory] = useState('');
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);

    const handleAdd = () => {
        if (name && phone) {
            onAdd({
                name,
                phone,
                email,
                relationship,
                category,
            });
            
            // Reset form
            setName('');
            setPhone('');
            setEmail('');
            setRelationship('');
            setCategory('');
            setShowCategoryPicker(false);
            onClose();
        }
    };

    const handleClose = () => {
        // Reset form on close
        setName('');
        setPhone('');
        setEmail('');
        setRelationship('');
        setCategory('');
        setShowCategoryPicker(false);
        onClose();
    };

    const selectedCategoryLabel =
        categories.find((c) => c.value === category)?.label || 'Select';

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Drag Handle */}
                    <View className="items-center py-1">
                        <View className="w-16 h-1.5 rounded-full" style={{ backgroundColor: colors.gray_300 }} />
                    </View>

                    {/* Title */}
                    <Text style={[t.button, { color: colors.Text_Primary }]} className="mb-6 text-center mt-6">
                        Add New Contact
                    </Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="px-6">

                            {/* Name Field */}
                            <View className="mb-4">
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Name
                                </Text>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter Full Name"
                                    placeholderTextColor={colors.text_secondary}
                                    style={[
                                        t.textRegular,
                                        {
                                            backgroundColor: colors.white,
                                            color: colors.Text_Primary,
                                        },
                                    ]}
                                    className="rounded-full px-4 py-4 border border-gray-200"
                                    autoCapitalize="words"
                                />
                            </View>

                            {/* Phone Number Field */}
                            <View className="mb-4">
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Phone Number
                                </Text>
                                <TextInput
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder="000-0000-0000"
                                    placeholderTextColor={colors.text_secondary}
                                    style={[
                                        t.textRegular,
                                        {
                                            backgroundColor: colors.white,
                                            color: colors.Text_Primary,
                                        },
                                    ]}
                                    className="rounded-full px-4 py-4 border border-gray-200"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            {/* Email Field */}
                            <View className="mb-4">
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Email
                                </Text>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="e.g. user@example.com"
                                    placeholderTextColor={colors.text_secondary}
                                    style={[
                                        t.textRegular,
                                        {
                                            backgroundColor: colors.white,
                                            color: colors.Text_Primary,
                                        },
                                    ]}
                                    className="rounded-full px-4 py-4 border border-gray-200"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                            {/* Relationship Field */}
                            <View className="mb-4">
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Relationship
                                </Text>
                                <TextInput
                                    value={relationship}
                                    onChangeText={setRelationship}
                                    placeholder="e.g. Mother, Father, Sibling"
                                    placeholderTextColor={colors.text_secondary}
                                    style={[
                                        t.textRegular,
                                        {
                                            backgroundColor: colors.white,
                                            color: colors.Text_Primary,
                                        },
                                    ]}
                                    className="rounded-full px-4 py-4 border border-gray-200"
                                    autoCapitalize="words"
                                />
                            </View>

                            {/* Category Dropdown */}
                            <View className="mb-6">
                                <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                                    Category
                                </Text>
                                <Pressable
                                    onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                                    className="flex-row items-center justify-between rounded-full px-4 py-4 border border-gray-200"
                                    style={{ backgroundColor: colors.white }}
                                >
                                    <Text
                                        style={[
                                            t.textRegular,
                                            {
                                                color: category
                                                    ? colors.Text_Primary
                                                    : colors.text_secondary,
                                            },
                                        ]}
                                    >
                                        {selectedCategoryLabel}
                                    </Text>
                                    <DownIcon size={12} color={colors.text_secondary} />
                                </Pressable>

                                {/* Category Options */}
                                {showCategoryPicker && (
                                    <View className="mt-1 rounded-xl overflow-hidden border border-gray-200" style={{ backgroundColor: colors.white }}>
                                        {categories.map((cat, index) => (
                                            <Pressable
                                                key={cat.value}
                                                onPress={() => {
                                                    setCategory(cat.value);
                                                    setShowCategoryPicker(false);
                                                }}
                                                className="px-4 py-3"
                                                style={[
                                                    index !== categories.length - 1 && {
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: colors.gray_200,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        t.textRegular,
                                                        {
                                                            color:
                                                                category === cat.value
                                                                    ? colors.orange_500
                                                                    : colors.Text_Primary,
                                                        },
                                                    ]}
                                                >
                                                    {cat.label}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                )}
                            </View>


                        </View>
                    </ScrollView>
                    {/* Action Buttons */}
                    <View className="flex-row gap-6 mt-6 px-6">
                        <Pressable
                            onPress={handleClose}
                            className="flex-1 py-4 items-center justify-center"
                        >
                            <Text style={[t.textSemiBold, { color: colors.text_secondary }]}>
                                Cancel
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={handleAdd}
                            className="flex-1 py-4 px-3 rounded-full items-center justify-center"
                            style={{ backgroundColor: colors.button_orange }}
                        >
                            <Text style={[t.textSemiBold, { color: colors.warm_dark }]}>
                                Add Contact
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
        paddingTop: 8,
        paddingBottom: 32,
    },
});
