import { View, StyleSheet, Dimensions, TouchableOpacity, Platform } from "react-native";
import GradientBackground from "../../ui/layout/GradientBackground";
import Text from "../../ui/generalUI/Text";
import Shadow from "../../ui/misc/Shadow";
import ProfileCard from "../feed/ProfileCard";
import { useTheme } from "tamagui";
import { router } from "expo-router";
import { useDispatch } from 'react-redux';
import { updateViewingJoke, updateGradientStart, updateGradientEnd } from "@/state/viewingJokeSlice";
import { Joke } from "./Joke";
import useAuth from "@/hooks/useAuth";
import DeleteButton from "../feed/DeleteButton";
import JokeControls from "../feed/JokeControls";
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { useEffect } from "react";

interface JokeThumbnailProps {
    joke: Joke,
    gradientStart: string,
    gradientEnd: string,
    index: number,
}

const screenWidth = Dimensions.get("screen").width;

const interstitialId = process.env.EXPO_PUBLIC_DEVELOPMENT_MODE == 'true'
    ? TestIds.INTERSTITIAL
    : Platform.OS === 'android'
        ? 'ca-app-pub-1354741235649835/2054364065'
        : 'ca-app-pub-1354741235649835/5500425105';

const adUnitId = interstitialId;
const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export default function JokeThumbnail(props: JokeThumbnailProps) {
    const { joke, gradientStart, gradientEnd, index } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(screenWidth, theme);
    const { session } = useAuth();
    const userId = session?.user?.id;

    // Load ad when component mounts
    useEffect(() => {
        const loadAd = () => interstitial.load();

        const onAdClosed = interstitial.addAdEventListener(AdEventType.CLOSED, loadAd);
        loadAd();

        return () => {
            onAdClosed();
        };
    }, []);

    const handleTapCard = () => {
        // 50% chance to show interstitial ad
        if (Math.random() < 0.5 && interstitial.loaded) {
            interstitial.show();
        }

        // Navigate to the joke read page and update Redux state
        router.navigate("/joke/readJoke");
        dispatch(updateViewingJoke(joke));
        dispatch(updateGradientStart(gradientStart));
        dispatch(updateGradientEnd(gradientEnd));
    };

    return (
        <View style={[
            styles.container,
            {
                alignItems: index % 2 === 0 ? "flex-end" : "flex-start",
            }
        ]}>
            <Shadow shadowHeight={6} borderRadius={20} height={200} width={
                screenWidth / 2 - 30 <= 250 ? screenWidth / 2 - 30 : 250
            } />
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
                            <Text numberOfLines={2} shadow={false} color={gradientEnd} style={styles.titleText} size={15}>
                                {joke.title}
                            </Text>
                        </View>
                    )}
                    <Text shadow={theme.enableShadow.val === 1} color={theme.background.val} size={13} numberOfLines={4}>
                        {joke.text}
                    </Text>
                </TouchableOpacity>
                <View style={styles.jokeControlsContainer}>
                    <JokeControls iconSize={18} iconColor={gradientEnd} containerStyle={{ justifyContent: "center" }} joke={joke} />
                </View>
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
        alignItems: "center",
        width: screenWidth / 2 - 30,
    },
    thumbnailContainer: {
        width: screenWidth / 2 - 30,
        maxWidth: 250,
        minHeight: 230,
        maxHeight: 230,
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
        paddingHorizontal: 4,
        zIndex: 1,
        backgroundColor: theme.background.val,
    },
    titleText: {
        textAlign: "center",
    },
    jokeControlsContainer: {
        backgroundColor: theme.background.val,
        padding: 4,
    }
});
