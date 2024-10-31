import SignIn from '@/components/gameComponents/auth/SignIn';
import { View } from 'tamagui';
import { SafeAreaView } from 'react-native';
import GradientBackground from '@/components/ui/layout/GradientBackground';
import { Platform } from 'react-native';

export default function Signup() {
    return (

        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? 120 : 0, }}>
            <GradientBackground />
            <SignIn />
        </SafeAreaView>
    );
}
