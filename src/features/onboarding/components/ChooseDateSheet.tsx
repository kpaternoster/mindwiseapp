import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { colors } from "@design/color";
import { t } from "@design/typography";

type Props = {
    visible: boolean;
    initialDate?: Date;
    minimumDate?: Date;
    maximumDate?: Date;
    title?: string;
    onCancel: () => void;
    onConfirm: (date: Date) => void;
};

export const ChooseDateSheet: React.FC<Props> = ({
    visible,
    initialDate,
    minimumDate,
    maximumDate,
    title = "Choose Date",
    onCancel,
    onConfirm,
}) => {
    const [draft, setDraft] = useState<Date>(initialDate ?? new Date());

    useEffect(() => {
        if (visible) {
            setDraft(initialDate ?? new Date());
        }
    }, [visible, initialDate]);

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={onCancel}>
            <View style={styles.backdrop}>
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    <Text style={[styles.title, t.title16SemiBold]}>{title}</Text>
                    <View className="ml-6">
                        <DatePicker
                            date={draft}
                            onDateChange={setDraft}
                            mode="date"
                            locale="en"
                            minimumDate={minimumDate}
                            maximumDate={maximumDate}
                        />
                    </View>


                    <View style={styles.footer}>
                        <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
                            <Text style={[t.button, styles.cancelText]}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.solid]}
                            onPress={() => onConfirm(draft)}
                        >
                            <Text style={t.button} className="text-white">Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
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
        marginVertical: 16,
    },
    title: {
        textAlign: "center",
        color: colors.text_primary,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    btn: {
        height: 52,
        borderRadius: 28,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    cancel: {
        borderWidth: 2,
        borderColor: colors.button_orange,
        backgroundColor: "white",
        marginRight: 10,
    },
    solid: {
        backgroundColor: colors.button_orange,
        marginLeft: 10,
    },
    cancelText: {
        color: colors.button_orange,
    },
});
