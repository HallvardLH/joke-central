import { View, useTheme } from "tamagui";
import { useSelector } from 'react-redux';
import { RootState } from '@/state/reduxStore';
import TabBar from '@/components/ui/TabBar/TabBar';
import JokeFeedItem from "@/components/gameComponents/feed/JokeFeedItem";

export default function ReadJoke() {
    const { joke, gradientStart, gradientEnd } = useSelector((state: RootState) => state.viewingJoke);

    const theme = useTheme();
    return (
        <View style={{ flex: 1, }}>
            <JokeFeedItem
                joke={joke!}
                gradientStart={gradientStart}
                gradientEnd={gradientEnd}
                headerColor={gradientEnd}
            />
            <TabBar />
        </View>
    )
}