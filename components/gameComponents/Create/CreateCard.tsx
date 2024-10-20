import React, { useState } from 'react';
import ContentBox from '../../ui/generalUI/ContentBox';
import { Input, TextArea, useTheme, View, ScrollView } from 'tamagui';
import Text from '@/components/ui/generalUI/Text';
import Button from '@/components/ui/buttons/Button';
import { usePublishJoke } from '@/hooks/usePublishJoke';
import { supabase } from '@/supabase';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get("screen");

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

        const uid = data?.user?.id;  // Extract the user's UID from the response

        if (jokeText.trim() && uid) {
            const result = await publishJoke(jokeTitle, jokeText, uid);  // Pass the UID as author
            if (result) {
                setJokeText(''); // Clear the textarea on success
            }
        } else {
            alert('Please write a joke and make sure you are logged in.');
        }
    };

    return (
        <ScrollView keyboardDismissMode="on-drag">
            <View style={{ gap: 10 }}>
                <View style={{
                    paddingHorizontal: 22,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <Button
                        variant="blue"
                        label={loading ? 'Posting...' : 'Post joke'}
                        onPress={handlePublish}
                        disabled={loading}
                    />
                    <Button
                        variant="pink"
                        label="Delete"
                        onPress={() => setJokeText('')} // Clear the textarea
                    />
                </View>
                {/* <ContentBox style={{ paddingBottom: 200, }} title="Write your own joke"> */}
                <View style={{
                    marginHorizontal: 24,
                    gap: 14,
                    backgroundColor: theme.background.val,
                    padding: 14,
                    borderRadius: 16,
                }}>
                    <View style={{
                        borderRadius: 20,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme.accentPurpleDark.val
                    }}>
                        <Text shadow={theme.enableShadow.val === 1} color={theme.background.val}>Write your own joke</Text>
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
                    />
                    <TextArea
                        value={jokeText}
                        onChangeText={setJokeText}
                        placeholder="Write your joke..."
                        padding={10}
                        focusStyle={{ borderColor: theme.inputBorderFocus.val }}
                        borderWidth={theme.isLightMode.val === 1 ? 1.5 : 0}
                        borderColor={theme.inputBorder.val}
                        verticalAlign="top"
                        numberOfLines={10}
                        multiline
                        minHeight={200}
                        maxHeight={height / 3}
                        color={theme.accentPurpleDark}
                        backgroundColor={theme.isLightMode.val === 1 ? theme.background.val : theme.background2.val}
                    />
                </View>
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
                {/* </ContentBox> */}
            </View>
        </ScrollView>
    );
}
