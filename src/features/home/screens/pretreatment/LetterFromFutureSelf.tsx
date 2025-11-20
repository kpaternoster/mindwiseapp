import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StatusBar,
    Pressable,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ContentCard, ProgressHeader, PageHeader, HighlightBox } from '../../components';
import { handleScrollProgress } from '../../utils/scrollHelper';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { fetchLetterFromFutureSelf, updateLetterFromFutureSelf } from '../../api';


export default function LetterFromFutureSelfScreen() {
    const [currentStep, setCurrentStep] = useState(1);
    const { dissolveTo } = useDissolveNavigation();

    // Form state
    const [openingMessage, setOpeningMessage] = useState('');
    const [emotionsReflection, setEmotionsReflection] = useState('');
    const [relationshipsReflection, setRelationshipsReflection] = useState('');
    const [selfTreatmentReflection, setSelfTreatmentReflection] = useState('');
    const [closingMessage, setClosingMessage] = useState('');

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load letter data on mount
    useEffect(() => {
        const loadLetterData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchLetterFromFutureSelf();
                
                // Map API response to form fields
                setOpeningMessage(data.openingMessage || '');
                setEmotionsReflection(data.emotionHandling || '');
                setRelationshipsReflection(data.relationshipChanges || '');
                setSelfTreatmentReflection(data.selfTreatment || '');
            } catch (err) {
                console.error('Error loading letter data:', err);
                setError('Failed to load letter data. You can still create a new letter.');
                // Don't show alert on initial load failure - user can still fill the form
            } finally {
                setLoading(false);
            }
        };

        loadLetterData();
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        handleScrollProgress(event, 3, setCurrentStep);
    };

    const onSubmit = async () => {
        try {
            setSubmitting(true);
            setError(null);

            // Prepare data for API (map form fields to API fields)
            const letterData = {
                openingMessage: openingMessage,
                emotionHandling: emotionsReflection,
                relationshipChanges: relationshipsReflection,
                selfTreatment: selfTreatmentReflection,
            };

            await updateLetterFromFutureSelf(letterData);
            
            // Success - navigate to next screen
            dissolveTo('BuildingCommitment');
        } catch (err) {
            console.error('Error submitting letter:', err);
            setError('Failed to save letter. Please try again.');
            Alert.alert(
                'Error',
                'Failed to save your letter. Please check your connection and try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-white pt-9" style={{ backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

                {/* Header */}
                <PageHeader title="Letter From Future Self" />

                {/* Progress Header */}
                <View className="px-6 pt-4">
                    <ProgressHeader
                        title="Progress"
                        currentStep={currentStep}
                        totalSteps={3}
                    />
                </View>

                {/* Main Content */}
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color={colors.button_orange} />
                        <Text style={[t.textRegular, { color: colors.text_secondary, marginTop: 16 }]}>
                            Loading your letter...
                        </Text>
                    </View>
                ) : (
                <ScrollView
                    className="flex-1 px-6 mb-10"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    keyboardShouldPersistTaps="handled"
                >
                <Text style={[t.title24SemiBold, { color: colors.Text_Primary }]} className="mb-4">
                    Write Your Letter
                </Text>

                <View className='rounded-xl p-4 flex-col text-center' style={{ backgroundColor: colors.orange_opacity_30 }}>
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-4 text-center">
                        Opening Reflection
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4 text-center">
                        Let's try something powerful - imagine yourself 6-12 months from now, having fully engaged with DBT. Take a moment to visualize that future self. This version of you has been practicing DBT skills regularly and seeing positive changes. Now, let's have that future you write a letter of encouragement to your present self.
                    </Text>
                </View>

                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-4 mt-4">
                    Dear Present Self, I'm writing to you from 12 months in the future, and I want you to know...
                </Text>

                <TextInput
                    className="p-4 rounded-xl"
                    style={[
                        t.textRegular,
                        {
                            borderWidth: 1,
                            borderColor: colors.gray_300,
                            color: colors.Text_Primary,
                            minHeight: 120,
                            textAlignVertical: 'top',
                            backgroundColor: colors.white,
                        },
                    ]}
                    placeholder="Share your opening message of hope and encouragement..."
                    placeholderTextColor={colors.text_secondary}
                    multiline
                    value={openingMessage}
                    onChangeText={setOpeningMessage}
                />

                <Text style={[t.textSemiBold, { color: colors.Text_Primary }]} className="mb-4 mt-4">
                    Here are some of the changes I've noticed since committing to DBT:
                </Text>
                <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-4">
                    In how I handle difficult emotions and situations...
                </Text>
                <TextInput
                    className="p-4 rounded-xl"
                    style={[
                        t.textRegular,
                        {
                            borderWidth: 1,
                            borderColor: colors.gray_300,
                            color: colors.Text_Primary,
                            minHeight: 120,
                            textAlignVertical: 'top',
                            backgroundColor: colors.white,
                        },
                    ]}
                    placeholder="Describe how you handle emotions differently..."
                    placeholderTextColor={colors.text_secondary}
                    multiline
                    value={emotionsReflection}
                    onChangeText={setEmotionsReflection}
                />

                <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-4 mt-4">
                    In my relationships with others...
                </Text>
                <TextInput
                    className="p-4 rounded-xl"
                    style={[
                        t.textRegular,
                        {
                            borderWidth: 1,
                            borderColor: colors.gray_300,
                            color: colors.Text_Primary,
                            minHeight: 120,
                            textAlignVertical: 'top',
                            backgroundColor: colors.white,
                        },
                    ]}
                    placeholder="Describe changes in your relationships..."
                    placeholderTextColor={colors.text_secondary}
                    multiline
                    value={relationshipsReflection}
                    onChangeText={setRelationshipsReflection}
                />

                <Text style={[t.textRegular, { color: colors.Text_Primary }]} className="mb-4 mt-4">
                    In how I treat myself...
                </Text>
                <TextInput
                    className="p-4 rounded-xl mb-10"
                    style={[
                        t.textRegular,
                        {
                            borderWidth: 1,
                            borderColor: colors.gray_300,
                            color: colors.Text_Primary,
                            minHeight: 120,
                            textAlignVertical: 'top',
                            backgroundColor: colors.white,
                        },
                    ]}
                    placeholder="Describe how you treat yourself differently..."
                    placeholderTextColor={colors.text_secondary}
                    multiline
                    value={selfTreatmentReflection}
                    onChangeText={setSelfTreatmentReflection}
                />


            </ScrollView>
            )}
            {/** Action Buttons */}
            <View className="px-6 mb-10">
                <Pressable
                    className="rounded-full py-4 px-6 flex-row justify-center items-center"
                    style={{ 
                        backgroundColor: submitting ? colors.gray_300 : colors.button_orange,
                        opacity: submitting ? 0.6 : 1,
                    }}
                    onPress={onSubmit}
                    disabled={submitting || loading}
                >
                    {submitting ? (
                        <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                        <Text
                            style={[t.title16SemiBold, { color: colors.white }]}
                            className="flex-1 text-center"
                        >
                            Submit
                        </Text>
                    )}
                </Pressable>
                {error && !loading && (
                    <Text style={[t.textRegular, { color: colors.red_light, marginTop: 8, textAlign: 'center' }]}>
                        {error}
                    </Text>
                )}
            </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
        flexGrow: 1,
    },
});
