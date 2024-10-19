import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignUpState {
    /** 
    * @property The email the user is signing up with
    */
    email: string;

    /** 
    * @property The username the user is signing up with
    */
    username: string;

    /** 
    * @property The password the user is signing up with
    */
    password: string;

    /** 
    * @property The id of the avatar the user has selected during sign up
    */
    selectedAvatarId: string;
}

const initialState: SignUpState = {
    email: "",
    username: "",
    password: "",
    selectedAvatarId: "",
};

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        updatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        updateSelectedAvatarId: (state, action: PayloadAction<string>) => {
            state.selectedAvatarId = action.payload;
        },
        resetSignUpSlice: () => {
            return initialState;
        },
    },
});

// Export actions
export const {
    updateEmail,
    updateUsername,
    updatePassword,
    updateSelectedAvatarId,
    resetSignUpSlice,
} = signUpSlice.actions;

// Export reducer
export default signUpSlice.reducer;
