import React, { useMemo, useState } from 'react';
import { View, Text, LayoutChangeEvent, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';

const DOT = 16;
const BAR_H = 4;

export default function ProgressSteps({ current, total }: { current: number; total: number }) {
    const steps = useMemo(() => Array.from({ length: total }, (_, i) => i + 1), [total]);
    const [w, setW] = useState(0);

    const fillWidth = useMemo(() => {
        if (total <= 1) return 0;
        const trackUsable = Math.max(0, w - DOT * 4);
        const ratio = Math.max(0, Math.min(1, (current - 1) / (total - 1)));
        return trackUsable * ratio;
    }, [w, current, total]);

    const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);

    return (
        <View className="px-6 mt-4 mb-4" onLayout={onLayout}>
            <View className="relative h-6 justify-center">
                <View
                    style={styles.dot}
                />
                <View
                    style={[styles.bar, { width: fillWidth }]}
                />
                <View className="flex-row justify-between items-center">
                    {steps.map((n) => (
                        <View
                            key={n}
                            style={{
                                width: DOT,
                                height: DOT,
                                borderRadius: DOT / 2,
                                backgroundColor: n <= current ? colors.orange_dark : colors.orange_gray,
                            }}
                        />
                    ))}
                </View>
            </View>

            {/* step numbers */}
            <View className="flex-row justify-between mt-2 px-0.5">
                {steps.map((n) => (
                    <Text
                        key={n}
                        style={[t.footnoteBold, { color: n === current ? colors.orange_dark : colors.text_gray }]}
                    >
                        {n}
                    </Text>
                ))}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    dot: {
        position: 'absolute',
        left: DOT / 2,
        right: DOT / 2,
        height: BAR_H,
        backgroundColor: colors.orange_gray,
        borderRadius: BAR_H / 2,
    },
    bar: {
        position: 'absolute',
        left: DOT / 2,
        height: BAR_H,
        backgroundColor: colors.orange_dark,
        borderRadius: BAR_H / 2,
    }
})