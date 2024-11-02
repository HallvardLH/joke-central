import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
