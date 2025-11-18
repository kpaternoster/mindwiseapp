import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@design/color";

type Props = {
    onPress: () => void;
    size?: number;
};

export const CloseButton: React.FC<Props> = ({ onPress, size = 36 }) => {
    return (
        <Pressable
            onPress={onPress}
            accessibilityLabel="Close"
            style={[styles.btn, { width: size, height: size, borderRadius: size / 6 }]}
        >
            <Text style={styles.x}>×</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
    },
    x: {
        fontSize: 36,
        color: "white",
        fontWeight: "400",
        lineHeight: 22,
    },
});
