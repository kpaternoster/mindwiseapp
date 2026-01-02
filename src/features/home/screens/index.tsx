import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { HomePage } from '@components/HomePage';
import HomeHeader from '@components/HomeHeader';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import AvatarIcon from '@assets/illus/avatar.svg';
import { BookOpenIcon, CalendarBlankIcon, ChatTeardropIcon, DownIcon, GraduationCapIcon, GreenLeafIcon, TargetIcon, UpIcon, UserCircleIcon, UserIcon, WarningIcon } from '@components/Utils';
import { fetchUserProfile, fetchUserContacts, fetchUserProgress, UserProfile, Contact, Progress } from '../api';
import { ScreenScroll } from '@components/ScreenScroll';


const Home = () => {
    const { dissolveTo } = useDissolveNavigation();
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [progress, setProgress] = useState<Progress | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isContactsExpanded, setIsContactsExpanded] = useState(false);
    const [isProgressExpanded, setIsProgressExpanded] = useState(false);
    const [isRewardExpanded, setIsRewardExpanded] = useState(false);

    // Initialize and fetch user profile data
    const initUserProfile = async () => {
        try {
            const data = await fetchUserProfile();
            setProfileData(data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            setProfileData({
                name: 'User',
                memberSince: '2024',
            });
        }
    };

    // Initialize and fetch contacts
    const initContacts = async () => {
        try {
            const data = await fetchUserContacts();
            setContacts(data);
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
            setContacts([]);
        }
    };

    // Initialize and fetch progress
    const initProgress = async () => {
        try {
            const data = await fetchUserProgress();
            setProgress(data);
        } catch (error) {
            console.error('Failed to fetch progress:', error);
            setProgress(null);
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

    return (
        <HomePage>
            <HomeHeader
                onNotificationPress={() => dissolveTo('Notifications')}
                onAvatarPress={() => dissolveTo('Account')}
            />
            <ScreenScroll style={styles.container}>

                {/* User Profile Section */}
                <View style={styles.section}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeader}>
                            <View style={styles.avatarIconContainer}>
                                <AvatarIcon width={48} height={48} />
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={[t.title16SemiBold, styles.profileName]}>
                                    {isLoading ? 'Loading...' : profileData?.name || 'User'}
                                </Text>
                                <Text style={[t.textMedium, styles.profileMember]}>
                                    {isLoading ? '' : `Member since ${profileData?.memberSince || '2025'}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.profileItemContainer}>
                            <Pressable
                                style={styles.profileItem}
                                onPress={() => setIsContactsExpanded(!isContactsExpanded)}
                            >
                                <Text style={[t.textBold, styles.profileItemText]}>My contacts</Text>
                                {
                                    isContactsExpanded ? <UpIcon size={16} color={colors.Text_Primary} /> :
                                        <DownIcon size={16} color={colors.Text_Primary} />
                                }

                            </Pressable>

                            {isContactsExpanded && contacts.length > 0 && (
                                <View style={styles.expandedContent}>
                                    {contacts.map((contact) => (
                                        <View key={contact.id} style={styles.contactCard}>
                                            <View style={styles.contactAvatar}>
                                                <UserCircleIcon size={20} color={colors.white} />
                                            </View>
                                            <View style={styles.contactInfo}>
                                                <Text style={[t.textMedium, styles.contactName]}>
                                                    {contact.name}
                                                </Text>
                                                <Text style={[t.textRegular, styles.contactRole]}>
                                                    {contact.role}
                                                </Text>
                                                <Text style={[t.textRegular, styles.contactStatus]}>
                                                    Last active: {contact.lastActive}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={styles.profileItemContainer} className='mt-3'>
                            <Pressable
                                style={styles.profileItem}
                                onPress={() => setIsProgressExpanded(!isProgressExpanded)}
                            >
                                <Text style={[t.textBold, styles.profileItemText]}>My progress</Text>
                                {
                                    isProgressExpanded ? <UpIcon size={16} color={colors.Text_Primary} /> :
                                        <DownIcon size={16} color={colors.Text_Primary} />
                                }
                            </Pressable>

                            {isProgressExpanded && progress && (
                                <View style={styles.expandedContent}>
                                    <View style={styles.progressCard}>
                                        <View style={styles.progressHeader}>
                                            <View className='flex flex-row items-center justify-between'>
                                                <Text style={[t.textSemiBold, styles.progressLevel]}>
                                                    {progress.level}
                                                </Text>
                                                <View style={styles.leavesContainer}>
                                                    <GreenLeafIcon size={16} />
                                                    <Text style={[t.textMedium, styles.leavesCount]}>
                                                        {progress.currentLeaves}
                                                    </Text>
                                                </View>

                                            </View>
                                            <View className='mt-2 flex flex-row justify-between'>
                                                <Text style={[t.textRegular, styles.progressStage]}>
                                                    {`Stages ${progress.currentStage} / ${progress.totalStages}`}
                                                </Text>
                                                <Text style={[t.textRegular, styles.progressText]}>
                                                    {progress.leavesToNextStage} leaves to next stage
                                                </Text>
                                            </View>

                                        </View>

                                        <View style={styles.progressBarContainer}>
                                            <View style={styles.progressBarBackground}>
                                                <View
                                                    style={[
                                                        styles.progressBarFill,
                                                        { width: `${progress.progressPercentage}%` }
                                                    ]}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.rewardsSection}>
                                            <Pressable
                                                style={styles.rewardsSectionHeader}
                                                onPress={() => setIsRewardExpanded(!isRewardExpanded)}
                                            >
                                                <Text style={[t.textMedium, styles.rewardsTitle]}>
                                                    Recent Rewards
                                                </Text>
                                                {
                                                    isRewardExpanded ? <UpIcon size={16} color={colors.Text_Primary} /> :
                                                        <DownIcon size={16} color={colors.Text_Primary} />
                                                }
                                            </Pressable>
                                            {isRewardExpanded && (
                                                <View style={styles.expandedContent}>
                                                    <Text style={[t.textRegular, styles.rewardsText]}>
                                                        complete activities to earn rewards
                                                    </Text>
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>


                    </View>
                </View>

                {/* Pre-Treatment Section */}
                <View style={styles.section}>
                    <Text style={[t.title16SemiBold, styles.sectionTitle]}>Pre-Treatment</Text>
                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('PreTreatment')}>
                        <View style={styles.moduleIconContainer}>
                            <BookOpenIcon size={26} color={colors.orange_500} />
                        </View>
                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Pre-Treatment</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Prepare for your Mindwise DBT journey
                            </Text>
                        </View>
                    </Pressable>
                </View>

                {/* DBT Modules Section */}
                <View style={styles.section}>
                    <Text style={[t.title16SemiBold, styles.sectionTitle]}>DBT Modules</Text>

                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('DailyCheckIn')}>
                        <View style={styles.moduleIconContainer}>
                            <CalendarBlankIcon size={24} color={colors.orange_500} />
                        </View>

                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Daily Check-in</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Prepare for your Mindwise DBT journey
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('Learn')}>
                        <View style={styles.moduleIconContainer}>
                            <GraduationCapIcon size={24} color={colors.orange_500} />
                        </View>
                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Learn Skills</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Master DBT skills through interactive lessons
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('Act')}>
                        <View style={styles.moduleIconContainer}>
                            <TargetIcon size={24} color={colors.orange_500} />
                        </View>

                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Use Skills</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Apply skills to real-life challenges with guided exercises
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('Account_Help')}>
                        <View style={styles.moduleIconContainer}>
                            <ChatTeardropIcon size={24} color={colors.orange_500} />
                        </View>

                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Help</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Chat with Grace, your supportive {" "} companion
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('Help')}>
                        <View style={styles.moduleIconContainer}>
                            <WarningIcon size={24} color={colors.orange_500} />
                        </View>

                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Crisis Support</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Immediate support and coping strategies
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.moduleCard} onPress={() => dissolveTo('Account')}>
                        <View style={styles.moduleIconContainer}>
                            <UserIcon size={20} color={colors.orange_500} />
                        </View>

                        <View style={styles.moduleContent}>
                            <Text style={[t.textSemiBold, styles.moduleTitle]}>Account</Text>
                            <Text style={[t.textRegular, styles.moduleDescription]}>
                                Manage your profile and view progress
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </ScreenScroll>
        </HomePage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        marginBottom: 40,
    },
    section: {
        paddingHorizontal: 24,
        marginTop: 24,

    },
    sectionTitle: {
        color: colors.Text_Primary,
        marginBottom: 12,
    },

    avatarIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.orange_900,
    },

    // Profile Card
    profileCard: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: colors.orange_50,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    profileInfo: {
        marginLeft: 12,
        flex: 1,
    },
    profileName: {
        color: colors.Text_Primary,
    },
    profileMember: {
        color: colors.text_secondary,
        marginTop: 2,
    },
    profileItemContainer: {
        backgroundColor: colors.orange_100,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileItemText: {
        color: colors.Text_Primary,
    },
    chevron: {
        width: 20,
        height: 20,
        tintColor: colors.text_secondary,
        transform: [{ rotate: '0deg' }],
    },
    chevronUp: {
        transform: [{ rotate: '180deg' }],
    },
    expandedContent: {
        paddingTop: 12,
    },
    placeholderText: {
        color: colors.text_secondary,
    },

    // Contact Card
    contactCard: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },
    contactAvatar: {
        width: 32,
        height: 32,
        borderRadius: 24,
        backgroundColor: colors.orange_300,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        color: colors.Text_Primary,
        marginBottom: 2,
    },
    contactRole: {
        color: colors.text_secondary,
        marginBottom: 2,
    },
    contactStatus: {
        color: colors.text_secondary,
    },

    // Progress Card
    progressCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
    },
    progressHeader: {
        marginBottom: 12,
    },
    progressLevel: {
        color: colors.Text_Primary,
        marginBottom: 4,
    },
    progressStage: {
        color: colors.Text_Primary,
    },
    leavesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.orange_300,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    leavesCount: {
        color: colors.Text_Primary,
        marginLeft: 4,
    },
    progressBarContainer: {
        marginBottom: 8,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: colors.gray_300,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.orange_500,
        borderRadius: 4,
    },
    progressText: {
        color: colors.text_secondary,
    },
    rewardsSection: {
        paddingTop: 12,
    },
    rewardsSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    rewardsTitle: {
        color: colors.Text_Primary,
    },
    rewardsText: {
        color: colors.text_secondary,
    },
    smallChevron: {
        width: 16,
        height: 16,
        tintColor: colors.text_secondary,
    },

    // Module Cards
    moduleCard: {
        backgroundColor: colors.orange_50,
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    moduleIcon: {
        width: 48,
        height: 48,
        marginRight: 16,
    },
    moduleIconContainer: {
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moduleContent: {
        flex: 1,
        marginLeft: 8,
    },
    moduleTitle: {
        color: colors.Text_Primary,
        marginBottom: 4,
    },
    moduleDescription: {
        color: colors.text_secondary,
    },
});

export default Home;

