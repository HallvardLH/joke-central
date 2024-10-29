import Drawer from "@/components/ui/drawer/Drawer";
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from "tamagui";
import Text from "@/components/ui/generalUI/Text";
import { Dimensions } from "react-native";
import CircularButton from "@/components/ui/buttons/CircularButton";
import { AlignRight } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";
import Button from "@/components/ui/buttons/Button";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

type DrawerRef = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

const ProfileDrawer = forwardRef<DrawerRef>((_, ref) => {
    const drawerRef = useRef<DrawerRef>(null);
    const theme = useTheme();

    const { signOut } = useAuth();

    const handleSignOut = () => {
        close();
        signOut();
    }

    useImperativeHandle(ref, () => ({
        openDrawer: () => {
            drawerRef.current?.openDrawer();
        },
        closeDrawer: () => {
            drawerRef.current?.closeDrawer();
        }
    }));

    const close = () => {
        drawerRef.current?.closeDrawer();
    }

    return (
        <View>
            <CircularButton iconComponent={<AlignRight color={theme.background.val} />} variant="purple" onPress={() => drawerRef.current?.openDrawer()} />

            <Drawer ref={drawerRef}>
                <View style={{
                    justifyContent: "center",
                    marginBottom: 100,
                    gap: 20,
                    alignItems: "center",
                    flexDirection: "column",
                    flex: 1,
                }}>
                    <Button
                        width={width * 0.65 <= 300 ? width * 0.65 : 300}
                        variant="pink"
                        label="Close drawer"
                        onPress={close}
                    />
                    <Button width={width * 0.65 <= 300 ? width * 0.65 : 300} label="Log out" onPress={handleSignOut} />
                    <Button variant="yellow" width={width * 0.65 <= 300 ? width * 0.65 : 300} label="Delete my account" onPress={() => {
                        router.navigate("/delete-account/deleteAccount");
                        close();
                    }} />
                </View>
            </Drawer>
        </View>
    );
});

export default ProfileDrawer;
