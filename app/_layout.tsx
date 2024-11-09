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
import { BannerAd, BannerAdSize, useForeground, AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
    const { BannerAdID, initializeAds } = useAds();

    const [loaded] = useFonts({
        Digitalt: require('../assets/fonts/Digitalt.otf'),
    });

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");
    const { session, getSession } = useAuth();
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [isAppReady, setIsAppReady] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [forceRender, setForceRender] = useState(false);
    const router = useRouter();
    const bannerRef = useRef<BannerAd>(null);
    const adsInitialized = useRef(false);

    const requestTracking = async () => {
        try {
            const { status } = await requestTrackingPermissionsAsync();
            if (status === 'granted') {
                console.log('User permission to track data granted');
            } else {
                console.log('User did not grant tracking permission');
            }
        } catch (error) {
            console.error('Error requesting tracking permission:', error);
        }
    };

    useEffect(() => {
        requestTracking();
    }, []);

    const requestConsent = async () => {
        try {
            const consentInfo = await AdsConsent.requestInfoUpdate();
            if (consentInfo.status === AdsConsentStatus.REQUIRED) {
                await AdsConsent.showForm();
            }
            setHasConsent(consentInfo.status === AdsConsentStatus.OBTAINED);
            setForceRender(prev => !prev);
        } catch (error) {
            console.warn('Failed to update ads consent info:', error);
            setForceRender(prev => !prev);
        }
    };

    useEffect(() => {
        requestConsent();
    }, []);

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
        if (loaded && !isCheckingSession && isAppReady && hasConsent) {
            SplashScreen.hideAsync();
        }
    }, [loaded, isCheckingSession, isAppReady, hasConsent]);

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

    useEffect(() => {
        if (!adsInitialized.current && hasConsent) {
            initializeAds();
            adsInitialized.current = true;
        }
    }, [hasConsent, initializeAds]);

    useForeground(() => {
        if (Platform.OS === 'ios' && hasConsent) {
            bannerRef.current?.load();
        }
    });

    console.log('loaded:', loaded, 'isCheckingSession:', isCheckingSession, 'hasConsent:', hasConsent);

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
