import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { HomePage } from "@components/HomePage";
import { ScreenScroll } from "@components/ScreenScroll";
import { colors } from "@design/color";
import { useAuth } from "@hooks/AuthContext";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";
import { logout, ApiError } from "@features/onboarding/api";
import { fetchUserProfile, fetchUserContacts, fetchUserProgress } from "@features/home/api";
import { PageHeader } from "@features/home/components/PageHeader";
import { SignInIcon } from "@components/Utils";
import {
    ProfileSection,
    ContactsSection,
    ProgressSection,
    AccountOptionsList,
    AccountFooter,
    Contact,
    Progress,
} from "../components";
import accountOptionsData from "../data/accountOptions.json";

interface UserProfile {
    name: string;
    memberSince: string;
}

export default function Account() {
    const { signOut } = useAuth();
    const { dissolveTo } = useDissolveNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [progress, setProgress] = useState<Progress | null>(null);

    // Initialize and fetch user profile data
    const initUserProfile = async () => {
        try {
            const data = await fetchUserProfile();
            setProfileData(data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setProfileData({
                name: 'User',
                memberSince: '2025',
            });
        }
    };

    // Initialize and fetch contacts
    const initContacts = async () => {
        try {
            const data = await fetchUserContacts();
            setContacts(data);
            setContacts([
            ]);
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
            // Set mock data
            setContacts([
                {
                    id: '1',
                    name: 'Dr. Sarah Mitchell',
                    role: 'Primary Therapist',
                    lastActive: 'Today',
                },
                {
                    id: '2',
                    name: 'Mom (Linda Johnson)',
                    role: 'Mother',
                    lastActive: 'Today',
                },
            ]);
        }
    };

    // Initialize and fetch progress
    const initProgress = async () => {
        try {
            const data = await fetchUserProgress();
            // Transform the data to include recent rewards
            const transformedProgress: Progress = {
                ...data,
                recentRewards: [
                    {
                        id: '1',
                        name: 'Treatment Plan',
                        leaves: 3,
                        timeEarned: 'Today',
                    },
                    {
                        id: '2',
                        name: 'Pre-treatment Survey',
                        leaves: 3,
                        timeEarned: 'Yesterday',
                    },
                ],
            };
            setProgress(transformedProgress);
        } catch (error) {
            console.error('Failed to fetch progress:', error);
            // Set mock data
            setProgress({
                level: 'Seedling',
                currentStage: 1,
                totalStages: 6,
                currentLeaves: 0,
                leavesToNextStage: 500,
                progressPercentage: 16.67,
                recentRewards: [
                    {
                        id: '1',
                        name: 'Treatment Plan',
                        leaves: 3,
                        timeEarned: 'Today',
                    },
                    {
                        id: '2',
                        name: 'Pre-treatment Survey',
                        leaves: 3,
                        timeEarned: 'Yesterday',
                    },
                ],
            });
        }
    };

    // Fetch all data on component mount
    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            await Promise.all([
                initUserProfile(),
                initContacts(),
                initProgress(),
            ]);
            setIsLoading(false);
        };
        initData();
    }, []);

    const handleLogout = async () => {
        setIsLogoutLoading(true);
        try {
            // Call logout API
            await logout();
            // Clear local token and update auth state
            await signOut();
        } catch (err) {
            const apiError = err as ApiError;
            const errorMessage = apiError.error || 'Failed to logout. Please try again.';
            console.log(errorMessage);
            setIsLogoutLoading(false);
        }
    };

    const handleOptionPress = (route: string) => {
        console.log('Navigate to:', route);
        
        if (route === 'Logout') {
            handleLogout();
        } else {
            // Navigate to the specified route
            dissolveTo(`Account_${route}` as any);
        }
    };

    return (
        <View className="flex-1 bg-white pt-9">
            <PageHeader title="Account" showLeafIcon={true} />
            <ScreenScroll className="flex-1 bg-white mb-10">
                {/* User Profile Section */}
                <View className="p-4 m-6 rounded-2xl" style={{ backgroundColor: colors.orange_50 }}>
                    <ProfileSection
                        name={profileData?.name || 'User'}
                        memberSince={profileData?.memberSince || '2024'}
                        isLoading={isLoading}
                    />

                    {/* My Contacts */}
                    {!isLoading && <ContactsSection contacts={contacts} />}

                    {/* My Progress */}
                    {!isLoading && <ProgressSection progress={progress} />}
                </View>

                {/* Account Options */}

                <AccountOptionsList
                    options={accountOptionsData.accountOptions}
                    onOptionPress={handleOptionPress}
                />

                {/* Footer */}
                <AccountFooter />
            </ScreenScroll>
        </View>
    );
}
