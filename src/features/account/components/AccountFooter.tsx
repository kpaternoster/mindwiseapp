import React from 'react';
import { View, Text } from 'react-native';
import { t } from '@design/typography';
import { colors } from '@design/color';

export const AccountFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <View className="items-center py-6 px-6 mt-6">
            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="text-center mb-2">
                MindWise DBT
            </Text>
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className="text-center mb-2">
                Version 1.0.0
            </Text>
            <Text style={[t.footnoneMedium, { color: colors.text_secondary }]} className="text-center">
                © {currentYear} MindWise. All rights reserved.
            </Text>
        </View>
    );
};
