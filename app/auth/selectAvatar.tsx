import ScreenView from '@/components/ui/layout/ScreenView';
import SignUp from '@/components/gameComponents/auth/SignUp';
import useAuth from '@/hooks/useAuth';
import AvatarSelector from '@/components/gameComponents/SelectAvatar/AvatarSelector';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import GradientBackground from '@/components/ui/layout/GradientBackground';
import { router } from "expo-router";

export default function selectAvatar() {
    const { signUp, } = useAuth();

    const [avatarUrl, setAvatarUrl] = useState('https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/default.png')

    const handleSignUp = async () => {
        router.replace("/(tabs)")
        // console.log(username)
        // await signUp(email, username, password, avatar);
    };
    return (

        <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
            <GradientBackground />
            <AvatarSelector setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} onBack={() => router.replace("/auth/signup")} onSave={handleSignUp} />
        </SafeAreaView>
    );
}
