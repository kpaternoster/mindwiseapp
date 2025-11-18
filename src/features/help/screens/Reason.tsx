import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { CloseButton } from "../components/CloseButton";
import { useNavigation } from "@react-navigation/native";

export default function HelpReasonScreen() {
    const nav = useNavigation();
    const [reasons, setReasons] = useState<string[]>(["", "", ""]);

    const update = (i: number, v: string) => {
        setReasons((prev) => {
            const next = [...prev];
            next[i] = v;
            return next;
        });
    };

    return (
        <View
            style={styles.container}
            className="pt-12"
        >
            <View style={styles.inner}>
                {/* Close */}
                <View style={styles.topRight}>
                    <CloseButton onPress={() => nav.goBack()} />
                </View>

                <ScrollView
                    className="flex-1 mt-8"
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {[0, 1, 2].map((i) => (
                        <View key={i} className="mb-4">
                            <Text style={[t.textBold, styles.label]}>Reason to Live</Text>
                            <TextInput
                                value={reasons[i]}
                                onChangeText={(v) => update(i, v)}
                                placeholder="Text of the Reason"
                                placeholderTextColor={colors.Text_Primary}
                                multiline
                                style={styles.input}
                                textAlignVertical="top"
                                returnKeyType="done"
                            />
                        </View>
                    ))}
                </ScrollView>
                <Pressable onPress={() => nav.goBack()} style={styles.backLinkWrap}>
                    <Text style={[t.button, styles.backLink]}>Back to Immediate Help Page</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background_help },
    contentContainer: {
        paddingBottom: 40
    },
    inner: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
    topRight: { alignItems: "flex-end" },
    label: { color: colors.Text_Primary, marginBottom: 6 },
    input: {
        minHeight: 92,
        backgroundColor: "white",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: colors.stoke_gray,
        color: colors.Text_Primary,
    },
    backLinkWrap: { alignItems: "center", marginBottom: 60 },
    backLink: { color: colors.textHelp }, // pinkish like the mock
});
