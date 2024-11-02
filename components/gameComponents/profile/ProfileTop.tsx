import { useTheme, View } from "tamagui";
import Avatar from "@/components/ui/generalUI/Avatar";
import Text from "@/components/ui/generalUI/Text";
import StatBox from "./StatBox";
import { StyleSheet, Pressable } from "react-native";
import { formatNumber as format } from "@/scripts/utils";
import ProfileDrawer from "./ProfileDrawer";
import { useRef } from "react";


interface ProfileTopProps {
    username: string;
    avatarUrl: string;
    jokesAmount: string | number;
    likes: string | number;
    reads: string | number;
    /** 
    * @property Whether the edit button should be displayed on the avatar or not
    */
    showEdit?: boolean;
    onAvatarPress?: () => void;
    showDrawer?: boolean;
}

type DrawerRef = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

export default function ProfileTop(props: ProfileTopProps) {
    const { username, avatarUrl, jokesAmount, likes, reads, showEdit, onAvatarPress, showDrawer } = props;
    const drawerRef1 = useRef<DrawerRef>(null);
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: "rgba(0,0,0, 0.2)" }]}>
            {showDrawer && (
                <View style={styles.drawerButtonContainer}>
                    <ProfileDrawer ref={drawerRef1} />
                </View>
            )}
            <Pressable onPress={onAvatarPress}>
                <Avatar avatarURL={avatarUrl} avatarBackgroundColor={theme.accentBlueLight.val} editable={showEdit} size={100} />
            </Pressable>
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
        paddingBottom: 10,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
