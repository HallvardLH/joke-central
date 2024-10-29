import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated, StyleProp, ViewStyle } from "react-native";
import Text from "../generalUI/Text";
import Shadow from "../misc/Shadow";
import { useTheme } from "tamagui";

interface ContentTabProps {
    tabs: Array<{
        name: string;
        component: React.ReactNode;
        notification?: number;
        onNavigateTo?: () => void;
    }>;
    contentSpacing?: number;
    containerStyle?: StyleProp<ViewStyle>;
}

export default function ContentTab(props: ContentTabProps) {
    const { tabs, contentSpacing = 25, containerStyle } = props;
    const theme = useTheme();

    const [activeTab, setActiveTab] = useState(0);

    // Calculate width in percentage based on the number of tabs
    const tabWidthPercent = 100 / tabs.length;

    // Initialize the position with the activeTab
    // Convert activeTab index to a percentage
    const initialPosition = activeTab * tabWidthPercent;
    const position = useRef(new Animated.Value(initialPosition)).current;

    useEffect(() => {
        // Calculate the new position based on the activeTab
        const newPosition = activeTab * tabWidthPercent;

        Animated.spring(position, {
            toValue: newPosition,
            useNativeDriver: false,
        }).start();
    }, [activeTab]);

    const animatedStyle = {
        left: position.interpolate({
            inputRange: tabs.map((_, index) => (100 / (tabs.length)) * index),
            outputRange: tabs.map((_, index) => (
                // For last and first, push the element slightly further to the right or left
                // In order to avoid ugly doubling of borders
                (tabWidthPercent * index + (index == 0 ? -0.5 : 0) + (index == tabs.length - 1 ? 0.5 : 0)) + "%"
            )),
        })
    };

    const buttonHeight = 46;
    const buttonContainerHeight = buttonHeight + 4

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            position: 'relative',
            flex: 1,
        },

        controls: {
            top: 50,
            width: "100%",
            position: "absolute",
            zIndex: 2,
            maxWidth: 600,
            alignSelf: "center",

        },

        tabs: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
        },
        tabContent: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
        },

        focusedContainer: {
            position: "absolute",
            borderColor: theme.background.val,
            borderWidth: 2,
            backgroundColor: theme.accentPurpleDarkest.val,
            borderRadius: 50,
            height: buttonContainerHeight,
        },

        tabButton: {
            backgroundColor: "transparent",
            borderRadius: 50,
            borderColor: theme.background.val,
            height: buttonHeight,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
        },

        buttonContainer: {
            flexDirection: "row",
            width: "88%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-between",
            height: buttonContainerHeight,
            backgroundColor: theme.accentPurpleDark.val,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: theme.background.val,
            overflow: "hidden",
        },

        child: {
            justifyContent: "flex-start",
            flex: 1,
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                <Shadow style={{ alignSelf: "center" }} height={buttonContainerHeight} shadowHeight={5} width={"88%"} borderRadius={50} />
                <View style={styles.buttonContainer}>
                    <Animated.View style={[styles.focusedContainer, animatedStyle, { width: `${tabWidthPercent}%` }]} />
                    {tabs.map((tab, index) =>
                        <TouchableOpacity
                            style={[styles.tabButton, { width: `${tabWidthPercent}%` }]}
                            key={"TabButton-" + index}
                            onPress={() => {
                                setActiveTab(index);
                                if (tab.onNavigateTo) {
                                    tab.onNavigateTo();
                                }
                            }}
                        >
                            <Text shadow={theme.enableShadow.val === 1} color={theme.background.val}>{tab.name}</Text>
                            {tab.notification && tab.notification > 0 ? (
                                <View style={{
                                    height: 22,
                                    width: 22,
                                    borderRadius: 100,
                                    backgroundColor: theme.accentRedMedium.val,
                                    borderWidth: 1,
                                    borderColor: "white",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Text color={theme.background.val} style={{ position: "absolute", }} size={12}>{tab.notification}</Text>
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.tabs}>
                {/* Only render the active tab's content */}
                <Animated.View
                    key={activeTab}
                    style={[
                        styles.tabContent,
                        { opacity: 1, zIndex: 1 },
                    ]}
                >
                    <View style={[styles.child, containerStyle]}>
                        {tabs[activeTab].component}
                    </View>
                </Animated.View>
            </View>

        </View>
    );
}
