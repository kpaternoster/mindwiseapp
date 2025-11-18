import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import { BackButton } from "@components/BackButton";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { ScreenScroll } from "@components/ScreenScroll";
import { HomePage } from "@components/HomePage";
import { CheckIcon } from "@components/Utils";
import { SettingsSheet } from "../components/SettingsSheet";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";

type BlockKey = "behaviour" | "emotions" | "skills" | "notes";

const BLOCKS: { key: BlockKey; title: string; desc: string }[] = [
    {
        key: "behaviour",
        title: "Behaviour Diary",
        desc:
            "A list of desired and undesired behaviors for you to track daily. By default, we ask about: Suicidality, Self-Harm, Use of drugs/alcohol, etc.",
    },
    {
        key: "emotions",
        title: "Emotions Diary",
        desc:
            "An overall sense of your level of distress today: Level of emotional distress, Highest SUDS, Level of physical distress.",
    },
    {
        key: "skills",
        title: "Skills Diary",
        desc:
            "All the skills are provided to track which ones you used and which were effective today.",
    },
    {
        key: "notes",
        title: "Daily Notes",
        desc:
            "We provide a space for you to capture your thoughts, reflections, and honest views daily or whenever you feel valuable.",
    },
];

const DAILY_SETTINGS: { key: string, label: string }[] = [
    { key: "1", label: "What is your level of emotional misery?" },
    { key: "2", label: "What is your level of emotional misery?" },
    { key: "3", label: "What is your level of emotional misery?" },
    { key: "4", label: "What is your level of emotional misery?" },
]

export default function CreateDiaryCardScreen() {
    const { dissolveTo } = useDissolveNavigation();

    const [selected, setSelected] = useState<Set<BlockKey>>(new Set());
    const [settingOpen, setSettingOpen] = useState(false);


    const allKeys = useMemo(() => BLOCKS.map((b) => b.key), []);
    const allSelected = selected.size === BLOCKS.length;
    const noneSelected = selected.size === 0;

    const toggleOne = (k: BlockKey) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(k)) next.delete(k);
            else next.add(k);
            return next;
        });
    };

    const toggleAll = () => {
        setSelected((prev) =>
            prev.size === BLOCKS.length ? new Set() : new Set(allKeys)
        );
    };

    const save = () => {
        // TODO: persist Array.from(selected) to your store / API
        setSettingOpen(true)
    };

    const createDefault = () => {
        setSelected(new Set(allKeys));


    };

    const onConfirmSetting = (options: string[]) => {
        console.log(options)
        setSettingOpen(false);
        dissolveTo('Plan_DiaryCard_Help');
    }


    return (
        <HomePage>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-10 pb-2">
                <BackButton page="Plan" />
                <Text style={[t.title16SemiBold, styles.headerTitle]}>Create Diary Card</Text>
                <View />
            </View>

            <ScreenScroll>
                {/* Intro */}
                <View className="text-center">
                    <Text style={[t.title24SemiBold, styles.introTitle]}>
                        Choose the blocks you want to have in your diary card
                    </Text>
                    <Text style={[t.textMedium, styles.introHelper]} className="mt-2">
                        You can change this settings later
                    </Text>
                </View>

                {/* Choose All */}
                <Pressable
                    onPress={toggleAll}
                    style={styles.selectAllRow}
                    className="mt-4"
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: allSelected }}
                >
                    <Text style={[t.button, styles.selectAllText]}>Choose All</Text>
                    <View style={[styles.circle, allSelected && styles.circleActive]}>
                        {allSelected ? <CheckIcon size={18} color={colors.background_screen_white} /> : null}
                    </View>
                </Pressable>

                {/* Blocks */}
                <View className="mt-2">
                    {BLOCKS.map((b) => {
                        const isActive = selected.has(b.key);
                        return (
                            <Pressable
                                key={b.key}
                                onPress={() => toggleOne(b.key)}
                                style={[styles.blockCard, isActive && styles.blockCardActive]}
                                accessibilityRole="checkbox"
                                accessibilityState={{ checked: isActive }}
                            >
                                <View className="flex-1 pr-3">
                                    <Text style={[t.title24SemiBold, styles.blockTitle, isActive && styles.blockTitleActive]}>
                                        {b.title}
                                    </Text>
                                    <Text style={[t.textMedium, styles.blockDesc, isActive && styles.blockDescActive]} className="mt-3">{b.desc}</Text>
                                </View>

                                <View style={[styles.checkWrap, isActive && styles.checkWrapActive]}>
                                    {isActive ? <CheckIcon size={20} /> : null}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Actions */}
                <View className="mt-4">
                    <Pressable
                        onPress={save}
                        disabled={noneSelected}
                        style={[styles.primaryBtn, noneSelected && styles.disableButton]}
                    >
                        <Text style={[t.button, styles.primaryBtnText]}>Save Diary Card</Text>
                    </Pressable>

                    <Pressable
                        onPress={createDefault}
                        style={styles.secondaryBtn}
                    >
                        <Text style={[t.button, styles.secondaryBtnText]}>
                            Create Default Diary Card
                        </Text>
                    </Pressable>
                </View>
            </ScreenScroll>
            <SettingsSheet
                visible={settingOpen}
                title="Daily Emotions Questions"
                options={DAILY_SETTINGS}
                initialSelected={["1"]}
                onCancel={() => setSettingOpen(false)}
                onConfirm={onConfirmSetting}
            />
        </HomePage>
    );
}

const styles = StyleSheet.create({
    headerTitle: { color: colors.Text_Primary },
    introTitle: { color: colors.Text_Primary, textAlign: 'center' },
    introHelper: {
        color: colors.text_secondary,
        textAlign: 'center'
    },

    selectAllRow: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectAllText: { color: colors.text_secondary },

    blockCard: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: colors.stoke_gray,
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 10,
        height: 120,
    },
    blockCardActive: {
        backgroundColor: colors.button_orange,
        borderColor: colors.button_orange,
    },
    blockTitle: { color: colors.Text_Primary },
    blockTitleActive: { color: colors.background_screen_white },
    blockDesc: { color: colors.text_secondary },
    blockDescActive: { color: colors.background_screen_white },

    circle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    circleActive: { borderColor: colors.button_orange, backgroundColor: colors.button_orange },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: colors.button_orange,
    },

    primaryBtn: {
        height: 52,
        borderRadius: 28,
        backgroundColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    primaryBtnText: { color: "white" },

    secondaryBtn: {
        height: 52,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        backgroundColor: "white",
    },
    secondaryBtnText: { color: colors.button_orange },

    disableButton: {
        opacity: 0.5
    },
    checkWrap: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: colors.button_orange,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    checkWrapActive: {
        borderColor: colors.background_screen_white,
        backgroundColor: colors.background_screen_white,
    },
});
