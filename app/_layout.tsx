import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { Appearance, SafeAreaView } from 'react-native';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuth from '@/hooks/useAuth'; // Import the useAuth hook

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // Load the custom "Digitalt" font asynchronously using Expo's useFonts hook
    const [loaded] = useFonts({
        Digitalt: require('../assets/fonts/Digitalt.otf'), // Add your custom font here
    });

    // Manage system theme state (light/dark mode)
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");

    // Import the useAuth hook and call anonymous sign-in
    const { session, getSession } = useAuth();
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    // Use the Expo Router's navigation function to redirect to the signup screen if needed
    const router = useRouter();

    // Triggered when the layout is fully mounted
    const [isAppReady, setIsAppReady] = useState(false);

    // Check for a session and only redirect once the app is fully mounted
    useEffect(() => {
        async function initializeAuth() {
            const currentSession = await getSession();
            if (!currentSession && isAppReady) {
                // Redirect to the signup screen
                router.replace('/signup'); // Ensure there's a "signup" screen defined in your app
            }
            setIsCheckingSession(false); // We're done checking the session
        }
        initializeAuth();
    }, [getSession, router, isAppReady]);

    // Hide splash screen when fonts are loaded and session checking is done
    useEffect(() => {
        if (loaded && !isCheckingSession && isAppReady) {
            SplashScreen.hideAsync();
        }
    }, [loaded, isCheckingSession, isAppReady]);

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

    // Check if the app is ready
    useEffect(() => {
        // Wait for layout to be mounted
        const onLayoutReady = async () => {
            await SplashScreen.preventAutoHideAsync();
            setIsAppReady(true);
        };
        onLayoutReady();
    }, []);

    // If fonts are not ready or session is still being checked, return null to prevent rendering
    if (!loaded || isCheckingSession) {
        return null; // You can add a splash screen or loading indicator here
    }

    // If the user is authenticated, show the main app layout
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
