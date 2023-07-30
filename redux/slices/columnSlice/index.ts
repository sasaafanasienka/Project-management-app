/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
	createAsyncThunk, createSlice, PayloadAction, Store,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	ColumnModel,
	DeleteColumnModel,
	InitialStateColumnModel,
	UpdateColumnModel,
	UpdateColumnPropsModel,
} from './interfaces';
import { BASE_URL } from '../../../config';
import { readCookie } from '../../../utils/cookieUtilities';

const initialState: InitialStateColumnModel = {
	status: 'no-loaded',
	isLoading: false,
	columns: [],
	error: '',
};

export const getBoardColumns = createAsyncThunk<
	ColumnModel[],
	{boardId: string},
	{ rejectValue: string }
	>('columns/getBoardColumns', async (props, { rejectWithValue, getState }) => {
		const { boardId } = { ...props };
		const state = getState() as ReturnType<Store['getState']>;
		const token = readCookie('token');
		const URL: string = `${BASE_URL}boards/${boardId}/columns`;
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
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(`${error.message}`);
			}
			return rejectWithValue('Unknown Error! Try to refresh the page');
		}
	});

export const getBoardById = createAsyncThunk<
	ColumnModel,
	{ rejectValue: string }
	>('columns/getBoardById', async (location, { rejectWithValue, getState }) => {
		const state = getState() as ReturnType<Store['getState']>;
		const messages = state.lang.text;
		const token = readCookie('token');
		const URL: string = `${BASE_URL}boards/${location}/columns`;
		if (location) {
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


export const createColumn = createAsyncThunk<
  ColumnModel,
  { boardId: string, formData: UpdateColumnPropsModel, order: number },
  { rejectValue: string }
>('boards/createColumn', async (props, { rejectWithValue, getState }) => {
	const state = getState() as ReturnType<Store['getState']>;
	const messages = state.lang.text;
	const { token } = state.user.user;
	console.log(props);
	const { boardId, formData, order } = { ...props };
	console.log(boardId);
	console.log(`${BASE_URL}boards/${boardId}/columns`);
	try {
		const response = await fetch(`${BASE_URL}boards/${boardId}/columns`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ ...formData, order }),
		});
		if (!response.ok) {
			const { statusCode, message } = await response.json();
			throw new Error(`${statusCode} ${message}`);
		}
		const data = await response.json();
		toast.success(`${messages.columnTxt} ${data.title} ${messages.scsCreated}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(`${messages.errorOccured} ${error.message}`);
			return rejectWithValue(`${error.message}`);
		}
		toast.error(`${messages.toastUnknownError}`);
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

export const deleteColumn = createAsyncThunk<
  ColumnModel, DeleteColumnModel, { rejectValue: string }
	>('boards/deleteColumn', async (props, { rejectWithValue, getState }) => {
		const state = getState() as ReturnType<Store['getState']>;
		const messages = state.lang.text;
		const token = readCookie('token');
		const { boardId, columnId } = { ...props };
		try {
			const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}`, {
				method: 'DELETE',
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
			toast.success(`${messages.columnTxt} ${data.title} ${messages.scsDeleted}`);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`${messages.errorOccured} ${error.message}`);
				return rejectWithValue(`${error.message}`);
			}
			toast.error(`${messages.toastUnknownError}`);
			return rejectWithValue('Unknown Error! Try to refresh the page');
		}
	});

export const updateColumn = createAsyncThunk<
	ColumnModel, UpdateColumnModel, { rejectValue: string }
	>('columns/updateColumn', async (props, { rejectWithValue, getState }) => {
		const state = getState() as ReturnType<Store['getState']>;
		const messages = state.lang.text;
		const token = readCookie('token');
		const { boardId, columnId, body } = { ...props };
		try {
			const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				const { statusCode, message } = await response.json();
				throw new Error(`${statusCode} ${message}`);
			}
			const data = await response.json();
			toast.success(`${messages.columnTxt} ${data.title} ${messages.scsUpdated}`);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`${messages.errorOccured} ${error.message}`);
				return rejectWithValue(`${error.message}`);
			}
			toast.error(`${messages.toastUnknownError}`);
			return rejectWithValue('Unknown Error! Try to refresh the page');
		}
	});

export const columnSlice = createSlice({
	name: 'columns',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getBoardColumns.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			getBoardColumns.fulfilled,
			(state, action: PayloadAction<ColumnModel[]>) => {
				state.isLoading = false;
				state.columns = action.payload.sort((a, b) => a.order - b.order);
			},
		);
		builder.addCase(getBoardColumns.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(createColumn.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			createColumn.fulfilled,
			(state, action: PayloadAction<ColumnModel>) => {
				state.isLoading = false;
				state.columns.push(action.payload);
			},
		);
		builder.addCase(createColumn.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(deleteColumn.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			deleteColumn.fulfilled,
			(state, action: PayloadAction<ColumnModel>) => {
				state.isLoading = false;
				state.columns = state.columns.filter((item) => item._id !== action.payload._id);
			},
		);
		builder.addCase(deleteColumn.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(updateColumn.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			updateColumn.fulfilled,
			(state, action: PayloadAction<ColumnModel>) => {
				state.isLoading = false;
				state.columns = state.columns.map((item) => {
					if (item._id === action.payload._id) {
						item.title = action.payload.title;
						item.order = action.payload.order;
					}
					return item;
				}).sort((a, b) => a.order - b.order);
			},
		);
		builder.addCase(updateColumn.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
	},
});
