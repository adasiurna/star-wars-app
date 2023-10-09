import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilm } from '../models';

interface IFilmState {
  films: IFilm[];
  selectedFilm: IFilm | null;
}

const initialState: IFilmState = {
  films: [],
  selectedFilm: null,
}

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<IFilm[]>) {
      state.films = action.payload;
    },
    setSelectedFilm(state, action: PayloadAction<IFilm | null>) {
      state.selectedFilm = action.payload;
    }
  },
})

export const { setFilms, setSelectedFilm } = filmSlice.actions;
export default filmSlice.reducer;