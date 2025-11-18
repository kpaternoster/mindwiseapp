import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@design/color';
import { BellSlashIcon, NumberZeroIcon } from '@components/Utils';

export const EmptyState: React.FC = () => {
    return (
        <View style={styles.container} className='flex-1 bg-white'>
            <View style={styles.iconContainer}>
                <View style={styles.bellContainer}>
                    <BellSlashIcon size={136} color={colors.gray_300} />
                </View>
                <View style={styles.badge}>
                    <NumberZeroIcon />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginTop: 80,
        position: 'relative',
        marginBottom: 16,
    },
    bellContainer: {
        position: 'relative',
    },
    muteLine: {
        position: 'absolute',
        width: 100,
        height: 3,
        backgroundColor: colors.gray_300,
        transform: [{ rotate: '-45deg' }],
        top: '50%',
        left: '50%',
        marginLeft: -50,
        marginTop: -1.5,
    },
    badge: {
        position: 'absolute',
        top: 18,
        right: 24,
        backgroundColor: colors.white,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: colors.white,
        fontSize: 12,
    },
    message: {
        color: colors.text_secondary,
    },
});

