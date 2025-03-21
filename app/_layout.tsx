import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { Appearance, StatusBar } from 'react-native';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuth from '@/hooks/useAuth';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/state/reduxStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortalProvider } from 'tamagui';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
    const [loaded] = useFonts({
        Digitalt: require('../assets/fonts/Digitalt.otf'),
    });

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");
    const { session, getSession } = useAuth();
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [isAppReady, setIsAppReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function initializeAuth() {
            const currentSession = await getSession();
            if (!currentSession && isAppReady) {
                router.replace('/auth/welcome');
            }
            setIsCheckingSession(false);
        }
        initializeAuth();
    }, [getSession, router, isAppReady]);

    useEffect(() => {
        if (loaded && !isCheckingSession && isAppReady) {
            SplashScreen.hideAsync();
        }
    }, [loaded, isCheckingSession, isAppReady]);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setCurrentTheme(colorScheme || 'light');
        });
        return () => listener.remove();
    }, []);

    useEffect(() => {
        const onLayoutReady = async () => {
            await SplashScreen.preventAutoHideAsync();
            setIsAppReady(true);
        };
        onLayoutReady();
    }, []);

    if (!loaded || isCheckingSession) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider store={store}>
                <TamaguiProvider config={config}>
                    <PortalProvider>
                        <Theme name={currentTheme}>
                            <GestureHandlerRootView>
                                <StatusBar translucent backgroundColor="transparent" />
                                <Stack screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </GestureHandlerRootView>
                        </Theme>
                    </PortalProvider>
                </TamaguiProvider>
            </ReduxProvider>
        </QueryClientProvider>
    );
}
