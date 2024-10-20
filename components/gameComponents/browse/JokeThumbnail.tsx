import { View } from "tamagui";
import GradientBackground from "../../ui/layout/GradientBackground";
import Text from "../../ui/generalUI/Text";
import ContentBox from "../../ui/generalUI/ContentBox";
import { Dimensions } from "react-native";
import Shadow from "../../ui/misc/Shadow";
import ProfileCard from "../feed/ProfileCard";
import { useTheme } from "tamagui";

interface JokeThumbnailProps {
    title: string,
    text: string,
    username: string,
    avatarUrl: string | null;
    gradientStart: string,
    gradientEnd: string,
    // Whether the user has read the joke or not
    hasRead: boolean,
    likes: number,
    comments: number,
}

const screenWidth = Dimensions.get("screen").width;

export default function JokeThumbnail(props: JokeThumbnailProps) {
    const { title, text, username, avatarUrl, gradientStart, gradientEnd, hasRead, likes, comments } = props;

    const theme = useTheme();
    return (
        <View style={{
            marginHorizontal: 15,
            marginVertical: 15,
        }}>
            <Shadow shadowHeight={6} borderRadius={20} height={200} width={screenWidth / 2 - 30} />
            <View style={{
                width: screenWidth / 2 - 30,
                minHeight: 200,
                maxHeight: 200,

                // padding: 10,
                borderRadius: 20,
                overflow: "hidden",
                borderWidth: 2.5,
                borderColor: theme.background.val,
            }}>
                <GradientBackground start={gradientStart} end={gradientEnd} />
                <View style={{
                    // position: "absolute",
                    bottom: 0,
                    padding: 10,
                    // left: 10,
                    width: "100%",
                    backgroundColor: theme.background.val,
                }}>
                    <ProfileCard username={username} avatarURL={avatarUrl ? avatarUrl : undefined} avatarBackgroundColor={gradientStart} nameSize={14} avatarSize={30} />
                </View>
                <View style={{
                    padding: 10,
                    borderRadius: 20,
                    gap: 6,
                }}>
                    <View style={{
                        borderRadius: 20,
                        height: 22,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1,
                        backgroundColor: theme.background.val,
                    }}>
                        <Text shadow={false} color={gradientEnd} style={{ textAlign: "center" }} size={15}>{title}</Text>
                    </View>
                    <Text shadow={theme.enableShadow.val === 1} color={theme.background.val} size={13} numberOfLines={4}>{text}</Text>
                </View>
            </View>
        </View>
    )
}