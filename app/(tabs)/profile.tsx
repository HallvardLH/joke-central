import { StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import ScreenView from '@/components/ui/layout/ScreenView';
import ProfileTop from '@/components/gameComponents/profile/ProfileTop';
import JokeBrowse from '@/components/gameComponents/browse/JokeBrowse';
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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/reduxStore';
import { updateProfileTab } from '@/state/profileTabSlice';
import { GalleryVertical, Heart } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';

export default function Profile() {
    const { tab } = useSelector((state: RootState) => state.profileTab);
    const theme = useTheme();
    const { session } = useAuth();
    const userId = session?.user?.id;
    const { profile, loading, error, refetchProfile } = useProfile(userId ? userId : null);
    const { likes, reads, jokes, refetch: refetchStats } = useStats(userId!);
    const dispatch = useDispatch();

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

    const switchTab = (tab: "Your jokes" | "Your likes") => {
        dispatch(updateProfileTab(tab));
    }

    return (
        <View style={styles.container}>
            <GradientBackground />
            <ScrollView style={styles.scrollView}>
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
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            { borderBottomColor: tab === "Your jokes" ? theme.background.val : "transparent" }
                        ]}
                        onPress={() => switchTab("Your jokes")}
                    >
                        <Text shadow={false} color={theme.background.val} size={14}>Your jokes</Text>
                        <GalleryVertical size={18} color={theme.background.val} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            { borderBottomColor: tab === "Your likes" ? theme.background.val : "transparent" }
                        ]}
                        onPress={() => switchTab("Your likes")}
                    >
                        <Text shadow={false} color={theme.background.val} size={14}>Liked jokes</Text>
                        <Heart size={18} color={theme.background.val} />
                    </TouchableOpacity>
                </View>
                {tab === "Your jokes" ? (
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
                ) : (
                    <JokeBrowse
                        queryKey={userId + "_profile_likes"}
                        queryFn={async (page: number) => {
                            const likedJokesResponse = await supabase.from('likes')
                                .select("joke_id")
                                .eq('user_id', userId)
                                .order('liked_at', { ascending: false });

                            if (likedJokesResponse.error) {
                                console.error('Error fetching liked jokes:', likedJokesResponse.error);
                                return [];
                            }

                            const likedJokesIds = likedJokesResponse.data.map((joke) => joke.joke_id);

                            return await supabase.from('jokes')
                                .select(`
                                    id, title, text, author, created_at, 
                                    profiles (username, avatar_url, id)
                                `)
                                .in('id', likedJokesIds)
                                .range(page * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE + BROWSE_PAGE_SIZE - 1)
                                .order('created_at', { ascending: false });
                        }}
                        refreshOffset={10}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? 25 : 40,
    },
    scrollView: {
        width: "100%",
        flex: 1,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 60,
        paddingBottom: 10,
        backgroundColor: "rgba(0,0,0, 0.2)",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    tabButton: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        paddingBottom: 1,
        paddingHorizontal: 4,
        borderBottomWidth: 1.5,
    },
});
