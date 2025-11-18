import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BackButton } from "@components/BackButton";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { NextButton } from "../components/NextButton";
import { PreviousButton } from "../components/PreviousButton";

type Section = {
    title: string;
    body: React.ReactNode;
};

const styles = StyleSheet.create({
    headerTitle: { color: colors.Text_Primary },

    infoCard: {
        borderWidth: 1,
        borderColor: colors.stoke_gray,
        backgroundColor: "white",
        borderRadius: 16,
        padding: 12,
        marginTop: 8,
    },
    cardTitle: {
        color: colors.textOrangeOpacity,
    },
    bodyText: { color: colors.Text_Primary },

    bulletRow: { flexDirection: "row", alignItems: "flex-start" },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.Text_Primary,
        marginTop: 7,
        marginRight: 8,
    },

    numberRow: { flexDirection: "row", alignItems: "flex-start" },
    num: {
        color: colors.Text_Primary,
        fontWeight: "700",
        marginRight: 8,
    },

    actionsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 48,
    },
    btn: {
        flex: 1,
        height: 52,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    ghostBtn: {
        borderWidth: 2,
        borderColor: colors.button_orange,
        backgroundColor: "white",
    },
    ghostText: { color: colors.button_orange },
    solidBtn: { backgroundColor: colors.button_orange },
    solidText: { color: "white" },
    arrow: { color: "white", fontSize: 16, marginLeft: 8 },
});

function Bullet({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.bulletRow}>
            <View style={styles.dot} />
            <Text style={[t.textMedium, styles.bodyText]} className="flex-1">{children as any}</Text>
        </View>
    );
}
function Numbered({ n, children }: { n: number; children: React.ReactNode }) {
    return (
        <View style={styles.numberRow}>
            <Text style={styles.num}>{n}.</Text>
            <Text style={[t.textMedium, styles.bodyText]} className="flex-1">{children as any}</Text>
        </View>
    );
}

const SECTIONS: Section[] = [
    {
        title: "What is it?",
        body: (
            <Text style={[t.textMedium, styles.bodyText]}>
                A Diary Card is an essential tool to help you launch and stick to your improvement journey
                through Dialectical Behavior Therapy (DBT). Think of it as a roadmap and health tracker for you where you can
                keep track of your daily (ideally, but could be less) urges, behaviors, emotions, and skill usage. Like a
                fitness tracker tracks steps, your Diary Card tracks your daily progress through feeling better, wiser,
                more skillful, and more effective.
            </Text>
        ),
    },
    {
        title: "Why do we use it?",
        body: (
            <View className="gap-2">
                <Text style={[t.textMedium, styles.bodyText]} className="mb-2">
                    A Diary Card is an essential tool for you because it is the best way we have found to help you:
                </Text>
                <Bullet>Create accountability with yourself</Bullet>
                <Bullet>Help you feel more empowered and in control of your journey</Bullet>
                <Bullet>Help you identify triggers and vulnerabilities before they occur</Bullet>
                <Bullet>
                    If you work with a therapist, it can be an excellent basis for your conversations
                </Bullet>
            </View>
        ),
    },
    {
        title: "How do we use it?",
        body: (
            <View className="gap-2">
                <Text style={[t.textMedium, styles.bodyText]} className="mb-2">
                    You can go through the following steps to use your Diary Card:
                </Text>
                <Numbered n={1}>
                    Set up the Diary Card with the key things to track (see next screen to add yours)
                </Numbered>
                <Numbered n={2}>Decide whether and who else you want to share it with</Numbered>
                <Numbered n={3}>
                    Set up a time every day to fill it out (before bedtime can be a good time)
                </Numbered>
                <Numbered n={4}>
                    Fill out all four elements: Behaviors, Emotions, Skills, and Daily Notes
                </Numbered>
                <Numbered n={5}>
                    Be honest; this is just for you and your improvement.
                </Numbered>
                <Text style={[t.textMedium, styles.bodyText]} className="mt-2">
                    Remember: This is a tool of compassion, not criticism.
                </Text>
            </View>
        ),
    },
    {
        title: "More detail",
        body: (
            <View className="gap-2">
                <Text style={[t.textMedium, styles.bodyText]} className="mb-2">
                    A Diary Card consists of 4 main sections:
                </Text>
                <Bullet>
                    Behavior Tracker: Keep track of your daily urges and behaviors
                </Bullet>
                <Bullet>
                    Emotional Tracker: Keep track of your daily primary emotion and emotional intensity
                </Bullet>
                <Bullet>
                    Skill Tracker: Keep track of your daily use of the key DBT skills
                </Bullet>
                <Bullet>
                    Daily Notes: A place for you to capture any thoughts or reflections from the day
                </Bullet>
            </View>
        ),
    },
    {
        title: "Behavior Tracker",
        body: (
            <View className="gap-2">
                <Text style={[t.textMedium, styles.bodyText]} className="mb-2">
                    A list of desired and undesired behaviors for you to track daily.  By default, we ask about:
                </Text>
                <Bullet>
                    Suicidality (maybe suicidal thoughts and behaviors, or break it up into suicidal thoughts and suicidal behaviors)
                </Bullet>
                <Bullet>
                    Self-Harm
                </Bullet>
                <Bullet>
                    Use of drugs/alcohol
                </Bullet>
                <Bullet>
                    Risky behaviors (this should be expanded: Out of control shopping, binge eating, purging and restricting, dangerous driving, dangerous sexual encounters)
                </Bullet>
                <Bullet>
                    Dissociation episodes
                </Bullet>
                <Bullet>
                    Panic attacks
                </Bullet>
                <Bullet>
                    Adequate sleep
                </Bullet>
                <Bullet>
                    Adequate nutrition
                </Bullet>
                <Bullet>
                    Urge to quit Therapy
                </Bullet>
                <Bullet>
                    Taking Medication as Prescribed
                </Bullet>
                <Bullet>
                    Use Skills
                </Bullet>
                <Bullet>
                    We also leave open space for you to add additional desired or undesired behaviors you want to track
                </Bullet>
            </View>
        ),
    },
    {
        title: "Daily Notes",
        body: (
            <View className="gap-2">
                <Text style={[t.textMedium, styles.bodyText]} className="mb-2">
                    We provide a space for you to capture your thoughts, reflections, and honest views daily or whenever you feel valuable.
                </Text>
            </View>

        )
    }
];

export default function AboutDiaryCardScreen() {
    const [idx, setIdx] = useState(0);

    const atFirst = idx === 0;
    const atLast = idx === SECTIONS.length - 1;

    const section = useMemo(() => SECTIONS[idx], [idx]);

    const next = () => !atLast && setIdx((i) => i + 1);
    const prev = () => !atFirst && setIdx((i) => i - 1);

    return (
        <View className="flex-1 bg-white px-4">
            {/* Header */}
            <View className="flex-row items-center justify-between pt-10 pb-2">
                <BackButton page="Plan" />
                <Text style={[t.title16SemiBold, styles.headerTitle]}>About Dairy Card</Text>
                <View />
            </View>

            {/* Card */}
            <View style={styles.infoCard}>
                <Text style={[t.title16SemiBold, styles.cardTitle]}>{section.title}</Text>
                <View className="mt-2">{section.body}</View>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
                {!atFirst ? (
                    <PreviousButton onPress={prev} />
                ) : (
                    <View className="flex-1" />
                )}
                {
                    !atLast ?
                        <NextButton onPress={next} />
                        : <View className="flex-1" />
                }

            </View>
        </View>
    );
}



