import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';
import useAuth from './useAuth';

export const useStats = (userId: string) => {
    const { getSession } = useAuth();
    const [jokes, setJokes] = useState<number>(0);
    const [likes, setLikes] = useState<number>(0);
    const [reads, setReads] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJokes = useCallback(async () => {
        try {
            const result = await supabase
                .from('jokes')
                .select('*', { count: 'exact' })
                .eq('author', userId);

            if (result.error) throw result.error;

            setJokes(result.count || 0);
        } catch (err: any) {
            setError(err.message || 'Error fetching jokes');
            setJokes(0);
        }
    }, [userId]);

    const fetchLikes = useCallback(async () => {
        try {
            const userJokes = await supabase
                .from('jokes')
                .select('id')
                .eq('author', userId);

            if (userJokes.error) throw userJokes.error;

            const jokeIds = userJokes.data?.map(joke => joke.id) || [];

            const result = await supabase
                .from('likes')
                .select('*', { count: 'exact' })
                .in('joke_id', jokeIds);

            if (result.error) throw result.error;

            setLikes(result.count || 0);
        } catch (err: any) {
            setError(err.message || 'Error fetching likes');
            setLikes(0);
        }
    }, [userId]);

    const fetchReads = useCallback(async () => {
        try {
            const userJokes = await supabase
                .from('jokes')
                .select('id')
                .eq('author', userId);

            if (userJokes.error) throw userJokes.error;

            const jokeIds = userJokes.data?.map(joke => joke.id) || [];

            const result = await supabase
                .from('joke_read_status')
                .select('*', { count: 'exact' })
                .in('joke_id', jokeIds);

            if (result.error) throw result.error;

            setReads(result.count || 0);
        } catch (err: any) {
            setError(err.message || 'Error fetching reads');
            setReads(0);
        }
    }, [userId]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        await Promise.all([fetchJokes(), fetchLikes(), fetchReads()]);

        setLoading(false);
    }, [fetchJokes, fetchLikes, fetchReads]);

    useEffect(() => {
        if (userId) {
            fetchData();
        } else {
            setLoading(false);  // Avoid loading indefinitely if no userId
        }
    }, [userId, fetchData]);

    return { jokes, likes, reads, loading, error, refetch: fetchData };
};
