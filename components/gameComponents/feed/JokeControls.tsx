import Avatar from "../../ui/generalUI/Avatar";
import { StyleSheet } from "react-native";
import { View } from "tamagui";
import { Heart, MessageSquareText, Eye } from "@tamagui/lucide-icons";
import Text from "../../ui/generalUI/Text";
import { useTheme } from "tamagui";

interface JokeControlsProps {
    iconColor: string,
}

export default function JokeControls(props: JokeControlsProps) {
    const { iconColor } = props;
    return (
        <View style={{
            flexDirection: "row",
            gap: 10,
        }}>
            <View style={{
                alignItems: "center",
            }}>
                <Heart
                    color={iconColor}
                    fill={iconColor}
                />
                <Text size={12}>999k likes</Text>
            </View>

            <View style={{
                alignItems: "center",
            }}>
                <Eye
                    color={iconColor}
                />
                <Text size={12}>999k views</Text>
            </View>
        </View>
    )
}