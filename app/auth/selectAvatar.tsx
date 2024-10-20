import useAuth from '@/hooks/useAuth';
import AvatarSelector from '@/components/gameComponents/SelectAvatar/AvatarSelector';
import { useState } from 'react';
import { router } from "expo-router";
import { View } from 'tamagui';
import { Dimensions } from 'react-native';
import { useTheme } from 'tamagui';
import Text from '@/components/ui/generalUI/Text';

export default function selectAvatar() {
    const { changeAvatar } = useAuth();

    const [avatarUrl, setAvatarUrl] = useState('https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/default.png')

    const handleSave = async () => {
        await changeAvatar(avatarUrl);
        router.replace("/(tabs)")
    };

    const theme = useTheme();
    return (

        <View style={{ height: Dimensions.get("window").height, flex: 1, paddingTop: 50, backgroundColor: theme.accentPurpleDark.val }}>
            <AvatarSelector hideBack setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} onBack={() => router.replace("/auth/signup")} onSave={handleSave} />
        </View>
    );
}
