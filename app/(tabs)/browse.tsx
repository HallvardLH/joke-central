import ScreenView from "@/components/ui/layout/ScreenView";
import ContentTab from "@/components/ui/layout/ContentTab";
import OfficialBrowse from "../browse/OfficialBrowse";

export default function Browse() {
    return (
        <ScreenView scrollView={false}>
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
        </ScreenView>
    )
}