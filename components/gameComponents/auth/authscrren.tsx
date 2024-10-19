import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/ui/generalUI/SmallInputField';
import ContentBox from '@/components/ui/generalUI/ContentBox';
import ScreenView from '@/components/ui/layout/ScreenView';
import Button from '../../ui/buttons/Button';

export default function AuthScreen() {
    const { session, signIn, signUp, signOut, signInAnonymously, anonToPermanentUser } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<number>(0);

    const handleSignIn = async () => {
        await signIn(email, password);
    };

    const handleSignUp = async () => {
        console.log(username)
        await signUp(email, username, password, avatar);
        // await anonToPermanentUser(email, username, password, avatar);
    };

    const handleAnonymousSignIn = async () => {
        await signInAnonymously();
    };

    const handleAnonToPerm = async () => {
        await anonToPermanentUser(email, username, password, avatar);
    };

    return (
        <ScreenView>
            <ContentBox title='Create user'>
                <View style={{
                    gap: 0
                }}>
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
                    <SmallInputField
                        placeholder="Avatar (number)"
                        value={avatar.toString()}
                        onChangeText={(val) => setAvatar(parseInt(val))}
                        keyboardType="numeric"
                    />
                </View>
            </ContentBox>
            <Button variant="blue" width={250} label="Sign In" onPress={handleSignIn} />
            <Button width={250} label="Sign Up" onPress={handleSignUp} />
            <Button width={250} label="Sign In Anonymously" onPress={handleAnonymousSignIn} />
            {/* <Button width={250} label="Convert to Permanent User" onPress={handleAnonToPerm} /> */}
            {session ? (
                <View>
                    <Text>Signed in as: {session.user.email}</Text>
                    <Button width={250} label="Sign Out" onPress={signOut} />
                </View>
            ) : (
                <Text>Not signed in</Text>
            )}

        </ScreenView>
    );
}
