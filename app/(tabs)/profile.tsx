import ScreenView from '@/components/ui/layout/ScreenView';
import ProfileTop from '@/components/gameComponents/profile/ProfileTop';
import JokeBrowse from '@/components/gameComponents/browse/JokeBrowse';
import { ScrollView, Platform } from 'react-native';
import { useProfile } from '@/hooks/useProfile';
import Text from '@/components/ui/generalUI/Text';
import { View } from 'tamagui';
import GradientBackground from '@/components/ui/layout/GradientBackground';
import { supabase } from "@/supabase";
import { BROWSE_PAGE_SIZE } from "@/constants/General";
import { useStats } from '@/hooks/useStats';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

export default function Profile() {

    const { session } = useAuth();
    const userId = session?.user?.id;

    const { profile, loading, error, refetchProfile } = useProfile(userId ? userId : null);
    const { likes, reads, jokes, refetch: refetchStats } = useStats(userId!);

    useFocusEffect(
        useCallback(() => {
            refetchProfile();
            refetchStats();
        }, [userId])
    );

    if (loading) {
        return <ScreenView><ScrollView><Text>Loading...</Text></ScrollView></ScreenView>;
    }

    if (error) {
        return <ScreenView><ScrollView><Text>{error}</Text></ScrollView></ScreenView>;
    }

    const handleEditAvatar = () => {
        router.push("/auth/selectAvatar");
    };

    return (
        <View style={{ flex: 1, backgroundColor: "transparent", paddingTop: Platform.OS === "android" ? 25 : 40, }}>
            <GradientBackground />
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <ProfileTop
                    username={profile.username || 'Guest'}
                    avatarUrl={profile.avatar_url || process.env.EXPO_PUBLIC_DEFAULT_AVATAR_URL!}
                    reads={reads}
                    likes={likes}
                    jokesAmount={jokes}
                    showEdit
                    onAvatarPress={handleEditAvatar}
                    showDrawer
                />
                <JokeBrowse
                    queryKey={userId + "_profile_jokes"}
                    queryFn={async (page: number) => {
                        return await supabase.from('jokes')
                            .select(`
                            id, title, text, author, created_at, 
                            profiles (username, avatar_url, id)
                        `)
                            .eq('author', userId)
                            .range(page * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE + BROWSE_PAGE_SIZE - 1)
                            .order('created_at', { ascending: false });
                    }}
                    refreshOffset={10}
                />
            </ScrollView>
        </View>
    );
}
