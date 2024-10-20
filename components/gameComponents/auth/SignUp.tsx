import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/ui/generalUI/SmallInputField';
import ContentBox from '@/components/ui/generalUI/ContentBox';
import Button from '../../ui/buttons/Button';
import { useTheme } from 'tamagui';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { validateEmail } from '@/scripts/validation';
import { Keyboard } from 'react-native';
import { supabase } from '@/supabase';

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

        Keyboard.dismiss();
        await signUp(email, username, password, 'https://eslrohuhvzvuxvueuziv.supabase.co/storage/v1/object/public/avatars/default.png');
        router.replace("/auth/selectAvatar");
    };

    return (
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
            {/* {session ? (
                <View>
                    <Text>Signed in as: {session.user.email}</Text>
                    <Button width={250} label="Sign Out" onPress={signOut} />
                </View>
            ) : (
                <Text>Not signed in</Text>
            )} */}
        </ContentBox>
    );
}