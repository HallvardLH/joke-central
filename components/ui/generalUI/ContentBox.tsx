/**
 * Container for displaying text and various other informations to the user
 * 
 */
import { ReactNode, useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { componentColors } from "../misc/Colors";
import Text from "./Text";
import Shadow from "../misc/Shadow";
import { useTheme } from "tamagui";

interface ContentBoxProps {
    children?: ReactNode;
    beforeHeader?: ReactNode;
    afterChildren?: ReactNode;
    title?: string;
    text?: string | ReactNode;
    textColor?: string;
    style?: StyleProp<ViewStyle>;
    headerColor?: string;
    isLoading?: boolean;
    width?: DimensionValue;
    heightOverride?: number;
}

export default function ContentBox(props: ContentBoxProps) {
    const {
        children,
        beforeHeader,
        afterChildren,
        title,
        text,
        textColor = componentColors.contentBox.text,
        style,
        headerColor = componentColors.contentBox.highlight,
        isLoading = false,
        width = "88%",
        heightOverride,
    } = props;

    const theme = useTheme();

    const [containerHeight, setContainerHeight] = useState(200); // Default minHeight

    // Whenever the layout changes, check the height of the contentBox,
    // This assures the shadow knows the height of the box, even when it become bigger than 200
    const onLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        let newHeight = 200;
        if (heightOverride) {
            newHeight = heightOverride;
        }
        if (height > 450) {
            newHeight = 450;
        } else {
            newHeight = height;
        }
        setContainerHeight(newHeight);
    };

    return (
        <View style={[styles.container, ribbonTitle ? { marginTop: 25 } : null]}>
            <Shadow height={containerHeight} shadowHeight={8} width={width} borderRadius={20} />
            <View style={[
                styles.background,
                { height: containerHeight + 4 },
                { width: width },
                { backgroundColor: theme.backgroundHighlight.val }
            ]} />
            <View style={[styles.contentBoxContainer, style, { width: width, backgroundColor: theme.background.val, maxHeight: heightOverride ? heightOverride : 450, }]} onLayout={onLayout}>
                {beforeHeader}
                <>
                    {ribbonTitle && (
                        <View style={styles.ribbonTitleConatiner}>
                            <RibbonTitle stars={false} topText={ribbonTitle.topText} bottomText={ribbonTitle.bottomText ? ribbonTitle.bottomText : title} />
                        </View>
                    )}
                    {isLoading ? (
                        null // TODO: add loading indicator
                    ) : (
                        <>
                            {!ribbonTitle && title && (
                                <View style={[styles.titleContainer, { backgroundColor: headerColor }]}>
                                    <Text shadow={false}>{title ? title : null}</Text>
                                </View>
                            )}
                            {text && (
                                <View style={styles.textContainer}>
                                    <Text shadow={false} color={textColor} style={{ textAlign: "center" }}>{text}</Text>
                                </View>
                            )}
                            <View style={[ribbonTitle ? { marginTop: 40 } : null, { gap: 10 }]}>
                                {children}
                            </View>
                            {afterChildren}
                        </>
                    )}
                </>
            </View>
        </View>
    )
}

interface ContentBoxBottomProps {
    children?: ReactNode;
}

export function ContentBoxBottom({ children }: ContentBoxBottomProps) {
    return (
        <View style={styles.bottomContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },

    contentBoxContainer: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 20,
        minHeight: 100,
        gap: 10,
        overflow: "hidden",
    },

    background: {
        position: "absolute",
        borderRadius: 20,
    },

    titleContainer: {
        borderRadius: 20,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },

    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 60,
    },

    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    ribbonTitleConatiner: {
        position: "absolute",
        alignSelf: "center",
        top: -30,
    }
})