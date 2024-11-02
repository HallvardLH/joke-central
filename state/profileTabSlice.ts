import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileTabState {
    tab: "Your jokes" | "Your likes",
}

const initialState: ProfileTabState = {
    tab: "Your jokes"
};

export const profileTabSlice = createSlice({
    name: "viewingProfile",
    initialState,
    reducers: {
        updateProfileTab: (state, action: PayloadAction<"Your jokes" | "Your likes">) => {
            state.tab = action.payload;
        },
        resetProfileTabSlice: (state) => {
            return initialState;
        },

    },
});

export const { updateProfileTab, resetProfileTabSlice } = profileTabSlice.actions;

export default profileTabSlice.reducer;