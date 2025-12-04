import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface TabSwitcherProps {
    tabs: { label: string; value: string }[];
    activeTab: string;
    onTabChange: (value: string) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    return (
        <View className="flex-row mb-6 border border-gray-200 rounded-full" style={{ gap: 8 }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                    <Pressable
                        key={tab.value}
                        className="flex-1 rounded-full py-3 items-center justify-center"
                        style={{
                            backgroundColor: isActive ? colors.warm_dark : colors.white,
                        }}
                        onPress={() => onTabChange(tab.value)}
                    >
                        <Text
                            style={[
                                t.button,
                                {
                                    color: isActive ? colors.white : colors.warm_dark,
                                },
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

