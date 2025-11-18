import React from "react";
import { View, Text, StyleSheet, Image, Pressable, ImageBackground } from "react-native";
import { colors } from "@design/color";
import { t } from "@design/typography";
import { useDissolveNavigation } from "@hooks/useDissolveNavigation";
import { ScreenScroll } from "@components/ScreenScroll";
import { HomePage } from "@components/HomePage";
import HomeHeader from "@components/HomeHeader";

export default function PlanHomeScreen() {
    const { dissolveTo } = useDissolveNavigation();

    return (
        <HomePage active="plan">
            <HomeHeader
                onNotificationPress={() => console.log('Notifications')}
                onAvatarPress={() => dissolveTo('Account')}
            />

            <ScreenScroll>
                <HomeCard
                    title="Pre-Treatment Plan"
                    body="Identify the primary goals and targets of the treatment"
                    cta="Create Plan"
                    image={require("@assets/illus/pretreatment.png")}
                    onPress={() => dissolveTo("Plan_PreTreatment")}
                />

                <HomeCard
                    title="Set Up My Crisis Plan"
                    body="Create a personal safety plan for emergencies"
                    cta="Create Plan"
                    image={require("@assets/illus/crisis.png")}
                    onPress={() => dissolveTo("Plan_Crisis")}
                />

                <HomeCard
                    title="Create Diary Card"
                    body="A diary card is a place where you record what skills you used each day of the week, rate your emotions, and track target behavior usage."
                    cta="Create Diary Card"
                    image={require("@assets/illus/diary.png")}
                    onPress={() => dissolveTo("Plan_Diary")}
                />
                <View className="flex-1 justify-center mt-10 flex-row">
                    <View className="flex" style={styles.emptyHintContainer}>
                        <Text style={[t.title16SemiBold, styles.emptyHintTitle]} className="text-center">
                            Daily Plan has not  created yet
                        </Text>
                        <Text style={[t.textMedium, styles.emptyHint]} className="text-center mt-3">
                            Fill out the Diary Card to help app create your plan
                        </Text>
                    </View>
                </View>
            </ScreenScroll>
        </HomePage>
    );
}

type CardProps = {
    title: string;
    body: string;
    cta: string;
    image: any;
    onPress: () => void;
};

const HomeCard = ({ title, body, cta, image, onPress }: CardProps) => (
    <View style={styles.card}>
        <View className="flex-row">
            <View className="flex-1">
                <Text style={[t.title24SemiBold, styles.cardTitle]}>{title}</Text>
                <Text style={[t.textMedium, styles.cardBody]}>{body}</Text>
            </View>
        </View>
        <View style={styles.cardImageContainer} className="mt-2">
            <ImageBackground source={image} imageStyle={styles.cardImage}>
                <Pressable onPress={onPress} style={styles.cardCta} accessibilityLabel={cta}>
                    <Text style={t.button} className="text-white  ml-2 mr-2">{cta}</Text>
                    <View style={styles.circle}>
                        <Image
                            source={require('@assets/icons/next.png')}
                            style={styles.next} />
                    </View>
                </Pressable>
            </ImageBackground>
        </View>


    </View>
);

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40
    },
    greeting: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
    },
    greetHi: { color: colors.Text_Primary },
    greetQ: { color: colors.Text_Primary },
    greetRight: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.stoke_gray,
        borderRadius: 40,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    heart: {
        width: 20,
        height: 20
    },
    heartText: {
        color: colors.button_orange
    },

    card: {
        backgroundColor: colors.background_screen_white,
        borderRadius: 16,
        padding: 12,
        borderWidth: 2,
        borderColor: colors.stoke_gray,
        marginTop: 10,
        overflow: 'hidden'
    },
    cardTitle: { color: colors.Text_Primary },
    cardBody: { color: colors.text_secondary, marginTop: 8 },
    cardImageContainer: {
        height: 80,
    },
    cardImage: {
        resizeMode: "contain",
        height: 180,
    },
    cardCta: {
        marginTop: 30,
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.button_orange,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 30,
    },
    emptyHintContainer: {
        width: 200,
        height: 200,
        paddingHorizontal: 12
    },
    emptyHintTitle: { color: colors.Text_Primary },
    emptyHint: { color: colors.text_secondary },
    circle: {
        backgroundColor: colors.background_screen_white,
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    next: {
        width: 16,
        height: 12
    }
});
