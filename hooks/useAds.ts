import { Platform } from 'react-native';
import mobileAds, { TestIds } from 'react-native-google-mobile-ads';

export default function useAds() {
    const BannerAdID =
        process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == 'true'
            ? TestIds.BANNER
            : Platform.OS === 'android'
                ? 'ca-app-pub-1354741235649835/8443760287'
                : 'ca-app-pub-1354741235649835/9248757255';

    const InterstitialAdID =
        process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == 'true'
            ? TestIds.INTERSTITIAL
            : Platform.OS === 'android'
                ? 'ca-app-pub-1354741235649835/1561838922'
                : 'ca-app-pub-1354741235649835/8252188596';

    const initializeAds = async () => {
        await mobileAds()
            .initialize()
            .then(adapterStatuses => { });
    };

    return { initializeAds, BannerAdID, InterstitialAdID };
}
