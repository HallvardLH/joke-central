import { ReactNode } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { componentColors } from "../misc/Colors";
import { percentageOf as p } from "@/scripts/utils";
import { useTheme } from "tamagui";

interface CircularButtonProps {
    onPress?: () => void;
    variant?: "green" | "purple" | "yellow" | "blue" | "pink" | "inactive";
    iconComponent?: ReactNode;
    backgroundColor?: string;
    highlightColor?: string;
    size?: number;
}

export default function CircularButton(props: CircularButtonProps) {
    const { onPress, variant, iconComponent, backgroundColor, highlightColor, size = 40 } = props;

    const borderWidth = p(7.5, size);
    const backgroundOffset = p(7, size);

    const theme = useTheme();

    const variants = {
        "green": {
            backgroundColor: theme.accentGreenDark.val,
            highlightColor: theme.accentGreenDarkest.val,
        },
        "purple": {
            backgroundColor: theme.accentPurpleMedium.val,
            highlightColor: theme.accentPurpleDarkest.val,
        },
        "yellow": {
            backgroundColor: theme.accentYellowDark.val,
            highlightColor: theme.accentYellowDarkest.val,
        },
        "blue": {
            backgroundColor: theme.accentBlueMedium.val,
            highlightColor: theme.accentBlueDark.val,
        },
        "pink": {
            backgroundColor: theme.accentPinkMedium.val,
            highlightColor: theme.accentPinkDark.val,
        },

        "inactive": {
            backgroundColor: "silver",
            highlightColor: "darkgray",
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[
                styles.container,
                { width: size }
            ]}>
                <View style={[
                    styles.background,
                    {
                        backgroundColor: variant ? variants[variant].highlightColor : highlightColor,
                        width: size,
                        height: size,
                        top: backgroundOffset,
                    }
                ]} />
                <View style={[
                    styles.innerButtonContainer,
                    {
                        backgroundColor: variant ? variants[variant].backgroundColor : backgroundColor,
                        width: size,
                        height: size,
                        borderWidth: borderWidth,
                        borderColor: theme.background.val,
                    }
                ]}>
                    {/* {variant && (
                        <Image
                            style={{
                                height: size / 1.8,
                                width: size / 1.8
                            }}
                            source={variants[variant].icon}
                        />
                    )} */}
                    {iconComponent && (
                        iconComponent
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    background: {
        position: "absolute",
        backgroundColor: "transparent",
        borderRadius: 100,
    },

    innerButtonContainer: {
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    }
})