import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { t } from '@design/typography';
import { images } from '@design/image';
import { BackIcon } from '@components/Utils';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';

interface PageHeaderProps {
    title: string;
    onBackPress?: () => void;
    showLeafIcon?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    onBackPress,
    showLeafIcon = true,
}) => {
    const { dissolveGoBack } = useDissolveNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            dissolveGoBack();
        }
    };

    return (
        <View className="flex-row justify-between items-center px-5 pt-12 pb-4">
            <Pressable
                onPress={handleBackPress}
                className="h-12 w-12 items-center justify-center"
                accessibilityLabel="Go back"
            >
                <BackIcon size={28} color={colors.text_primary} />
            </Pressable>
            <Text style={[t.title16SemiBold, { color: colors.Text_Primary }]}>
                {title}
            </Text>
            <View className='w-9 h-9 justify-center items-center'>
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

