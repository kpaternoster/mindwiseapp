import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StatusBar,
    ScrollView,
} from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { SelectorSheet } from '../components/SelectorSheet';
import { useAuth } from '@hooks/AuthContext';
import { UpIcon, DownIcon } from '@components/Utils';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { Header } from '../components/Header';
import ProgressSteps from '../components/ProgressSteps';
import personalisationData from '../data/personalisationData.json';

interface PreferenceCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

const PreferenceCard: React.FC<PreferenceCardProps> = ({
    title,
    subtitle,
    children,
    defaultExpanded = true,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <View className="mb-4 rounded-2xl border rounded-2xl" style={{ borderColor: colors.gray_300 }}>
            <Pressable
                className={'flex-row items-center justify-between px-4 py-4'}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View className="flex-1">
                    <Text style={[t.title20SemiBold, { color: colors.text_primary }]}>
                        {title}
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mt-1">
                        {subtitle}
                    </Text>
                </View>
                {isExpanded ? (
                    <UpIcon size={14} color={colors.text_secondary} />
                ) : (
                    <DownIcon size={14} color={colors.text_secondary} />
                )}
            </Pressable>

            {isExpanded && (
                <View className="pt-4 px-4 pb-4">
                    {children}
                </View>
            )}
        </View>
    );
};

interface DropdownInputProps {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({ label, value, options, onSelect }) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <View className="mb-4">
            <Text style={[t.textBold, { color: colors.text_primary }]} className="mb-2">
                {label}
            </Text>
            <Pressable
                onPress={() => setIsSheetOpen(true)}
                className="flex-row items-center justify-between rounded-full px-4 py-4 border border-2"
                style={{ backgroundColor: colors.white, borderColor: colors.stroke_orange }}
            >
                <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                    {value}
                </Text>
                <DownIcon size={12} color={colors.text_secondary} />
            </Pressable>

            <SelectorSheet
                visible={isSheetOpen}
                title={label}
                options={options}
                initialSelected={[value]}
                confirmOnSelect={true}
                onCancel={() => setIsSheetOpen(false)}
                onConfirm={(selected) => {
                    if (selected.length > 0) {
                        onSelect(selected[0]);
                    }
                    setIsSheetOpen(false);
                }}
            />
        </View>
    );
};

export default function PersonaliseExperienceScreen() {
    const { dissolveGoBack } = useDissolveNavigation();
    const { signInAterSignUp } = useAuth();

    const canContinue = true;

    // Learning Preferences state
    const [learningStyle, setLearningStyle] = useState(
        personalisationData.learningPreferences.preferredLearningStyle.value
    );
    const [englishFluency, setEnglishFluency] = useState(
        personalisationData.learningPreferences.englishFluency.value
    );

    // Visual Preferences state
    const [contrastLevel, setContrastLevel] = useState(
        personalisationData.visualPreferences.contrastLevel.value
    );
    const [fontSize, setFontSize] = useState(personalisationData.visualPreferences.fontSize.value);
    const onContinue = async () => {
        // TODO: Call Create Accoun API
        await signInAterSignUp();
    };

    return (
        <View className='flex-1 pt-9 px-6 pb-12 bg-white'>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Header text='Personalise your experience' back={false} />
            {/* Progress (2–3) */}
            <ProgressSteps current={3} total={3} />

            {/* Cards */}
            <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
                {/* Learning Preferences */}
                <PreferenceCard
                    title={personalisationData.learningPreferences.title}
                    subtitle={personalisationData.learningPreferences.subtitle}
                >
                    <DropdownInput
                        label={personalisationData.learningPreferences.preferredLearningStyle.label}
                        value={learningStyle}
                        options={personalisationData.learningPreferences.preferredLearningStyle.options}
                        onSelect={setLearningStyle}
                    />
                    <DropdownInput
                        label={personalisationData.learningPreferences.englishFluency.label}
                        value={englishFluency}
                        options={personalisationData.learningPreferences.englishFluency.options}
                        onSelect={setEnglishFluency}
                    />
                </PreferenceCard>

                {/* Visual Preferences */}
                <PreferenceCard
                    title={personalisationData.visualPreferences.title}
                    subtitle={personalisationData.visualPreferences.subtitle}
                >
                    <DropdownInput
                        label={personalisationData.visualPreferences.contrastLevel.label}
                        value={contrastLevel}
                        options={personalisationData.visualPreferences.contrastLevel.options}
                        onSelect={setContrastLevel}
                    />
                    <DropdownInput
                        label={personalisationData.visualPreferences.fontSize.label}
                        value={fontSize}
                        options={personalisationData.visualPreferences.fontSize.options}
                        onSelect={setFontSize}
                    />
                </PreferenceCard>
            </ScrollView>
            {/* Bottom Actions */}
            <View className="flex-row justify-between items-center">


                <Pressable
                    onPress={onContinue}
                    disabled={!canContinue}
                    style={[{ backgroundColor: canContinue ? colors.button_orange : colors.gray_300, }]}
                    className='flex-1 rounded-full py-5 items-center justify-center mx-2'
                >
                    <Text style={[t.button, { color: canContinue ? colors.warm_dark : colors.black_40 }]} >
                        Continue to App
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

