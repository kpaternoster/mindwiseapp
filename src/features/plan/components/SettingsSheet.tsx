import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { CheckIcon } from "@components/Utils";

type Option = {
    key: string;
    label: string;
}

type Props = {
    visible: boolean;
    title?: string;                 // e.g. "Daily Emotions Questions"
    options?: Option[];             // list of rows to show
    initialSelected?: string[];     // preselected items
    onCancel: () => void;
    onConfirm: (options: string[]) => void; // all selected on confirm
};

export const SettingsSheet: React.FC<Props> = ({
    visible,
    title = "Select Options",
    options = [],
    initialSelected = [],
    onCancel,
    onConfirm,
}) => {
    const [selected, setSelected] = useState<string[]>(initialSelected);

    useEffect(() => {
        if (visible) setSelected(initialSelected);
    }, [visible, initialSelected]);

    const toggle = (val: Option) => {
        setSelected((prev) => {
            const set = new Set(prev);
            set.has(val.key) ? set.delete(val.key) : set.add(val.key);
            return Array.from(set);
        });
    };

    const canConfirm = selected.length > 0;

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={onCancel}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.fullScreen}
            >
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    <Text style={[t.title24SemiBold, styles.title]}>{title}</Text>

                    {/* Options list */}
                    <ScrollView
                        className="flex-1 mt-6"
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {options.map((opt) => {
                            const active = selected.includes(opt.key);
                            return (
                                <Pressable
                                    key={opt.key}
                                    onPress={() => toggle(opt)}
                                    style={[styles.row, active && styles.rowActive]}
                                    accessibilityRole="checkbox"
                                    accessibilityState={{ checked: active }}
                                >
                                    <Text
                                        numberOfLines={2}
                                        style={[t.textMedium, styles.rowText, active && styles.rowTextActive]}
                                    >
                                        {opt.label}
                                    </Text>

                                    <View style={[styles.checkWrap, active && styles.checkWrapActive]}>
                                        {active ? <CheckIcon size={20} color="white" /> : null}
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>

                    {/* Footer actions */}
                    <View style={styles.footer}>
                        <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
                            <Text style={[t.button, styles.cancelText]}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.solid, !canConfirm && styles.disabled]}
                            disabled={!canConfirm}
                            onPress={() => onConfirm(selected)}
                        >
                            <Text style={[t.button, styles.confirmText]}>Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "flex-end",
    },
    sheet: {
        flex: 1, // full height sheet
        backgroundColor: "white",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 24,
    },
    handle: {
        alignSelf: "center",
        width: 84,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.button_orange,
        marginVertical: 12,
    },
    title: {
        textAlign: "center",
        color: colors.Text_Primary,
        marginBottom: 8,
    },
    listContent: {
        paddingBottom: 12,
        gap: 10,
    },

    row: {
        minHeight: 44,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.stoke_gray,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
    },
    rowActive: {
        borderColor: colors.button_orange,
        // backgroundColor: "#fff7f0",
    },
    rowText: {
        flex: 1,
        color: colors.Text_Primary,
    },
    rowTextActive: {
        color: colors.button_orange,
        fontWeight: "600",
    },

    checkWrap: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        marginLeft: 10,
    },
    checkWrapActive: {
        backgroundColor: colors.button_orange,
        borderColor: colors.button_orange,
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
    cancel: {
        borderWidth: 2,
        borderColor: colors.button_orange,
        backgroundColor: "white",
    },
    cancelText: { color: colors.button_orange },
    solid: { backgroundColor: colors.button_orange },
    confirmText: { color: "white" },
    disabled: { opacity: 0.5 },
});
