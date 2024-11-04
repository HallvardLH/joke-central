import { View, Spinner } from "tamagui";
import GradientBackground from "../layout/GradientBackground";

export default function FullScreenLoader() {
    return (
        <View
            flex={1}
            alignItems='center'
            justifyContent='center'
            backgroundColor={'$background'}
        >
            <GradientBackground />
            <Spinner />
        </View>
    )
}