import { View } from "tamagui";
import JokeBrowse from "@/components/gameComponents/browse/JokeBrowse";
import GradientBackground from "@/components/ui/layout/GradientBackground";
import { supabase } from "@/supabase";
import { PAGE_SIZE } from "@/constants/General";

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
                        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
                        .order('created_at', { ascending: false });
                }}

            />
        </View>
    )
}