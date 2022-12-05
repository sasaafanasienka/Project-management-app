/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InitialStateModalsModel, ModalNameModel } from './interfaces';

const initialState: InitialStateModalsModel = {
	deleteTask: null,
	newTask: null,
	detailsTask: null,
	deleteColumn: null,
	createColumn: null,
	deleteBoard: null,
	editBoard: null,
};

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		closeModals: (state) => {
			Object.keys(state).forEach(
				(key: ModalNameModel) => state[key] = null,
			);
		},
		openModal: (state, action) => {
			Object.keys(state).forEach(
				(key: ModalNameModel) => state[key] = action.payload.name === key
					? action.payload.id
					: null,
			);
		},
	},
});

export const { openModal, closeModals } = modalsSlice.actions;
