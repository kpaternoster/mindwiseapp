import React, { useState, useRef } from 'react';
import { View, ScrollView, StatusBar, Pressable, Text, PanResponder, Animated } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { PageHeader, IntroCard } from '../components';
import differentActionFlashCardPromptsData from '../data/differentActionFlashCardPrompts.json';

interface FlashCard {
    id: string;
    urge: string;
    action: string;
}

type ViewMode = 'stack' | 'list';

// Mock data - TODO: Replace with actual data from storage/backend
const mockFlashCards: FlashCard[] = [
    {
        id: '1',
        urge: 'Withdraw / Isolate',
        action: 'Text one supportive friend or step outside for fresh air for 2 minutes.',
    },
    {
        id: '2',
        urge: 'Withdraw / Isolate',
        action: 'Text one supportive friend or step outside for fresh air for 2 minutes.',
    },
    {
        id: '3',
        urge: 'Withdraw / Isolate',
        action: 'Text one supportive friend or step outside for fresh air for 2 minutes.',
    },
    {
        id: '4',
        urge: 'Withdraw / Isolate',
        action: 'Text one supportive friend or step outside for fresh air for 2 minutes.',
    },
    {
        id: '5',
        urge: 'Withdraw / Isolate',
        action: 'Text one supportive friend or step outside for fresh air for 2 minutes.',
    },
];

export default function DifferentActionFlashCardPromptsScreen() {
    const { dissolveTo } = useDissolveNavigation();
    const { title, introText, buttons } = differentActionFlashCardPromptsData;
    const [viewMode, setViewMode] = useState<ViewMode>('stack');
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
    const [cardOrder, setCardOrder] = useState<number[]>(mockFlashCards.map((_, index) => index));
    const dragY = useRef(new Animated.Value(0)).current;
    const isDragging = useRef(false);

    const handleToggleView = () => {
        setViewMode(viewMode === 'stack' ? 'list' : 'stack');
        // Reset drag animation when switching views
        dragY.setValue(0);
    };

    const handleCardPress = (cardId: string) => {
        setFlippedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cardId)) {
                newSet.delete(cardId);
            } else {
                newSet.add(cardId);
            }
            return newSet;
        });
    };

    const rotateStack = () => {
        // Move first card to the end
        setCardOrder((prev) => {
            const newOrder = [...prev];
            const firstCard = newOrder.shift();
            if (firstCard !== undefined) {
                newOrder.push(firstCard);
            }
            return newOrder;
        });
        // Reset flipped state for the moved card
        const topCardIndex = cardOrder[0];
        const topCardId = mockFlashCards[topCardIndex]?.id;
        if (topCardId) {
            setFlippedCards((prev) => {
                const newSet = new Set(prev);
                newSet.delete(topCardId);
                return newSet;
            });
        }
        // Reset drag animation
        dragY.setValue(0);
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => viewMode === 'stack',
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only respond to vertical drags
                return viewMode === 'stack' && Math.abs(gestureState.dy) > 5;
            },
            onPanResponderGrant: () => {
                isDragging.current = true;
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    // Only allow dragging down
                    dragY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                isDragging.current = false;
                const threshold = 100; // Minimum drag distance to trigger rotation
                
                if (gestureState.dy > threshold) {
                    // Animate card moving down and rotate stack
                    Animated.timing(dragY, {
                        toValue: 300,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        rotateStack();
                    });
                } else {
                    // Snap back to original position
                    Animated.spring(dragY, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 50,
                        friction: 7,
                    }).start();
                }
            },
        })
    ).current;

    const renderStackView = () => {
        const visibleCardIndices = cardOrder.slice(0, 3); // Show top 3 cards in stack
        
        return (
            <View 
                className="items-center justify-center" 
                style={{ minHeight: 300 }}
                {...panResponder.panHandlers}
            >
                {visibleCardIndices.map((cardIndex, index) => {
                    const card = mockFlashCards[cardIndex];
                    const isFlipped = flippedCards.has(card.id);
                    const isTopCard = index === 0;
                    const zIndex = visibleCardIndices.length - index;
                    const baseTranslateY = index * 16 * -1;
                    const scale = 1 - index * 0.05;

                    // For top card, add drag offset to base position; for others, use static value
                    // Since baseTranslateY for top card is 0, we can use dragY directly
                    const translateY = isTopCard 
                        ? dragY
                        : baseTranslateY;

                    return (
                        <Animated.View
                            key={`${card.id}-${cardIndex}`}
                            className="absolute"
                            style={{
                                width: '90%',
                                zIndex,
                                transform: [
                                    { translateY },
                                    { scale },
                                ],
                                opacity: isTopCard ? 1 : 0.7,
                            }}
                        >
                            <Pressable
                                onPress={() => isTopCard && !isDragging.current && handleCardPress(card.id)}
                            >
                                <View
                                    className="rounded-2xl p-6"
                                    style={{
                                        backgroundColor: isFlipped ? colors.Button_Orange : colors.orange_50,
                                        borderColor: colors.stoke_gray,
                                        borderWidth: 1,
                                        minHeight: 240,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {isFlipped ? (
                                        <View className="items-center">
                                            <Text style={[t.title16SemiBold, { color: colors.white }]} className="mb-3">
                                                Action:
                                            </Text>
                                            <Text style={[t.textRegular, { color: colors.white, textAlign: 'center' }]}>
                                                {card.action}
                                            </Text>
                                        </View>
                                    ) : (
                                        <Text style={[t.textSemiBold, { color: colors.Text_Primary, textAlign: 'center' }]}>
                                            Urge: {card.urge}
                                        </Text>
                                    )}
                                </View>
                            </Pressable>
                        </Animated.View>
                    );
                })}
            </View>
        );
    };

    const renderListView = () => {
        return (
            <View>
                {mockFlashCards.map((card) => {
                    const isFlipped = flippedCards.has(card.id);
                    return (
                        <Pressable
                            key={card.id}
                            onPress={() => handleCardPress(card.id)}
                            className="mb-4"
                        >
                            <View
                                className="rounded-2xl p-6"
                                style={{
                                    backgroundColor: isFlipped ? colors.Button_Orange : colors.orange_50,
                                    borderColor: colors.stoke_gray,
                                    borderWidth: 1,
                                    minHeight: 160,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {isFlipped ? (
                                    <View className="items-center">
                                        <Text style={[t.title16SemiBold, { color: colors.white }]} className="mb-3">
                                            Action:
                                        </Text>
                                        <Text style={[t.textRegular, { color: colors.white, textAlign: 'center' }]}>
                                            {card.action}
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={[t.textSemiBold, { color: colors.Text_Primary, textAlign: 'center' }]}>
                                        Urge: {card.urge}
                                    </Text>
                                )}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <PageHeader title={title} showHomeIcon={true} showLeafIcon={true} />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Intro Card */}
                <IntroCard text={introText} />

                {/* Flash Cards */}
                {viewMode === 'stack' ? renderStackView() : renderListView()}
            </ScrollView>

            {/* Bottom Toggle Button */}
            <View className="px-5 pb-6" style={{ backgroundColor: colors.white }}>
                <Pressable
                    className="rounded-full py-4 px-3 flex-row items-center justify-center"
                    style={{ borderColor: colors.Button_Orange, borderWidth: 2, backgroundColor: colors.white }}
                    onPress={handleToggleView}
                >
                    <Text style={[t.textSemiBold, { color: colors.Button_Orange }]}>
                        {viewMode === 'stack' ? buttons.listView : buttons.stackView}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

