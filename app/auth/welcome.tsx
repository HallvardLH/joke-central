import ScreenView from '@/components/ui/layout/ScreenView';
import { router } from 'expo-router';
import Button from '@/components/ui/buttons/Button';
import Text from '@/components/ui/generalUI/Text';
import useAuth from '@/hooks/useAuth';

export default function SelectAvatar() {
    const { signInAnonymously } = useAuth();

    const handleAnonymousSignIn = async () => {
        await signInAnonymously();
        router.replace("/(tabs)")
    };

    return (
        <ScreenView>
            <Text>Welcome to Joke Central</Text>
            <Text>Create an account to write jokes and comments</Text>
            <Button
                label="Sign up"
                width={250}
                variant="blue"
                onPress={() => router.replace("/auth/signup")}
            />

            <Text>Just here to read jokes and have a laugh? Join as guest</Text>
            <Button
                label="Log in as guest"
                width={250}
                variant="green"
                onPress={handleAnonymousSignIn}
            />
        </ScreenView>
    );
}
