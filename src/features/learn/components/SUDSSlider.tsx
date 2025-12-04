import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '@design/color';
import { t } from '@design/typography';

interface SUDSSliderProps {
    value: number;
    onValueChange: (value: number) => void;
}

const SUDS_DESCRIPTIONS: Record<number, string> = {
    1: 'Minimal distress, barely noticeable',
    2: 'Mild distress, easily manageable',
    3: 'Mild distress, manageable but noticeable',
    4: 'Moderate distress, manageable but noticeable',
    5: 'Moderate distress, manageable but noticeable',
    6: 'Moderate distress, manageable but noticeable',
    7: 'High distress, difficult to manage',
    8: 'High distress, very difficult to manage',
    9: 'Severe distress, overwhelming',
    10: 'Extreme distress, completely overwhelming',
};

export const SUDSSlider: React.FC<SUDSSliderProps> = ({
    value,
    onValueChange,
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const minValue = 1;
    const maxValue = 10;

    const handleValueChange = (newValue: number) => {
        const roundedValue = Math.round(newValue);
        onValueChange(roundedValue);
    };

    return (
        <View className="mb-6 border border-gray-200 rounded-2xl p-4">
            {/* Label */}
            <View className="flex-row items-center mb-4">
                <View
                    className="w-8 h-8 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: colors.button_orange }}
                >
                    <Text style={[t.title16SemiBold, { color: colors.white }]}>
                        1
                    </Text>
                </View>
                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]}>
                    Rate Your Current SUDS Level
                </Text>
            </View>

            <View className="flex-row items-center justify-between mb-4">
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>1</Text>
                <Text style={[t.textBold, { color: colors.orange_500 }]}>
                    {value}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>10</Text>
            </View>

            {/* Slider */}
            <View
                style={{ position: 'relative', marginBottom: 12 }}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setSliderWidth(width);
                }}
            >

                <View className="flex-row items-center mb-2">
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
                                index < value  ?
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
            </View>

            {/* Description */}
            <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                {SUDS_DESCRIPTIONS[value] || SUDS_DESCRIPTIONS[5]}
            </Text>
        </View>
    );
};

