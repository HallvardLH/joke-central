import Avatar from "../../ui/generalUI/Avatar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "tamagui";
import { Heart, MessageSquareText, Eye } from "@tamagui/lucide-icons";
import Text from "../../ui/generalUI/Text";
import { useTheme } from "tamagui";
import { useLikes } from "@/hooks/useLikes";
import { Joke } from "../browse/Joke";
import { formatNumber } from "@/scripts/utils";

interface JokeControlsProps {
    joke: Joke,
    iconColor: string,
}

export default function JokeControls(props: JokeControlsProps) {
    const { joke, iconColor } = props;
    const { likes, liked, toggleLike } = useLikes(joke.id);
    console.log(liked, joke.id)
    return (
        <View style={{
            flexDirection: "row",
            gap: 10,
        }}>
            <TouchableOpacity onPress={toggleLike} style={{
                alignItems: "center",
            }}>
                <Heart
                    color={iconColor}
                    fill={liked ? iconColor : "transparent"}
                />
                <Text color="gray" size={12}>{`${formatNumber(likes)} ${likes === 1 ? "like" : "likes"}`}</Text>
            </TouchableOpacity>

            <View style={{
                alignItems: "center",
            }}>
                <Eye
                    color={iconColor}
                />
                <Text color="gray" size={12}>999k views</Text>
            </View>
        </View>
    )
}