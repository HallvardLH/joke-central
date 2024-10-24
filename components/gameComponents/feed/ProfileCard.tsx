import Avatar from "../../ui/generalUI/Avatar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "tamagui";
import Text from "../../ui/generalUI/Text";
import { useTheme } from "tamagui";
import { useDispatch } from 'react-redux';
import { updateViewingProfileUid } from "@/state/viewingProfileSlice";
import { router } from "expo-router";
import useAuth from "@/hooks/useAuth";

interface ProfileCardProps {
    avatarSize?: number,
    nameSize?: number,
    avatarBackgroundColor?: string,
    avatarURL?: string,
    username: string,
    uid: string,
    createdAt?: string,
    // Tapping profile takes you nowhere
    disableProfileTap?: boolean;
}

// Function to format the date into a human-readable format
const formatCreatedAt = (createdAt: string | undefined) => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

export default function ProfileCard(props: ProfileCardProps) {
    const { avatarSize, nameSize, avatarBackgroundColor, avatarURL, username, uid, createdAt, disableProfileTap } = props;
    const theme = useTheme();

    const { session } = useAuth();

    const dispatch = useDispatch();
    const handleTapProfile = () => {
        // Hah! You really thought you wouldn't be sent to your actual profile?
        // It's your own profile! You don't get to navigate to it in an infinite loop
        if (session?.user?.id === uid) {
            router.navigate("/(tabs)/profile");
            return
        }
        if (!disableProfileTap) {
            dispatch(updateViewingProfileUid(uid));
            router.navigate("/profile/viewProfile");
        }
    }

    // Format the createdAt date for display
    const formattedCreatedAt = formatCreatedAt(createdAt);

    return (
        <TouchableOpacity style={styles.container} onPress={handleTapProfile}>
            <Avatar avatarURL={avatarURL} avatarBackgroundColor={avatarBackgroundColor} size={avatarSize} />
            <View style={styles.textContainer}>
                <Text size={nameSize} shadow={false} color={"gray"}>{username}</Text>
                <Text shadow={false} color={"gray"} style={{ marginTop: -6 }} size={12} numberOfLines={1}>{formattedCreatedAt}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },

    textContainer: {
    }
})
