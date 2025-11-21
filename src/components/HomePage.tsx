import React from "react";
import {
    View,
    StatusBar,
    Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
    const insets = useSafeAreaInsets();
    
    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="white"
                translucent={Platform.OS === 'android'}
            />
            {children}
            {/* <FloatingChatButton /> */}
            <BottomNav active={active} />
        </View>
    );
};

