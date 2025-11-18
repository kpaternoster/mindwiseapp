import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { DownIcon, CaretRightIcon } from '@components/Utils';

interface Assumption {
    title: string;
    description: string;
}

interface AssumptionAccordionProps {
    sectionTitle: string;
    assumptions: Assumption[];
    isExpanded?: boolean;
    onToggle?: () => void;
    defaultExpanded?: boolean;
}

export const AssumptionAccordion: React.FC<AssumptionAccordionProps> = ({
    sectionTitle,
    assumptions,
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
        <View className="mb-3 rounded-xl">
            <Pressable
                className={`flex-row items-center justify-between px-4 py-4  ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}
                style={{
                    backgroundColor: isExpanded ? colors.orange_100 : colors.white,
                    borderWidth: isExpanded ? 0 : 1,
                    borderColor: colors.gray_300,
                }}
                onPress={handleToggle}
            >
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="flex-1">
                    {sectionTitle}
                </Text>
                <View className="w-6 h-6 items-center justify-center">
                    {isExpanded ? (
                        <DownIcon size={12} color={colors.text_secondary} />
                    ) : (
                        <CaretRightIcon size={16} color={colors.text_secondary} />
                    )}
                </View>
            </Pressable>

            {isExpanded && (
                <View
                    className="px-4 py-4 rounded-b-lg"
                    style={{ backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray_200 }}
                >
                    {assumptions.map((assumption, index) => (
                        <View
                            key={index}
                            className={index < assumptions.length - 1 ? 'mb-4' : ''}
                        >
                            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                                {assumption.title}
                            </Text>
                            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                                {assumption.description}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

