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
                headerShown: true,
                headerTransparent: true,
                // Header can be transparent on ios, but android refuses
                // making it the same color as the background should be ok
                headerTitleStyle: { color: Platform.OS === "android" ? theme.accentPurpleDarkest.val : "transparent" },
                headerTintColor: theme.background.val,
                headerBackTitleStyle: { fontFamily: "Digitalt" }
            }}
        >
            <Stack.Screen
                name="welcome"
                options={{
                    title: "Welcome",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    title: "Sign up",
                }}
            />
            <Stack.Screen
                name="selectAvatar"
                options={{
                    title: "Select Avatar",
                    headerTitleStyle: { color: Platform.OS === "android" ? theme.accentPurpleDark.val : "transparent" },
                }}
            />
            <Stack.Screen
                name="signin"
                options={{
                    title: "Sign in",
                }}
            />
        </Stack>
    );
}
