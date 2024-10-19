import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oprhztiruewgtiajcdmo.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcmh6dGlydWV3Z3RpYWpjZG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMTE5OTMsImV4cCI6MjA0NDY4Nzk5M30.O9lOsKrm7k6tew2Cr3bzW2C4SJKsnfFE99sHGnrPZfI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
