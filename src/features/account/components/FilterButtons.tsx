import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface FilterOption {
    id: string;
    label: string;
}

interface FilterButtonsProps {
    filters: FilterOption[];
    selectedFilter: string;
    onFilterSelect: (id: string) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
    filters,
    selectedFilter,
    onFilterSelect,
}) => {
    return (
        <View className="mb-4 mt-2 px-6">
            <Text style={[t.textRegular, { color: colors.text_secondary }]} className=" mb-3">
                Filter by
            </Text>
            <View className="flex flex-row flex-wrap gap-2">
            
                {filters.map((filter, index) => {
                    const isSelected = selectedFilter === filter.id;
                    return (
                        <Pressable
                            key={filter.id}
                            onPress={() => onFilterSelect(filter.id)}
                            className={`px-4 py-2 rounded-2xl mr-2 border border-gray-200 ${index === filters.length - 1 ? 'mr-6' : ''}`}
                            style={{
                                backgroundColor: isSelected ? colors.orange_500 : colors.white,
                            }}
                        >
                            <Text
                                style={[
                                    t.textMedium,
                                    {
                                        color: isSelected ? colors.white : colors.Text_Primary,
                                    },
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

