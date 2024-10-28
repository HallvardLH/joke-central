import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "tamagui";
import { Heart, Eye } from "@tamagui/lucide-icons";
import Text from "../../ui/generalUI/Text";
import { useTheme } from "tamagui";
import { useSocial } from "@/hooks/useSocial";
import { Joke } from "../browse/Joke";
import { formatNumber } from "@/scripts/utils";
import { StyleProp, ViewStyle } from "react-native";
interface JokeControlsProps {
    joke: Joke,
    iconColor: string,
    iconSize: number,
    containerStyle: StyleProp<ViewStyle>,
}

export default function JokeControls(props: JokeControlsProps) {
    const { joke, iconColor, iconSize = 24, containerStyle } = props;
    const { likes, liked, toggleLike, reads } = useSocial(joke.id);

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity onPress={toggleLike} style={styles.iconContainer}>
                <Heart
                    color={iconColor}
                    fill={liked ? iconColor : "transparent"}
                    size={iconSize}
                />
                <Text shadow={false} color="gray" size={12}>{`${formatNumber(likes)} ${likes === 1 ? "Like" : "Likes"}`}</Text>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <Eye size={iconSize} color={iconColor} />
                <Text shadow={false} color="gray" size={12}>{`${formatNumber(reads)} ${reads === 1 ? "Read" : "Reads"}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
    },
    iconContainer: {
        alignItems: "center",
    },
});