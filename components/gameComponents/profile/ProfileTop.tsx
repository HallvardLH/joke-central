import { useTheme, View } from "tamagui";
import Avatar from "@/components/ui/generalUI/Avatar";
import Text from "@/components/ui/generalUI/Text";
import StatBox from "./StatBox";
import { StyleSheet } from "react-native";
import { formatNumber as format } from "@/scripts/utils";
import ProfileDrawer from "./ProfileDrawer";
import { useRef } from "react";


interface ProfileTopProps {
    username: string;
    avatarUrl: string;
    jokesAmount: string | number;
    likes: string | number;
    reads: string | number;
}

type DrawerRef = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

export default function ProfileTop(props: ProfileTopProps) {
    const { username, avatarUrl, jokesAmount, likes, reads } = props;
    const drawerRef1 = useRef<DrawerRef>(null);
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.drawerButtonContainer}>
                <ProfileDrawer ref={drawerRef1} />
            </View>
            <Avatar avatarURL={avatarUrl} avatarBackgroundColor={theme.accentBlueLight.val} editable size={100} />
            <Text shadow={theme.enableShadow.val === 1} color={theme.background.val} size={22}>{username}</Text>
            <View style={styles.statsContainer}>
                <StatBox label="Jokes" amount={format(jokesAmount)} />
                <StatBox label="Reads" amount={format(reads)} />
                <StatBox label="Likes" amount={format(likes)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 6,
        padding: 30,
        width: "100%",
    },

    statsContainer: {
        flexDirection: "row",
        gap: 40,
    },

    drawerButtonContainer: {
        position: "absolute",
        right: 20,
        top: 14,
    }
});
