import Official from '../home/Official';
import ContentTab from '@/components/layout/ContentTab';
import ScreenView from '@/components/layout/ScreenView';
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
                        component: <Official />
                    },
                    {
                        name: "Community",
                        component: <Official />,
                    }
                ]}
            />
        </View>
        // </ScreenView>
    )
}