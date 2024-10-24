import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import GradientBackground from "../../ui/layout/GradientBackground";
import Text from "../../ui/generalUI/Text";
import Shadow from "../../ui/misc/Shadow";
import ProfileCard from "../feed/ProfileCard";
import { useTheme } from "tamagui";
import { router } from "expo-router";
import { useDispatch } from 'react-redux';
import { updateViewingJoke } from "@/state/viewingJokeSlice";
import { Joke } from "./Joke";
import useAuth from "@/hooks/useAuth";
import DeleteButton from "../feed/DeleteButton";

interface JokeThumbnailProps {
    joke: Joke,
    gradientStart: string,
    gradientEnd: string,
}

const screenWidth = Dimensions.get("screen").width;

export default function JokeThumbnail(props: JokeThumbnailProps) {
    const { joke, gradientStart, gradientEnd } = props;

    const dispatch = useDispatch();
    const handleTapCard = () => {
        router.navigate("/joke/readJoke");
        dispatch(updateViewingJoke(joke));
    }

    const theme = useTheme();
    const styles = createStyles(screenWidth, theme);

    const { session } = useAuth();
    const userId = session?.user?.id;

    return (
        <View style={styles.container}>
            <Shadow shadowHeight={6} borderRadius={20} height={200} width={screenWidth / 2 - 30} />
            <View style={styles.thumbnailContainer}>
                <GradientBackground start={gradientStart} end={gradientEnd} />
                <View style={styles.profileCardContainer}>
                    <ProfileCard
                        createdAt={joke.created_at}
                        uid={joke.profiles.id}
                        username={joke.profiles.username}
                        avatarURL={joke.profiles.avatar_url ? joke.profiles.avatar_url : undefined}
                        avatarBackgroundColor={gradientStart}
                        nameSize={14}
                        avatarSize={30}
                    />
                </View>
                <TouchableOpacity onPress={handleTapCard} style={styles.touchableContainer}>
                    {joke.title && (
                        <View style={styles.titleContainer}>
                            <Text shadow={false} color={gradientEnd} style={styles.titleText} size={15}>
                                {joke.title}
                            </Text>
                        </View>
                    )}
                    <Text shadow={theme.enableShadow.val === 1} color={theme.background.val} size={13} numberOfLines={4}>
                        {joke.text}
                    </Text>
                </TouchableOpacity>
                {userId === joke.author && (
                    <DeleteButton joke={joke} />
                )}
            </View>
        </View>
    );
}

const createStyles = (screenWidth: number, theme: any) => StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 15,
    },
    thumbnailContainer: {
        width: screenWidth / 2 - 30,
        minHeight: 200,
        maxHeight: 200,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 2.5,
        borderColor: theme.background.val,
    },
    profileCardContainer: {
        bottom: 0,
        padding: 10,
        width: "100%",
        backgroundColor: theme.background.val,
    },
    touchableContainer: {
        padding: 10,
        borderRadius: 20,
        gap: 6,
        flex: 1,
    },
    titleContainer: {
        borderRadius: 20,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        backgroundColor: theme.background.val,
    },
    titleText: {
        textAlign: "center",
    },
});
