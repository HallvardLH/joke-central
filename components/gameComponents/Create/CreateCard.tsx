import React, { useState } from 'react';
import { Input, TextArea, useTheme, View, ScrollView } from 'tamagui';
import Text from '@/components/ui/generalUI/Text';
import Button from '@/components/ui/buttons/Button';
import { usePublishJoke } from '@/hooks/usePublishJoke';
import { supabase } from '@/supabase';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

export default function CreateCard() {
    const theme = useTheme();
    const [jokeTitle, setJokeTitle] = useState<string>('');
    const [jokeText, setJokeText] = useState<string>('');
    const { publishJoke, loading, error } = usePublishJoke();

    const handlePublish = async () => {
        // Fetch authenticated user's information
        const { data, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error(userError);
            alert('Error fetching user');
            return;
        }

        const uid = data?.user?.id;

        if (jokeText.trim() && uid) {
            const result = await publishJoke(jokeTitle, jokeText, uid);
            if (result) {
                setJokeText('');
                setJokeTitle('');
            }
        } else {
            alert('Please write a joke before posting.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardDismissMode="on-drag">
            <View style={{ gap: 10, flex: 1 }}>

                <View style={{
                    marginHorizontal: width * .05,
                    gap: 14,
                    backgroundColor: theme.background.val,
                    padding: 14,
                    borderRadius: 20,
                }}>
                    <View style={{
                        borderRadius: 20,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.accentPurpleDark.val
                    }}>
                        <Text shadow={theme.enableShadow.val === 1} color={theme.background.val}>Write a joke</Text>
                    </View>
                    <Input
                        value={jokeTitle}
                        onChangeText={setJokeTitle}
                        placeholder="The title of your joke..."
                        backgroundColor={theme.isLightMode.val === 1 ? theme.background.val : theme.background2.val}
                        borderWidth={theme.isLightMode.val === 1 ? 1.5 : 0}
                        borderColor={theme.inputBorder.val}
                        padding={10}
                        focusStyle={{ borderColor: theme.inputBorderFocus.val }}
                        color={theme.isLightMode.val === 1 ? theme.background2.val : theme.background.val}
                    />
                    <TextArea
                        value={jokeText}
                        onChangeText={setJokeText}
                        placeholder="Write your joke..."
                        padding={10}
                        lineHeight={16}
                        focusStyle={{ borderColor: theme.inputBorderFocus.val }}
                        borderWidth={theme.isLightMode.val === 1 ? 1.5 : 0}
                        borderColor={theme.inputBorder.val}
                        verticalAlign="top"
                        numberOfLines={10}
                        multiline
                        minHeight={200}
                        maxHeight={height / 3}
                        color={theme.isLightMode.val === 1 ? theme.background2.val : theme.background.val}
                        backgroundColor={theme.isLightMode.val === 1 ? theme.background.val : theme.background2.val}
                    />
                    <View style={{
                        // paddingHorizontal: 22,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Button
                            variant="pink"
                            label="Delete"
                            onPress={() => setJokeText('')}
                            width={125}
                        />
                        <Button
                            variant="blue"
                            label={loading ? 'Posting...' : 'Post joke'}
                            onPress={handlePublish}
                            disabled={loading}
                            width={125}
                        />

                    </View>
                </View>

                {error && <Text style={{ color: 'red' }}>{error}</Text>}
            </View>
        </ScrollView>
    );
}
