import useAuth from '@/hooks/useAuth';
import AvatarSelector from '@/components/gameComponents/SelectAvatar/AvatarSelector';
import { useState } from 'react';
import { router } from "expo-router";
import { View } from 'tamagui';
import { Dimensions, Platform } from 'react-native';
import { useTheme } from 'tamagui';
import Text from '@/components/ui/generalUI/Text';
import { SafeAreaView } from 'react-native';

export default function selectAvatar() {
    const { changeAvatar } = useAuth();

    const [avatarUrl, setAvatarUrl] = useState('https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/default.png')

    const handleSave = async () => {
        await changeAvatar(avatarUrl);
        router.navigate("/(tabs)")
    };

    const theme = useTheme();
    return (

        <SafeAreaView style={{ height: Dimensions.get("window").height, flex: 1, paddingTop: Platform.OS === "android" ? 80 : 0, backgroundColor: theme.accentPurpleDark.val }}>
            <AvatarSelector hideBack setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} onBack={() => router.replace("/auth/signup")} onSave={handleSave} />
        </SafeAreaView>
    );
}
