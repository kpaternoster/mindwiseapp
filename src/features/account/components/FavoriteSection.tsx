import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { UpIcon, DownIcon } from '@components/Utils';
import { FavoriteItem, FavoriteItemData } from './FavoriteItem';

interface FavoriteSectionProps {
    title: string;
    items: FavoriteItemData[];
    onViewItem: (id: string) => void;
    onDeleteItem: (id: string) => void;
}

export const FavoriteSection: React.FC<FavoriteSectionProps> = ({
    title,
    items,
    onViewItem,
    onDeleteItem,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <View className="mt-4 mx-4 rounded-2xl" >
            <Pressable
                className={`flex-row items-center justify-between px-4 py-4 border rounded-t-2xl ${isExpanded ? 'rounded-b-0' : 'rounded-b-2xl'}`}
                style={{ backgroundColor: colors.orange_50, borderColor: colors.orange_150 }}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>{title}</Text>
                <View className="flex-row items-center">
                    <View className='px-2 py-1 rounded-full mr-4' style={{ backgroundColor: colors.orange_opacity_30 }}>
                        <Text style={[t.footnoteBold, { color: colors.orange_800 }]}>
                            {items.length} items
                        </Text>
                    </View>

                    {isExpanded ? (
                        <UpIcon size={14} color={colors.Text_Primary} />
                    ) : (
                        <DownIcon size={14} color={colors.Text_Primary} />
                    )}
                </View>
            </Pressable>

            {isExpanded && (
                <View className='flex border border-gray-200 rounded-b-2xl border-t-0 pt-4 px-4'>
                    {items.map((item) => (
                        <FavoriteItem
                            key={item.id}
                            item={item}
                            onView={onViewItem}
                            onDelete={onDeleteItem}
                        />
                    ))}
                </View>
            )}


        </View>
    );
};

