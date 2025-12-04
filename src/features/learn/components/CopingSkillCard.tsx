import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ExternalLinkIcon } from '@components/Utils';

interface CopingSkillCardProps {
    title: string;
    description: string;
    onLearnMore?: () => void;
}

export const CopingSkillCard: React.FC<CopingSkillCardProps> = ({
    title,
    description,
    onLearnMore,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-3"
            style={{
                backgroundColor: colors.white,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <Text style={[t.title16SemiBold, { color: colors.warm_dark }]} className="mb-2">
                {title}
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                {description}
            </Text>
            {onLearnMore && (
                <Pressable
                    className="flex-row items-center"
                    onPress={onLearnMore}
                >
                    <Text
                        style={[t.button, { color: colors.warm_dark }]}
                    >
                        Learn more
                    </Text>
                    <View style={{ marginLeft: 4 }}>
                        <ExternalLinkIcon size={16} color={colors.warm_dark} />
                    </View>
                </Pressable>
            )}
        </View>
    );
};

