import React, { useEffect, useMemo, useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";

export type City = {
    city: string;
    country?: string;
    region?: string;
};

type Props = {
    visible: boolean;
    initialQuery?: string;
    cities?: City[];
    onCancel: () => void;
    onConfirm: (city: City) => void;
};

const DEFAULT_CITIES: City[] = [
    { city: "Beijing", country: "China" },
    { city: "Berlin", country: "Germany" },
    { city: "Belgrade", country: "Serbia" },
    { city: "Beirut", country: "Lebanon" },
    { city: "Bengaluru", country: "India" },
    { city: "Bergen", country: "Norway" },
    { city: "Belfast", country: "Northern Ireland" },
    { city: "Bellingham", country: "United States" },
];

export const CityPickerSheet: React.FC<Props> = ({
    visible,
    initialQuery = "",
    cities = DEFAULT_CITIES,
    onCancel,
    onConfirm,
}) => {
    const [query, setQuery] = useState(initialQuery);
    const [selected, setSelected] = useState<City | null>(null);

    useEffect(() => {
        if (visible) {
            setQuery(initialQuery);
            setSelected(null);
        }
    }, [visible, initialQuery]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return cities;
        return cities.filter((c) =>
            `${c.city}, ${c.country ?? ""} ${c.region ?? ""}`
                .toLowerCase()
                .includes(q)
        );
    }, [query, cities]);

    const renderHighlighted = (label: string, q: string) => {
        if (!q) return <Text style={styles.itemCity}>{label}</Text>;

        const lowerLabel = label.toLowerCase();
        const lowerQ = q.toLowerCase();
        const start = lowerLabel.indexOf(lowerQ);

        if (start === -1) {
            return <Text style={[t.textRegular, styles.itemCity]}>{label}</Text>;
        }

        const end = start + q.length;
        const before = label.slice(0, start);
        const match = label.slice(start, end);
        const after = label.slice(end);

        return (
            <Text style={styles.itemCity}>
                {before}
                <Text style={[t.textRegular, styles.bold]}>{match}</Text>
                {after}
            </Text>
        );
    };

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={onCancel}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.fullScreen}
            >
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    {/* Search box */}
                    <View style={styles.searchWrapper}>
                        <TextInput
                            autoFocus
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Your City"
                            placeholderTextColor={colors.stoke_gray}
                            style={[t.textRegular, styles.search]}
                            returnKeyType="search"
                        />
                    </View>

                    {/* Results */}
                    <FlatList
                        data={filtered}
                        keyExtractor={(_, idx) => String(idx)}
                        keyboardShouldPersistTaps="handled"
                        style={styles.itemContainer}
                        contentContainerStyle={styles.itemContentContainer}
                        renderItem={({ item }) => {
                            const label =
                                item.country ? `${item.city}, ${item.country}` : item.city;
                            const isActive =
                                selected &&
                                item.city === selected.city &&
                                item.country === selected.country;
                            return (
                                <Pressable
                                    onPress={() => {
                                        setSelected(item);
                                        setQuery(`${item.city}, ${item.country}`)
                                    }}
                                    style={[styles.item, isActive && styles.itemActive]}
                                >
                                    {renderHighlighted(label, query)}
                                </Pressable>
                            );
                        }}
                    />

                    {/* Footer actions */}
                    <View style={styles.footer}>
                        <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
                            <Text style={[t.button, styles.cancelText]}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.btn, styles.solid, !selected && styles.disabled]}
                            disabled={!selected}
                            onPress={() => selected && onConfirm(selected)}
                        >
                            <Text style={t.button} className="text-white">Confirm</Text>
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
    },
    sheet: {
        flex: 1, // 👈 take full height
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
    searchWrapper: {
        marginBottom: 8,
    },
    search: {
        borderWidth: 2,
        borderColor: colors.stoke_gray,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        textAlign: "center",
        color: colors.text_primary,
    },
    itemContainer: {
        flex: 1
    },
    itemContentContainer: {
        paddingBottom: 16
    },

    item: {
        paddingVertical: 10,
        alignItems: "center",
    },
    itemActive: {
        backgroundColor: "#faf5ef",
        borderRadius: 12,
    },
    itemCity: {
        color: colors.text_primary,
    },
    bold: {
        fontWeight: "700",
        color: colors.text_primary,
    },
    footer: {
        flexDirection: "row",
        marginTop: 8,
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
        marginRight: 10,
    },
    solid: {
        backgroundColor: colors.button_orange,
        marginLeft: 10,
    },
    disabled: { opacity: 0.5 },
    cancelText: {
        color: colors.button_orange,
    },
});
