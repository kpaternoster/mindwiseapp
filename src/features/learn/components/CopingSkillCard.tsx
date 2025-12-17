import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ExternalLinkIcon, CloseIcon } from '@components/Utils';

interface CopingSkillCardProps {
    title: string;
    description: string;
    onLearnMore?: () => void;
    showRemoveButton?: boolean;
    onRemove?: () => void;
}

export const CopingSkillCard: React.FC<CopingSkillCardProps> = ({
    title,
    description,
    onLearnMore,
    showRemoveButton = false,
    onRemove,
}) => {
    return (
        <View
            className="rounded-2xl p-4 mb-3 flex-row"
            style={{
                backgroundColor: colors.white,
                borderColor: colors.stoke_gray,
                borderWidth: 1,
            }}
        >
            <View className="flex-1">
                <Text style={[t.title16SemiBold, { color: colors.warm_dark }]} className="mb-2">
                    {title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                    {description}
                </Text>
                {onLearnMore && !showRemoveButton && (
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
            {showRemoveButton && onRemove && (
                <Pressable
                    className="ml-2"
                    onPress={onRemove}
                    style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: colors.gray_200,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CloseIcon size={12} color={colors.Text_Primary} />
                    </View>
                </Pressable>
            )}
        </View>
    );
};

