import ContentTab from "@/components/ui/layout/ContentTab";
import OfficialBrowse from "@/components/gameComponents/browse/OfficialBrowse";
import CommunityBrowse from "@/components/gameComponents/browse/CommunityBrowse";
import { View } from "tamagui";

export default function Browse() {
    return (
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <ContentTab
                contentSpacing={0}
                tabs={[
                    {
                        name: "Official",
                        component: <OfficialBrowse />
                    },
                    {
                        name: "Community",
                        component: <CommunityBrowse />,
                    }
                ]}
            />
        </View>
    )
}