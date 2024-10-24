import { TouchableOpacity } from "react-native";
import { Trash2 } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";
import Text from "@/components/ui/generalUI/Text";
import { Joke } from "../browse/Joke";
import { usePublishJoke } from "@/hooks/usePublishJoke";
import { AlertDialog, XStack } from "tamagui";
import { useState } from "react";
import { router } from "expo-router";
import ContentBoxLight from "@/components/ui/generalUI/ContentBoxLight";
import Button from "@/components/ui/buttons/Button";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

import { Dimensions } from 'react-native';

const { width } = Dimensions.get("screen");

interface DeleteButtonProps {
    joke: Joke,
}

export default function DeleteButton({ joke }: DeleteButtonProps) {
    const theme = useTheme();
    const { deleteJoke } = usePublishJoke();

    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    const confirmDelete = () => {
        setDialogVisible(true);
    };

    const queryClient = useQueryClient();

    const { session } = useAuth();
    const userId = session?.user?.id;

    const handleDelete = async () => {
        try {
            router.replace("/");
            router.navigate("/(tabs)/profile");
            await deleteJoke(joke.id);
            queryClient.resetQueries({ queryKey: [userId + '_profile_jokes'], exact: true });
        } catch (error) {
            console.error(error)
        }
        setDialogVisible(false);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    return (
        <TouchableOpacity onPress={confirmDelete} style={{
            alignItems: "center",
            flexDirection: "row",
            height: 25,
            backgroundColor: theme.background.val,
            justifyContent: "center",
            gap: 4,
        }}>
            <Trash2
                color={"red"}
                size={15}
            />
            <Text color="gray" size={12}>Delete</Text>

            <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay
                        key="overlay"
                        opacity={0.4}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                        backgroundColor={"black"}
                    />
                    <AlertDialog.Content
                        bordered
                        elevate
                        maxWidth={"95%"}
                        key="content"
                        minHeight={210}
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        x={0}
                        scale={1}
                        opacity={1}
                        y={0}
                        justifyContent="space-between"
                    >
                        <Text color={theme.background2.val}>Are you sure you want to delete this joke?</Text>
                        <Text color={theme.background2.val}>This action cannot be undone.</Text>
                        <XStack justifyContent="space-between">
                            <Button onPress={handleCancel} width={width * 0.35} label="Cancel" variant="yellow" />
                            <Button onPress={handleDelete} width={width * 0.35} label="Delete" variant="pink" />
                        </XStack>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </TouchableOpacity>
    )
}