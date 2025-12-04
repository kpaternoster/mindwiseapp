import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ObservationCard, ObservationEntry } from './ObservationCard';
import { EmptyState } from './EmptyState';

interface SavedObservationsListProps {
    entries: ObservationEntry[];
    onDelete: (id: string) => void;
}

export const SavedObservationsList: React.FC<SavedObservationsListProps> = ({
    entries,
    onDelete,
}) => {
    return (
        <View>
            {/* Header Card */}
            <View
                className="rounded-2xl p-4 mb-4"
                style={{ backgroundColor: colors.cream_40 }}
            >
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    Your Observations
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {entries.length} saved observation{entries.length !== 1 ? 's' : ''}
                </Text>
            </View>

            {/* Content */}
            {entries.length === 0 ? (
                <View className='flex-1 items-center justify-center'>
                    <EmptyState
                        title="No observations saved yet."
                        description="Start by creating your first observation entry."
                    />
                </View>

            ) : (
                <View>
                    {entries.map((entry) => (
                        <ObservationCard
                            key={entry.id}
                            entry={entry}
                            onDelete={onDelete}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

