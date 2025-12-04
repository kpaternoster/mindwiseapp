import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import { BackIcon, HomeFillIcon } from '@components/Utils';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';

interface PageHeaderProps {
    title: string;
    onBackPress?: () => void;
    showHomeIcon?: boolean;
    showLeafIcon?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    onBackPress,
    showHomeIcon = true,
    showLeafIcon = true,
}) => {
    const { dissolveGoBack, dissolveTo } = useDissolveNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            dissolveGoBack();
        }
    };

    return (
        <View className="flex-row justify-between items-center px-5 pt-12 pb-4">
            <View className='flex-row items-center gap-4'>
                <Pressable
                    onPress={handleBackPress}
                    className="h-12 w-12 items-center justify-center"
                    accessibilityLabel="Go back"
                >
                    <BackIcon size={28} color={colors.Text_Primary} />
                </Pressable>
                <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                    {title}
                </Text>
            </View>
            
            <View className='w-9 h-9 justify-center items-center flex-row gap-4 mr-4'>
                {showHomeIcon && (
                    <Pressable
                        onPress={() => dissolveTo('Home')}
                        className="h-9 w-9 items-center justify-center"
                        accessibilityLabel="Go to home"
                    >
                        <HomeFillIcon size={20} color={colors.Text_Primary} />
                    </Pressable>
                )}
                {showLeafIcon && (
                    <Image
                        source={images.leaf}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 15,
        height: 24,
    },
});

