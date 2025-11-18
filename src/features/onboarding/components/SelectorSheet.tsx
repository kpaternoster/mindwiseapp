import React, { useEffect, useMemo, useState } from "react";
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

export type SelectorOption = string;

type Props = {
    visible: boolean;
    title?: string;
    label?: string;
    options: SelectorOption[];
    multi?: boolean;                 // false = single select (default)
    initialSelected?: string[];      // for single, pass ["value"]; for none: []
    confirmOnSelect?: boolean;       // for single select quick-close
    onCancel: () => void;
    onConfirm: (selected: string[]) => void;
};

const ItemSeparator = () => <View className="h-1" />;

export const SelectorSheet: React.FC<Props> = ({
    visible,
    title = "Select One",
    label,
    options,
    multi = false,
    initialSelected = [],
    confirmOnSelect,
    onCancel,
    onConfirm,
}) => {
    const quickClose = useMemo(
        () => (confirmOnSelect !== undefined ? confirmOnSelect : !multi),
        [confirmOnSelect, multi]
    );

    const [selected, setSelected] = useState<string[]>(initialSelected);

    useEffect(() => {
        if (visible) setSelected(initialSelected ?? []);
    }, [visible, initialSelected]);

    const toggle = (val: string) => {
        if (!multi) {
            setSelected([val]);
            if (quickClose) onConfirm([val]);
            return;
        }
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(val)) next.delete(val);
            else next.add(val);
            return Array.from(next);
        });
    };

    const hasSelection = selected.length > 0;

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={onCancel}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.backdrop}
            >
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    {!!title && (
                        <Text style={[styles.title, t.title16SemiBold]} className={label ? "mb-4" : "mb-8"}>
                            {title}
                        </Text>
                    )}
                    {!!label && (
                        <Text style={[styles.label, t.textRegular]} className="mb-8">
                            {label}
                        </Text>
                    )}

                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        ItemSeparatorComponent={ItemSeparator}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => {
                            const active = selected.includes(item);
                            return (
                                <Pressable
                                    onPress={() => toggle(item)}
                                    style={[styles.row, active && styles.rowActive]}
                                >
                                    <Text
                                        style={[
                                            t.button,
                                            styles.rowText,
                                            active && styles.rowTextActive,
                                        ]}
                                    >
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
                        {/* Only show Confirm for multi-select or when quickClose is false */}
                        {(!quickClose || multi) && (
                            <Pressable
                                style={[styles.btn, styles.solid]}
                                disabled={!hasSelection}
                                onPress={() => onConfirm(selected)}
                            >
                                <Text style={[t.button, styles.btnText]}>Confirm</Text>
                            </Pressable>
                        )}
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
        backgroundColor: colors.white,
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
        color: colors.text_primary,
    },
    label: {
        textAlign: "center",
        color: colors.text_secondary,
    },
    listContent: {
        paddingBottom: 12,
    },
    row: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "transparent",
        alignItems: "center",
        backgroundColor: "white",
    },
    rowActive: {
        borderColor: colors.button_orange,
        backgroundColor: colors.button_orange,
    },
    rowText: {
        color: colors.text_secondary,
        fontSize: 16,
    },
    rowTextActive: {
        color: 'white',
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        marginTop: 12,
        gap: 12,
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
    solid: {
        backgroundColor: colors.button_orange,
    },
    btnText: {
        color: "white",
    },
    ghostText: {
        color: colors.button_orange,
    }
});
