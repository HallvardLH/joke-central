import { View } from "tamagui";
import { StyleSheet, Dimensions, Platform } from "react-native";
import GradientBackground from "../../ui/layout/GradientBackground";
import Text from "../../ui/generalUI/Text";
import JokeControls from "./JokeControls";
import { useTheme } from "tamagui";
import { ScrollView } from "react-native-gesture-handler";
import ProfileCard from "./ProfileCard";

interface JokeListItemProps {
    gradientStart: string,
    gradientEnd: string,
    headerColor: string,
    title: string,
    text: string,
}

const { height } = Dimensions.get('window');

export default function JokeFeedItem(props: JokeListItemProps) {
    const { gradientStart, gradientEnd, headerColor, title, text } = props;
    const theme = useTheme();
    return (
        <View style={styles.item}>
            <GradientBackground start={gradientStart} end={gradientEnd} />
            <JokeControls />
            <View style={{
                marginHorizontal: 24,
                gap: 14,
                backgroundColor: theme.background.val,
                padding: 14,
                paddingHorizontal: 18,
                borderRadius: 16,
                width: "88%",
                minHeight: 125,
                maxHeight: height - 320,
                marginBottom: Platform.OS === "ios" ? 25 : null
            }}>
                <View style={{
                    width: "100%",
                    marginHorizontal: "auto",
                    borderRadius: 20,
                    height: 26,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: headerColor
                }}>
                    <Text shadow={theme.enableShadow.val === 1} color={theme.background.val}>{title}</Text>
                </View>
                {/* <ProfileCard /> */}
                <ScrollView>
                    <Text size={12} shadow={false} color="gray" style={styles.text}>
                        {text}
                    </Text>
                </ScrollView>
            </View>
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