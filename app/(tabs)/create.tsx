import CreateCard from "@/components/gameComponents/create/CreateCard";
import { View } from "tamagui";
import { useTheme } from "tamagui";
import GradientBackground from "@/components/ui/layout/GradientBackground";

export default function Create() {
    const theme = useTheme();
    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <GradientBackground />
            <CreateCard />
        </View>
    )
}