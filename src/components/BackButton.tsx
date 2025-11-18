import { AllStackParams } from '@app/navigation/types';
import { colors } from '@design/color';
import { useDissolveNavigation } from '@hooks/useDissolveNavigation';
import { View, Pressable, Image, StyleSheet } from 'react-native'


type Props = {
    page: keyof AllStackParams
}

export const BackButton = ({ page }: Props) => {
    const { dissolveTo } = useDissolveNavigation();
    return (<View className="mt-1">
        <Pressable
            onPress={() => dissolveTo(page)}
            className="h-9 w-9 rounded-lg items-center justify-center border"
            accessibilityLabel="Go back"
            style={styles.backButton}
        >
            <Image
                source={require('@assets/icons/back.png')}
                style={styles.back} />
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({

    back: {
        width: 16,
        height: 12
    },

    backButton: {
        borderColor: colors.button_brown
    },
})