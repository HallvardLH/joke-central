import Drawer from "@/components/ui/drawer/Drawer";
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from "tamagui";
import Text from "@/components/ui/generalUI/Text";
import { TouchableOpacity } from "react-native";
import CircularButton from "@/components/ui/buttons/CircularButton";
import { AlignRight } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";
import Button from "@/components/ui/buttons/Button";
import useAuth from "@/hooks/useAuth";

type DrawerRef = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

const ProfileDrawer = forwardRef<DrawerRef>((_, ref) => {
    const drawerRef = useRef<DrawerRef>(null);
    const theme = useTheme();

    const { signOut } = useAuth();

    const handleSignOut = () => {
        drawerRef.current?.closeDrawer();
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

    return (
        <View>
            <CircularButton iconComponent={<AlignRight color={theme.background.val} />} variant="purple" onPress={() => drawerRef.current?.openDrawer()} />

            <Drawer ref={drawerRef}>
                <TouchableOpacity onPress={() => drawerRef.current?.closeDrawer()}>
                    <Text>Close drawer</Text>
                </TouchableOpacity>
                <Button label="Log out" onPress={handleSignOut} />
            </Drawer>
        </View>
    );
});

export default ProfileDrawer;
