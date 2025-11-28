import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
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
    const minValue = 0;
    const maxValue = 10;

    const getDistressMessage = (level: number): string => {
        if (level <= 2) return "You're feeling quite calm and in control.";
        if (level <= 4) return "You're experiencing mild stress or discomfort.";
        if (level <= 6) return "You're feeling moderately distressed or overwhelmed.";
        if (level <= 8) return "You're experiencing significant distress.";
        if (level <= 10) return "You're feeling extremely overwhelmed or in crisis.";
        return "You're feeling extremely overwhelmed or in crisis.";
    };

    const handleValueChange = (newValue: number) => {
        // Round to nearest integer to ensure step values
        const roundedValue = Math.round(newValue);
        onValueChange(roundedValue);
    };

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

            <View
                style={{ position: 'relative', marginTop: 20 }}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setSliderWidth(width);
                }}
            >
                <Slider
                    style={{ width: '100%' }}
                    value={value}
                    onValueChange={handleValueChange}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    step={1}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbImage={require('@assets/icons/slider_thumb.png')}
                    tapToSeek
                    StepMarker={({ stepMarked, currentValue, index }) =>
                        !stepMarked ?
                            index < value ?
                                <View style={{ width: 2, height: 12, backgroundColor: colors.stroke_orange, }} /> :
                                <View style={{ width: 2, height: 12, backgroundColor: colors.orange_opacity_20, }} />
                            : null}
                />

                {/* Custom Active Track Overlay */}
                {sliderWidth > 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            left: 18,
                            top: 4,
                            right: 18,
                            height: 4,
                            backgroundColor: colors.orange_opacity_20,
                            borderRadius: 2,
                            pointerEvents: 'none',
                        }}
                    >
                        {
                            value > 0 && <View
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: ((value - minValue) / (maxValue - minValue)) * (sliderWidth - 32),
                                    height: 4,
                                    backgroundColor: colors.stroke_orange,
                                    borderRadius: 2,
                                    pointerEvents: 'none',
                                }}
                            />
                        }
                    </View>
                )}
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

