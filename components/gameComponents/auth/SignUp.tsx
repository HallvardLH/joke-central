import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/ui/generalUI/SmallInputField';
import ContentBox from '@/components/ui/generalUI/ContentBox';
import Button from '../../ui/buttons/Button';
import AvatarSelectorCarousel from '../SelectAvatar/AvatarSelectorCarousel';
import { useTheme } from 'tamagui';
import { router } from 'expo-router';
import { updateEmail, updateUsername, updatePassword } from '@/state/signUpSlice';
import { useDispatch } from 'react-redux';
import { validateEmail } from '@/scripts/validation';
import { Keyboard } from 'react-native';

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const theme = useTheme();

    const dispatch = useDispatch();

    const handleContinue = () => {
        if (!validateEmail(email)) {
            Alert.alert("Please enter a valid email.")
            return
        }

        if (password.length < 6) {
            Alert.alert("Your password should be at least 6 characters long.")
            return
        }
        dispatch(updateEmail(email));
        dispatch(updatePassword(password));
        dispatch(updateUsername(username));
        Keyboard.dismiss();
        router.replace("/auth/selectAvatar");

    }

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