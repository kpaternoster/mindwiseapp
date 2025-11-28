import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
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
    const minValue = 0;
    const maxValue = 10;

    const handleValueChange = (newValue: number) => {
        // Round to nearest integer to ensure step values
        const roundedValue = Math.round(newValue);
        onValueChange(roundedValue);
    };

    return (
        <View>
            {/* Label and Value */}
            <View className="flex-row items-center justify-between mb-6">
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
                style={{ position: 'relative', marginBottom: 16 }}
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
                    step={2}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbImage={require('@assets/icons/slider_thumb.png')}
                    tapToSeek
                    StepMarker={({ stepMarked, currentValue, index }) => {
                        return !stepMarked ?
                            index <= value?
                                <View style={{ width: 2, height: 12, backgroundColor: colors.stroke_orange, }} /> :
                                <View style={{ width: 2, height: 12, backgroundColor: colors.orange_opacity_20, }} />
                            : null;
                    }}
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

