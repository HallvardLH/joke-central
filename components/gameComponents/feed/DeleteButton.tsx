import { TouchableOpacity } from "react-native";
import { Trash2 } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";
import Text from "@/components/ui/generalUI/Text";
import { Joke } from "../browse/Joke";
import { usePublishJoke } from "@/hooks/usePublishJoke";
import { XStack } from "tamagui";
import { useState } from "react";
import { router } from "expo-router";
import ContentBoxLight from "@/components/ui/generalUI/ContentBoxLight";
import Button from "@/components/ui/buttons/Button";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/ui/generalUI/Modal";

import { Dimensions } from 'react-native';

const { width } = Dimensions.get("screen");

interface DeleteButtonProps {
    joke: Joke,
}

export default function DeleteButton({ joke }: DeleteButtonProps) {
    const theme = useTheme();
    const { deleteJoke } = usePublishJoke();

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

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
        setDeleteModalVisible(false);
    };



    return (
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={{
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
            <Text shadow={false} color="gray" size={12}>Delete</Text>

            <Modal modalVisible={deleteModalVisible} onRequestClose={() => setDeleteModalVisible(false)}>
                <ContentBoxLight>
                    <Text shadow={false} color={theme.background2.val}>Are you sure you want to delete this joke?</Text>
                    <Text shadow={false} color={theme.background2.val}>This action cannot be undone.</Text>
                    <XStack justifyContent="space-between">
                        <Button onPress={() => setDeleteModalVisible(false)} width={100} label="Cancel" variant="yellow" />
                        <Button onPress={handleDelete} width={100} label="Delete" variant="pink" />
                    </XStack>
                </ContentBoxLight>
            </Modal>
        </TouchableOpacity>
    )
}