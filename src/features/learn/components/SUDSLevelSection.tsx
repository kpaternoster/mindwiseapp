import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { PencilSimpleIcon, UpIcon, DownIcon } from '@components/Utils';
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
}) => {
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
                                    <PencilSimpleIcon size={16} color={colors.warm_dark} />
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
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

