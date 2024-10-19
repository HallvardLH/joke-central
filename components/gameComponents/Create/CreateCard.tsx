import React, { useState } from 'react';
import ContentBox from '../../ui/generalUI/ContentBox';
import { Input, TextArea, useTheme, View, Text } from 'tamagui';
import Button from '@/components/ui/buttons/Button';
import { usePublishJoke } from '@/hooks/usePublishJoke';
import { supabase } from '@/supabase';

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
            <ContentBox title="Write your own joke">
                <Input
                    value={jokeTitle}
                    onChangeText={setJokeTitle}
                    placeholder="The title of your joke..."
                    backgroundColor={"white"}
                    borderWidth={0}
                    padding={10}
                />
                <TextArea
                    value={jokeText}
                    onChangeText={setJokeText}
                    placeholder="Write your joke..."
                    padding={10}
                    borderWidth={0}
                    verticalAlign="top"
                    numberOfLines={10}
                    color={theme.accentPurpleDark}
                    backgroundColor={"white"}
                />
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
            </ContentBox>
        </View>
    );
}
