import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import useAuth from './useAuth';

export const useLikes = (itemId: number) => {
    const { getSession } = useAuth();
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);

    // Fetch likes on component mount or when itemId changes
    useEffect(() => {
        setLiked(false); // Reset liked state when itemId changes
        const fetchLikes = async () => {
            const result = await supabase.from('likes').select('*', { count: 'exact' }).eq('joke_id', itemId);
            const session = await getSession();

            if (session && 'user' in session && session.user?.id) {
                result.data?.forEach((item_: any) => {
                    if (item_.user_id === session.user.id) {
                        setLiked(true);
                    }
                });
            }

            if (result?.count) setLikes(result.count);
            else setLikes(0);
        };

        fetchLikes();
    }, [itemId]);


    // Add like to the database
    const addLike = async (jokeId: number) => {
        const session = await getSession();
        if (session && session.user?.id) {
            const { data, error } = await supabase.from('likes').insert([
                { joke_id: jokeId, user_id: session.user.id },
            ]);
            return { data, error };
        }
        return { error: 'No user session' };
    };

    // Remove like from the database
    const removeLike = async (jokeId: number) => {
        const session = await getSession();
        if (session && session.user?.id) {
            const { data, error } = await supabase.from('likes').delete().eq('joke_id', jokeId).eq('user_id', session.user.id);
            return { data, error };
        }
        return { error: 'No user session' };
    };

    // Handle like/unlike action
    const toggleLike = async () => {
        if (!liked) {
            // Optimistic update for adding like
            setLiked(true);
            setLikes((prevLikes) => prevLikes + 1);

            const result = await addLike(itemId);
            if (result.error != null) {
                // Rollback if there was an error
                setLikes((prevLikes) => prevLikes - 1);
                setLiked(false);
            }
        } else {
            // Optimistic update for removing like
            setLiked(false);
            setLikes((prevLikes) => prevLikes - 1);

            const result = await removeLike(itemId);
            if (result.error != null) {
                // Rollback if there was an error
                setLikes((prevLikes) => prevLikes + 1);
                setLiked(true);
            }
        }
    };

    return { likes, liked, toggleLike };
};

