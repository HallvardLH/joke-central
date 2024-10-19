import { StyleProp, ViewStyle } from "react-native";
import BaseButton from "./BaseButton";
import { useTheme } from "tamagui";

interface ButtonProps {
    label?: string;
    onPress?: () => void;
    height?: number;
    width?: number;
    fontSize?: number;
    shadowHeight?: number;
    style?: StyleProp<ViewStyle>;
    borderRadius?: number;
    disabled?: boolean;
    variant?: "green" | "purple" | "yellow" | "blue" | "pink" | "inactive"
}

export default function Button(props: ButtonProps) {
    const {
        label,
        onPress,
        height,
        width,
        fontSize,
        shadowHeight,
        style,
        borderRadius,
        variant = "green",
        disabled
    } = props;

    const theme = useTheme();

    const variants = {
        "green": {
            leftColor: theme.accentGreenMedium.val,
            rightColor: theme.accentGreenDark.val,
            highlightColor: theme.accentGreenDarkest.val,
            borderRadius: 10,
        },
        "purple": {
            leftColor: theme.accentPurpleLight.val,
            rightColor: theme.accentPurpleMedium.val,
            highlightColor: theme.accentPurpleDarkest.val,
            borderRadius: 22,
        },
        "yellow": {
            leftColor: theme.accentYellowMedium.val,
            rightColor: theme.accentYellowDark.val,
            highlightColor: theme.accentYellowDarkest.val,
            borderRadius: 10,
        },
        "blue": {
            leftColor: theme.accentBlueLight.val,
            rightColor: theme.accentBlueMedium.val,
            highlightColor: theme.accentBlueDark.val,
            borderRadius: 10,
        },
        "pink": {
            leftColor: theme.accentPinkLight.val,
            rightColor: theme.accentPinkMedium.val,
            highlightColor: theme.accentPinkDark.val,
            borderRadius: 10,
        },

        "inactive": {
            leftColor: "gainsboro",
            rightColor: "silver",
            highlightColor: "darkgray",
            borderRadius: 10,
        }
    }

    return (
        <BaseButton
            onPress={onPress}
            label={label}
            leftColor={disabled ? variants.inactive.leftColor : variants[variant].leftColor}
            rightColor={disabled ? variants.inactive.rightColor : variants[variant].rightColor}
            highlightColor={disabled ? variants.inactive.highlightColor : variants[variant].highlightColor}
            borderRadius={disabled ? variants.inactive.borderRadius : (borderRadius ? borderRadius : variants[variant].borderRadius)}
            heightPercentage={height}
            widthPercentage={width}
            fontSize={fontSize}
            shadowHeight={shadowHeight}
            style={style}
            disabled={disabled}
        />
    );
}