import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

interface Joke {
    id: number;
    title: string;
    text: string;
    author: string;
    username: string | null;
    avatar_url: string | null;
}

export const useFetchJokes = (userId: string | undefined) => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [userReads, setUserReads] = useState<number[]>([]); // Changed to number[] to match joke_id type
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all jokes
    const fetchJokes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('jokes')
            .select(`
                id,
                title,
                text,
                author,
                profiles (id, username, avatar_url)  -- Join the profiles table
            `);

        if (error) {
            setError(error.message);
        } else {
            const transformedJokes = data.map((joke: any) => ({
                id: joke.id,
                title: joke.title,
                text: joke.text,
                author: joke.author,  // uid
                username: joke.profiles?.username || 'Anonymous',
                avatar_url: joke.profiles?.avatar_url || null,
                uid: joke.profiles?.id,
            }));
            setJokes(transformedJokes || []);
        }
        setLoading(false);
    };

    // Fetch jokes that the user has marked as read
    const fetchUserReads = async (userId: string) => {
        const { data: readJokes, error: readJokesError } = await supabase
            .from('joke_read_status')
            .select('joke_id')
            .eq('user_id', userId);

        if (readJokesError) {
            console.error('Error fetching read jokes:', readJokesError);
            setError(readJokesError.message);
            return;
        }

        setUserReads(readJokes.map(joke => joke.joke_id));
    };

    useEffect(() => {
        fetchJokes(); // Fetch jokes when the component mounts
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserReads(userId); // Fetch user reads if userId is provided
        }
    }, [userId]);

    return { jokes, userReads, loading, error, refetch: fetchJokes };
};
