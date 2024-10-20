import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Platform, SafeAreaView } from "react-native";
import TabButton from "./TabButton";
import { useTheme } from 'tamagui';
import { Newspaper, FileSearch2, NotebookPen, ContactRound } from '@tamagui/lucide-icons';

interface TabBarProps {
    height?: number;
    navigation: any;
    state: any; // Contains the current tab state
}

export default function TabBar({ height = 100, navigation, state }: TabBarProps) {
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

    // backgroundColor: theme.background1Dark.val
    return (
        <SafeAreaView>
            <View style={[styles.container, { height: height, }]}>
                <TabButton
                    onPress={() => navigation.navigate("index")}
                    label="Home"
                    icon={<Newspaper size={26} color={theme.text1.val} />}
                    background={theme.accentBlueMedium.val}
                    highlight={theme.accentBlueDark.val}
                />
                <TabButton
                    onPress={() => navigation.navigate("browse")}
                    label="Browse"
                    icon={<FileSearch2 size={26} color={theme.text1.val} />}
                    background={theme.accentPinkMedium.val}
                    highlight={theme.accentPinkDark.val}
                />
                <TabButton
                    onPress={() => navigation.navigate("create")}
                    label="Write"
                    icon={<NotebookPen size={26} color={theme.text1.val} />}
                    background={theme.accentPurpleLight.val}
                    highlight={theme.accentPurpleMedium.val}
                />
                <TabButton
                    onPress={() => navigation.navigate("profile")}
                    label="Profile"
                    icon={<ContactRound size={26} color={theme.text1.val} />}
                    background={theme.accentYellowMedium.val}
                    highlight={theme.accentYellowDarkest.val}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Platform.OS === "ios" ? 50 : 0,
        left: 0,
        right: 0,
        width: "100%",
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    }
});
