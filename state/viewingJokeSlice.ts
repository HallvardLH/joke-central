import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Joke } from '@/components/gameComponents/browse/Joke';

interface ViewingJokeState {
    joke: Joke | null,
    gradientStart: string,
    gradientEnd: string,
}

const initialState: ViewingJokeState = {
    joke: null,
    gradientStart: "",
    gradientEnd: "",
};

export const viewingJokeSlice = createSlice({
    name: "viewingProfile",
    initialState,
    reducers: {
        updateViewingJoke: (state, action: PayloadAction<Joke>) => {
            state.joke = action.payload;
        },
        updateGradientStart: (state, action: PayloadAction<string>) => {
            state.gradientStart = action.payload;
        },
        updateGradientEnd: (state, action: PayloadAction<string>) => {
            state.gradientEnd = action.payload;
        },
        resetViewingJokeSlice: (state) => {
            return initialState;
        },

    },
});

export const { updateViewingJoke, updateGradientStart, updateGradientEnd, resetViewingJokeSlice } = viewingJokeSlice.actions;

export default viewingJokeSlice.reducer;