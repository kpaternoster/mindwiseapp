import { View, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";
import ArrowLeftIcon from '@assets/icons/previous.svg';


type Props = {
    onPress?: () => void;
    label?: string;
    disabled?: boolean;
};

export const PreviousButton = ({ onPress, label = "Previous", disabled }: Props) => {
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
            <View style={styles.circle}>
                <ArrowLeftIcon width={28} height={28} fill={colors.white} />
            </View>
            <Text style={[styles.text, t.button]} className="mr-4">Previous</Text>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background_screen_white,
        height: 52,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: '50%',
        borderColor: colors.button_orange,
        borderWidth: 2,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: colors.button_orange,
    },
    circle: {
        backgroundColor: colors.background_screen_white,
        borderColor: colors.button_orange,
        borderWidth: 2,
        borderRadius: 32,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    back: {
        width: 16,
        height: 12
    }
});
