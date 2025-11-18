import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon, CaretRightIcon } from '@components/Utils';

interface SkillModuleAccordionProps {
    number: number;
    title: string;
    subtitle: string;
    readTime?: string;
    description?: string;
    skills?: string[];
    isExpanded?: boolean;
    onToggle?: () => void;
    defaultExpanded?: boolean;
}

export const SkillModuleAccordion: React.FC<SkillModuleAccordionProps> = ({
    number,
    title,
    subtitle,
    readTime,
    description,
    skills,
    isExpanded: controlledIsExpanded,
    onToggle,
    defaultExpanded = false,
}) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

    // Use controlled state if provided, otherwise use internal state
    const isExpanded = controlledIsExpanded !== undefined ? controlledIsExpanded : internalExpanded;

    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setInternalExpanded(!internalExpanded);
        }
    };

    return (
        <View className="mb-3">
            <Pressable
                className={`flex-row items-center justify-between px-4 py-4  ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}
                style={{
                    backgroundColor: isExpanded ? colors.orange_50 : colors.white,
                    borderWidth: isExpanded ? 0 : 1,
                    borderColor: colors.gray_300,
                }}
                onPress={handleToggle}
            >
                <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                            {number}. {title} - {subtitle}
                        </Text>
                        {readTime && isExpanded && (
                            <View
                                className="px-3 py-1 rounded-full ml-2"
                                style={{ backgroundColor: colors.orange_opacity_10 }}
                            >
                                <Text style={[t.footnoteBold, { color: colors.orange_600 }]}>
                                    {readTime}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <View className="w-6 h-6 items-center justify-center ml-2">
                    {isExpanded ? (
                        <CaretRightIcon size={16} color={colors.text_secondary} />
                    ) : (
                        <DownIcon size={12} color={colors.text_secondary} />
                    )}
                </View>
            </Pressable>

            {isExpanded && (
                <View
                    className="px-4 py-4 rounded-b-lg"
                    style={{ backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray_200 }}
                >
                    {description && (
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                            {description}
                        </Text>
                    )}

                    {skills && skills.length > 0 && (
                        <View className="flex-row flex-wrap">
                            {skills.map((skill, index) => (
                                <View
                                    key={index}
                                    className="px-4 py-2 rounded-lg mr-2 mb-2 "
                                    style={{ backgroundColor: colors.orange_50 }}
                                >
                                    <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                                        {skill}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

