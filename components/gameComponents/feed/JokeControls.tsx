import Avatar from "../../ui/generalUI/Avatar";
import { StyleSheet } from "react-native";
import { View } from "tamagui";
import { Heart, MessageSquareText } from "@tamagui/lucide-icons";
import Text from "../../ui/generalUI/Text";
import { useTheme } from "tamagui";

export default function JokeControls() {
    const theme = useTheme();
    return (
        <View style={[{ backgroundColor: theme.accentPurpleMedium.val, }, styles.container]}>
            <Avatar size={40} />
            <View style={styles.statContainer}>
                <Heart fill={"white"} size={40} color={theme.accentYellowDark.val} />
                <Text color={theme.accentPurpleDark.val} style={styles.statText} shadowColor="black">23</Text>
            </View>
            <View style={styles.statContainer}>
                <MessageSquareText fill={"white"} size={40} color={"#FF4672"} />
                <Text style={styles.statText} shadowColor="black">23</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 101,
        right: 16,
        gap: 30,
        alignItems: "center",
        padding: 5,
        backgroundColor: "transparent",

        // alignSelf: "center",
        // justifyContent: "space-between",
        // borderRadius: 20,
        // borderWidth: 2,
        // borderColor: "white",
        // overflow: "hidden",
    },



    statContainer: {
        alignItems: "center",
    },

    statText: {
        // backgroundColor: "blue",
        // paddingHorizontal: 6,
        // paddingVertical: 2,
        // borderRadius: 5
    }
})