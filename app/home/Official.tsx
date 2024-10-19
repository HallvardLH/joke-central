import { View } from "tamagui";
import SnapScroll from "@/components/feed/SnapScroll";

export default function Official() {
    return (
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <SnapScroll />
        </View>
    )
}