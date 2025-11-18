import React, { useState } from 'react';
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
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ContentCard, ProgressHeader, PageHeader, HighlightBox } from '../../components';
import { handleScrollProgress } from '../../utils/scrollHelper';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';


export default function LetterFromFutureSelfScreen() {
    const [currentStep, setCurrentStep] = useState(1);
    const { dissolveTo } = useDissolveNavigation();


    // Form state
    const [openingMessage, setOpeningMessage] = useState('');
    const [emotionsReflection, setEmotionsReflection] = useState('');
    const [relationshipsReflection, setRelationshipsReflection] = useState('');
    const [selfTreatmentReflection, setSelfTreatmentReflection] = useState('');
    const [closingMessage, setClosingMessage] = useState('');

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        handleScrollProgress(event, 3, setCurrentStep);
    };

    const onSubmit = () => {
        // TODO: Implement submit logic

        dissolveTo('BuildingCommitment');
    };


    return (
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
            <ScrollView
                className="flex-1 px-6 mb-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
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
                    className="p-4 rounded-xl mb-80"
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
            {/** Action Buttons */}
            <View className="px-6 mb-10">
                <Pressable
                    className="rounded-full py-4 px-6 flex-row justify-center items-center"
                    style={{ backgroundColor: colors.button_orange }}
                    onPress={() => onSubmit()}
                >
                    <Text
                        style={[t.title16SemiBold, { color: colors.white }]}
                        className="flex-1 text-center"
                    >
                        Submit
                    </Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
});
