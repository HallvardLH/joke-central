import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase';

interface Profile {
    username: string | null;
    avatar_url: string | null;
}

export const useProfile = (userId: string | null) => {
    const [profile, setProfile] = useState<Profile>({ username: null, avatar_url: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = useCallback(async () => {
        if (!userId) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', userId)
                .single();

            if (error) {
                setError('Error fetching profile');
                console.error('Error fetching profile:', error);
            } else if (data) {
                setProfile({
                    username: data.username,
                    avatar_url: data.avatar_url,
                });
                setError(null);
            }
        } catch (err) {
            setError('Error fetching profile');
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    return { profile, loading, error, refetchProfile: fetchUserProfile };
};
