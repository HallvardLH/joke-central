import { Tabs } from 'expo-router';
import { useTheme } from "tamagui";
import TabBar from '@/components/ui/TabBar/TabBar';

export default function TabLayout() {
    const theme = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // tabBarStyle: { display: "none" }
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="browse"
                options={{
                    title: 'Browse',
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                }}
            />
        </Tabs>
    );
}
