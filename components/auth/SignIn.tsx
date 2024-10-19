import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/generalUI/SmallInputField';
import ContentBox from '@/components/generalUI/ContentBox';
import Button from '@/components/buttons/Button';

export default function SignIn() {
    const { session, signIn, signOut, signInAnonymously } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleSignIn = async () => {
        await signIn(email, password);
    };

    const handleAnonymousSignIn = async () => {
        await signInAnonymously();
    };

    return (
        <ContentBox title="Sign in">
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
                <Button variant="pink" width={250} label="Sign In" onPress={handleSignIn} />
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
