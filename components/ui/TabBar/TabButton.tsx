import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../generalUI/Text";
import Shadow from "../misc/Shadow";
import { useTheme } from 'tamagui';

interface TabButtonProps {
    label: string;
    labelColor?: string;
    background: string;
    highlight: string;
    onPress?: () => void;
    icon: React.ReactNode;
    notifications?: number;
}

const width = 74;
const borderWidth = 2.5;
const shadowWidth = width + borderWidth * 2;

const innerButtonHeight = 68;
const backgroundHeight = innerButtonHeight + 11.5;

const borderRadius = 15;

export default function TabButton(props: TabButtonProps) {
    const { label, labelColor, background, highlight, onPress, icon, notifications } = props;

    const theme = useTheme();
    return (
        <TouchableOpacity onPress={onPress}>

            <Shadow width={shadowWidth} height={backgroundHeight} shadowHeight={4} borderRadius={borderRadius} />
            <View style={[styles.container, { borderColor: theme.background.val }]}>
                <View style={[styles.background, { backgroundColor: highlight }]} />
                <View style={[styles.outerButtonContainer, { backgroundColor: background }]}>
                    <View style={styles.innerButtonContainer}>
                        {icon}
                        <Text shadow={false} size={14} color={labelColor} style={{ textAlign: "center" }}>{label}</Text>
                    </View>
                </View>
            </View>
            {(typeof notifications === 'number' && notifications > 0) && (
                <View style={styles.notificationContainer}>
                    <View style={[styles.notification3DEffect, { width: notifications < 100 ? 26 : 34 }]} />
                    <View style={[styles.notification, { width: notifications < 100 ? 26 : 34 }]}>
                        <Text style={{ position: "absolute" }} size={13}>{notifications < 100 ? notifications : "+99"}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: borderWidth,
        overflow: "hidden",
        height: backgroundHeight,
        borderRadius: borderRadius
    },

    background: {
        width: width,
        height: backgroundHeight,
        position: "absolute",
    },

    outerButtonContainer: {
        height: innerButtonHeight,
        width: width,
        borderBottomRightRadius: borderRadius - 2,
        borderBottomLeftRadius: borderRadius - 2,
    },

    innerButtonContainer: {
        height: innerButtonHeight,
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        height: 26,
        width: 26,
    },

    notificationContainer: {
        position: "absolute",
        top: -8,
        right: -10,
    },

    notification: {

        padding: 4,
        height: 26,
        width: 26,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "#FF335F",
    },

    notification3DEffect: {
        position: "absolute",
        backgroundColor: "#D40633",
        top: 1.3,
        height: 26,
        width: 26,
        borderRadius: 100,
    }
})


