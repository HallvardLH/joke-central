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

export const useFetchJokes = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJokes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('jokes')
            .select(`
                id,
                title,
                text,
                author,
                profiles (username, avatar_url)  -- Join the profiles table
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
                avatar_url: joke.profiles?.avatar_url || null
            }));
            setJokes(transformedJokes || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJokes(); // Initial fetch
    }, []);

    return { jokes, loading, error, refetch: fetchJokes };
};
