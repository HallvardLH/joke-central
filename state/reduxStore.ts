import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import viewingProfileSlice from './viewingProfileSlice';
import signUpSlice from './signUpSlice';
import viewingJokeSlice from './viewingJokeSlice';
import settingsSlice from './settingsSlice';
import profileTabSlice from './profileTabSlice';

const rootReducer = combineReducers({
    viewingProfile: viewingProfileSlice,
    signUp: signUpSlice,
    viewingJoke: viewingJokeSlice,
    settings: settingsSlice,
    profileTab: profileTabSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
