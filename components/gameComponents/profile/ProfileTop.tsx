import { useTheme, View } from "tamagui";
import Avatar from "@/components/ui/generalUI/Avatar";
import Text from "@/components/ui/generalUI/Text";
import StatBox from "./StatBox";
import { StyleSheet } from "react-native";
import { formatNumber as format } from "@/scripts/utils";
import GradientBackground from "@/components/ui/layout/GradientBackground";

interface ProfileTopProps {
    username: string,
    avatarUrl: string,
    jokesAmount: string | number,
    likes: string | number,
    reads: string | number,
}

export default function ProfileTop(props: ProfileTopProps) {
    const { username, avatarUrl, jokesAmount, likes, reads } = props;

    const theme = useTheme();
    return (
        <View style={styles.container}>
            {/* <GradientBackground start={theme.accentBlueDark.val} end={theme.accentBlueDark.val} /> */}
            <Avatar avatarURL={avatarUrl} avatarBackgroundColor={theme.accentBlueLight.val} editable size={100} />
            <Text size={22}>{username}</Text>
            <View style={styles.statsContainer}>
                <StatBox label="Jokes" amount={format(jokesAmount)} />
                <StatBox label="Reads" amount={format(reads)} />
                <StatBox label="Likes" amount={format(likes)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 6,
        // backgroundColor: "white",
        // flex: 1,
        padding: 30,
        width: "100%",
    },

    statsContainer: {
        flexDirection: "row",
        gap: 40,
    }
})