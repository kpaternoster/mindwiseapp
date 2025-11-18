import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    VirtualizedList,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

type DateListItem = {
    id: string;
    timestamp: number;
};

const DAYS_PER_YEAR = 366;
const DAYS_EACH_SIDE = Math.floor((DAYS_PER_YEAR - 1) / 2);
const INITIAL_DAYS_BEFORE = DAYS_EACH_SIDE;
const INITIAL_DAYS_AFTER = DAYS_PER_YEAR - INITIAL_DAYS_BEFORE - 1;
const DAYS_INCREMENT = DAYS_PER_YEAR;
const EDGE_THRESHOLD_ITEMS = 20;
const ITEM_WIDTH = 64;
const ITEM_SPACING = 12;
const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const DAY_ABBREVIATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const addDays = (date: Date, days: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
};

const normalizeToStartOfDay = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
};

type InfiniteDateSelectorProps = {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
};

export default function InfiniteDateSelector({
    selectedDate,
    onDateSelect
}: InfiniteDateSelectorProps) {
    const today = useMemo(() => normalizeToStartOfDay(new Date()), []);
    const normalizedSelectedDate = useMemo(
        () => normalizeToStartOfDay(selectedDate ?? today),
        [selectedDate, today]
    );
    const selectedTimestamp = normalizedSelectedDate.getTime();

    const [startDate, setStartDate] = useState<Date>(() =>
        addDays(normalizedSelectedDate, -INITIAL_DAYS_BEFORE)
    );
    const [totalDays, setTotalDays] = useState(INITIAL_DAYS_BEFORE + INITIAL_DAYS_AFTER + 1);

    const dateListRef = useRef<VirtualizedList<DateListItem>>(null);
    const lastOffsetRef = useRef(0);
    const extendStateRef = useRef({ forward: false, backward: false });
    const isInitializedRef = useRef(false);
    const pendingBackwardScrollRef = useRef<number | null>(null);

    const resetWindow = useCallback(
        (targetDate: Date) => {
            const nextStart = addDays(targetDate, -INITIAL_DAYS_BEFORE);
            setStartDate(nextStart);
            setTotalDays(INITIAL_DAYS_BEFORE + INITIAL_DAYS_AFTER + 1);
            isInitializedRef.current = false;
            pendingBackwardScrollRef.current = null;
            extendStateRef.current.backward = false;
            extendStateRef.current.forward = false;

            // Use multiple attempts to ensure scroll happens
            const scrollToCenter = () => {
                const targetOffset = INITIAL_DAYS_BEFORE * ITEM_TOTAL_WIDTH;
                dateListRef.current?.scrollToOffset({
                    offset: targetOffset,
                    animated: false
                });
                lastOffsetRef.current = targetOffset;
            };

            // Try immediately
            requestAnimationFrame(() => {
                scrollToCenter();
                // Also try after a short delay to ensure list is ready
                setTimeout(scrollToCenter, 100);
            });
        },
        []
    );

    useEffect(() => {
        resetWindow(normalizedSelectedDate);
    }, [normalizedSelectedDate, resetWindow]);

    const isDateSelected = useCallback(
        (timestamp: number): boolean => timestamp === selectedTimestamp,
        [selectedTimestamp]
    );

    const getItem = useCallback(
        (_: undefined, index: number): DateListItem => {
            const date = addDays(startDate, index);
            return {
                id: `${date.toISOString()}-${index}`,
                timestamp: date.getTime()
            };
        },
        [startDate]
    );

    const handleDatePress = useCallback(
        (date: Date) => {
            onDateSelect(date);
        },
        [onDateSelect]
    );

    const renderDateItem = useCallback(
        ({ item }: { item: DateListItem }) => {
            const selected = isDateSelected(item.timestamp);
            return (
                <DateItem
                    timestamp={item.timestamp}
                    selected={selected}
                    onPress={handleDatePress}
                />
            );
        },
        [handleDatePress, isDateSelected]
    );

    const extendBackward = useCallback(() => {
        if (extendStateRef.current.backward) {
            return;
        }

        extendStateRef.current.backward = true;
        const currentOffset = lastOffsetRef.current;
        const offsetAdjustment = DAYS_INCREMENT * ITEM_TOTAL_WIDTH;
        const newOffset = currentOffset + offsetAdjustment;
        
        // Store the target offset to apply when content size changes
        pendingBackwardScrollRef.current = newOffset;
        
        setStartDate((prev) => addDays(prev, -DAYS_INCREMENT));
        setTotalDays((prev) => prev + DAYS_INCREMENT);
    }, []);

    const extendForward = useCallback(() => {
        if (extendStateRef.current.forward) {
            return;
        }

        extendStateRef.current.forward = true;
        setTotalDays((prev) => prev + DAYS_INCREMENT);

        requestAnimationFrame(() => {
            extendStateRef.current.forward = false;
        });
    }, []);

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            lastOffsetRef.current = offsetX;

            const currentIndex = offsetX / ITEM_TOTAL_WIDTH;
            const distanceFromStart = currentIndex;
            const distanceFromEnd = totalDays - 1 - currentIndex;

            if (distanceFromStart <= EDGE_THRESHOLD_ITEMS) {
                extendBackward();
            } else if (distanceFromEnd <= EDGE_THRESHOLD_ITEMS) {
                extendForward();
            }
        },
        [extendBackward, extendForward, totalDays]
    );

    const handleContentSizeChange = useCallback(
        (contentWidth: number) => {
            // Handle pending backward scroll adjustment
            if (pendingBackwardScrollRef.current !== null) {
                const targetOffset = pendingBackwardScrollRef.current;
                pendingBackwardScrollRef.current = null;
                requestAnimationFrame(() => {
                    dateListRef.current?.scrollToOffset({
                        offset: targetOffset,
                        animated: false
                    });
                    lastOffsetRef.current = targetOffset;
                    extendStateRef.current.backward = false;
                });
                return;
            }

            // Ensure we scroll to center on initial render
            if (!isInitializedRef.current && contentWidth > 0) {
                isInitializedRef.current = true;
                const targetOffset = INITIAL_DAYS_BEFORE * ITEM_TOTAL_WIDTH;
                requestAnimationFrame(() => {
                    dateListRef.current?.scrollToOffset({
                        offset: targetOffset,
                        animated: false
                    });
                    lastOffsetRef.current = targetOffset;
                });
            }
        },
        []
    );

    return (
        <View className="mb-4">
            <VirtualizedList
                ref={dateListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ maxHeight: 63 }}
                data={[]}
                initialScrollIndex={INITIAL_DAYS_BEFORE}
                getItemCount={() => totalDays}
                getItem={getItem}
                renderItem={renderDateItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.dateListContent}
                getItemLayout={(_, index) => ({
                    length: ITEM_TOTAL_WIDTH,
                    offset: ITEM_TOTAL_WIDTH * index,
                    index
                })}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onContentSizeChange={handleContentSizeChange}
                onScrollToIndexFailed={({ index }) => {
                    requestAnimationFrame(() => {
                        dateListRef.current?.scrollToIndex({ index, animated: false });
                    });
                }}
            />
        </View>
    );
}

