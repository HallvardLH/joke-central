import useAuth from '@/hooks/useAuth';
import AvatarSelector from '@/components/gameComponents/SelectAvatar/AvatarSelector';
import { useEffect, useState } from 'react';
import { router } from "expo-router";
import { View, Dimensions, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from 'tamagui';
import Text from '@/components/ui/generalUI/Text';
import { useProfile } from '@/hooks/useProfile';
import ScreenView from '@/components/ui/layout/ScreenView';

export default function SelectAvatar() {
    const { changeAvatar, session } = useAuth();
    const userId = session?.user?.id;

    const { profile, loading, error } = useProfile(userId || null);
    const [avatarUrl, setAvatarUrl] = useState(process.env.EXPO_PUBLIC_DEFAULT_AVATAR_URL!);

    const theme = useTheme();

    useEffect(() => {
        if (profile?.avatar_url) {
            setAvatarUrl(profile.avatar_url);
        }
    }, [profile?.avatar_url]);

    if (loading) {
        return (
            <ScreenView>
                <Text>Loading...</Text>
            </ScreenView>
        );
    }

    if (error) {
        return (
            <ScreenView>
                <Text>{error}</Text>
            </ScreenView>
        );
    }

    const handleSave = async () => {
        await changeAvatar(avatarUrl);
        router.navigate("/(tabs)");
        // router.dismiss();
    };

    return (
        <SafeAreaView
            style={{
                height: Dimensions.get("window").height,
                flex: 1,
                paddingTop: Platform.OS === "android" ? 80 : 0,
                backgroundColor: theme.accentPurpleDark.val,
            }}
        >
            <ScrollView>
                <AvatarSelector
                    hideBack
                    setAvatarUrl={setAvatarUrl}
                    avatarUrl={avatarUrl}
                    onBack={() => router.replace("/auth/signup")}
                    onSave={handleSave}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
