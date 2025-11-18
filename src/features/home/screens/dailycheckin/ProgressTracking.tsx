import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { PageHeader } from '../../components';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Rect, Text as SvgText } from 'react-native-svg';
import progressData from '../../data/dailycheckin/progressTracking.json';
import { createSmoothPath } from '../../utils';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth;
const chartHeight = 200;

export default function ProgressTrackingScreen() {
    const navigation = useNavigation<NavigationProp>();

    // SUDS Overtime Chart
    const renderSUDSChart = () => {
        const data = progressData.sudsOvertime.data;
        const highlightedDay = progressData.sudsOvertime.highlightedDay;
        const maxValue = 10;
        const padding = 20;
        const plotWidth = chartWidth - padding * 2;
        const plotHeight = chartHeight - padding * 2;

        // Calculate points for the line
        const points = data.map((item, index) => {
            const x = padding + (index / (data.length - 1)) * plotWidth;
            const y = padding + plotHeight - (item.value / maxValue) * plotHeight;
            return { x, y, day: item.day, value: item.value };
        });

        // Create smooth curved line path
        const linePath = createSmoothPath(points);

        // Create smooth area fill path
        const areaPath = `
            M ${padding},${padding + plotHeight}
            L ${points[0].x},${points[0].y}
            ${linePath.substring(linePath.indexOf(' '))}
            L ${points[points.length - 1].x},${padding + plotHeight}
            Z
        `;

        // Find highlighted point
        const highlightedPoint = points.find(p => p.day === highlightedDay);

        return (
            <View style={styles.chartContainer}>
                <Svg width={chartWidth} height={chartHeight}>
                    <Defs>
                        <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={colors.orange_500} stopOpacity="0.3" />
                            <Stop offset="1" stopColor={colors.orange_50} stopOpacity="0.1" />
                        </LinearGradient>
                    </Defs>

                    {/* Area fill */}
                    <Path d={areaPath} fill="url(#areaGradient)" />

                    {/* Line */}
                    <Path d={linePath} stroke={colors.button_orange} strokeWidth="3" fill="none" />

                    {/* Highlighted day bar */}
                    {highlightedPoint && (
                        <>
                            <Rect
                                x={highlightedPoint.x - 15}
                                y={padding}
                                width="30"
                                height={plotHeight}
                                fill={colors.orange_500}
                                opacity="0.2"
                                rx='12'
                            />
                            {/* Highlighted point circle */}
                            <Circle
                                cx={highlightedPoint.x}
                                cy={highlightedPoint.y}
                                r="8"
                                fill={colors.button_orange}
                                stroke={colors.white}
                                strokeWidth="3"
                            />
                        </>
                    )}

                    {/* X-axis labels */}
                    <SvgText
                        x={padding + 10}
                        y={chartHeight - 5}
                        fontSize="10"
                        fill={colors.text_secondary}
                        textAnchor="start"
                    >
                        Day 01
                    </SvgText>
                    <SvgText
                        x={chartWidth / 2}
                        y={chartHeight - 5}
                        fontSize="10"
                        fill={colors.text_secondary}
                        textAnchor="middle"
                    >
                        Day 15
                    </SvgText>
                    {highlightedPoint && (
                        <>
                            <Rect
                                x={highlightedPoint.x - 16}
                                y={chartHeight - 18}
                                width="48"
                                height="20"
                                fill={colors.warm_dark}
                                rx="9"
                            />
                            <SvgText
                                x={highlightedPoint.x}
                                y={chartHeight - 5}
                                fontSize="10"
                                fill={colors.white}
                                textAnchor="middle"
                            >
                                Day {highlightedDay}
                            </SvgText>
                        </>
                    )}
                    <SvgText
                        x={chartWidth - padding - 10}
                        y={chartHeight - 5}
                        fontSize="10"
                        fill={colors.text_secondary}
                        textAnchor="end"
                    >
                        Day 30
                    </SvgText>
                </Svg>
            </View>
        );
    };

    // Emotional Intensity Chart
    const renderEmotionalIntensityChart = () => {
        const positiveData = progressData.emotionalIntensity.positive;
        const negativeData = progressData.emotionalIntensity.negative;
        const maxValue = 10;
        const padding = 20;
        const plotWidth = chartWidth - padding * 2;
        const plotHeight = chartHeight - padding * 2;

        // Calculate points for positive line
        const positivePoints = positiveData.map((item, index) => {
            const x = padding + (index / (positiveData.length - 1)) * plotWidth;
            const y = padding + plotHeight - (item.value / maxValue) * plotHeight;
            return { x, y };
        });

        // Calculate points for negative line
        const negativePoints = negativeData.map((item, index) => {
            const x = padding + (index / (negativeData.length - 1)) * plotWidth;
            const y = padding + plotHeight - (item.value / maxValue) * plotHeight;
            return { x, y };
        });

        // Create smooth curved paths
        const positiveLinePath = createSmoothPath(positivePoints);
        const negativeLinePath = createSmoothPath(negativePoints);

        const positiveAreaPath = `
            M ${padding},${padding + plotHeight}
            L ${positivePoints[0].x},${positivePoints[0].y}
            ${positiveLinePath.substring(positiveLinePath.indexOf(' '))}
            L ${positivePoints[positivePoints.length - 1].x},${padding + plotHeight}
            Z
        `;

        const negativeAreaPath = `
            M ${padding},${padding + plotHeight}
            L ${negativePoints[0].x},${negativePoints[0].y}
            ${negativeLinePath.substring(negativeLinePath.indexOf(' '))}
            L ${negativePoints[negativePoints.length - 1].x},${padding + plotHeight}
            Z
        `;

        // Find peak in positive data
        const peakIndex = positiveData.reduce((maxIdx, curr, idx, arr) =>
            curr.value > arr[maxIdx].value ? idx : maxIdx, 0
        );
        const peakPoint = positivePoints[peakIndex];

        return (
            <View style={styles.chartContainer}>
                <Svg width={chartWidth} height={chartHeight + 40}>
                    <Defs>
                        <LinearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={colors.orange_500} stopOpacity="0.4" />
                            <Stop offset="1" stopColor={colors.orange_50} stopOpacity="0.1" />
                        </LinearGradient>
                        <LinearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={colors.warm_dark} stopOpacity="0.4" />
                            <Stop offset="1" stopColor={colors.warm_dark} stopOpacity="0.1" />
                        </LinearGradient>
                    </Defs>

                    {/* Negative area and line */}
                    {/* <Path d={negativeAreaPath} fill="url(#negativeGradient)" /> */}
                    <Path d={negativeLinePath} stroke={colors.warm_dark} strokeWidth="3" fill="none" />

                    {/* Positive area and line */}
                    <Path d={positiveAreaPath} fill="url(#positiveGradient)" />
                    <Path d={positiveLinePath} stroke={colors.button_orange} strokeWidth="3" fill="none" />

                    {/* Peak point */}
                    <Circle
                        cx={peakPoint.x}
                        cy={peakPoint.y}
                        r="8"
                        fill={colors.button_orange}
                        stroke={colors.white}
                        strokeWidth="6"
                    />

                    {/* Legend */}
                    <Circle cx={padding + 20} cy={chartHeight + 20} r="5" fill={colors.button_orange} />
                    <SvgText
                        x={padding + 30}
                        y={chartHeight + 25}
                        fontSize="10"
                        fill={colors.Text_Primary}
                    >
                        Positive
                    </SvgText>

                    <Circle cx={padding + 100} cy={chartHeight + 20} r="5" fill={colors.warm_dark} />
                    <SvgText
                        x={padding + 110}
                        y={chartHeight + 25}
                        fontSize="10"
                        fill={colors.Text_Primary}
                    >
                        Negative
                    </SvgText>
                </Svg>
            </View>
        );
    };

    // Bar Chart (for Target Behavior Urges and Skills)
    const renderBarChart = (
        data: Array<{ day: number; value: number }>,
        highlightedDay: number,
        maxValue: number = 10
    ) => {
        const padding = 24;
        const plotWidth = chartWidth - padding * 2;
        const plotHeight = chartHeight - padding * 2;
        const barWidth = Math.min(plotWidth / data.length - 8, 8);

        return (
            <View style={styles.chartContainer}>
                <Svg width={chartWidth} height={chartHeight + 20}>
                    {data.map((item, index) => {
                        const x = padding + (index * (plotWidth / data.length)) + 4;
                        const barHeight = (item.value / maxValue) * plotHeight;
                        const y = padding + plotHeight - barHeight;
                        const isHighlighted = item.day === highlightedDay;

                        return (
                            <React.Fragment key={index}>
                                {/* Background bar */}
                                <Rect
                                    x={x}
                                    y={padding}
                                    width={barWidth}
                                    height={plotHeight}
                                    fill={colors.gray_300}
                                    opacity="0.3"
                                    rx="4"
                                />
                                {/* Actual bar */}
                                <Rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={isHighlighted ? colors.warm_dark : colors.button_orange}
                                    rx="4"
                                />
                                {/* Day label */}
                                <SvgText
                                    x={x + barWidth / 2}
                                    y={chartHeight + 15}
                                    fontSize="12"
                                    fill={colors.text_secondary}
                                    textAnchor="middle"
                                >
                                    {item.day}
                                </SvgText>
                            </React.Fragment>
                        );
                    })}
                </Svg>
            </View>
        );
    };

    return (
        <View className="flex-1 pt-9 bg-white" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <PageHeader title="Progress Tracking" />

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* SUDS Overtime */}
                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    {progressData.sudsOvertime.title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                    {progressData.sudsOvertime.subtitle}
                </Text>
                <View
                    className="rounded-xl mb-6 border border-gray-200 pb-6"
                    style={{ backgroundColor: colors.white }}
                >
                    {renderSUDSChart()}
                </View>

                {/* Emotional Intensity */}
                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    {progressData.emotionalIntensity.title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                    {progressData.emotionalIntensity.subtitle}
                </Text>
                <View
                    className="p-4 rounded-xl mb-6 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    {renderEmotionalIntensityChart()}
                </View>

                {/* Target Behavior Urges */}
                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    {progressData.targetBehaviorUrges.title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                    {progressData.targetBehaviorUrges.subtitle}
                </Text>
                <View
                    className="p-4 rounded-xl mb-6 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >

                    {renderBarChart(
                        progressData.targetBehaviorUrges.data,
                        progressData.targetBehaviorUrges.highlightedDay
                    )}
                </View>

                {/* Skills Used Per Day */}
                <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                    {progressData.skillsUsedPerDay.title}
                </Text>
                <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                    {progressData.skillsUsedPerDay.subtitle}
                </Text>
                <View
                    className="p-4 rounded-xl mb-6 border border-gray-200"
                    style={{ backgroundColor: colors.white }}
                >
                    {renderBarChart(
                        progressData.skillsUsedPerDay.data,
                        progressData.skillsUsedPerDay.highlightedDay
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

