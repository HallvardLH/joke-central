import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Platform, SafeAreaView } from "react-native";
import TabButton from "./TabButton";
import { useTheme } from 'tamagui';
import { Newspaper, FileSearch2, NotebookPen, ContactRound } from '@tamagui/lucide-icons';
import { router } from 'expo-router';

interface TabBarProps {
    height?: number;
    backgroundColor?: string;
    navigation?: any;
    state?: any; // Contains the current tab state
}

export default function TabBar({ height = 100, backgroundColor, navigation, state }: TabBarProps) {
    const theme = useTheme();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    if (isKeyboardVisible) return null;

    return (
        <SafeAreaView style={{ backgroundColor: theme.accentPurpleDarkest.val }}>
            <View style={[
                styles.container,
                {
                    height: height,
                    backgroundColor: backgroundColor ? backgroundColor : theme.accentPurpleDarkest.val,
                    borderTopWidth: 2.5,
                    borderColor: theme.background.val,
                }
            ]}>
                <TabButton
                    onPress={() => router.replace("/(tabs)/")}
                    label="Home"
                    icon={<Newspaper size={26} color={theme.background.val} />}
                    labelColor={theme.background.val}
                    background={theme.accentBlueMedium.val}
                    highlight={theme.accentBlueDark.val}
                />
                <TabButton
                    onPress={() => router.replace("/(tabs)/browse")}
                    label="Browse"
                    labelColor={theme.background.val}
                    icon={<FileSearch2 size={26} color={theme.background.val} />}
                    background={theme.accentPinkMedium.val}
                    highlight={theme.accentPinkDark.val}
                />
                <TabButton
                    onPress={() => router.replace("/(tabs)/create")}
                    label="Write"
                    labelColor={theme.background.val}
                    icon={<NotebookPen size={26} color={theme.background.val} />}
                    background={theme.accentPurpleLight.val}
                    highlight={theme.accentPurpleMedium.val}
                />
                <TabButton
                    onPress={() => router.replace("/(tabs)/profile")}
                    label="Profile"
                    labelColor={theme.background.val}
                    icon={<ContactRound size={26} color={theme.background.val} />}
                    background={theme.accentYellowMedium.val}
                    highlight={theme.accentYellowDarkest.val}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        bottom: 0,
        paddingBottom: Platform.OS === "ios" ? 0 : 0,
        left: 0,
        right: 0,
        width: "100%",
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    }
});
