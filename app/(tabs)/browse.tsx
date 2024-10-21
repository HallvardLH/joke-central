import ContentTab from "@/components/ui/layout/ContentTab";
import OfficialBrowse from "../browse/OfficialBrowse";
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
                        component: <OfficialBrowse />,
                    }
                ]}
            />
        </View>
    )
}