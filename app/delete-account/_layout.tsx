import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from 'tamagui';

export default function Layout() {
    const theme = useTheme();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTransparent: true,
                headerTitleStyle: { color: Platform.OS === "android" ? theme.accentPurpleDarkest.val : "transparent" },
                headerTintColor: theme.background.val,
                headerBackTitleStyle: { fontFamily: "Digitalt" }
            }}
        >
        </Stack>
    );
}