import React, { useState, useRef } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface RatingSliderProps {
    label: string;
    value: number;
    onValueChange: (value: number) => void;
    minLabel?: string;
    maxLabel?: string;
    showCurrentValue?: boolean;
}

export const RatingSlider: React.FC<RatingSliderProps> = ({
    label,
    value,
    onValueChange,
    minLabel,
    maxLabel,
    showCurrentValue = true,
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [trackLeft, setTrackLeft] = useState(0);
    const minValue = 0;
    const maxValue = 10;
    const tickCount = 6; // 5 segments = 6 tick marks (0, 2, 4, 6, 8, 10)
    const startValueRef = useRef(value);

    const handleTouch = (locationX: number) => {
        if (sliderWidth === 0) return;
        
        const percentage = Math.max(0, Math.min(1, locationX / sliderWidth));
        const newValue = Math.round(percentage * (maxValue - minValue) + minValue);
        
        onValueChange(newValue);
    };

    // Track PanResponder (for tapping on track)
    const trackPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) => {
            handleTouch(gestureState.x0 - trackLeft);
        },
    });

    // Thumb PanResponder (for dragging thumb)
    const thumbPanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                startValueRef.current = value;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (sliderWidth === 0) return;
                
                const startPosition = ((startValueRef.current - minValue) / (maxValue - minValue)) * sliderWidth;
                const newPosition = startPosition + gestureState.dx;
                
                const clampedPosition = Math.max(0, Math.min(sliderWidth, newPosition));
                const percentage = clampedPosition / sliderWidth;
                const newValue = Math.round(percentage * (maxValue - minValue) + minValue);
                
                onValueChange(newValue);
            },
            onPanResponderRelease: () => {
                // Drag ended
            },
        })
    ).current;

    const thumbPosition = sliderWidth > 0 
        ? ((value - minValue) / (maxValue - minValue)) * sliderWidth 
        : 0;

    return (
        <View>
            {/* Label and Value */}
            <View className="flex-row items-center justify-between mb-3">
                <Text style={[t.textBold, { color: colors.Text_Primary }]}>
                    {label}
                </Text>
                {showCurrentValue && (
                    <Text style={[t.textBold, { color: colors.orange_500 }]}>
                        {value}
                    </Text>
                )}
            </View>

            {/* Slider */}
            <View
                className="relative mb-4"
                style={{ height: 30, paddingHorizontal: 0 }}
                onLayout={(event) => {
                    const { width, x } = event.nativeEvent.layout;
                    setSliderWidth(width);
                    event.currentTarget.measure((fx, fy, width, height, px, py) => {
                        setTrackLeft(px);
                    });
                }}
            >
                {/* Slider Track */}
                <View
                    className="absolute"
                    style={{
                        top: 13,
                        left: 0,
                        right: 0,
                        height: 4,
                        borderRadius: 2,
                    }}
                    {...trackPanResponder.panHandlers}
                >
                    {/* Inactive Track (Full width, faded) */}
                    <View
                        className="absolute"
                        style={{
                            left: 0,
                            right: 0,
                            height: 4,
                            backgroundColor: `${colors.orange_500}40`, // 25% opacity
                            borderRadius: 2,
                        }}
                    />
                    
                    {/* Active Track (Up to thumb position) */}
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: thumbPosition,
                            height: 4,
                            backgroundColor: colors.orange_500,
                            borderRadius: 2,
                        }}
                    />

                    {/* Tick Marks */}
                    {Array.from({ length: tickCount }).map((_, index) => {
                        const tickValue = (index * 2); // 0, 2, 4, 6, 8, 10
                        const tickPosition = (tickValue / maxValue) * sliderWidth;
                        const isActive = tickPosition <= thumbPosition;
                        
                        return (
                            <View
                                key={index}
                                style={{
                                    position: 'absolute',
                                    left: tickPosition - 1,
                                    top: -6,
                                    width: 2,
                                    height: 16,
                                    backgroundColor: isActive 
                                        ? colors.orange_500 
                                        : `${colors.orange_500}40`,
                                    borderRadius: 1,
                                }}
                            />
                        );
                    })}
                </View>

                {/* Thumb */}
                <Animated.View
                    {...thumbPanResponder.panHandlers}
                    style={{
                        position: 'absolute',
                        left: thumbPosition - 12,
                        top: 2,
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: colors.white,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 4,
                    }}
                />
            </View>

            {/* Min/Max Labels */}
            {(minLabel || maxLabel) && (
                <View className="flex-row justify-between">
                    {minLabel && (
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {minLabel}
                        </Text>
                    )}
                    {maxLabel && (
                        <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                            {maxLabel}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};