type DateItemProps = {
    timestamp: number;
    selected: boolean;
    onPress: (date: Date) => void;
};

const DateItem = React.memo(
    ({ timestamp, selected, onPress }: DateItemProps) => {
        const date = useMemo(() => new Date(timestamp), [timestamp]);
        const formattedDay = DAY_ABBREVIATIONS[date.getDay()];
        const formattedDate = date.getDate().toString().padStart(2, '0');

        return (
            <Pressable
                className="rounded-2xl items-center justify-center"
                style={[
                    styles.datePill,
                    {
                        backgroundColor: selected ? colors.orange_500 : colors.gray_100
                    }
                ]}
                onPress={() => onPress(date)}
            >
                <Text
                    style={[
                        selected ? t.textSemiBold : t.textRegular,
                        {
                            color: selected ? colors.white : colors.text_secondary,
                            textAlign: 'center'
                        }
                    ]}
                >
                    {formattedDay}
                </Text>
                <Text
                    style={[
                        selected ? t.textSemiBold : t.textRegular,
                        {
                            color: selected ? colors.white : colors.text_secondary,
                            textAlign: 'center'
                        }
                    ]}
                    className="mt-2"
                >
                    {formattedDate}
                </Text>
            </Pressable>
        );
    },
    (prev, next) => prev.timestamp === next.timestamp && prev.selected === next.selected
);

const styles = StyleSheet.create({
    dateListContent: {
        paddingHorizontal: 24,
        paddingBottom: 8
    },
    datePill: {
        width: ITEM_WIDTH,
        marginRight: ITEM_SPACING,
        paddingVertical: 12
    }
});

