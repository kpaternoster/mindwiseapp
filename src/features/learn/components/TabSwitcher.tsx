import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface TabSwitcherProps {
    tabs: { label: string; value: string }[];
    activeTab: string;
    onTabChange: (value: string) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CONTAINER_PADDING = 40; // 20px padding on each side (px-5 = 20px)
const TAB_GAP = 8;
const TAB_BORDER_PADDING = 8; // 4px padding on each side of the border container
const TAB_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - (TAB_GAP * 2) - (TAB_BORDER_PADDING * 2)) / 3;

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const shouldScroll = tabs.length > 3;

    useEffect(() => {
        if (shouldScroll && scrollViewRef.current) {
            const activeIndex = tabs.findIndex(tab => tab.value === activeTab);
            if (activeIndex !== -1) {
                // Calculate scroll position: center the active tab
                const scrollPosition = activeIndex * (TAB_WIDTH + TAB_GAP) - (SCREEN_WIDTH - CONTAINER_PADDING - TAB_WIDTH) / 2;
                scrollViewRef.current.scrollTo({
                    x: Math.max(0, scrollPosition),
                    animated: true,
                });
            }
        }
    }, [activeTab, shouldScroll, tabs]);

    if (shouldScroll) {
        return (
            <View
                style={
                    {
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: colors.stoke_gray || '#E5E5E5',
                        borderRadius: 9999,
                        gap: TAB_GAP,
                        padding: TAB_BORDER_PADDING / 2,
                    }
                }
                className="mb-6"
            >
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.value;
                        return (
                            <Pressable
                                key={tab.value}
                                className="rounded-full py-3 px-2 items-center justify-center"
                                style={{
                                    backgroundColor: isActive ? colors.warm_dark : colors.white,
                                    width: TAB_WIDTH,
                                }}
                                onPress={() => onTabChange(tab.value)}
                            >
                                <Text
                                    style={[
                                        t.textSemiBold,
                                        {
                                            color: isActive ? colors.white : colors.warm_dark,
                                        },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {tab.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

        );
    }

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
                                t.textSemiBold,
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

