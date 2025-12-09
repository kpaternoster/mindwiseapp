import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface QualitySliderProps {
    value: number;
    onValueChange: (value: number) => void;
    label?: string;
}

export const QualitySlider: React.FC<QualitySliderProps> = ({
    value,
    onValueChange,
    label = "Current Quality",
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const minValue = 1;
    const maxValue = 10;

    const handleValueChange = (newValue: number) => {
        const roundedValue = Math.round(newValue);
        onValueChange(roundedValue);
    };

    return (
        <View className="mb-4">
            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-3">
                {label} {value}/10
            </Text>
            
            {/* Slider */}
            <View
                style={{ position: 'relative', marginBottom: 8 }}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setSliderWidth(width);
                }}
            >
                <View className="flex-row items-center justify-between mb-2">
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>1</Text>
                    <Text style={[t.footnoteBold, { color: colors.Button_Orange }]}>
                        {value}
                    </Text>
                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>10</Text>
                </View>

                <View className="flex-row items-center">
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
                        StepMarker={({ stepMarked, currentValue, index }) => {
                            return !stepMarked ?
                                index < value ?
                                    <View style={{ width: 2, height: 12, backgroundColor: colors.stroke_orange }} /> :
                                    <View style={{ width: 2, height: 12, backgroundColor: colors.orange_opacity_20 }} />
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
                            {value > 0 && (
                                <View
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
                            )}
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

