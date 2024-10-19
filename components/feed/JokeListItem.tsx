import { View } from "tamagui";
import { StyleSheet, Dimensions } from "react-native";
import GradientBackground from "../layout/GradientBackground";
import ContentBox from "../generalUI/ContentBox";
import Text from "../generalUI/Text";
import JokeControls from "./JokeControls";
import Avatar from "../generalUI/Avatar";
import ProfileCard from "./ProfileCard";

interface JokeListItemProps {
    gradientStart: string,
    gradientEnd: string,
    headerColor: string,
    title: string,
    text: string,
}

const { height } = Dimensions.get('window');

export default function JokeListItem(props: JokeListItemProps) {
    const { gradientStart, gradientEnd, headerColor, title, text } = props;
    return (
        <View style={styles.item}>
            <GradientBackground start={gradientStart} end={gradientEnd} />
            <JokeControls />
            <ContentBox
                headerColor={headerColor}
                title={title}
                // width={"82%"}
                beforeHeader={(
                    <></>
                )}
            >
                {/* <ProfileCard /> */}
                <Text size={12} shadow={false} color="gray" style={styles.text}>
                    {text}
                </Text>
            </ContentBox>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        height: height, // Make each item full screen height
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});