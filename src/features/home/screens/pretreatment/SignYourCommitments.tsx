import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Share,
    Platform,
    StatusBar,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ArrowRightIcon, CalendarBlankIcon, CheckIcon, CloseIcon, CopyIcon, DownloadIcon, ShareIcon } from '@components/Utils';
import { ProgressHeader, PageHeader } from '../../components';
import { handleScrollProgress } from '../../utils/scrollHelper';
import { getCurrentDate, formatDate } from '../../utils/dateHelper';
import commitmentsData from '../../data/pretreatment/commitments.json';
import { BulletPoint } from '../../components/BulletPoint';

type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

interface CommitmentResponse {
    [key: string]: 'yes' | 'no' | null;
}

export default function SignYourCommitmentsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [currentStep, setCurrentStep] = useState(1);

    // Form state
    const [responses, setResponses] = useState<CommitmentResponse>({});
    const [fullName, setFullName] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        handleScrollProgress(event, 3, setCurrentStep);
    };

    const handleResponse = (id: string, value: 'yes' | 'no') => {
        setResponses((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const allStatementsAnswered = commitmentsData.statements.every(
        (statement) => responses[statement.id] !== undefined && responses[statement.id] !== null
    );

    const canSaveOrShare = allStatementsAnswered && fullName.trim() !== '' && date.trim() !== '';

    const handleShare = async () => {
        if (!canSaveOrShare) return;

        const commitmentText = commitmentsData.statements
            .map((statement) => `• ${statement.text}`)
            .join('\n');

        const message = `My DBT Commitments\n\n${commitmentText}\n\nName: ${fullName}\nDate: ${date}`;

        try {
            await Share.share({ message });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleCopy = () => {
        // Copy to clipboard logic would go here
        console.log('Copy to clipboard');
    };

    const handleSave = () => {
        // Save logic would go here
        console.log('Save commitment');
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate);
        setDate(formatDate(currentDate));
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            {/* Header */}
            <PageHeader title="Sign Your Commitments" />

            {/* Progress Header */}
            <View className="px-6 pt-4">
                <ProgressHeader
                    title="Progress"
                    currentStep={currentStep}
                    totalSteps={3}
                />
            </View>

            {/* Main Content */}
            <ScrollView
                className="flex-1 px-6 mb-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Commitment Statements Section */}
                <View className="mb-6 border border-gray-200 rounded-xl p-4">
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-2">
                        Commitment Statements
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Choose Yes or No for each statement
                    </Text>

                    {commitmentsData.statements.map((statement) => (
                        <View
                            key={statement.id}
                            className="p-4 rounded-xl mb-3"
                            style={{
                                borderWidth: 1,
                                borderColor: colors.orange_opacity_20,
                                backgroundColor: colors.white,
                            }}
                        >
                            <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-3">
                                {statement.text}
                            </Text>
                            <View className="flex-row">
                                {/* Yes Button */}
                                <Pressable
                                    className="flex-row items-center mr-6"
                                    onPress={() => handleResponse(statement.id, 'yes')}
                                >
                                    <View
                                        className="w-5 h-5 rounded-full border-2 items-center justify-center mr-2"
                                        style={{
                                            borderColor: responses[statement.id] === 'yes'
                                                ? colors.orange_500
                                                : colors.stroke_orange,
                                        }}
                                    >
                                        {responses[statement.id] === 'yes' && (
                                            <View
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: colors.orange_500 }}
                                            />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                        Yes
                                    </Text>
                                </Pressable>

                                {/* No Button */}
                                <Pressable
                                    className="flex-row items-center"
                                    onPress={() => handleResponse(statement.id, 'no')}
                                >
                                    <View
                                        className="w-5 h-5 rounded-full border-2 items-center justify-center mr-2"
                                        style={{
                                            borderColor: responses[statement.id] === 'no'
                                                ? colors.orange_500
                                                : colors.stroke_orange,
                                        }}
                                    >
                                        {responses[statement.id] === 'no' && (
                                            <View
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: colors.orange_500 }}
                                            />
                                        )}
                                    </View>
                                    <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                        No
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Signature Section */}
                <View
                    className="p-4 rounded-xl mb-6"
                    style={styles.signatureSection}
                >
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                        Signature
                    </Text>

                    {/* Full Name */}
                    <View className="mb-4">
                        <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                            Full Name
                        </Text>
                        <TextInput
                            className="p-4 rounded-full"
                            style={[
                                t.textRegular,
                                {
                                    borderWidth: 1,
                                    borderColor: colors.gray_300,
                                    color: colors.Text_Primary,
                                    backgroundColor: colors.white,
                                },
                            ]}
                            placeholder="Type full name"
                            placeholderTextColor={colors.text_secondary}
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    {/* Date */}
                    <View>
                        <Text style={[t.textBold, { color: colors.Text_Primary }]} className="mb-2">
                            Date
                        </Text>
                        <Pressable onPress={showDatepicker}>
                            <View
                                className="flex-row items-center p-4 rounded-full"
                                style={{
                                    borderWidth: 1,
                                    borderColor: colors.gray_300,
                                    backgroundColor: colors.white,
                                }}
                                pointerEvents="none"
                            >
                                <Text
                                    style={[
                                        t.textRegular,
                                        {
                                            color: date ? colors.Text_Primary : colors.text_secondary,
                                            flex: 1,
                                        },
                                    ]}
                                >
                                    {date || 'Select Date'}
                                </Text>
                                <CalendarBlankIcon size={20} color={colors.warm_dark} />
                            </View>
                        </Pressable>
                    </View>
                </View>

                {/* Commitment Preview Section */}
                <View className="mb-6 rounded-xl p-4" style={styles.signatureSection}>
                    <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                        Commitment Preview
                    </Text>

                    {commitmentsData.statements.map((statement) => (
                        <View key={statement.id} className="flex-row mb-2">
                            <View className='w-6 mt-1'>
                                {
                                    responses[statement.id] === 'yes' ? (
                                        <CheckIcon
                                            size={14}
                                            color={colors.icon_orange}
                                        />
                                    ) : responses[statement.id] === 'no' ? (
                                        <CloseIcon
                                            size={14}
                                            color={colors.muted_coral}
                                        />
                                    ) : (
                                        <Text style={[t.textRegular, { color: colors.Text_Primary }]} className='mr-2 text-center'>
                                            •
                                        </Text>
                                    )
                                }
                            </View>
                            <View className='flex-1'>
                                <Text style={[t.textRegular, { color: colors.Text_Primary }]}>
                                    {statement.text}
                                </Text>
                            </View>
                        </View>
                    ))}

                    {/* Name and Date Display */}
                    <View className="flex-row justify-between mt-8 mb-4">
                        <View className="flex-1 mr-4">
                            <Text style={[t.textMedium, { color: colors.text_secondary }]}>Name:</Text>
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className='mt-2'>
                                {fullName || 'Login Username'}
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text style={[t.textMedium, { color: colors.text_secondary }]} className='text-right'>Date:</Text>
                            <Text style={[t.textRegular, { color: colors.Text_Primary }]} className='text-right mt-2' >
                                {date || 'Not provided'}
                            </Text>
                        </View>
                    </View>

                </View>
                <View className='px-4'>
                    <View className="flex-row justify-between mb-4">
                        <Pressable
                            className="flex-row items-center rounded-full py-4 px-6"
                            style={{ backgroundColor: canSaveOrShare ? colors.orange_100 : colors.gray_300, }}
                            onPress={handleSave}
                            disabled={!canSaveOrShare}
                        >
                            <Text
                                style={[
                                    t.button,
                                    {
                                        color: canSaveOrShare ? colors.Text_Primary : colors.text_secondary,
                                    },
                                ]}
                                className='mr-2'
                            >
                                Save
                            </Text>
                            <DownloadIcon size={16} color={canSaveOrShare ? colors.Text_Primary : colors.text_secondary} />
                        </Pressable>
                        <Pressable
                            className="rounded-full flex-row items-center py-4 px-6"
                            style={{
                                backgroundColor: canSaveOrShare ? colors.orange_100 : colors.gray_300,
                            }}
                            onPress={handleCopy}
                            disabled={!canSaveOrShare}
                        >
                            <Text
                                style={[
                                    t.button,
                                    {
                                        color: canSaveOrShare ? colors.Text_Primary : colors.text_secondary,
                                    },
                                ]}
                                className='mr-2'
                            >
                                Copy
                            </Text>
                            <CopyIcon size={15} color={canSaveOrShare ? colors.Text_Primary : colors.text_secondary} />
                        </Pressable>

                        <Pressable
                            className="p-1 rounded-full items-center flex-row py-4 px-6"
                            style={{
                                backgroundColor: canSaveOrShare ? colors.orange_100 : colors.gray_300,
                            }}
                            onPress={handleShare}
                            disabled={!canSaveOrShare}
                        >
                            <Text style={[t.button, { color: canSaveOrShare ? colors.Text_Primary : colors.text_secondary }]} className='mr-2'>
                                Share
                            </Text>
                            <ShareIcon size={15} color={canSaveOrShare ? colors.Text_Primary : colors.text_secondary} />
                        </Pressable>
                    </View>

                    <Text style={[t.footnoteRegular, { color: colors.text_secondary }]} className="mb-4">
                        To save or share, please answer all statements and provide your name and date.
                    </Text>
                    <View style={styles.divider} />
                </View>


                {/* What's Next Section */}
                <View className="mb-6">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        What's Next?
                    </Text>

                    <Pressable
                        className="rounded-full py-4 px-4 flex-row justify-center items-center mb-3"
                        style={{ backgroundColor: colors.button_orange }}
                        onPress={() => navigation.navigate('TreatmentPlan')}
                    >
                        <Text
                            style={[t.title16SemiBold, { color: colors.warm_dark }]}
                            className="flex-1 text-center"
                        >
                            Go to your treatment Plan
                        </Text>
                        <View className="w-9 h-9 justify-center items-center bg-white rounded-full">
                            <ArrowRightIcon size={16} color={colors.warm_dark} />
                        </View>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-6 items-center mb-3"
                        style={{
                            borderWidth: 2,
                            borderColor: colors.orange_500,
                            backgroundColor: colors.white,
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.warm_dark }]}>
                            Re-do Exercise
                        </Text>
                    </Pressable>

                    <Pressable
                        className="rounded-full py-4 px-6 items-center"
                        style={{
                            borderWidth: 2,
                            borderColor: colors.orange_500,
                            backgroundColor: colors.white,
                        }}
                        onPress={() => navigation.navigate('PreTreatment')}
                    >
                        <Text style={[t.title16SemiBold, { color: colors.warm_dark }]}>
                            Go to Pre-treatment Menu
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    signatureSection: {
        borderWidth: 1,
        borderColor: colors.orange_opacity_20,
        backgroundColor: colors.white,
    },
    divider: {
        height: 1,
        backgroundColor: colors.gray_200,
        marginVertical: 16,
    }
});

