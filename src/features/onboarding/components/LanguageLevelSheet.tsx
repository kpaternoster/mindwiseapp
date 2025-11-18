import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";

type Props = {
    visible: boolean;
    initialValue?: string | null;
    onCancel: () => void;
    onSelect: (value: string) => void; // closes on select
};

const LEVELS = [
    "Beginner – I need translations / help understanding content",
    "Comfortable – I can understand most content",
    "Fluent – I can read anything without help",
];

const ItemSeperateComponent = () => {
    return (
        <View className="h-1" />
    )
}

export const LanguageLevelSheet: React.FC<Props> = ({
    visible,
    initialValue = null,
    onCancel,
    onSelect,
}) => {
    const [selected, setSelected] = useState<string | null>(initialValue);

    useEffect(() => {
        if (visible) setSelected(initialValue ?? null);
    }, [visible, initialValue]);

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={onCancel}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.backdrop}
            >
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    {/* <Text style={styles.title}>Select One</Text> */}

                    <FlatList
                        data={LEVELS}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.itemContentContainer}
                        ItemSeparatorComponent={ItemSeperateComponent}
                        renderItem={({ item }) => {
                            const isActive = item === selected;
                            return (
                                <Pressable
                                    onPress={() => {
                                        setSelected(item);
                                        onSelect(item);
                                    }}
                                    style={[styles.row, isActive && styles.rowActive]}
                                >
                                    <Text style={[t.textRegular, styles.rowText, isActive && styles.rowTextActive]}>
                                        {item}
                                    </Text>
                                </Pressable>
                            );
                        }}
                    />

                    <View style={styles.footer}>
                        <Pressable style={[styles.btn, styles.ghost]} onPress={onCancel}>
                            <Text style={[t.button, styles.ghostText]}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: colors.background_screen_orange,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 20,
        maxHeight: "85%",
    },
    handle: {
        alignSelf: "center",
        width: 84,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.button_orange,
        marginVertical: 16,
    },
    title: {
        textAlign: "center",
        color: colors.text_primary
    },
    row: {
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: "center",
        backgroundColor: 'white'
    },
    rowActive: {
        borderColor: colors.button_orange,
        backgroundColor: colors.button_orange,
    },
    rowText: {
        color: colors.button_orange,
        fontSize: 15,
        textAlign: "center",
        lineHeight: 20,
    },
    rowTextActive: {
        color: 'white',
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        marginTop: 6,
    },
    btn: {
        height: 52,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    ghost: {
        borderWidth: 2,
        borderColor: colors.button_orange,
        backgroundColor: "white",
    },
    btnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
    ghostText: {
        color: colors.button_orange,
    },
    itemContentContainer: {
        paddingBottom: 12
    }
});
