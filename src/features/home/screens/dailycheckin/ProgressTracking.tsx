import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    ActivityIndicator,
    type StyleProp,
    type ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { PageHeader } from '../../components';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import progressData from '../../data/dailycheckin/progressTracking.json';
import { formatDateToISO } from '../../utils/dateHelper';
import { fetchProgressTracking, ProgressTracking } from '@features/home/api';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 36;
const chartHeight = 200;

const clampIndex = (index: number, length: number): number => {
    if (length <= 0) {
        return 0;
    }
    return Math.max(0, Math.min(index, length - 1));
};

export default function ProgressTrackingScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [progressTracking, setProgressTracking] = useState<ProgressTracking | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeUrgeIndex, setActiveUrgeIndex] = useState<number>(0);
    const [focusedUrgeIndex, setFocusedUrgeIndex] = useState<number | undefined>(undefined);
    const [activeSkillIndex, setActiveSkillIndex] = useState<number>(0);
    const [focusedSkillIndex, setFocusedSkillIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const todayIso = formatDateToISO(new Date());
                const data = await fetchProgressTracking(todayIso);
                data.totalUrges = data.totalUrges.slice(-15);
                const lastIndex = data.totalUrges.length - 1;
                setActiveUrgeIndex(lastIndex);
                setFocusedUrgeIndex(lastIndex);
                data.numberOfSkillsUsed = data.numberOfSkillsUsed.slice(-15);
                const lastSkillIndex = data.numberOfSkillsUsed.length - 1;
                setActiveSkillIndex(lastSkillIndex);
                setFocusedSkillIndex(lastSkillIndex);

                setProgressTracking(data);
                console.log(data);
            } catch (error) {
                console.error('Error loading progress tracking data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const buildSUDSLineData = () => {
        const data = progressTracking?.distress ?? [];

        return data.map((item: any, index: number) => {
            const isLabel = index === 0 || index === Math.floor(data.length / 2) - 1 || index === Math.floor(data.length * 0.9);
            if (isLabel) {
                return {
                    value: item ?? 0,
                    day: index + 1,
                    dataPointRadius: 0,
                    dataPointColor: 'transparent',
                    label: index === Math.floor(data.length * 0.9) ? `Day ${data.length}` : `Day ${index + 1}`,
                    labelWidth: 60,
                    labelHeight: 20,
                    labelColor: colors.text_secondary,
                    labelFontSize: 10,
                };
            } else {
                return {
                    value: item ?? 0,
                    day: index + 1,
                    dataPointRadius: 0,
                    dataPointColor: 'transparent',
                };
            }
        });
    };

    const buildLineDataFromArray = (values: (number | null)[]) =>
        values.map((v) => ({
            value: v ?? 0,
        }));

    const buildBarDataFromArray = (
        values: (number | null)[],
        activeIndex?: number,
        onSelect?: (index: number) => void,
    ) =>
        values.map((v, index) => ({
            value: v ?? 0,
            label: `${index + 1}`,
            frontColor: activeIndex === index ? colors.warm_dark : colors.button_orange,
            onPress: () => onSelect?.(index),
        }));

    const buildStackedBarData = (
        values: (number | null)[],
        activeIndex?: number,
        maxValue: number = 130,
    ) =>
        values.map((v, index) => {
            const value = v ?? 0;
            const remainder = Math.max(0, maxValue - value);
            return {
                label: `${index + 1}`,
                labelWidth: 12,
                stacks: [
                    {
                        value,
                        color: activeIndex === index ? colors.warm_dark : colors.button_orange,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                    },
                    {
                        value: remainder,
                        color: colors.gray_200,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                    },
                ],
            };
        });

    const renderTooltip = (item: any) => {
        const stackValue = item?.stacks?.[0]?.value;
        const tooltipValue = stackValue ?? item?.value ?? 0;
        return (
            <View className='rounded-lg p-2 px-4 absolute ' style={{ backgroundColor: colors.orange_opacity_30, top: 10 }}>
                <Text style={[t.captionBold, { color: colors.Text_Primary }]}>
                    {tooltipValue}
                </Text>
            </View>
        );
    };

    return (
        <View className="flex-1 pt-9 bg-white" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <PageHeader title="Progress Tracking" />

            {/* Main Content */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.button_orange} />
                </View>
            ) : (
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
                        className="rounded-xl mb-6 py-4 border bg-white  border-gray-200 justify-center items-center"
                    >
                        {
                            progressTracking?.distress.length && <LineChart
                                data={buildSUDSLineData()}
                                areaChart
                                curved
                                width={chartWidth}
                                spacing={chartWidth / progressTracking?.distress.length}
                                disableScroll
                                initialSpacing={0}
                                endSpacing={0}
                                height={chartHeight}
                                color={colors.button_orange}
                                startFillColor={colors.orange_500}
                                endFillColor={colors.orange_50}
                                startOpacity={0.3}
                                endOpacity={0.05}
                                thickness={4}
                                hideDataPoints={false}
                                dataPointsRadius={0}
                                dataPointsColor="transparent"
                                yAxisColor="transparent"
                                xAxisColor="transparent"
                                hideYAxisText={true}
                                yAxisLabelWidth={0}
                                hideRules
                                xAxisLabelTextStyle={{
                                    color: colors.text_secondary,
                                    fontSize: 10,
                                    width: 40,
                                }}
                                maxValue={12}
                                pointerConfig={{
                                    initialPointerIndex: progressTracking?.distress.length - 1,
                                    persistPointer: true,
                                    pointerColor: colors.button_orange,
                                    radius: 8,
                                    pointerStripColor: colors.orange_opacity_20,
                                    pointerStripWidth: 1,
                                    pointerStripUptoDataPoint: false,
                                    showPointerStrip: true,
                                    stripOverPointer: false,
                                    activatePointersOnLongPress: false,
                                    activatePointersInstantlyOnTouch: true,
                                    resetPointerIndexOnRelease: false,
                                    autoAdjustPointerLabelPosition: false,
                                    shiftPointerLabelX: 20,
                                    shiftPointerLabelY: 50,
                                    pointerLabelWidth: 64,
                                    pointerLabelHeight: 48,
                                    onResponderMove: (event: any) => {
                                        // This callback can be used to track pointer movement if needed
                                    },
                                    pointerLabelComponent: (items: any[], secondaryDataItem: any, pointerIndex: number) => {
                                        const item = items[0];
                                        const currentDay = pointerIndex + 1;
                                        const value = item.value ?? 0;
                                        const totalDays = progressTracking?.distress?.length ?? 0;
                                        const isNearEnd = pointerIndex >= totalDays * 0.8;

                                        const containerStyles: StyleProp<ViewStyle> = [styles.pointerLabelContainer];
                                        if (isNearEnd) {
                                            containerStyles.push({
                                                transform: [{ translateX: -100 }],
                                            });
                                        }

                                        return (
                                            <View style={containerStyles}>
                                                <Text style={t.footnoteRegular} className='mb-1'>
                                                    Day {currentDay}
                                                </Text>
                                                <Text style={[t.captionBold]}>
                                                    {value}
                                                </Text>
                                            </View>
                                        );
                                    },
                                    pointerComponent: (item: any, index: number) => {
                                        return (
                                            <View style={styles.pointerContainer}>
                                                <View style={styles.pointerOuterRing} />
                                                <View style={styles.pointerInnerCircle} />
                                            </View>
                                        );
                                    },
                                }}
                            />
                        }

                    </View>

                    {/* Emotional Intensity */}
                    <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        {progressData.emotionalIntensity.title}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        {progressData.emotionalIntensity.subtitle}
                    </Text>
                    <View
                        className="rounded-xl mb-6 py-4 border bg-white  border-gray-200 justify-center items-center"
                        style={{ backgroundColor: colors.white }}
                    >
                        {progressTracking && (
                            <LineChart
                                data={buildLineDataFromArray(progressTracking.totalPositiveEmotions)}
                                data2={buildLineDataFromArray(progressTracking.totalNegativeEmotions)}
                                areaChart
                                curved
                                width={chartWidth}
                                spacing={chartWidth / progressTracking.totalPositiveEmotions.length}
                                disableScroll
                                initialSpacing={0}
                                endSpacing={0}
                                height={chartHeight}
                                color1={colors.button_orange}
                                color2={colors.warm_dark}
                                startFillColor1={colors.orange_500}
                                endFillColor1={colors.orange_50}
                                startFillColor2='transparent'
                                endFillColor2='transparent'
                                startOpacity1={0.3}
                                endOpacity1={0.05}
                                startOpacity2={0}
                                endOpacity2={0}
                                hideDataPoints
                                thickness={4}
                                yAxisColor="transparent"
                                xAxisColor="transparent"
                                hideYAxisText={true}
                                yAxisLabelWidth={0}
                                maxValue={60}
                                hideRules
                                pointerConfig={{
                                    initialPointerIndex: progressTracking.totalPositiveEmotions.length - 1,
                                    persistPointer: true,
                                    pointerColor: colors.button_orange,
                                    radius: 8,
                                    pointerStripColor: colors.orange_opacity_20,
                                    pointerStripWidth: 1,
                                    pointerStripUptoDataPoint: false,
                                    showPointerStrip: true,
                                    stripOverPointer: false,
                                    activatePointersOnLongPress: false,
                                    activatePointersInstantlyOnTouch: true,
                                    resetPointerIndexOnRelease: false,
                                    autoAdjustPointerLabelPosition: false,
                                    shiftPointerLabelX: 20,
                                    shiftPointerLabelY: 50,
                                    pointerLabelWidth: 64,
                                    pointerLabelHeight: 48,
                                    hidePointer2: true,
                                    onResponderMove: (event: any) => {
                                        // This callback can be used to track pointer movement if needed
                                    },
                                    pointerLabelComponent: (items: any[], secondaryDataItem: any, pointerIndex: number) => {
                                        const item = items[0];
                                        const currentDay = pointerIndex + 1;
                                        const value = item.value ?? 0;
                                        const totalDays = progressTracking.totalPositiveEmotions.length;
                                        const isNearEnd = pointerIndex >= totalDays * 0.8;

                                        const containerStyles: StyleProp<ViewStyle> = [styles.pointerLabelContainer];
                                        if (isNearEnd) {
                                            containerStyles.push({
                                                transform: [{ translateX: -100 }],
                                            });
                                        }

                                        return (
                                            <View style={containerStyles}>
                                                <Text style={t.footnoteRegular} className='mb-1'>
                                                    Day {currentDay}
                                                </Text>
                                                <Text style={[t.captionBold]}>
                                                    {value}
                                                </Text>
                                            </View>
                                        );
                                    },
                                    pointerComponent: (item: any, index: number) => {
                                        return (
                                            <View style={styles.pointerContainer}>
                                                <View style={styles.pointerOuterRing} />
                                                <View style={styles.pointerInnerCircle} />
                                            </View>
                                        );
                                    },
                                }}
                            />
                        )}
                        <View className='flex flex-row px-4 justift-start w-full'>
                            <View className='flex flex-row items-center mr-4'>
                                <View className='w-2 h-2 rounded-full mr-2' style={{ backgroundColor: colors.button_orange }}></View>
                                <Text style={[t.captionBold, { color: colors.Text_Primary }]}>Positive</Text>
                            </View>
                            <View className='flex flex-row items-center'>
                                <View className='w-2 h-2 rounded-full mr-2' style={{ backgroundColor: colors.warm_dark }}></View>
                                <Text style={[t.captionBold, { color: colors.Text_Primary }]}>Negative</Text>
                            </View>
                        </View>
                    </View>

                    {/* Target Behavior Urges */}
                    <Text style={[t.title20SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        {progressData.targetBehaviorUrges.title}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        {progressData.targetBehaviorUrges.subtitle}
                    </Text>
                    <View
                        className="p-4 rounded-xl mb-6 border border-gray-200 relative min-h-[200px]"
                        style={{ backgroundColor: colors.white }}
                    >
                        {progressTracking && (
                            <View style={styles.chartContainer}>
                                <BarChart
                                    stackData={buildStackedBarData(
                                        progressTracking.totalUrges,
                                        activeUrgeIndex,
                                        120,
                                    )}
                                    width={chartWidth}
                                    disableScroll
                                    initialSpacing={0}
                                    endSpacing={0}
                                    spacing={(chartWidth - 106) / 15}
                                    height={chartHeight}
                                    barWidth={6}
                                    noOfSections={4}
                                    yAxisColor="transparent"
                                    xAxisColor="transparent"
                                    hideRules
                                    hideYAxisText={true}
                                    yAxisLabelWidth={0}
                                    maxValue={120}
                                    renderTooltip={renderTooltip}
                                    focusBarOnPress={true}
                                    focusedBarIndex={focusedUrgeIndex}
                                    onPress={(item: any, index: number) => {
                                        setActiveUrgeIndex(index);
                                        // Force tooltip to show by temporarily clearing and resetting focused index
                                        if (focusedUrgeIndex === index) {
                                            setFocusedUrgeIndex(undefined);
                                            requestAnimationFrame(() => {
                                                setFocusedUrgeIndex(index);
                                            });
                                        } else {
                                            setFocusedUrgeIndex(index);
                                        }
                                    }}
                                    autoCenterTooltip={true}
                                />
                            </View>
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
                        className="p-4 rounded-xl mb-6 border border-gray-200 relative min-h-[200px]"
                        style={{ backgroundColor: colors.white }}
                    >
                        {progressTracking && (
                            <View style={styles.chartContainer}>
                                <BarChart
                                    stackData={buildStackedBarData(
                                        progressTracking.numberOfSkillsUsed,
                                        activeSkillIndex,
                                        17,
                                    )}
                                    width={chartWidth}
                                    disableScroll
                                    initialSpacing={0}
                                    endSpacing={0}
                                    spacing={(chartWidth - 106) / 15}
                                    height={chartHeight}
                                    barWidth={6}
                                    noOfSections={4}
                                    yAxisColor="transparent"
                                    xAxisColor="transparent"
                                    hideRules
                                    hideYAxisText={true}
                                    yAxisLabelWidth={0}
                                    maxValue={17}
                                    renderTooltip={renderTooltip}
                                    focusBarOnPress={true}
                                    focusedBarIndex={focusedSkillIndex}
                                    onPress={(item: any, index: number) => {
                                        setActiveSkillIndex(index);
                                        // Force tooltip to show by temporarily clearing and resetting focused index
                                        if (focusedSkillIndex === index) {
                                            setFocusedSkillIndex(undefined);
                                            requestAnimationFrame(() => {
                                                setFocusedSkillIndex(index);
                                            });
                                        } else {
                                            setFocusedSkillIndex(index);
                                        }
                                    }}
                                    autoCenterTooltip={true}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
    },
    chartContainer: {
        position: 'relative',
    },
    pointerContainer: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pointerOuterRing: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 4,
        borderColor: colors.orange_opacity_30,
        backgroundColor: 'transparent',
    },
    pointerInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.button_orange,
    },
    pointerLabelContainer: {
        backgroundColor: colors.orange_opacity_30,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 9,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
});

