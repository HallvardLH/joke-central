import { Stack } from 'expo-router/stack';
import { useTheme } from 'tamagui';
import { useFonts } from 'expo-font';
import { Platform } from 'react-native';

export default function Layout() {
    const theme = useTheme();

    const [fontsLoaded] = useFonts({
        "Digitalt": require("../../assets/fonts/Digitalt.otf"),
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <Stack
            screenOptions={{
                headerShown: Platform.OS === "ios" ? false : true,
                headerTransparent: true,
                // Header can be transparent on ios, but android refuses
                // making it the same color as the background should be ok
                headerTitleStyle: { color: Platform.OS === "android" ? theme.accentPurpleDarkest.val : "transparent" },
                headerTintColor: theme.background.val,
                headerBackTitleStyle: { fontFamily: "Digitalt" }
            }}
        >
            <Stack.Screen
                name="viewProfile"
                options={{
                    title: "",
                }}
            />
        </Stack>
    );
}
