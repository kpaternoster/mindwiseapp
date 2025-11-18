import React, { useState, useRef } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface DistressSliderProps {
    value: number;
    onValueChange: (value: number) => void;
}

export const DistressSlider: React.FC<DistressSliderProps> = ({
    value,
    onValueChange,
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [trackLeft, setTrackLeft] = useState(0);
    const minValue = 0;
    const maxValue = 10;
    const tickCount = 11; // 0 to 10 = 11 ticks
    const startValueRef = useRef(value);

    const getDistressMessage = (level: number): string => {
        if (level <= 2) return "You're feeling quite calm and in control.";
        if (level <= 4) return "You're experiencing mild stress or discomfort.";
        if (level <= 6) return "You're feeling moderately distressed or overwhelmed.";
        if (level <= 8) return "You're experiencing significant distress.";
        if (level <= 10) return "You're feeling extremely overwhelmed or in crisis.";
        return "You're feeling extremely overwhelmed or in crisis.";
    };

    const handleTouch = (locationX: number) => {
        if (sliderWidth === 0) return;
        
        // Calculate the value based on touch position relative to track
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
                // Store the current value when drag starts
                startValueRef.current = value;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (sliderWidth === 0) return;
                
                // Calculate the change in position based on dx (accumulated distance)
                const startPosition = ((startValueRef.current - minValue) / (maxValue - minValue)) * sliderWidth;
                const newPosition = startPosition + gestureState.dx;
                
                // Clamp the position and convert to value
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
        <View style={{ backgroundColor: colors.white }} className="mt-4">
            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                Rate your current distress level
            </Text>

            <View className="flex-row justify-between mb-2">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    0 - completely calm
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    10 - Extremely distressed
                </Text>
            </View>

            {/* Custom Slider */}
            <View
                className="relative"
                style={{ height: 40, paddingHorizontal: 0 }}
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
                        top: 18,
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
                        const tickPosition = (index / (tickCount - 1)) * sliderWidth;
                        const isActive = tickPosition <= thumbPosition;
                        
                        return (
                            <View
                                key={index}
                                style={{
                                    position: 'absolute',
                                    left: tickPosition - 1,
                                    top: -2,
                                    width: 2,
                                    height: 8,
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
                        top: 8,
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

            <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="text-center mt-3 mb-3">
                Current: {value}
            </Text>

            <View
                className="p-3 rounded-xl"
                style={{ backgroundColor: colors.yellow_50 }}
            >
                <Text style={[t.textMedium, { color: colors.Text_Primary }]}>
                    {getDistressMessage(value)}
                </Text>
            </View>
        </View>
    );
};

