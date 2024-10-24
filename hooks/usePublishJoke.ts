import { useState } from 'react';
import { supabase } from '@/supabase';

export function usePublishJoke() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const publishJoke = async (title: string, text: string, author: string) => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('jokes')
                .insert([{ title, text, author }]);

            if (error) throw error;

            setLoading(false);
            return data;
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    };

    const deleteJoke = async (id: number) => {
        const { data, error } = await supabase
            .from('jokes')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }

    return { publishJoke, deleteJoke, loading, error };
}

