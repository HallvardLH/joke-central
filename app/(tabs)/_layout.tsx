import { Tabs } from 'expo-router';
import { useTheme } from "tamagui";
import TabBar from '@/components/TabBar/TabBar';

export default function TabLayout() {
    const theme = useTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.accentBlueDark.val,
                headerShown: false,
                // tabBarStyle: { display: "none" }
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <></>

                    ),
                }}
            />
            <Tabs.Screen
                name="browse"
                options={{
                    title: 'Browse',
                    tabBarIcon: ({ color, focused }) => (
                        <></>

                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color, focused }) => (
                        <></>

                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <></>

                    ),
                }}
            />
        </Tabs>
    );
}
