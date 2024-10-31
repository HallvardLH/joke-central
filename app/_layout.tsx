import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useRef } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { Appearance, StatusBar, Platform } from 'react-native';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuth from '@/hooks/useAuth';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/state/reduxStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortalProvider } from 'tamagui';
import useAds from '@/hooks/useAds';
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
    const { BannerAdID } = useAds();

    const [loaded] = useFonts({
        Digitalt: require('../assets/fonts/Digitalt.otf'),
    });

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");
    const { session, getSession } = useAuth();
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const router = useRouter();
    const [isAppReady, setIsAppReady] = useState(false);

    const bannerRef = useRef<BannerAd>(null);

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
            setCurrentTheme(colorScheme || "light");
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

    const { initializeAds } = useAds();
    let mobileAdsInitialized = false;
    useEffect(() => {
        if (!mobileAdsInitialized) {
            initializeAds();
            mobileAdsInitialized = true;
        }
    }, []);

    // Load a new ad on foreground (iOS workaround for suspended state issue)
    useForeground(() => {
        if (Platform.OS === 'ios') {
            bannerRef.current?.load();
        }
    });

    if (!loaded || isCheckingSession) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <TamaguiProvider config={config}>
                        <PortalProvider>
                            <Theme name={currentTheme}>
                                <GestureHandlerRootView>
                                    <StatusBar translucent backgroundColor="transparent" />
                                    <Stack screenOptions={{ headerShown: false }}>
                                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                        <Stack.Screen name="+not-found" />
                                    </Stack>
                                    <BannerAd
                                        ref={bannerRef}
                                        unitId={BannerAdID}
                                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                                    />
                                </GestureHandlerRootView>
                            </Theme>
                        </PortalProvider>
                    </TamaguiProvider>
                </PersistGate>
            </ReduxProvider>
        </QueryClientProvider>
    );
}
