/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import decodeToken from '../../../utils/decodeToken';
import { InitialStateUserModel, NewUserRequestPropsModel, NewUserResponseModel } from './interfaces';

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


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logOut: (state) => {
			state.isAuth = false;
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
				localStorage.setItem('appToken', JSON.stringify(action.payload.token));
				const { id, login } = decodeToken(action.payload.token);
				state.user.id = id;
				state.user.login = login;
				state.isAuth = true;
			},
		);
		builder.addCase(logInUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});
	},
});

export const { logOut } = userSlice.actions;
