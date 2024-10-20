import ScreenView from "@/components/ui/layout/ScreenView";
import ContentTab from "@/components/ui/layout/ContentTab";
import OfficialBrowse from "../browse/OfficialBrowse";
import { View } from "tamagui";

export default function Browse() {
    return (
        // <ScreenView scrollView={false}>
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
            {/* </ScreenView> */}
        </View>
    )
}