import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { CalendarBlankIcon, EyeIcon, TrashIcon } from '@components/Utils';

export interface ValidationPracticeEntry {
    id: string;
    date: string;
    time?: string;
    type: 'activeListening' | 'strengthenValidation' | 'selfReflection';
    // Step 1 fields
    describeConversation?: string;
    specificChallenges?: string;
    engagementTechniques?: string;
    // Step 2 fields
    practiceTopic?: string;
    asSpeaker?: string;
    asListener?: string;
    // Step 3 fields
    keyLearnings?: string;
    areasToImprove?: string;
    practiceThisWeek?: string;
    // Step 4 fields
    emotionalSituation?: string;
    emotionsIdentified?: string;
    validatingResponse?: string;
    supportOrAdvice?: string;
    // Step 5 fields
    dismissivePhrase1?: string;
    reframe1?: string;
    dismissivePhrase2?: string;
    reframe2?: string;
    dismissivePhrase3?: string;
    reframe3?: string;
    // Step 6 fields
    practiceScenario?: string;
    validationApproach?: string;
    impactOnRelationships?: string;
}

interface ValidationPracticeEntryCardProps {
    entry: ValidationPracticeEntry;
    onView: (entryId: string) => void;
    onDelete: (entryId: string) => void;
}

const getTitle = (type: ValidationPracticeEntry['type']) => {
    switch (type) {
        case 'activeListening':
            return 'Active Listening Practice';
        case 'strengthenValidation':
            return 'Strengthen Your Validation';
        case 'selfReflection':
            return 'Self-Reflection';
        default:
            return 'Validation Practice';
    }
};

export const ValidationPracticeEntryCard: React.FC<ValidationPracticeEntryCardProps> = ({
    entry,
    onView,
    onDelete,
}) => {
    const formatDate = (dateString: string, timeString?: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        if (timeString) {
            return `${formattedDate}, ${timeString}`;
        }
        return formattedDate;
    };

    const truncateText = (text: string, maxLength: number = 100) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    // Get snippet text based on entry type
    const getSnippet = () => {
        if (entry.type === 'activeListening') {
            if (entry.describeConversation) {
                return `Active listening skills practice... ${truncateText(entry.describeConversation, 50)}`;
            }
            if (entry.practiceTopic) {
                return `Active listening skills practice... ${truncateText(entry.practiceTopic, 50)}`;
            }
            return 'Active listening skills practice...';
        }
        
        if (entry.type === 'strengthenValidation') {
            if (entry.emotionalSituation) {
                return `Active listening skills practice... ${truncateText(entry.emotionalSituation, 50)}`;
            }
            if (entry.dismissivePhrase1) {
                return `Active listening skills practice... ${truncateText(entry.dismissivePhrase1, 50)}`;
            }
            if (entry.validatingResponse) {
                return `Active listening skills practice... ${truncateText(entry.validatingResponse, 50)}`;
            }
            return 'Active listening skills practice...';
        }
        
        if (entry.type === 'selfReflection') {
            if (entry.describeConversation) {
                return `Situation: ${truncateText(entry.describeConversation, 60)}`;
            }
            if (entry.practiceScenario) {
                return `Situation: ${truncateText(entry.practiceScenario, 60)}`;
            }
            return 'Self-Reflection entry';
        }
        
        return 'Validation Practice entry';
    };

    return (
        <View
            className="bg-white rounded-2xl p-4 mb-4"
            style={{
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <View className="flex-row items-start justify-between mb-3">
                {/* Date Badge */}
                <View
                    className="flex-row items-center px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: colors.orange_50 }}
                >
                    <CalendarBlankIcon size={14} color={colors.orange_600} />
                    <Text
                        style={[t.footnoteBold, { color: colors.orange_600 }]}
                        className="ml-2"
                    >
                        {formatDate(entry.date, entry.time)}
                    </Text>
                </View>

                {/* Action Icons */}
                <View className="flex-row items-center gap-4">
                    <Pressable onPress={() => onView(entry.id)}>
                        <EyeIcon size={20} color={colors.text_secondary} />
                    </Pressable>
                    <Pressable onPress={() => onDelete(entry.id)}>
                        <TrashIcon size={16} color={colors.muted_coral} />
                    </Pressable>
                </View>
            </View>

            {/* Title */}
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                {getTitle(entry.type)}
            </Text>

            {/* Description Snippet */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {getSnippet()}
            </Text>
        </View>
    );
};

