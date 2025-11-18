import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";


type Props = {
    onPress?: () => void;
    label?: string;
    disabled?: boolean;
};

export const NextButton = ({ onPress, label = "Next", disabled }: Props) => {
    const handlePress = onPress ?? (() => { });

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            accessibilityLabel={label}
            accessibilityState={{ disabled }}
            className="flex-row items-center justify-between rounded-full px-2 py-3"
            style={[styles.container, disabled && styles.disabled]}
        >
            <Text style={[styles.text, t.button]} className="ml-4">Next</Text>
            <View style={styles.circle}>
                <Image
                    source={require('@assets/icons/next.png')}
                    style={styles.next} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.button_orange,
        height: 52,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: '50%'
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: "white",
    },
    circle: {
        backgroundColor: colors.background_screen_white,
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    next: {
        width: 16,
        height: 12
    }
});
