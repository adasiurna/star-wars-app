import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilm } from '../models';

interface IFilmState {
  films: IFilm[];
}

const initialState: IFilmState = {
  films: [],
}

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<IFilm[]>) {
      state.films = action.payload;
    },
  },
})

export const { setFilms } = filmSlice.actions;
export default filmSlice.reducer;