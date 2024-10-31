import { View } from "tamagui";
import useAuth from "@/hooks/useAuth";
import { Linking } from "react-native";
import ScreenView from "@/components/ui/layout/ScreenView";
import Text from "@/components/ui/generalUI/Text";
import Button from "@/components/ui/buttons/Button";
import { Dimensions } from "react-native";
import { useProfile } from "@/hooks/useProfile";

export default function deleteAccount() {

    const { session } = useAuth();
    const userId = session?.user?.id;

    const { profile } = useProfile(userId!);

    async function deleteAccount() {
        Linking.openURL(`mailto:contact@funlibs.app?subject=Delete%20My%2Joke%20Central%20User&body=Please%20delete%20my%20Joke%20Central%20account:%20${profile.username}.`);
    }

    return (
        <ScreenView>
            <View
                gap={10}
                paddingHorizontal={50}
            >
                <Text>Delete account</Text>
                <Text>To delete your account, send a mail to:</Text>
                <Text style={{ textDecorationLine: "underline" }}>contact.joke.central@gmail.com</Text>
                <Text>The mail needs to contain your username.</Text>
                <Text>
                    Your account and all your published jokes will be deleted within a day. After deletion, the account cannot be recovered.</Text>
                <Text>You can send a mail manually, or press the button to have a mail automatically filled in for you.</Text>
                <Button
                    label="Go to mail and fill in automatically"
                    variant="green"
                    width={Dimensions.get("window").width * .9}
                    onPress={() => deleteAccount()}
                />
            </View>
        </ScreenView>
    )
}