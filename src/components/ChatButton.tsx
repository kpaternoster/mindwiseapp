import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";

type Props = {
    bottomOffset?: number;
};

export const FloatingChatButton: React.FC<Props> = ({ bottomOffset = 80 }) => {
    const { bottom } = useSafeAreaInsets();
    const { dissolveTo } = useDissolveNavigation();

    return (
        <Pressable
            onPress={() => dissolveTo("Chat")}
            accessibilityLabel="Open assistant"
            style={[
                styles.fab,
                { bottom: bottom + bottomOffset },
            ]}
        >
            {/* <View style={styles.dot} /> */}
            <Image
                source={require('@assets/icons/chatbot.png')}
                style={styles.img} />
        </Pressable>
    );
};

const SIZE = 64;

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        right: 18,
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        // backgroundColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
    },
    img: { width: 64, height: 64 },
    dot: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ff5a5f",
    },
});
