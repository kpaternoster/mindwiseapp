import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface HighlightBoxProps {
    children: ReactNode;
    textColor?: string;
    borderColor?: string;
    backgroundColor?: string;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({ 
    children, 
    textColor, 
    borderColor,
    backgroundColor
}) => {
    return (
        <View
            className="p-4 rounded-lg"
            style={[
                { 
                    backgroundColor: backgroundColor || colors.gray_100, 
                    borderLeftWidth: 2, 
                    borderLeftColor: borderColor || colors.gray_400 
                }
            ]}
        >
            <Text style={[t.textRegular, { color: textColor || colors.Text_Primary }]}>
                {children}
            </Text>
        </View>
    );
};

