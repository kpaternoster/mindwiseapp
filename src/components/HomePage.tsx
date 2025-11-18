import React from "react";
import {
    View,
    StatusBar
} from "react-native";
// import { FloatingChatButton } from "./ChatButton";
import { BottomNav } from "./BottomNav";

type TabKey = "home" | "plan" | "learn" | "help" | "act";

type Props = {
    children: React.ReactNode;
    active?: TabKey;
};

export const HomePage: React.FC<Props> = ({
    children,
    active = "home",
}) => {
    return (
        <View className="flex-1 bg-white pt-9">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {children}
            {/* <FloatingChatButton /> */}
            <BottomNav active={active} />
        </View>
    );
};

