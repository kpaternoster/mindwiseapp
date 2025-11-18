import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { CloseButton } from "../components/CloseButton";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";
import { useNavigation } from "@react-navigation/native";


export default function HelpScreen() {
    const { dissolveTo } = useDissolveNavigation()
    const nav = useNavigation();


    const callImmediate = () => {
        // TODO: link to phone
    };

    const callProvider = () => {
        // TODO: link to provider
    };

    const reasonsToLive = () => {
        // TODO: navigate to reasons page
        dissolveTo("Help_Reason")
    };

    return (
        <View style={styles.container} className="pt-12">
            {/* Close button */}
            <View style={styles.topRight}>
                <CloseButton onPress={() => nav.goBack()} />
            </View>

            {/* Body */}
            <View style={styles.body}>
                <Text style={[t.title24SemiBold, styles.title]}>
                    If you need emergency help
                    just call one of the following
                </Text>

                <Pressable style={styles.primaryBtn} onPress={callImmediate}>
                    <Text style={[t.button, styles.primaryText]}>Call Immediate Help</Text>
                </Pressable>

                <Pressable onPress={callProvider}>
                    <Text style={[t.button, styles.secondary]}>Call Your Provider</Text>
                </Pressable>
            </View>

            {/* Footer link */}
            <Pressable style={styles.footer} onPress={reasonsToLive}>
                <Text style={[t.button, styles.footerText]}>
                    See my Reasons to Live
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background_help,
        padding: 20,
    },
    topRight: {
        alignItems: "flex-end",
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
    },
    title: {
        color: colors.textHelp,
        textAlign: "center",
    },
    primaryBtn: {
        backgroundColor: colors.textHelp,
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 28,
    },
    primaryText: {
        color: "white",
    },
    secondary: {
        color: colors.textHelp,
        marginTop: 12,
    },
    footer: {
        alignItems: "center",
        marginBottom: 48,
    },
    footerText: {
        color: colors.textHelp,
    },
});
