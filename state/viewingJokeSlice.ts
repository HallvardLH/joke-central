import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Joke } from '@/components/gameComponents/browse/Joke';

interface ViewingJokeState {
    joke: Joke | null,
}

const initialState: ViewingJokeState = {
    joke: null,
};

export const viewingJokeSlice = createSlice({
    name: "viewingProfile",
    initialState,
    reducers: {
        updateViewingJoke: (state, action: PayloadAction<Joke>) => {
            state.joke = action.payload;
        },
        resetViewingJokeSlice: (state) => {
            return initialState;
        },

    },
});

export const { updateViewingJoke, resetViewingJokeSlice } = viewingJokeSlice.actions;

export default viewingJokeSlice.reducer;