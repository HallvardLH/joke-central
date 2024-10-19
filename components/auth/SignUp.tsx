import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/generalUI/SmallInputField';
import ContentBox from '@/components/generalUI/ContentBox';
import Button from '@/components/buttons/Button';
import AvatarSelectorCarousel from './SelectAvatar/AvatarSelectorCarousel';

export default function SignUp() {
    const { session, signUp, signOut, signInAnonymously } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<number>(0);

    const handleSignUp = async () => {
        console.log(username)
        await signUp(email, username, password, avatar);
    };

    const handleAnonymousSignIn = async () => {
        await signInAnonymously();
    };

    return (
        <ContentBox title='Create user'>
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
            <AvatarSelectorCarousel />
            {/* <SmallInputField
                        placeholder="Avatar (number)"
                        value={avatar.toString()}
                        onChangeText={(val) => setAvatar(parseInt(val))}
                        keyboardType="numeric"
                    /> */}
            <View style={{
                marginTop: 10,
                alignItems: "center",
                gap: 14,
            }}>
                <Button variant="pink" width={250} label="Sign Up" onPress={handleSignUp} />
                <Button width={250} label="Sign In Anonymously" onPress={handleAnonymousSignIn} />
            </View>
            {session ? (
                <View>
                    <Text>Signed in as: {session.user.email}</Text>
                    <Button width={250} label="Sign Out" onPress={signOut} />
                </View>
            ) : (
                <Text>Not signed in</Text>
            )}
        </ContentBox>
    );
}