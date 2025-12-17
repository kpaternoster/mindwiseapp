import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { PencilSimpleIcon, UpIcon, DownIcon, PencilMinusIcon } from '@components/Utils';
import { CopingSkillCard } from './CopingSkillCard';

export interface CopingSkill {
    id: string;
    title: string;
    description: string;
}

interface SUDSLevelSectionProps {
    range: string;
    label: string;
    description: string;
    skills: CopingSkill[];
    isExpanded: boolean;
    onToggle: () => void;
    onEdit?: () => void;
    onLearnMore?: (skillId: string) => void;
    isEditMode?: boolean;
    onRemoveSkill?: (skillId: string) => void;
    availableSkills?: CopingSkill[];
    onAddSkill?: (skillId: string) => void;
}

export const SUDSLevelSection: React.FC<SUDSLevelSectionProps> = ({
    range,
    label,
    description,
    skills,
    isExpanded,
    onToggle,
    onEdit,
    onLearnMore,
    isEditMode = false,
    onRemoveSkill,
    availableSkills = [],
    onAddSkill,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <View className="mb-4">
            {/* Header */}
            <Pressable
                className={`flex-row items-center justify-between px-4 py-4 ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                style={{
                    backgroundColor: colors.orange_50,
                }}
                onPress={onToggle}
            >
                <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                        <View className='flex-row'>
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                                {range} {label}
                            </Text>
                            {onEdit && (
                                <Pressable
                                    className="ml-4"
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        onEdit();
                                    }}
                                >
                                    {
                                        isEditMode ? (
                                            <PencilMinusIcon size={20} color={colors.warm_dark} />
                                        ) : (
                                            <PencilSimpleIcon size={16} color={colors.warm_dark} />
                                        )
                                    }
                                </Pressable>
                            )}
                        </View>

                        <View className="ml-3">
                            {isExpanded ? (
                                <UpIcon size={12} color={colors.Text_Primary} />
                            ) : (
                                <DownIcon size={12} color={colors.Text_Primary} />
                            )}
                        </View>
                    </View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        {description}
                    </Text>
                </View>

            </Pressable>

            {/* Skills List */}
            {isExpanded && (
                <View
                    className="rounded-b-2xl px-4 py-4"
                    style={{
                        backgroundColor: colors.white,
                        borderColor: colors.stoke_gray,
                        borderWidth: 1,
                        borderTopWidth: 0,
                    }}
                >
                    {skills.map((skill) => (
                        <CopingSkillCard
                            key={skill.id}
                            title={skill.title}
                            description={skill.description}
                            onLearnMore={onLearnMore ? () => onLearnMore(skill.id) : undefined}
                            showRemoveButton={isEditMode}
                            onRemove={onRemoveSkill ? () => onRemoveSkill(skill.id) : undefined}
                        />
                    ))}

                    {/* Dropdown for adding skills - shown when editing */}
                    {isEditMode && (
                        <View className="mt-3">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Pressable
                                    className="flex-1 flex-row items-center justify-between px-4 py-3 rounded-xl"
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
                            </View>

                            {/* Dropdown List */}
                            {isDropdownOpen && availableSkills.length > 0 && (
                                <View
                                    className="rounded-xl border border-gray-200 py-1"
                                    style={{ backgroundColor: colors.white }}
                                >
                                    <ScrollView 
                                        style={{ height: 300 }} 
                                        showsVerticalScrollIndicator={true}
                                        nestedScrollEnabled={true}
                                    >
                                        {availableSkills.map((skill, index) => {
                                            const isSelected = skills.some(s => s.id === skill.id);
                                            if (isSelected) {
                                                return null;
                                            }
                                            return (
                                                <Pressable
                                                    key={skill.id}
                                                    className={`flex-row items-center justify-between px-4 py-3 rounded-xl`}
                                                    style={{
                                                        backgroundColor: colors.white,
                                                    }}
                                                    onPress={() => {
                                                        if (onAddSkill) {
                                                            onAddSkill(skill.id);
                                                            setIsDropdownOpen(false);
                                                        }
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            t.textRegular,
                                                            { color: colors.Text_Primary },
                                                        ]}
                                                    >
                                                        {skill.title}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

