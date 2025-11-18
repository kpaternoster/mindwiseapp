import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ScreenScroll } from '@components/ScreenScroll';
import { PageHeader } from '@features/home/components/PageHeader';
import { ArrowRightIcon } from '@components/Utils';
import {
    SettingsSection,
    SettingsDropdown,
    CulturalPreference,
    RadioGroup,
    NotificationCategory,
    HolidayCheckbox,
    SettingsSavedModal,
} from '../components';
import settingsData from '../data/settingsData.json';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';

export default function Settings() {
    const { dissolveTo } = useDissolveNavigation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Learning Preferences
    const [learningStyle, setLearningStyle] = useState(
        settingsData.learningPreferences.preferredLearningStyle.value
    );
    const [englishFluency, setEnglishFluency] = useState(
        settingsData.learningPreferences.englishFluency.value
    );

    // Visual Preferences
    const [contrastLevel, setContrastLevel] = useState(
        settingsData.visualPreferences.contrastLevel.value
    );
    const [fontSize, setFontSize] = useState(settingsData.visualPreferences.fontSize.value);

    // Cultural Preferences
    const [collectivist, setCollectivist] = useState(
        settingsData.culturalPreferences.collectivist.value
    );
    const [emotional, setEmotional] = useState(settingsData.culturalPreferences.emotional.value);
    const [impatient, setImpatient] = useState(settingsData.culturalPreferences.impatient.value);

    // Notification Preferences
    const [notificationFrequency, setNotificationFrequency] = useState(
        settingsData.notificationPreferences.frequency.value
    );
    const [deliveryMethod, setDeliveryMethod] = useState(
        settingsData.notificationPreferences.deliveryMethod.value
    );
    const [notificationCategories, setNotificationCategories] = useState(
        settingsData.notificationPreferences.categories
    );
    const [quietHoursEnabled, setQuietHoursEnabled] = useState(
        settingsData.notificationPreferences.quietHours.enabled
    );

    // Rewards Preferences
    const [showHolidayOrnaments, setShowHolidayOrnaments] = useState(
        settingsData.rewardsPreferences.showHolidayOrnaments.enabled
    );
    const [selectedHolidays, setSelectedHolidays] = useState(
        settingsData.rewardsPreferences.holidays.options
    );

    const handleNotificationToggle = (id: string, value: boolean) => {
        setNotificationCategories((prev) =>
            prev.map((cat: any) => (cat.id === id ? { ...cat, enabled: value } : cat))
        );
    };

    const handleHolidayToggle = (id: string, value: boolean) => {
        setSelectedHolidays((prev) =>
            prev.map((holiday: any) =>
                holiday.id === id ? { ...holiday, selected: value } : holiday
            )
        );
    };

    const handleSaveChanges = () => {
        setShowSuccessModal(true);
    };

    const handleStartTutorial = () => {
        setShowSuccessModal(false);
        // TODO: Navigate to tutorial
        console.log('Start tutorial');
    };

    const handleGoHome = () => {
        setShowSuccessModal(false);
        dissolveTo('Home' as any);
    };

    return (
        <View className="flex-1 bg-white pt-9">
            <PageHeader title="Settings" showLeafIcon={true} />
            <ScreenScroll className="flex-1 bg-white mb-6">
                {/* Description */}
                <View className="px-6 mt-4 mb-6">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Visual settings, cultural preferences, learning preferences
                    </Text>
                </View>

                {/* Learning Preferences */}
                <SettingsSection title="Learning Preferences">
                    <SettingsDropdown
                        label={settingsData.learningPreferences.preferredLearningStyle.label}
                        value={learningStyle}
                        options={settingsData.learningPreferences.preferredLearningStyle.options}
                        onChange={setLearningStyle}
                    />
                    <SettingsDropdown
                        label={settingsData.learningPreferences.englishFluency.label}
                        value={englishFluency}
                        options={settingsData.learningPreferences.englishFluency.options}
                        onChange={setEnglishFluency}
                    />
                </SettingsSection>

                {/* Visual Preferences */}
                <SettingsSection title="Visual Preferences">
                    <SettingsDropdown
                        label={settingsData.visualPreferences.contrastLevel.label}
                        value={contrastLevel}
                        options={settingsData.visualPreferences.contrastLevel.options}
                        onChange={setContrastLevel}
                    />
                    <SettingsDropdown
                        label={settingsData.visualPreferences.fontSize.label}
                        value={fontSize}
                        options={settingsData.visualPreferences.fontSize.options}
                        onChange={setFontSize}
                    />
                </SettingsSection>

                {/* Cultural Preferences */}
                <SettingsSection title='Cultural Preferences'>

                    <CulturalPreference
                        label={settingsData.culturalPreferences.collectivist.label}
                        question={settingsData.culturalPreferences.collectivist.question}
                        value={collectivist}
                        onChange={setCollectivist}
                    />
                    <CulturalPreference
                        label={settingsData.culturalPreferences.emotional.label}
                        question={settingsData.culturalPreferences.emotional.question}
                        value={emotional}
                        onChange={setEmotional}
                    />
                    <CulturalPreference
                        label={settingsData.culturalPreferences.impatient.label}
                        question={settingsData.culturalPreferences.impatient.question}
                        value={impatient}
                        onChange={setImpatient}
                    />
                </SettingsSection>

                {/* Notification Preferences */}
                <View className="p-4 mb-4 mx-6 border border-gray-200 rounded-2xl">
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Notification Preferences
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Control your notification preferences
                    </Text>

                    <View className="rounded-2xl mt-4" style={{ backgroundColor: colors.white }}>
                        {/* Notification Frequency */}
                        <SettingsDropdown
                            label={settingsData.notificationPreferences.frequency.label}
                            value={notificationFrequency}
                            options={settingsData.notificationPreferences.frequency.options}
                            onChange={setNotificationFrequency}
                        />

                        {/* Delivery Method */}
                        <RadioGroup
                            question={settingsData.notificationPreferences.deliveryMethod.question}
                            options={settingsData.notificationPreferences.deliveryMethod.options}
                            value={deliveryMethod}
                            onChange={setDeliveryMethod}
                        />
                    </View>
                    <View className='h-[1px] bg-gray-200 my-4'></View>

                    {/* Notification Categories */}
                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3 mt-2">
                        Notification Categories
                    </Text>
                    <View className="rounded-2xl pt-4" style={{ backgroundColor: colors.white }}>
                        {notificationCategories.map((category: any) => (
                            <NotificationCategory
                                key={category.id}
                                label={category.label}
                                description={category.description}
                                enabled={category.enabled}
                                locked={category.locked}
                                note={category.note}
                                onChange={(value) => handleNotificationToggle(category.id, value)}
                            />
                        ))}
                    </View>
                    <View className='h-[1px] bg-gray-200'></View>

                    {/* Quiet Hours */}
                    <View className="mt-4 rounded-2xl" style={{ backgroundColor: colors.white }}>
                        <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-3">
                            Quiet Hours
                        </Text>
                        <NotificationCategory
                            label={settingsData.notificationPreferences.quietHours.label}
                            description={settingsData.notificationPreferences.quietHours.description}
                            enabled={quietHoursEnabled}
                            note={settingsData.notificationPreferences.quietHours.note}
                            onChange={setQuietHoursEnabled}
                        />
                    </View>
                </View>

                {/* Rewards Preferences */}
                <View className="p-4 mb-4 mx-6 border border-gray-200 rounded-2xl">
                    <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]} className="mb-1">
                        Rewards Preferences
                    </Text>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className="mb-4">
                        Customize your progress celebrations
                    </Text>

                    <View className="rounded-2xl mb-4" style={{ backgroundColor: colors.white }}>
                        {/* Show Holiday Ornaments Toggle */}
                        <NotificationCategory
                            label={settingsData.rewardsPreferences.showHolidayOrnaments.label}
                            description={
                                settingsData.rewardsPreferences.showHolidayOrnaments.description
                            }
                            enabled={showHolidayOrnaments}
                            onChange={setShowHolidayOrnaments}
                        />
                    </View>

                    {/* Holiday Selection */}
                    <Text style={[t.textMedium, { color: colors.Text_Primary }]} className="mb-3">
                        {settingsData.rewardsPreferences.holidays.question}
                    </Text>
                    <View className="rounded-2xl mb-4" style={{ backgroundColor: colors.white }}>
                        {selectedHolidays.map((holiday: any) => (
                            <HolidayCheckbox
                                key={holiday.id}
                                label={holiday.label}
                                description={holiday.description}
                                selected={holiday.selected}
                                onChange={(value) => handleHolidayToggle(holiday.id, value)}
                            />
                        ))}
                    </View>


                </View>

            </ScreenScroll>
            {/* Save Changes Button */}
            <Pressable
                onPress={handleSaveChanges}
                className="flex-row items-center justify-between py-4 px-4 mx-6 rounded-full mb-10"
                style={{ backgroundColor: colors.orange_500 }}
            >
                <Text style={[t.button, { color: colors.white }]} className="flex-1 text-center">
                    Save Changes
                </Text>
                <View
                    className="w-9 h-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: colors.white }}
                >
                    <ArrowRightIcon size={16} color={colors.warm_dark} />
                </View>
            </Pressable>

            {/* Success Modal */}
            <SettingsSavedModal
                visible={showSuccessModal}
                onStartTutorial={handleStartTutorial}
                onGoHome={handleGoHome}
            />
        </View>
    );
}

