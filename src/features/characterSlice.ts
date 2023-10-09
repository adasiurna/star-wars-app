import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../models';

interface ICharacterState {
  characters: Record<string, ICharacter>;
}

const initialState: ICharacterState = {
  characters: {},
}

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacter(state, action: PayloadAction<ICharacter>) {
      state.characters[action.payload.url] = action.payload;
    },
  },
})

export const { setCharacter } = characterSlice.actions;
export default characterSlice.reducer;