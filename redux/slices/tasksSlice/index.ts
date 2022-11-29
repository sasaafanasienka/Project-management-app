/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
	createAsyncThunk, createSlice, PayloadAction, Store,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	TaskModel, InitialStateTaskModel, UpdateTaskPropsModel,
} from './interfaces';
import { BASE_URL } from '../../../config';
import { readCookie } from '../../../utils/cookieUtilities';

const initialState: InitialStateTaskModel = {
	isLoading: false,
	tasks: [],
	error: '',
};

export const getTasksInColumn = createAsyncThunk<
	{ boardid: string, columnId: string },
	{ rejectValue: string }
	>('tasks/getTasksInColumn', async (props, { rejectWithValue }) => {
		const { boardid, columnId } = { ...props };
		const token = readCookie('token');
		const URL: string = `${BASE_URL}boards/${boardid}/columns/${columnId}/tasks`;
		try {
			const response = await fetch(URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				const { statusCode, message } = await response.json();
				throw new Error(`${statusCode} ${message}`);
			}
			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(`${error.message}`);
			}
			return rejectWithValue('Unknown Error! Try to refresh the page');
		}
	});


// export const createColumn = createAsyncThunk<
//   ColumnModel,
//   { boardid: string, formData: UpdateColumnPropsModel },
//   { rejectValue: string }
// >('boards/createColumn', async (props, { rejectWithValue, getState }) => {
// 	const state = getState() as ReturnType<Store['getState']>;
// 	const { token } = state.user.user;
// 	const { boardid, formData } = { ...props };
// 	try {
// 		const response = await fetch(`${BASE_URL}boards/${boardid}/columns`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: JSON.stringify({ ...formData, order: 0 }),
// 		});
// 		if (!response.ok) {
// 			const { statusCode, message } = await response.json();
// 			throw new Error(`${statusCode} ${message}`);
// 		}
// 		const data = await response.json();
// 		toast.success(`Column ${data.title} successfully created`);
// 		return data;
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			toast.error(error.message);
// 			return rejectWithValue(`${error.message}`);
// 		}
// 		toast.error('Unknown Error! Try to refresh the page');
// 		return rejectWithValue('Unknown Error! Try to refresh the page');
// 	}
// });

// export const deleteColumn = createAsyncThunk<
//   ColumnModel,
//   {boardid: string, columnId: string},
//   { rejectValue: string }
// >('boards/deleteColumn', async (props, { rejectWithValue }) => {
// 	const token = readCookie('token');
// 	const { boardid, columnId } = { ...props };
// 	try {
// 		const response = await fetch(`${BASE_URL}boards/${boardid}/columns/${columnId}`, {
// 			method: 'DELETE',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});
// 		if (!response.ok) {
// 			const { statusCode, message } = await response.json();
// 			throw new Error(`${statusCode} ${message}`);
// 		}
// 		const data = await response.json();
// 		toast.success(`Column ${data.title} successfully deleted`);
// 		return data;
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			toast.error(error.message);
// 			return rejectWithValue(`${error.message}`);
// 		}
// 		toast.error('Unknown Error! Try to refresh the page');
// 		return rejectWithValue('Unknown Error! Try to refresh the page');
// 	}
// });

// export const updateColumn = createAsyncThunk<
// ColumnModel,
//   {boardid: string, columnId: string, body: UpdateColumnPropsModel},
//   { rejectValue: string }
// >('boards/updateColumn', async (props, { rejectWithValue }) => {
// 	const token = readCookie('token');
// 	const { boardid, columnId, body } = { ...props };
// 	try {
// 		const response = await fetch(`${BASE_URL}boards/${boardid}/columns/${columnId}`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: JSON.stringify(body),
// 		});
// 		if (!response.ok) {
// 			const { statusCode, message } = await response.json();
// 			throw new Error(`${statusCode} ${message}`);
// 		}
// 		const data = await response.json();
// 		toast.success(`Column ${data.title} successfully renamed`);
// 		return data;
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			toast.error(error.message);
// 			return rejectWithValue(`${error.message}`);
// 		}
// 		toast.error('Unknown Error! Try to refresh the page');
// 		return rejectWithValue('Unknown Error! Try to refresh the page');
// 	}
// });

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getTasksInColumn.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			getTasksInColumn.fulfilled,
			(state, action) => {
				state.isLoading = false;
				state.tasks = action.payload;
			},
		);
		builder.addCase(getTasksInColumn.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		// 		builder.addCase(createColumn.pending, (state) => {
		// 			state.isLoading = true;
		// 			state.error = '';
		// 		});
		// 		builder.addCase(
		// 			createColumn.fulfilled,
		// 			(state, action: PayloadAction<ColumnModel>) => {
		// 				state.isLoading = false;
		// 				state.columns.push(action.payload);
		// 			},
		// 		);
		// 		builder.addCase(createColumn.rejected, (state, action) => {
		// 			state.isLoading = false;
		// 			state.error = action.payload as string;
		// 		});
		// 		builder.addCase(deleteColumn.pending, (state) => {
		// 			state.isLoading = true;
		// 			state.error = '';
		// 		});
		// 		builder.addCase(
		// 			deleteColumn.fulfilled,
		// 			(state, action: PayloadAction<ColumnModel>) => {
		// 				state.isLoading = false;
		// 				state.columns = state.columns.filter((item) => item._id !== action.payload._id);
		// 			},
		// 		);
		// 		builder.addCase(deleteColumn.rejected, (state, action) => {
		// 			state.isLoading = false;
		// 			state.error = action.payload as string;
		// 		});
		// 		builder.addCase(updateColumn.pending, (state) => {
		// 			state.isLoading = true;
		// 			state.error = '';
		// 		});
		// 		builder.addCase(
		// 			updateColumn.fulfilled,
		// 			(state, action: PayloadAction<ColumnModel>) => {
		// 				state.isLoading = false;
		// 				state.columns = state.columns.map((item) => {
		// 					if (item._id === action.payload._id) {
		// 						item.title = action.payload.title;
		// 					}
		// 					return item;
		// 				});
		// 			},
		// 		);
		// 		builder.addCase(updateColumn.rejected, (state, action) => {
		// 			state.isLoading = false;
		// 			state.error = action.payload as string;
		// 		});
	},
});
