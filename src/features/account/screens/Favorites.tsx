import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ScreenScroll } from '@components/ScreenScroll';
import { PageHeader } from '@features/home/components/PageHeader';
import {
    SearchBar,
    FilterButtons,
    FavoriteSection,
    FavoriteItemData,
} from '../components';
import favoritesData from '../data/favoritesData.json';

export default function Favorites() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Filter and search favorites
    const filteredFavorites = useMemo(() => {
        const allFavorites = {
            plans: favoritesData.favorites.plans,
            app_modules: favoritesData.favorites.app_modules,
        };

        // Apply filter
        let filtered: Record<string, FavoriteItemData[]> = {};
        
        if (selectedFilter === 'all') {
            filtered = allFavorites;
        } else if (selectedFilter === 'plans') {
            filtered = { plans: allFavorites.plans };
        } else if (selectedFilter === 'app_modules') {
            filtered = { app_modules: allFavorites.app_modules };
        }

        // Apply search
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            filtered = Object.fromEntries(
                Object.entries(filtered).map(([key, items]) => [
                    key,
                    items.filter((item) =>
                        item.title.toLowerCase().includes(searchLower)
                    ),
                ])
            );
        }

        return filtered;
    }, [searchQuery, selectedFilter]);

    const handleViewItem = (id: string) => {
        console.log('View item:', id);
        // TODO: Implement view functionality
    };

    const handleDeleteItem = (id: string) => {
        console.log('Delete item:', id);
        // TODO: Implement delete functionality
    };

    return (
        <View className="flex-1 bg-white pt-9">
            <PageHeader title="Favorites" showLeafIcon={true} />
            <ScreenScroll className="flex-1 bg-white px-2">
                {/* Description */}
                <View className="px-6 mt-4 mb-4">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Your saved plans, diary entries, skills and whatever else you choose.
                    </Text>
                </View>

                {/* Search Bar */}
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search favorites"
                />

                {/* Filter Buttons */}
                <FilterButtons
                    filters={favoritesData.filterOptions}
                    selectedFilter={selectedFilter}
                    onFilterSelect={setSelectedFilter}
                />

                {/* Favorites Sections */}
                {filteredFavorites.plans && filteredFavorites.plans.length > 0 && (
                    <FavoriteSection
                        title="Plans"
                        items={filteredFavorites.plans}
                        onViewItem={handleViewItem}
                        onDeleteItem={handleDeleteItem}
                    />
                )}

                {filteredFavorites.app_modules && filteredFavorites.app_modules.length > 0 && (
                    <FavoriteSection
                        title="App Modules"
                        items={filteredFavorites.app_modules}
                        onViewItem={handleViewItem}
                        onDeleteItem={handleDeleteItem}
                    />
                )}

                {/* Empty State */}
                {Object.values(filteredFavorites).every((items) => items.length === 0) && (
                    <View className="px-6 py-12 items-center">
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            No favorites found
                        </Text>
                    </View>
                )}
            </ScreenScroll>
        </View>
    );
}

