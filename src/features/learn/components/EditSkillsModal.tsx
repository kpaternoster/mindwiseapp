import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon, UpIcon, CheckIcon } from '@components/Utils';
import { CopingSkill } from './SUDSLevelSection';

interface EditSkillsModalProps {
    visible: boolean;
    currentSkills: CopingSkill[];
    allSkills: CopingSkill[];
    onClose: () => void;
    onSave: (selectedSkillIds: string[]) => void;
}

export const EditSkillsModal: React.FC<EditSkillsModalProps> = ({
    visible,
    currentSkills,
    allSkills,
    onClose,
    onSave,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(
        new Set(currentSkills.map(skill => skill.id))
    );

    // Reset selection when modal opens with new currentSkills
    useEffect(() => {
        if (visible) {
            setSelectedSkillIds(new Set(currentSkills.map(skill => skill.id)));
            setIsDropdownOpen(true); // Open dropdown by default
        }
    }, [visible, currentSkills]);

    const toggleSkill = (skillId: string) => {
        setSelectedSkillIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(skillId)) {
                newSet.delete(skillId);
            } else {
                newSet.add(skillId);
            }
            return newSet;
        });
    };

    const handleSave = () => {
        onSave(Array.from(selectedSkillIds));
        onClose();
    };

    const handleClose = () => {
        setSelectedSkillIds(new Set(currentSkills.map(skill => skill.id)));
        setIsDropdownOpen(false);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50 px-4">
                <Pressable
                    className="absolute inset-0"
                    onPress={handleClose}
                />
                <View
                    className="bg-white rounded-2xl w-full max-h-[80%]"
                    style={{ maxWidth: 400 }}
                >
                    {/* Header */}
                    <View className="px-4 py-4 border-b border-gray-200">
                        <View className="flex-row items-center justify-between">
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                Edit Skills
                            </Text>
                            <Pressable onPress={handleClose}>
                                <Text style={[t.title16SemiBold, { color: colors.icon }]}>
                                    ✕
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Dropdown */}
                    <View className="px-4 pt-4">
                        <Pressable
                            className="flex-row items-center justify-between px-4 py-3 rounded-xl"
                            style={{
                                backgroundColor: colors.orange_50,
                                borderWidth: 1,
                                borderColor: colors.stoke_gray,
                            }}
                            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                Choose a skill to add
                            </Text>
                            {isDropdownOpen ? (
                                <UpIcon size={12} color={colors.Text_Primary} />
                            ) : (
                                <DownIcon size={12} color={colors.Text_Primary} />
                            )}
                        </Pressable>

                        {/* Dropdown List */}
                        {isDropdownOpen && (
                            <Pressable
                                className="mt-2 rounded-xl border border-gray-200"
                                style={{ backgroundColor: colors.white }}
                                onStartShouldSetResponder={() => true}
                            >
                                <ScrollView style={{ maxHeight: 300 }}>
                                    {allSkills.map((skill, index) => {
                                        const isSelected = selectedSkillIds.has(skill.id);
                                        const isLast = index === allSkills.length - 1;
                                        return (
                                            <Pressable
                                                key={skill.id}
                                                className={`flex-row items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-gray-200' : ''}`}
                                                style={{
                                                    backgroundColor: isSelected ? colors.orange_50 : colors.white,
                                                }}
                                                onPress={() => toggleSkill(skill.id)}
                                            >
                                                <Text
                                                    style={[
                                                        t.textRegular,
                                                        { color: colors.Text_Primary },
                                                    ]}
                                                >
                                                    {skill.title}
                                                </Text>
                                                {isSelected && (
                                                    <View
                                                        className="w-6 h-6 rounded-full items-center justify-center"
                                                        style={{ backgroundColor: colors.white }}
                                                    >
                                                        <CheckIcon size={12} color={colors.Button_Orange} />
                                                    </View>
                                                )}
                                            </Pressable>
                                        );
                                    })}
                                </ScrollView>
                            </Pressable>
                        )}
                    </View>

                    {/* Footer Buttons */}
                    <View className="px-4 py-4 border-t border-gray-200 flex-row gap-3">
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{
                                borderWidth: 2,
                                borderColor: colors.button_orange,
                                backgroundColor: colors.white,
                            }}
                            onPress={handleClose}
                        >
                            <Text style={[t.button, { color: colors.Text_Primary }]}>
                                Cancel
                            </Text>
                        </Pressable>
                        <Pressable
                            className="flex-1 rounded-full py-4 items-center justify-center"
                            style={{ backgroundColor: colors.button_orange }}
                            onPress={handleSave}
                        >
                            <Text style={[t.button, { color: colors.white }]}>
                                Save
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

