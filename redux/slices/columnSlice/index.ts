/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
	createAsyncThunk, createSlice, PayloadAction, Store,
} from '@reduxjs/toolkit';
import {
	ColumnModel, InitialStateColumnModel, NewColumnPropsModel,
} from './interfaces';
import { BASE_URL } from '../../../config';

const initialState: InitialStateColumnModel = {
	status: 'no-loaded',
	isLoading: false,
	columns: [],
	error: '',
};

export const getColumns = createAsyncThunk<
	ColumnModel,
	{ rejectValue: string }
	>('columns/getColumns', async (location, { rejectWithValue, getState }) => {
		const state = getState() as ReturnType<Store['getState']>;
		const { token } = state.user.user;
		console.log(location);
		const URL: string = `${BASE_URL}boards/${location}/columns`;
		if (location) {
			console.log('location');
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
		} else {
			return [];
		}
	});


// export const createColumn = createAsyncThunk<
//   ColumnModel,
//   NewColumnPropsModel,
//   { rejectValue: string }
// >('boards/createColumn', async (body, { rejectWithValue, getState }) => {
// 	const state = getState() as ReturnType<Store['getState']>;
// 	const { token } = state.user.user;
// 	try {
// 		const response = await fetch(`${BASE_URL}boards`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});
// 		if (!response.ok) {
// 			const { statusCode, message } = await response.json();
// 			throw new Error(`${statusCode} ${message}`);
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return rejectWithValue(`${error.message}`);
// 		}
// 		return rejectWithValue('Unknown Error! Try to refresh the page');
// 	}
// });

// export const deleteColumn = createAsyncThunk<
//   ColumnModel,
//   {boardId: string},
//   { rejectValue: string }
// >('boards/deleteColumn', async (boardId, { rejectWithValue, getState }) => {
// 	const state = getState() as ReturnType<Store['getState']>;
// 	const { token } = state.user.user;
// 	try {
// 		const response = await fetch(`${BASE_URL}boards/${boardId}`, {
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
// 		return await response.json();
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return rejectWithValue(`${error.message}`);
// 		}
// 		return rejectWithValue('Unknown Error! Try to refresh the page');
// 	}
// });

// export const updateColumn = createAsyncThunk<
//   ColumnModel,
//   {boardId: string, body: NewColumnPropsModel},
//   { rejectValue: string }
// >('boards/updateColumn', async ({ boardId, body }, { rejectWithValue, getState }) => {
// 	const state = getState() as ReturnType<Store['getState']>;
// 	const { token } = state.user.user;
// 	try {
// 		const response = await fetch(`${BASE_URL}boards/${boardId}`, {
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
// 		return await response.json();
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			return rejectWithValue(`${error.message}`);
// 		}
// 		return rejectWithValue('Unknown Error! Try to refresh the page');
// 	}
// });

// export const getColumnsSet = createAsyncThunk<
//   Array<ColumnModel>,
//   {boardId: string},
//   { rejectValue: string }
// >('boards/getColumnsSet', async (boardId, { rejectWithValue, getState }) => {
// 	const state = getState() as ReturnType<Store['getState']>;
// 	const { id, token } = state.user.user;
// 	try {
// 		const response = await fetch(`${BASE_URL}boardsSet/${id}`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});
// 		return await response.json();
// 	} catch {
// 		return rejectWithValue('error');
// 	}
// });

export const columnSlice = createSlice({
	name: 'columns',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getColumns.pending, (state) => {
			state.status = 'loaded';
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			getColumns.fulfilled,
			(state, action) => {
				console.log(action);
				state.status = 'loaded';
				state.isLoading = false;
				state.columns = action.payload;
			},
		);
		builder.addCase(getColumns.rejected, (state, action) => {
			state.status = 'loaded';
			state.isLoading = false;
			state.error = action.payload as string;
		});
		// builder.addCase(getColumnsSet.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = '';
		// });
		// builder.addCase(
		// 	getColumnsSet.fulfilled,
		// 	(state, action: PayloadAction<Array<ColumnModel>>) => {
		// 		state.isLoading = false;
		// 		state.columns = action.payload;
		// 	},
		// );
		// builder.addCase(getColumnsSet.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload as string;
		// });
		// builder.addCase(createColumn.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = '';
		// });
		// builder.addCase(
		// 	createColumn.fulfilled,
		// 	(state, action: PayloadAction<ColumnModel>) => {
		// 		state.isLoading = false;
		// 		state.columns.push(action.payload);
		// 	},
		// );
		// builder.addCase(createColumn.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload as string;
		// });
		// builder.addCase(deleteColumn.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = '';
		// });
		// builder.addCase(
		// 	deleteColumn.fulfilled,
		// 	(state, action: PayloadAction<ColumnModel>) => {
		// 		state.isLoading = false;
		// 		state.columns = state.columns.filter((item) => item._id !== action.payload._id);
		// 	},
		// );
		// builder.addCase(deleteColumn.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload as string;
		// });
		// builder.addCase(updateColumn.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = '';
		// });
		// builder.addCase(
		// 	updateColumn.fulfilled,
		// 	(state, action: PayloadAction<ColumnModel>) => {
		// 		state.isLoading = false;
		// 		state.columns = state.columns.map((item) => {
		// 			if (item._id === action.payload._id) {
		// 				item.title = action.payload.title;
		// 			}
		// 			return item;
		// 		});
		// 	},
		// );
		// builder.addCase(updateColumn.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload as string;
		// });
	},
});

export const { } = columnSlice.actions;

