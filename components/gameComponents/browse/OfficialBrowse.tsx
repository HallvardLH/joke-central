import { View } from "tamagui";
import JokeBrowse from "@/components/gameComponents/browse/JokeBrowse";
import GradientBackground from "@/components/ui/layout/GradientBackground";
import { supabase } from "@/supabase";
import { BROWSE_PAGE_SIZE } from "@/constants/General";

export default function OfficialBrowse() {
    return (
        <View style={{ flex: 1, }}>
            <GradientBackground />
            <JokeBrowse
                paddingTop
                queryKey={"official_browse"}
                queryFn={async (page: number) => {
                    return await supabase.from('jokes')
                        .select(`
                            id, title, text, author, created_at, 
                            profiles (username, avatar_url, id)
                        `)
                        .range(page * BROWSE_PAGE_SIZE, page * BROWSE_PAGE_SIZE + BROWSE_PAGE_SIZE - 1)
                        .order('created_at', { ascending: false })
                        .eq("author", process.env.EXPO_PUBLIC_JOKE_CENTRAL_ACCOUNT_UUID);
                }}

            />
        </View>
    )
}