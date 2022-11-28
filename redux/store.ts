import {
	Action, CombinedState, combineReducers, configureStore, PayloadAction, ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardSlice } from './slices/boardSlice';
import { columnSlice } from './slices/columnSlice';
import { InitialStateBoardModel } from './slices/boardSlice/interfaces';
import { langSlice } from './slices/langSlice';
import { InitialStateModel } from './slices/langSlice/interfaces';
import { userSlice } from './slices/userSlice';
import { InitialStateUserModel } from './slices/userSlice/interfaces';

const combinedReducer = combineReducers({
	lang: langSlice.reducer,
	user: userSlice.reducer,
	boards: boardSlice.reducer,
	columns: columnSlice.reducer,
});

const reducer = (
	state: ReturnType<typeof combinedReducer> | undefined,
	action: PayloadAction<CombinedState<{
		lang: InitialStateModel;
		user: InitialStateUserModel;
		boards: InitialStateBoardModel;
	}>>,
) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState as CombinedState<{
			lang: InitialStateModel;
			user: InitialStateUserModel;
			boards: InitialStateBoardModel;
	}>;
	}
	return combinedReducer(state, action) as CombinedState<{
			lang: InitialStateModel;
			user: InitialStateUserModel;
			boards: InitialStateBoardModel;
	}>;
};

export const makeStore = () => configureStore({
	reducer,
});

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });

export type AppStore = ReturnType<typeof makeStore>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
