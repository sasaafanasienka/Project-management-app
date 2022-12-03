/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InitialStateModalsModel, ModalNameModel } from './interfaces';

const initialState: InitialStateModalsModel = {
	deleteTask: false,
	newTask: false,
	detailsTask: false,
	deleteColumn: false,
	createColumn: false,
	deleteBoard: false,
	editBoard: false,
};

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		closeModals: (state) => {
			Object.keys(state).forEach(
				(key: ModalNameModel) => state[key] = false,
			);
		},
		openModal: (state, action) => {
			Object.keys(state).forEach(
				(key: ModalNameModel) => state[key] = action.payload === key,
			);
		},
	},
});

export const { openModal, closeModals } = modalsSlice.actions;
