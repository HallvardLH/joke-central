import { Platform } from 'react-native';
import mobileAds, { TestIds } from 'react-native-google-mobile-ads';

export default function useAds() {
    const BannerAdID =
        process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == 'true'
            ? TestIds.BANNER
            : Platform.OS === 'android'
                ? 'ca-app-pub-1354741235649835/2405286655'
                : 'ca-app-pub-1354741235649835/2948212135';

    const InterstitialAdID =
        process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == 'true'
            ? TestIds.INTERSTITIAL
            : Platform.OS === 'android'
                ? 'ca-app-pub-1354741235649835/2054364065'
                : 'ca-app-pub-1354741235649835/5500425105';

    const initializeAds = async () => {
        await mobileAds()
            .initialize()
            .then(adapterStatuses => { });
    };

    return { initializeAds, BannerAdID, InterstitialAdID };
}
