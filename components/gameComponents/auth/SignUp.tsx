import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/ui/generalUI/SmallInputField';
import ContentBox from '@/components/ui/generalUI/ContentBox';
import Button from '../../ui/buttons/Button';
import { useTheme, ScrollView } from 'tamagui';
import { router } from 'expo-router';
import { validateEmail } from '@/scripts/validation';
import { Keyboard } from 'react-native';

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const theme = useTheme();

    const { signUp, } = useAuth();

    const handleContinue = async () => {
        if (!validateEmail(email)) {
            Alert.alert("Please enter a valid email.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Your password should be at least 6 characters long.");
            return;
        }

        if (username.length > 32) {
            Alert.alert("Your username should not be longer than 32 characters.");
            return;
        }

        Keyboard.dismiss();
        await signUp(email, username, password, process.env.DEFAULT_AVATAR_URL!);
        router.navigate("/auth/selectAvatar");
    };

    return (
        <ScrollView keyboardDismissMode="on-drag">
            <ContentBox title='Create user' headerColor={theme.accentPurpleDarkest.val}>
                <SmallInputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <SmallInputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <SmallInputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View style={{
                    marginTop: 10,
                    alignItems: "center",
                    gap: 14,
                }}>
                    <Button variant="blue" width={250} label="Continue" onPress={handleContinue} />
                </View>
            </ContentBox>
        </ScrollView>
    );
}