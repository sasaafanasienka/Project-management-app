import { createSlice } from '@reduxjs/toolkit';
import { InitialStateModel, LangOption } from './interfaces';
import { engLayout, rusLayout } from './localization';

const initialState: InitialStateModel = {
  currentLang: LangOption.EN,
  text: engLayout,
}

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    switchToEng: (state) => {
      state.currentLang = LangOption.EN;
      state.text = engLayout;
    },
    switchToRus: (state) => {
      state.currentLang = LangOption.RU;
      state.text = rusLayout;
    },
  },
});

export const { switchToEng, switchToRus } = langSlice.actions;