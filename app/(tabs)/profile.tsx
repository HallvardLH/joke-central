import React, { useCallback, useState } from 'react';
import ScreenView from '@/components/ui/layout/ScreenView';
import ProfileTop from '@/components/gameComponents/profile/ProfileTop';
import JokeBrowse from '@/components/gameComponents/browse/JokeBrowse';
import { ScrollView, Platform } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import Text from '@/components/ui/generalUI/Text';
import { View } from 'tamagui';
import GradientBackground from '@/components/ui/layout/GradientBackground';
import { supabase } from "@/supabase";
import { BROWSE_PAGE_SIZE } from "@/constants/General";
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useStats } from '@/hooks/useStats';

export default function Profile() {
    const { session } = useAuth();
    const userId = session?.user?.id;

    const { likes, reads, jokes } = useStats(userId!);

    const { profile, loading, error, refetchProfile } = useProfile(userId!);
    const [avatarUrl, setAvatarUrl] = useState(process.env.EXPO_PUBLIC_DEFAULT_AVATAR_URL!);

    // Counter to trigger refetch
    const [reloadCount, setReloadCount] = useState(0);

    // Use useFocusEffect to trigger reload when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            refetchProfile();
            // Increment the reload counter when the screen comes into focus
            setReloadCount((prev) => prev + 1);
            setAvatarUrl(profile.avatar_url || process.env.EXPO_PUBLIC_DEFAULT_AVATAR_URL!);
        }, [profile.avatar_url])
    );

    if (loading) {
        return (
            <ScreenView>
                <ScrollView>
                    <Text>Loading...</Text>
                </ScrollView>
            </ScreenView>
        );
    }

    if (error) {
        return (
            <ScreenView>
                <ScrollView>
                    <Text>{error}</Text>
                </ScrollView>
            </ScreenView>
        );
    }

    const handleEditAvatar = () => {
        router.push("/auth/selectAvatar");
    };

    return (
        <View style={{ flex: 1, backgroundColor: "transparent", paddingTop: Platform.OS === "android" ? 25 : 40 }}>
            <GradientBackground />
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <ProfileTop
                    username={profile.username || 'Guest'}
                    avatarUrl={avatarUrl}
                    reads={reads}
                    likes={likes}
                    jokesAmount={jokes}
                    showEdit
                    onAvatarPress={handleEditAvatar}
                    showDrawer
                />
                <JokeBrowse
                    key={reloadCount} // Use reloadCount as the key to force re-render
                    queryKey={`${userId}_profile_jokes`}
                    queryFn={async (page: number) => {
                        const { data, error } = await supabase
                            .from('jokes')
                            .select(`
                                id, title, text, author, created_at,
                                profiles (username, avatar_url, id)
                            `)
                            .eq('author', userId)
                            .range(page * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE + BROWSE_PAGE_SIZE - 1)
                            .order('created_at', { ascending: false });

                        if (error) {
                            throw new Error(error.message);
                        }
                        return data;
                    }}
                    refreshOffset={10}
                />
            </ScrollView>
        </View>
    );
}
