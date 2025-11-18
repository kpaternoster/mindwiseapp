import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HomePage } from "@components/HomePage";
import { colors } from "@design/color";
import { t } from "@design/typography";

export default function Act() {
    return (
        <HomePage active="act">
            <View style={styles.container}>
                <Text style={[t.title24SemiBold, styles.text]}>Use Skills</Text>
                <Text style={[t.bodyRegular, styles.subtext]}>Coming soon...</Text>
            </View>
        </HomePage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.orange_50,
    },
    text: {
        color: colors.Text_Primary,
    },
    subtext: {
        color: colors.text_secondary,
        marginTop: 8,
    },
});