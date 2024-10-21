import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import useAuth from '@/hooks/useAuth';
import SmallInputField from '@/components/ui/generalUI/SmallInputField';
import ContentBox from '@/components/ui/generalUI/ContentBox';
import Button from '../../ui/buttons/Button';
import { router } from 'expo-router';

export default function SignIn() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignIn = async () => {
        await signIn(email, password);
        router.navigate("/(tabs)");
    };

    return (
        <ScrollView keyboardDismissMode="on-drag">
            <ContentBox title="Sign in">
                <SmallInputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                </View>
            </ContentBox>
        </ScrollView>
    );
}
