import OfficialFeed from '../home/OfficialFeed';
import ContentTab from '@/components/ui/layout/ContentTab';
import ScreenView from '@/components/ui/layout/ScreenView';
import { View } from 'tamagui';

export default function Home() {
    return (
        // <ScreenView scrollView={false}>
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <ContentTab
                contentSpacing={0}
                tabs={[
                    {
                        name: "Official",
                        component: <OfficialFeed />
                    },
                    {
                        name: "Community",
                        component: <OfficialFeed />,
                    }
                ]}
            />
        </View>
        // </ScreenView>
    )
}