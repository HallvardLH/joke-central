import Avatar from "../generalUI/Avatar";
import { StyleSheet } from "react-native";
import { View } from "tamagui";
import Text from "../generalUI/Text";
import { useTheme } from "tamagui";

export default function ProfileCard() {
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <Avatar />
            <Text shadow={false} color={"gray"}>Username</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
    }
})