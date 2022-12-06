/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InitialStateModalsModel, ModalNameModel } from './interfaces';

const initialState: InitialStateModalsModel = {
	deleteTask: '',
	newTask: '',
	detailsTask: '',
	deleteColumn: '',
	createColumn: '',
	deleteBoard: '',
	editBoard: '',
};

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		closeModals: (state) => {
			Object.keys(state).forEach(
				(value: string) => {
					state[value as keyof InitialStateModalsModel] = '';
				},
			);
		},
		openModal: (state, action) => {
			Object.keys(state).forEach(
				(value: string) => {
					state[value as keyof InitialStateModalsModel] = action.payload.name === value
						? action.payload.id
						: '';
				},
			);
		},
	},
});

export const { openModal, closeModals } = modalsSlice.actions;
