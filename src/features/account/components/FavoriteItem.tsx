import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import Svg, { Path } from 'react-native-svg';
import { EyeIcon, TrashIcon } from '@components/Utils';


export interface FavoriteItemData {
    id: string;
    title: string;
    type: string;
}

interface FavoriteItemProps {
    item: FavoriteItemData;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ item, onView, onDelete }) => {
    return (
        <View className="flex-row items-center justify-between rounded-2xl px-4 py-3 mb-3 border border-gray-200" style={{ backgroundColor: colors.white }}>
            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="flex-1">
                {item.title}
            </Text>
            <View className="flex-row items-center gap-3">
                <Pressable onPress={() => onView(item.id)} className="p-1">
                    <EyeIcon size={20} color={colors.text_secondary} />
                </Pressable>
                <Pressable onPress={() => onDelete(item.id)} className="p-1">
                    <TrashIcon size={16} color={colors.orange_500} />
                </Pressable>
            </View>
        </View>
    );
};

