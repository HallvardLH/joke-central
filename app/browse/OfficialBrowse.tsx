import { View } from "tamagui";
import JokeBrowse from "@/components/gameComponents/browse/JokeBrowse";
import GradientBackground from "@/components/ui/layout/GradientBackground";

export default function OfficialBrowse() {
    return (
        <View style={{ flex: 1, }}>
            <GradientBackground />
            <JokeBrowse paddingTop />
        </View>
    )
}