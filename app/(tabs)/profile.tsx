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
import { PAGE_SIZE } from "@/constants/General";
import { useFocusEffect } from '@react-navigation/native';

export default function Profile() {
    const { session } = useAuth();
    const userId = session?.user?.id;

    const { profile, loading, error } = useProfile(userId ? userId : null);

    // Counter to trigger refetch
    const [reloadCount, setReloadCount] = useState(0);

    // Use useFocusEffect to trigger reload when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            // Increment the reload counter when the screen comes into focus
            setReloadCount((prev) => prev + 1);
        }, [])
    );

    if (loading) {
        return <ScreenView><ScrollView><Text>Loading...</Text></ScrollView></ScreenView>;
    }

    if (error) {
        return <ScreenView><ScrollView><Text>{error}</Text></ScrollView></ScreenView>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "transparent", paddingTop: Platform.OS === "android" ? 25 : 40 }}>
            <GradientBackground />
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <ProfileTop
                    username={profile.username || 'Guest'}
                    // Fallback avatar if null
                    avatarUrl={profile.avatar_url || 'https://default-avatar-url.com/default.png'}
                    reads={2351}
                    likes={2223233}
                    jokesAmount={999}
                    showEdit
                />
                {/* Use reloadCount as the key to force JokeBrowse to re-render */}
                <JokeBrowse
                    key={reloadCount}
                    queryKey={userId + "_profile_jokes"}
                    queryFn={async (page: number) => {
                        return await supabase.from('jokes')
                            .select(`
                            id, title, text, author, created_at, 
                            profiles (username, avatar_url, id)
                        `)
                            .eq('author', userId)
                            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
                            .order('created_at', { ascending: false });
                    }}
                />
            </ScrollView>
        </View>
    );
}
