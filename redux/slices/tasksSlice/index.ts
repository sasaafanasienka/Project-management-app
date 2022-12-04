/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
	createAsyncThunk, createSlice, PayloadAction, Store,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	TaskModel, InitialStateTaskModel, UpdateTaskBodyModel, CreateTaskModel, UpdateTaskModel, BoardTasksModel, UpdateTaskPropsModel,
} from './interfaces';
import { BASE_URL } from '../../../config';
import { readCookie } from '../../../utils/cookieUtilities';

const initialState: InitialStateTaskModel = {
	isLoading: false,
	tasks: [],
	boardTasks: {},
	error: '',
};

export const getTasksInColumn = createAsyncThunk<
	TaskModel[],
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
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(`${error.message}`);
			}
			return rejectWithValue('Unknown Error! Try to refresh the page');
		}
	});

export const getTasksInBoard = createAsyncThunk<
	TaskModel[],
	{ boardId: string },
	{ rejectValue: string }
	>('tasks/getTasksInBoard', async ({ boardId }, { rejectWithValue }) => {
		const token = readCookie('token');
		const URL: string = `${BASE_URL}tasksSet/${boardId}`;
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


export const createTask = createAsyncThunk<
  TaskModel,
  { boardId: string, columnId: string, formData: UpdateTaskPropsModel, order: number },
  { rejectValue: string }
>('tasks/createTask', async (props, { rejectWithValue, getState }) => {
	const state = getState() as ReturnType<Store['getState']>;
	const userId = state.user.user.id;
	const token = readCookie('token');
	const {
		boardId, columnId, formData, order,
	} = { ...props };
	try {
		const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ ...formData, order, userId }),
		});
		if (!response.ok) {
			const { statusCode, message } = await response.json();
			throw new Error(`${statusCode} ${message}`);
		}
		const data = await response.json();
		toast.success(`Task ${data.title} successfully created`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
			return rejectWithValue(`${error.message}`);
		}
		toast.error('Unknown Error! Try to refresh the page');
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

export const deleteTask = createAsyncThunk<
  TaskModel,
  {boardId: string, columnId: string, taskId: string},
  { rejectValue: string }
>('tasks/deleteTask', async (props, { rejectWithValue }) => {
	const token = readCookie('token');
	const { boardId, columnId, taskId } = { ...props };
	try {
		const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
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
		toast.success(`Task ${data.title} successfully deleted`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
			return rejectWithValue(`${error.message}`);
		}
		toast.error('Unknown Error! Try to refresh the page');
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

export const updateTask = createAsyncThunk<
TaskModel,
  {boardid: string, columnId: string, taskId: string, body: UpdateTaskPropsModelFull},
  { rejectValue: string }
>('tasks/updateTask', async (props, { rejectWithValue }) => {
	const token = readCookie('token');
	const {
		boardId, columnId, taskId, body,
	} = { ...props };
	try {
		const response = await fetch(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
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
		toast.success(`Task ${data.title} successfully updated`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			toast.error(error.message);
			return rejectWithValue(`${error.message}`);
		}
		toast.error('Unknown Error! Try to refresh the page');
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

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
				state.tasks = [...state.tasks, ...action.payload.filter(
					(item) => state.tasks.every((elem) => elem._id !== item._id),
				)];
			},
		);
		builder.addCase(getTasksInColumn.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(getTasksInBoard.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(getTasksInBoard.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			getTasksInBoard.fulfilled,
			(state, action) => {
				state.isLoading = false;
				state.boardTasks = action.payload.reduce<BoardTasksModel>((acc, curr) => {
					if (!acc[curr.columnId]) {
						acc[curr.columnId] = [];
						acc[curr.columnId].push(curr);
					} else {
						acc[curr.columnId].push(curr);
					}
					acc[curr.columnId].sort((a, b) => a.order - b.order);
					return acc;
				}, {});
			},
		);
		builder.addCase(createTask.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			createTask.fulfilled,
			(state, action: PayloadAction<TaskModel>) => {
				state.isLoading = false;
				if (state.boardTasks[action.payload.columnId]) {
					state.boardTasks[action.payload.columnId].push(action.payload);
				} else {
					state.boardTasks[action.payload.columnId] = [];
					state.boardTasks[action.payload.columnId].push(action.payload);
				}
			},
		);
		builder.addCase(createTask.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(deleteTask.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			deleteTask.fulfilled,
			(state, action: PayloadAction<TaskModel>) => {
				state.isLoading = false;
				state.tasks = state.tasks.filter((item) => item._id !== action.payload._id);
				state.boardTasks[action.payload.columnId] = state.boardTasks[action.payload.columnId]
					.filter((task) => task._id !== action.payload._id);
			},
		);
		builder.addCase(deleteTask.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(updateTask.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			updateTask.fulfilled,
			(state, action: PayloadAction<TaskModel>) => {
				state.isLoading = false;
				state.tasks = state.tasks.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				});
				state.boardTasks[action.payload.columnId] = state.boardTasks[action.payload.columnId]
					.map((task) => {
						if (task._id === action.payload._id) {
							return action.payload;
						}
						return task;
					});
				state.boardTasks[action.payload.columnId].sort((a, b) => a.order - b.order);
			},
		);
		builder.addCase(updateTask.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
	},
});
