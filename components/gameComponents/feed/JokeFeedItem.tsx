import { View } from "tamagui";
import { StyleSheet, Dimensions, Platform } from "react-native";
import GradientBackground from "../../ui/layout/GradientBackground";
import Text from "../../ui/generalUI/Text";
import JokeControls from "./JokeControls";
import { ScrollView } from "react-native-gesture-handler";
import ProfileCard from "./ProfileCard";
import { Joke } from "../browse/Joke";
import ContentBoxLight, { Header } from "@/components/ui/generalUI/ContentBoxLight";
import DeleteButton from "./DeleteButton";
import useAuth from "@/hooks/useAuth";

interface JokeListItemProps {
    joke: Joke,
    gradientStart: string,
    gradientEnd: string,
    headerColor: string,
}

const { height } = Dimensions.get('window');

export default function JokeFeedItem(props: JokeListItemProps) {
    const { joke, gradientStart, gradientEnd, headerColor } = props;

    const { session } = useAuth();
    const userId = session?.user?.id;

    return (
        <View style={styles.item}>
            <GradientBackground start={gradientStart} end={gradientEnd} />
            <ContentBoxLight
                style={{
                    maxHeight: height - 320,
                    marginBottom: Platform.OS === "ios" ? 100 : 75,
                    minHeight: 200,
                    maxWidth: 600,
                }}
            >
                {joke.title && (
                    <Header title={joke.title} headerColor={headerColor} />
                )}
                <ScrollView contentContainerStyle={{
                    alignItems: "center",
                    marginVertical: "auto"
                }}>
                    <Text size={12} shadow={false} color="gray" style={styles.text}>
                        {joke.text}
                    </Text>
                </ScrollView>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 10,
                    paddingRight: "5%",
                }}>
                    <ProfileCard
                        avatarSize={40}
                        avatarURL={joke.profiles.avatar_url ? joke.profiles.avatar_url : undefined}
                        username={joke.profiles.username}
                        createdAt={joke.created_at}
                        uid={joke.profiles.id}
                    />
                    <JokeControls joke={joke} iconColor={gradientEnd} />
                </View>
                {userId === joke.author && (
                    <DeleteButton joke={joke} />
                )}
            </ContentBoxLight>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        // Each item covers the whole screen
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
        paddingHorizontal: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});