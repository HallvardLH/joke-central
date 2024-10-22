import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewingProfileState {
    /** 
    * @property The uid of the profile the user is currently viewing,
    * is updated when tapping on a user
    */
    uid: string,
}

const initialState: ViewingProfileState = {
    uid: "",
};

export const viewingProfileSlice = createSlice({
    name: "viewingProfile",
    initialState,
    reducers: {
        updateViewingProfileUid: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;
        },
        resetViewingProfileSlice: (state) => {
            return initialState;
        },

    },
});

export const { updateViewingProfileUid, resetViewingProfileSlice } = viewingProfileSlice.actions;

export default viewingProfileSlice.reducer;