import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

interface Joke {
    id: number;
    title: string;
    text: string;
}

export const useFetchJokes = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJokes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('jokes')
            .select('id, title, text'); // Ensure 'id' is selected along with title and text

        if (error) {
            setError(error.message);
        } else {
            setJokes(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJokes(); // Initial fetch
    }, []);

    return { jokes, loading, error, refetch: fetchJokes };
};
