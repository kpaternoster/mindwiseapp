import React from "react";
import {
    ScrollView,
    StyleSheet,
    ScrollViewProps,
    ViewStyle,
} from "react-native";

type Props = ScrollViewProps & {
    children: React.ReactNode;
    contentContainerStyle?: ViewStyle;
};

export const ScreenScroll: React.FC<Props> = ({
    children,
    contentContainerStyle,
    ...rest
}) => {
    return (
        <ScrollView
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            className="px-1 pt-1"
            showsVerticalScrollIndicator={false}
            {...rest}
        >
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 160,
    },
});
