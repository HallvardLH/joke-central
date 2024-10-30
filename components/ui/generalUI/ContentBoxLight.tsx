import { View, StyleSheet, ViewStyle, StyleProp, DimensionValue } from "react-native";
import { useTheme } from "tamagui";
import { ReactNode } from "react";
import Text from "./Text";

interface ContentBoxLightProps {
    children?: ReactNode;
    title?: string;
    style?: StyleProp<ViewStyle>;
    innerStyle?: StyleProp<ViewStyle>;
    headerColor?: string;
    width?: DimensionValue;
    height?: DimensionValue;
}

export default function ContentBoxLight(props: ContentBoxLightProps) {
    const theme = useTheme();
    const {
        children,
        title,
        style,
        innerStyle,
        headerColor = theme.accentPurpleDarkest.val,
        width = "88%",
    } = props;

    const styles = createMainStyles(theme, width);

    return (
        <View style={[styles.outerContainer, style]} >
            <View style={styles.shadow} />
            <View style={[styles.container, innerStyle]}>
                {title && (
                    <Header title={title} headerColor={headerColor} />
                )}
                {children}

            </View>
        </View>
    );
}

const createMainStyles = (theme: any, width: DimensionValue) => StyleSheet.create({
    container: {
        marginHorizontal: 24,
        gap: 14,
        backgroundColor: theme.background.val,
        padding: 14,
        paddingHorizontal: 18,
        borderRadius: 16,
        width: width,
        minHeight: 125,
        marginBottom: 20,
    },

    outerContainer: {
        width: "100%",
        alignItems: "center",
        height: "auto",
    },

    shadow: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        width: width,
        bottom: 14,
        height: 20,
        backgroundColor: "rgba(0,0,0, 0.2)",
        position: "absolute",
    }
});

interface HeaderProps {
    title: string,
    headerColor?: string,
}

export function Header({ title, headerColor }: HeaderProps) {
    const theme = useTheme();
    const styles = createHeaderStyles(headerColor ? headerColor : theme.accentPurpleDarkest.val);
    return (
        <View style={styles.header}>
            <Text shadow={theme.enableShadow.val === 1} color={theme.background.val}>{title}</Text>
        </View>
    )
}

const createHeaderStyles = (headerColor: string) => StyleSheet.create({
    header: {
        width: "100%",
        marginHorizontal: "auto",
        borderRadius: 20,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: headerColor,
    },
});
