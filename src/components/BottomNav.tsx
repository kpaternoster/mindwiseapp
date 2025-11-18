import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@design/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";
import { t } from "@design/typography";
import { HomeIcon, CalendarBlankIcon, BookOpenIcon } from "./Utils";
import ActIcon from "@assets/icons/Act.svg";

type TabKey = "home" | "plan" | "learn" | "help" | "act";

type Props = { active: TabKey };

const LABELS: Record<TabKey, string> = {
    home: "Home",
    plan: "Plan",
    learn: "Learn",
    help: "Crisis\nSupport",
    act: "Act",
};

const Tab = ({
    k,
    onPress,
    activeKey,
}: {
    k: Exclude<TabKey, "help">;
    onPress: () => void;
    activeKey: TabKey;
}) => {
    const isActive = activeKey === k;
    const iconColor = isActive ? colors.warm_dark : colors.text_secondary;

    const icon = {
        home: <HomeIcon size={20} color={iconColor} />,
        plan: <CalendarBlankIcon size={20} color={iconColor} />,
        learn: <BookOpenIcon size={20} color={iconColor} />,
        act: <ActIcon />,
    }[k];

    return (
        <Pressable onPress={onPress} style={styles.tab}>
            {/* Icon */}
            <View style={styles.iconTile}>
                {icon}
            </View>
            {/* Label */}
            <Text style={[t.footnoneMedium, styles.tabLabel, isActive && styles.tabLabelActive]}>
                {LABELS[k]}
            </Text>
        </Pressable>
    );
};

export const BottomNav: React.FC<Props> = ({ active }) => {
    const { bottom } = useSafeAreaInsets();
    const { dissolveTo } = useDissolveNavigation();

    return (
        <View style={[styles.wrapper, { paddingBottom: Math.max(bottom, 10) }]}>
            <View style={styles.container}>
                <Tab k="home" onPress={() => dissolveTo("Home")} activeKey={active} />
                <Tab k="plan" onPress={() => dissolveTo("Plan")} activeKey={active} />
                <View style={styles.centerCta_Back} />
                <Tab k="learn" onPress={() => dissolveTo("Learn")} activeKey={active} />
                <Tab k="act" onPress={() => dissolveTo("Act")} activeKey={active} />
            </View>
            <Pressable
                onPress={() => dissolveTo("Help")}
                style={styles.centerCta}
                accessibilityLabel="Crisis Support"
            >
                <Text style={[styles.centerText, t.textSemiBold]}>Crisis{"\n"}Support</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        marginBottom: 12,
        paddingVertical: 12
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        shadowColor: colors.black_40,
        shadowOpacity: 0.14,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 0 },
        elevation: 4,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    iconTile: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    tabLabel: {
        fontSize: 11,
        color: colors.text_secondary,
    },
    tabLabelActive: {
        color: colors.warm_dark,
    },
    centerCta: {
        position: "absolute",
        alignSelf: "center",
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colors.crisis,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,
        top: 4
    },
    centerCta_Back: {
        flex: 1.2,
        width: 100,
    },
    centerText: {
        textAlign: "center",
        color: "white",
    },
});

