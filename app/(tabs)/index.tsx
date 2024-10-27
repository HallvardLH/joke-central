import OfficialFeed from '@/components/gameComponents/home/OfficialFeed';
import CommunityFeed from '@/components/gameComponents/home/CommunityFeed';
import ContentTab from '@/components/ui/layout/ContentTab';
import { View } from 'tamagui';
import GradientBackground from '@/components/ui/layout/GradientBackground';

export default function Home() {
    return (
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <GradientBackground />
            <ContentTab
                contentSpacing={0}
                tabs={[
                    {
                        name: "Official",
                        component: <OfficialFeed />
                    },
                    {
                        name: "Community",
                        component: <CommunityFeed />,
                    }
                ]}
            />
        </View>
    )
}