import { View } from "tamagui";
import GradientBackground from "@/components/ui/layout/GradientBackground";
import { useSelector } from 'react-redux';
import { RootState } from '@/state/reduxStore';
import TabBar from '@/components/ui/TabBar/TabBar';

export default function ReadJoke() {
    const { joke } = useSelector((state: RootState) => state.viewingJoke);
    return (
        <View style={{ flex: 1, }}>
            <GradientBackground />
            <TabBar />
        </View>
    )
}