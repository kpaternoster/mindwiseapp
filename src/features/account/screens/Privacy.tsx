import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { ScreenScroll } from '@components/ScreenScroll';
import { PageHeader } from '@features/home/components/PageHeader';
import {
    SecuritySettings,
    DataPrivacyControls,
    DataRetention,
    PrivacyPolicy,
    PrivacyControl,
} from '../components';
import privacyData from '../data/privacyData.json';

export default function Privacy() {
    const [appLockEnabled, setAppLockEnabled] = useState(privacyData.securitySettings.appLock.enabled);
    const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(privacyData.securitySettings.automaticLogout.enabled);
    const [logoutTime, setLogoutTime] = useState(privacyData.securitySettings.logoutTime.value);
    const [showLogoutPicker, setShowLogoutPicker] = useState(false);

    const [privacyControls, setPrivacyControls] = useState<PrivacyControl[]>(
        privacyData.dataPrivacyControls as PrivacyControl[]
    );

    const [retentionPeriod, setRetentionPeriod] = useState(privacyData.dataRetention.retentionPeriod.value);
    const [showRetentionPicker, setShowRetentionPicker] = useState(false);
    const [autoDeleteEnabled, setAutoDeleteEnabled] = useState(privacyData.dataRetention.autoDelete.enabled);

    const handleSecurityToggle = (id: string, value: boolean) => {
        if (id === 'app_lock') {
            setAppLockEnabled(value);
        } else if (id === 'automatic_logout') {
            setAutoLogoutEnabled(value);
        }
    };

    const handlePrivacyToggle = (id: string, value: boolean) => {
        setPrivacyControls((prev) =>
            prev.map((control) => (control.id === id ? { ...control, enabled: value } : control))
        );
    };

    const handleExportData = () => {
        Alert.alert(
            'Export Data',
            'Your data export will be prepared and sent to your email address.',
            [{ text: 'OK' }]
        );
    };

    const handleDeleteAllData = () => {
        Alert.alert(
            'Delete All Data',
            'Are you sure you want to delete all your data? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Delete all data confirmed');
                        // TODO: Implement delete functionality
                    },
                },
            ]
        );
    };


    return (
        <View className="flex-1 bg-white pt-9">
            <PageHeader title="Privacy & Security" showLeafIcon={true} />
            <ScreenScroll className="flex-1 bg-white mb-10">
                {/* Description */}
                <View className="px-6 mt-4 mb-4">
                    <Text style={[t.textRegular, { color: colors.text_secondary }]}>
                        Control your data and privacy settings
                    </Text>
                </View>

                {/* Security Settings */}
                <SecuritySettings
                    appLock={{
                        id: 'app_lock',
                        label: privacyData.securitySettings.appLock.label,
                        description: privacyData.securitySettings.appLock.description,
                        enabled: appLockEnabled,
                    }}
                    automaticLogout={{
                        id: 'automatic_logout',
                        label: privacyData.securitySettings.automaticLogout.label,
                        description: privacyData.securitySettings.automaticLogout.description,
                        enabled: autoLogoutEnabled,
                    }}
                    logoutTime={{
                        id: 'logout_time',
                        label: privacyData.securitySettings.logoutTime.label,
                        value: logoutTime,
                        options: privacyData.securitySettings.logoutTime.options,
                    }}
                    onToggle={handleSecurityToggle}
                    onLogoutTimeChange={setLogoutTime}
                    showLogoutPicker={showLogoutPicker}
                    onToggleLogoutPicker={() => setShowLogoutPicker(!showLogoutPicker)}
                />

                {/* Data Privacy Controls */}
                <DataPrivacyControls
                    controls={privacyControls}
                    onToggle={handlePrivacyToggle}
                />

                {/* Data Retention */}
                <DataRetention
                    retentionPeriod={{
                        id: 'retention_period',
                        label: privacyData.dataRetention.retentionPeriod.label,
                        value: retentionPeriod,
                        description: privacyData.dataRetention.retentionPeriod.description,
                        options: privacyData.dataRetention.retentionPeriod.options,
                    }}
                    autoDelete={{
                        id: 'auto_delete',
                        label: privacyData.dataRetention.autoDelete.label,
                        description: privacyData.dataRetention.autoDelete.description,
                        enabled: autoDeleteEnabled,
                    }}
                    onRetentionChange={setRetentionPeriod}
                    onAutoDeleteToggle={setAutoDeleteEnabled}
                    onExportData={handleExportData}
                    onDeleteAllData={handleDeleteAllData}
                    showRetentionPicker={showRetentionPicker}
                    onToggleRetentionPicker={() => setShowRetentionPicker(!showRetentionPicker)}
                />

                {/* Privacy Policy */}
                <PrivacyPolicy 
                    policyData={privacyData.privacyPolicy as any}
                />
                {/* Security Note */}
                <View>
                    <Text style={[t.textRegular, { color: colors.text_secondary }]} className='px-6 mt-4 mb-4'>
                    Your Data is Secure {"\n"}
                    All information is encrypted and stored securely
                    </Text>
                </View>
            </ScreenScroll>
        </View>
    );
}

