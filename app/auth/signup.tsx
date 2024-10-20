import ScreenView from '@/components/ui/layout/ScreenView';
import SignUp from '@/components/gameComponents/auth/SignUp';
import { View } from 'tamagui';
import { SafeAreaView } from 'react-native';
import GradientBackground from '@/components/ui/layout/GradientBackground';

export default function Signup() {
    return (

        <SafeAreaView style={{ flex: 1, paddingTop: 50, }}>
            <GradientBackground />
            <SignUp />
        </SafeAreaView>
    );
}
