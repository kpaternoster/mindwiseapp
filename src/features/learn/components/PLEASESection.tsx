import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon } from '@components/Utils';
import { QualitySlider } from './QualitySlider';

interface PLEASESectionProps {
    id: string;
    title: string;
    description: string;
    suggestedPractices: string[];
    quality: number;
    onQualityChange: (value: number) => void;
    personalPlan: string;
    onPersonalPlanChange: (text: string) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export const PLEASESection: React.FC<PLEASESectionProps> = ({
    title,
    description,
    suggestedPractices,
    quality,
    onQualityChange,
    personalPlan,
    onPersonalPlanChange,
    isExpanded,
    onToggle,
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
                        <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                            {title}
                        </Text>
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

            {/* Expanded Content */}
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
                    {/* Current Quality Slider */}
                    <QualitySlider
                        value={quality}
                        onValueChange={onQualityChange}
                    />

                    {/* Suggested Practices */}
                    <View className="mb-4">
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                            Suggested Practices:
                        </Text>
                        <View
                            className="rounded-xl p-4"
                            style={{ backgroundColor: colors.orange_50 }}
                        >
                            {suggestedPractices.map((practice, index) => (
                                <View key={index} className="mb-2 flex-row">
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mr-2">
                                        •
                                    </Text>
                                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="flex-1">
                                        {practice}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Your Personal Plan & Ideas */}
                    <View>
                        <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                            Your Personal Plan & Ideas:
                        </Text>
                        <TextInput
                            value={personalPlan}
                            onChangeText={onPersonalPlanChange}
                            placeholder="Write your own ideas, challenges or specific goals for this area...."
                            placeholderTextColor={colors.text_secondary}
                            style={[
                                t.textRegular,
                                {
                                    color: colors.Text_Primary,
                                    backgroundColor: colors.white,
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    padding: 12,
                                    minHeight: 100,
                                    textAlignVertical: 'top',
                                },
                            ]}
                            multiline
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

