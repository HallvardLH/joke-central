import { View } from "tamagui";
import JokeFeed from "@/components/gameComponents/feed/JokeFeed";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/supabase";
import { BROWSE_PAGE_SIZE } from "@/constants/General";
import useAuth from "@/hooks/useAuth";
import Text from "@/components/ui/generalUI/Text";

export default function CommunityFeed() {
    const { session, isLoading: authLoading } = useAuth();
    const userId = session?.user?.id;

    if (authLoading || !userId) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <JokeFeed
                queryKey={"community_feed"}
                queryFn={async (page: number) => {
                    // Fetch read jokes for the user
                    const { data: readJokes, error: readJokesError } = await supabase
                        .from('joke_read_status')
                        .select('joke_id')
                        .eq('user_id', userId);

                    if (readJokesError) {
                        console.error('Error fetching read jokes:', readJokesError);
                        return { data: [] };
                    }

                    const readJokeIds = readJokes.map(joke => joke.joke_id);

                    // Now, fetch jokes that are not in the list of read jokes
                    let query = supabase
                        .from('jokes')
                        .select(`
                            id, title, text, author, created_at,
                            profiles (username, avatar_url, id)
                        `)
                        .range(page * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE + BROWSE_PAGE_SIZE - 1)
                        .order('created_at', { ascending: false })
                        .neq("author", process.env.EXPO_PUBLIC_JOKE_CENTRAL_ACCOUNT_UUID);

                    // Apply the .not() filter only if readJokeIds is not empty
                    if (readJokeIds.length > 0) {
                        query = query.not('id', 'in', '(' + readJokeIds + ')');
                    }

                    const { data, error } = await query;

                    if (error) {
                        console.error('Error fetching jokes:', error);
                        return { data: [] };
                    }

                    // If there are no unread jokes, fetch jokes regardless of read status
                    if (data.length === 0) {
                        const backupQuery = supabase
                            .from('jokes')
                            .select(`
                                id, title, text, author, created_at,
                                profiles (username, avatar_url, id)
                            `)
                            .range(page * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE + BROWSE_PAGE_SIZE - 1)
                            .order('created_at', { ascending: false })
                            .neq("author", process.env.EXPO_PUBLIC_JOKE_CENTRAL_ACCOUNT_UUID);

                        const { data: backupData, error: backupError } = await backupQuery;

                        if (backupError) {
                            console.error('Error fetching all jokes:', backupError);
                            return { data: [] };
                        }
                        return { data: backupData };
                    }

                    return { data };
                }}

            />
        </View>
    );
}
