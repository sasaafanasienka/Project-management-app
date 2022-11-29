/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
	createAsyncThunk, createSlice, PayloadAction, Store,
} from '@reduxjs/toolkit';
import {
	BoardModel, BoardUserModel, InitialStateBoardModel, NewBoardPropsModel,
} from './interfaces';

const BASE_URL = 'https://final-task-backend-production-287c.up.railway.app/';

const initialState: InitialStateBoardModel = {
	isLoading: false,
	boards: [],
	error: '',
};

export const createBoard = createAsyncThunk<
  BoardUserModel,
  NewBoardPropsModel,
  { rejectValue: string }
>('boards/createBoard', async (body, { rejectWithValue, getState }) => {
	const state = getState() as ReturnType<Store['getState']>;
	const { token, id } = state.user.user;
	const bodyWithOwner = Object.assign(body, { owner: id });
	try {
		const response = await fetch(`${BASE_URL}boards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bodyWithOwner),
		});
		if (!response.ok) {
			const { statusCode, message } = await response.json();
			throw new Error(`${statusCode} ${message}`);
		}
		const newBoard = await response.json();
		return Object.assign(newBoard, { invited: false });
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(`${error.message}`);
		}
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

export const deleteBoard = createAsyncThunk<
  BoardModel,
  {boardId: string},
  { rejectValue: string }
>('boards/deleteBoard', async ({ boardId }, { rejectWithValue, getState }) => {
	const state = getState() as ReturnType<Store['getState']>;
	const { token } = state.user.user;
	try {
		const response = await fetch(`${BASE_URL}boards/${boardId}`, {
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
		return await response.json();
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(`${error.message}`);
		}
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

export const updateBoard = createAsyncThunk<
  BoardUserModel,
  {boardId: string, body: NewBoardPropsModel},
  { rejectValue: string }
>('boards/updateBoard', async ({ boardId, body }, { rejectWithValue, getState }) => {
	const state = getState() as ReturnType<Store['getState']>;
	const { token } = state.user.user;
	try {
		const response = await fetch(`${BASE_URL}boards/${boardId}`, {
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
		return await response.json();
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(`${error.message}`);
		}
		return rejectWithValue('Unknown Error! Try to refresh the page');
	}
});

export const getUserBoards = createAsyncThunk('boards/getUserBoards', async (boardId, { rejectWithValue, getState }) => {
	const state = getState() as ReturnType<Store['getState']>;
	const { id, token } = state.user.user;
	try {
		const response = await fetch(`${BASE_URL}boards/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const boardsAll = await response.json();
		return boardsAll
			.filter((board: BoardModel) => id === board.owner || board.users.includes(id))
			.map((board: BoardModel) => {
				if (board.owner === id) {
					return Object.assign(board, { invited: false });
				}
				return Object.assign(board, { invited: true });
			});
	} catch {
		return rejectWithValue('error');
	}
});

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getUserBoards.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			getUserBoards.fulfilled,
			(state, action: PayloadAction<Array<BoardUserModel>>) => {
				state.isLoading = false;
				state.boards = action.payload;
			},
		);
		builder.addCase(getUserBoards.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(createBoard.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			createBoard.fulfilled,
			(state, action: PayloadAction<BoardUserModel>) => {
				state.isLoading = false;
				state.boards.push(action.payload);
			},
		);
		builder.addCase(createBoard.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(deleteBoard.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			deleteBoard.fulfilled,
			(state, action: PayloadAction<BoardModel>) => {
				state.isLoading = false;
				state.boards = state.boards.filter((item) => item._id !== action.payload._id);
			},
		);
		builder.addCase(deleteBoard.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(updateBoard.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			updateBoard.fulfilled,
			(state, action: PayloadAction<BoardModel>) => {
				state.isLoading = false;
				state.boards = state.boards.map((item) => {
					if (item._id === action.payload._id) {
						item.title = action.payload.title;
					}
					return item;
				});
			},
		);
		builder.addCase(updateBoard.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
	},
});
