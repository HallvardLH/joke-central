import { View } from "tamagui";
import OfficialJokesFeed from "@/components/gameComponents/feed/OfficialJokesFeed";

export default function OfficialFeed() {
    return (
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <OfficialJokesFeed />
        </View>
    )
}