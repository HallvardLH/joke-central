import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/supabase';

interface SettingsState {
    interstitialAdFeedFrequency: number;
    loading: boolean;
    error: string | null;
}

const initialState: SettingsState = {
    interstitialAdFeedFrequency: 15,
    loading: false,
    error: null,
};

// Asynchronous thunk to fetch settings from Supabase
export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (_, { rejectWithValue }) => {
        const { data, error } = await supabase.from('settings').select('*').single();

        if (error) {
            console.error("Error fetching settings:", error);
            return rejectWithValue(error.message);
        }
        return data?.interstitial_feed_frequency || 15; // Default to 15 if not defined
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setAdFrequency(state, action: PayloadAction<number>) {
            state.interstitialAdFeedFrequency = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action: PayloadAction<number>) => {
                state.interstitialAdFeedFrequency = action.payload;
                state.loading = false;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setAdFrequency } = settingsSlice.actions;
export default settingsSlice.reducer;
