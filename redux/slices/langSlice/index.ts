/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InitialLangStateModel, LangOption } from './interfaces';
import { engLayout, rusLayout } from './localization';

const initialState: InitialLangStateModel = {
	currentLang: LangOption.EN,
	text: engLayout,
};

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
