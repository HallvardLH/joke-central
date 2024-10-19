import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { Appearance, SafeAreaView } from 'react-native';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // Load the custom "Digitalt" font asynchronously using Expo's useFonts hook
    const [loaded] = useFonts({
        Digitalt: require('../assets/fonts/Digitalt.otf'), // Add your custom font here
    });

    // Manage system theme state (light/dark mode)
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");

    // Hide splash screen when fonts are loaded
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    // Listen for changes in the system theme
    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setCurrentTheme(colorScheme || "light");
        });

        // Clean up the listener when the component is unmounted
        return () => {
            listener.remove();
        };
    }, []);

    // If fonts are not loaded yet, return null to prevent rendering
    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={config}>
            <Theme name={currentTheme}>
                <GestureHandlerRootView>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </SafeAreaView>
                </GestureHandlerRootView>
            </Theme>
        </TamaguiProvider>
    );
}
