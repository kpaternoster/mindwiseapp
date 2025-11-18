import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface ContentCardProps {
    icon?: ReactNode;
    title: string;
    readTime?: string;
    children: ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({
    icon,
    title,
    readTime,
    children,
}) => {
    return (
        <View className="bg-white rounded-3xl p-5 mb-4 border border-gray-200">
            {/* Header with icon, title, and read time */}
            <View className="flex-row items-center mb-4">
                {icon && (
                    <View
                        className="w-12 h-12 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: colors.gray_100 }}
                    >
                        {icon}
                    </View>
                )}
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="flex-1">
                    {title}
                </Text>
                {readTime && (
                    <View
                        className="px-3 py-1 rounded-full"
                        style={{ backgroundColor: colors.orange_opacity_10 }}
                    >
                        <Text style={[t.footnoteBold, { color: colors.orange_600 }]}>
                            {readTime}
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            {children}
        </View>
    );
};

