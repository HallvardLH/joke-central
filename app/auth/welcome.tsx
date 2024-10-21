import ScreenView from '@/components/ui/layout/ScreenView';
import { router } from 'expo-router';
import Button from '@/components/ui/buttons/Button';
import Text from '@/components/ui/generalUI/Text';
import useAuth from '@/hooks/useAuth';
import { useTheme, View } from 'tamagui';
import ContentBox from '@/components/ui/generalUI/ContentBox';

export default function SelectAvatar() {
    const { signInAnonymously } = useAuth();

    const handleAnonymousSignIn = async () => {
        await signInAnonymously();
        router.navigate("/(tabs)")
    };

    const theme = useTheme();

    return (
        <ScreenView>
            <ContentBox>
                <View style={{
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                }}>
                    <Text style={{ textAlign: "center" }} shadow={false} color={theme.text1.val} size={26}>Welcome to Joke Central</Text>
                    <Text style={{ textAlign: "center" }} shadow={false} color={theme.text1.val} size={18}>Just here to read jokes and have a laugh? Simply join as guest.</Text>
                    <Button
                        label="Log in as guest"
                        width={250}
                        variant="green"
                        onPress={handleAnonymousSignIn}
                    />
                    <Text style={{ textAlign: "center" }} shadow={false} color={theme.text1.val} size={18}>Or create an account to write jokes and comments.</Text>
                    <Button
                        label="Create account"
                        width={250}
                        variant="pink"
                        onPress={() => router.navigate("/auth/signup")}
                    />
                    <Text style={{ textAlign: "center" }} shadow={false} color={theme.text1.val} size={18}>Already have an account? Log in here.</Text>
                    <Button
                        label="Log in"
                        width={250}
                        variant="blue"
                        onPress={() => router.navigate("/auth/signin")}
                    />
                </View>
            </ContentBox>


        </ScreenView>
    );
}
