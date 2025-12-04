import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface IntensitySliderProps {
    value: number;
    onValueChange: (value: number) => void;
}

export const IntensitySlider: React.FC<IntensitySliderProps> = ({
    value,
    onValueChange,
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const minValue = 0;
    const maxValue = 10;

    const handleValueChange = (newValue: number) => {
        const roundedValue = Math.round(newValue);
        onValueChange(roundedValue);
    };

    return (
        <View className="mb-6">
            {/* Label and Value */}
            <View className="flex-row items-center justify-between mb-4">
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    Intensity 1-10
                </Text>

            </View>

            {/* Slider */}
            <View className='flex-row relative'>
                <View
                    style={{ position: 'relative', marginBottom: 12 }}
                    onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setSliderWidth(width);
                    }}
                    className='flex-1 mr-6'
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
                        StepMarker={({ stepMarked, currentValue, index }) => {
                            return !stepMarked ?
                                index < value - minValue ?
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
                <View className='text-right absolute' style={{ right: 0, top: 0 }}>
                    <Text style={[t.textBold, { color: colors.Text_Primary }]} >
                        {value}
                    </Text>
                </View>

            </View>


            {/* Min/Max Labels */}
            <View className="flex-row justify-between">
                <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                    Mild
                </Text>
                <Text style={[t.footnoteRegular, { color: colors.text_secondary }]}>
                    Intense
                </Text>
            </View>
        </View>
    );
};

