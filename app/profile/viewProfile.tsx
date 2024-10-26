import ScreenView from '@/components/ui/layout/ScreenView';
import ProfileTop from '@/components/gameComponents/profile/ProfileTop';
import JokeBrowse from '@/components/gameComponents/browse/JokeBrowse';
import { ScrollView, Platform } from 'react-native';
import { useProfile } from '@/hooks/useProfile';
import Text from '@/components/ui/generalUI/Text';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/reduxStore';
import TabBar from '@/components/ui/TabBar/TabBar';
import { View } from 'tamagui';
import GradientBackground from '@/components/ui/layout/GradientBackground';
import { supabase } from "@/supabase";
import { PAGE_SIZE } from "@/constants/General";

export default function ViewProfile() {
    const { uid } = useSelector((state: RootState) => state.viewingProfile);

    const userId = uid;

    console.log(uid)

    const { profile, loading, error } = useProfile(userId ? userId : null)

    if (loading) {
        return <ScreenView><ScrollView><Text>Loading...</Text></ScrollView></ScreenView>;
    }

    if (error) {
        return <ScreenView><ScrollView><Text>{error}</Text></ScrollView></ScreenView>;
    }

    console.log(userId)

    return (
        <View style={{ flex: 1, backgroundColor: "transparent", paddingTop: Platform.OS === "android" ? 25 : 40, }}>
            <GradientBackground />
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <ProfileTop
                    username={profile.username || 'Guest'}
                    avatarUrl={profile.avatar_url || process.env.DEFAULT_AVATAR_URL!}
                    reads={2351}
                    likes={2223233}
                    jokesAmount={999}
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
                            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
                            .order('created_at', { ascending: false });
                    }}
                    refreshOffset={10}
                />
            </ScrollView>
            <TabBar />
        </View>
    );
}
