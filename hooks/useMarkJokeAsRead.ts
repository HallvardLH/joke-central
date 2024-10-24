import { useState } from 'react';
import { supabase } from '@/supabase'; // Adjust the import based on your setup

interface UseMarkJokeAsReadProps {
    jokeId: number;
    userId?: string; // Optional, fallback to current user if not passed
}

export default function useMarkJokeAsRead() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const markJokeAsRead = async ({ jokeId, userId }: UseMarkJokeAsReadProps) => {
        setIsLoading(true);
        setError(null);

        if (!userId) {
            setError('User is not authenticated');
            setIsLoading(false);
            return;
        }

        try {
            // Check if the record already exists
            const { data: existingRecord, error: checkError } = await supabase
                .from('joke_read_status')
                .select('*')
                .eq('user_id', userId)
                .eq('joke_id', jokeId)
                .single(); // We expect only one result (if any)

            if (checkError && checkError.code !== 'PGRST116') {
                // Any error other than 'PGRST116' (which indicates no record was found) should be handled
                throw new Error(checkError.message);
            }

            if (existingRecord) {
                // If record exists, no need to insert again
                console.log('Joke already marked as read');
                setIsLoading(false);
                return;
            }

            // If record does not exist, insert the read status into the database
            const { error } = await supabase.from('joke_read_status').insert([
                {
                    user_id: userId,
                    joke_id: jokeId,
                }
            ]);

            if (error) {
                throw new Error(error.message);
            }

            console.log('Joke marked as read successfully');
        } catch (err: any) {
            console.log('Error marking joke as read:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        markJokeAsRead,
        isLoading,
        error,
    };
}
