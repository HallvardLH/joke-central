import ScreenView from '@/components/ui/layout/ScreenView';
import SignUp from '@/components/gameComponents/auth/SignUp';
import { View } from 'tamagui';
import { SafeAreaView, Platform } from 'react-native';
import GradientBackground from '@/components/ui/layout/GradientBackground';

export default function Signup() {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? 120 : 0 }}>
            {/* Android needs an extra push to not cover the top bar, ios is happy with a SafeAreaView */}
            <GradientBackground />
            <SignUp />
        </SafeAreaView>
    );
}
