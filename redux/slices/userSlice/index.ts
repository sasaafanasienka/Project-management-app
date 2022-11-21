/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import decodeToken from '../../../utils/decodeToken';
import {
	GetUserByIdProps,
	GetUserByIdResponceModel,
	InitialStateUserModel,
	NewUserRequestPropsModel,
	NewUserResponseModel,
} from './interfaces';

const BASE_URL = 'https://final-task-backend-production-287c.up.railway.app/';

const initialState: InitialStateUserModel = {
	isAuth: false,
	isCreated: false,
	isLoading: false,
	error: '',
	user: {
		id: '',
		name: '',
		login: '',
		token: '',
	},
};

export const createUser = createAsyncThunk<
  NewUserResponseModel,
  NewUserRequestPropsModel,
  { rejectValue: string }
  >('user/createUser', async (body, { rejectWithValue }) => {
  	try {
  		const res = await fetch(`${BASE_URL}auth/signup`, {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(body),
  		});
  		if (!res.ok) {
  			const { statusCode, message } = await res.json();
  			throw new Error(`${statusCode} ${message}`);
  		}
  		return await res.json();
  	} catch (err) {
  		if (err instanceof Error) {
  			return rejectWithValue(`${err.message}`);
  		}
  		return rejectWithValue('Unknown Error! Try to refresh the page');
    	}
  });

export const logInUser = createAsyncThunk<
  {token: string},
  Partial<NewUserRequestPropsModel>,
  { rejectValue: string }
  >('user/logInUser', async (body, { rejectWithValue }) => {
  	try {
  		const res = await fetch(`${BASE_URL}auth/signin`, {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(body),
  		});
  		if (!res.ok) {
  			const { statusCode, message } = await res.json();
  			throw new Error(`${statusCode} ${message}`);
  		}
  		return await res.json();
  	} catch (err) {
  		if (err instanceof Error) {
  			return rejectWithValue(`${err.message}`);
  		}
  		return rejectWithValue('Unknown Error! Try to refresh the page');
    	}
  });

export const getUserById = createAsyncThunk<
		GetUserByIdResponceModel,
		GetUserByIdProps,
		{ rejectValue: string }
	>('user/getUserById', async (props, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}users/${props.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${props.token}`,
				},
			});
			if (!response.ok) {
				const { statusCode, message } = await response.json();
  			throw new Error(`${statusCode} ${message}`);
			}
			return await response.json();
		} catch (err) {
			if (err instanceof Error) {
  			return rejectWithValue(`${err.message}`);
  		}
  		return rejectWithValue('Unknown Error! Try to refresh the page');
		}
	});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logOut: (state) => {
			state.user = initialState.user;
			state.isAuth = false;
			const expiped = Date.now() - 1000;
			document.cookie = `token=; expires${expiped}`;
		},
		restoreUserToken: (state, action: PayloadAction<{
				id: string;
				login: string;
				token: string
			}>) => {
			state.user.id = action.payload.id;
			state.user.login = action.payload.login;
			state.user.token = action.payload.token;
			state.isAuth = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createUser.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			createUser.fulfilled,
			(state, action: PayloadAction<NewUserResponseModel>) => {
				state.isLoading = false;
				state.user = { ...state.user, ...action.payload };
				state.isCreated = true;
			},
		);
		builder.addCase(createUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(logInUser.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			logInUser.fulfilled,
			(state, action: PayloadAction<{token: string}>) => {
				state.isLoading = false;
				state.user.token = action.payload.token;
				const { id, login, exp } = decodeToken(action.payload.token);
				const expired = new Date(exp * 1000);
				document.cookie = `token=${action.payload.token}; path=/; expires=${expired}`;
				state.user.id = id;
				state.user.login = login;
				state.isAuth = true;
			},
		);
		builder.addCase(logInUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
		builder.addCase(getUserById.pending, (state) => {
			state.isLoading = true;
			state.error = '';
		});
		builder.addCase(
			getUserById.fulfilled,
			(state, action: PayloadAction<GetUserByIdResponceModel>) => {
				state.isLoading = false;
				state.user.login = action.payload.login;
				state.user.name = action.payload.name;
			},
		);
		builder.addCase(getUserById.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
	},
});

export const { logOut, restoreUserToken } = userSlice.actions;
