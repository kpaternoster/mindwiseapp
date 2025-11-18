import { colors } from '@design/color';
import { images } from '@design/image';
import { t } from '@design/typography';
import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, Pressable } from "react-native";
import { BellIcon } from './Utils';
import AvatarIcon from '@assets/illus/avatar.svg';

type Props = {
    avatar?: ImageSourcePropType;
    onNotificationPress?: () => void;
    onAvatarPress?: () => void;
}

const HomeHeader = ({
    avatar,
    onNotificationPress,
    onAvatarPress
}: Props) => {

    return (
        <View style={[styles.container]} className='pt-9'>
            {/* Left Side - Logo and App Name */}
            <View style={styles.leftSection}>
                <Image
                    source={images.leaf}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={[t.title16Bold, styles.appName]}>Mindwise DBT</Text>
            </View>

            {/* Right Side - Bell and Avatar */}
            <View style={styles.rightSection}>
                <Pressable
                    onPress={onNotificationPress}
                    style={styles.iconButton}
                    accessibilityLabel="Notifications"
                >
                    <View style={styles.bellIconContainer}>
                        <BellIcon size={20} color={colors.Text_Primary} />
                    </View>
                </Pressable>

                <Pressable
                    onPress={onAvatarPress}
                    accessibilityLabel="Profile"
                >
                    {avatar ? (
                        <Image
                            source={avatar}
                            style={styles.avatar}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.avatarIconContainer}>
                            <AvatarIcon width={24} height={24} />
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 15,
        height: 24,
    },
    appName: {
        color: colors.text_primary,
        marginLeft: 8,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
        marginRight: 8,
    },
    bellIconContainer: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background_purple,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 18,
    },
})

export default HomeHeader