import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './features/filmSlice';
import characterReducer from './features/characterSlice';

const store = configureStore({
  reducer: {
    films: filmReducer,
    characters: characterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export default store;