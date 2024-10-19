import Avatar from "../../ui/generalUI/Avatar";
import { StyleSheet } from "react-native";
import { View } from "tamagui";
import Text from "../../ui/generalUI/Text";
import { useTheme } from "tamagui";

interface ProfileCardProps {
    avatarSize?: number,
    nameSize?: number,
    avatarBackgroundColor?: string,
    avatarURL?: string,
    username: string,
}

export default function ProfileCard(props: ProfileCardProps) {
    const { avatarSize, nameSize, avatarBackgroundColor, avatarURL, username } = props;
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <Avatar avatarURL={avatarURL} avatarBackgroundColor={avatarBackgroundColor} size={avatarSize} />
            <Text size={nameSize} shadow={false} color={"gray"}>{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
    }
})