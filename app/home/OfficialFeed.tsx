import { View } from "tamagui";
import JokeFeed from "@/components/gameComponents/feed/JokeFeed";
import { SafeAreaView } from "react-native";
import { supabase } from "@/supabase";
import { PAGE_SIZE } from "@/constants/General";

export default function OfficialFeed() {
    return (
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <JokeFeed
                queryKey={"official_feed"}
                queryFn={async (page: number) => {
                    return await supabase.from('jokes')
                        .select(`
                            id, title, text, author, created_at, 
                            profiles (username, avatar_url, id)
                        `)
                        // .eq('author', userId)
                        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
                        .order('created_at', { ascending: false });
                }}
            />
        </View>
    )
}