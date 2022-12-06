import {
	Action, CombinedState, combineReducers, configureStore, PayloadAction, ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardSlice } from './slices/boardSlice';
import { columnSlice } from './slices/columnSlice';
import { langSlice } from './slices/langSlice';
import { userSlice } from './slices/userSlice';
import { tasksSlice } from './slices/tasksSlice';
import { modalsSlice } from './slices/modalsSlice';
import { InitialStateBoardModel } from './slices/boardSlice/interfaces';
import { InitialStateColumnModel } from './slices/columnSlice/interfaces';
import { InitialStateTaskModel } from './slices/tasksSlice/interfaces';
import { InitialStateUserModel } from './slices/userSlice/interfaces';
import { InitialLangStateModel } from './slices/langSlice/interfaces';
import { InitialStateModalsModel } from './slices/modalsSlice/interfaces';

const combinedReducer = combineReducers({
	lang: langSlice.reducer,
	user: userSlice.reducer,
	boards: boardSlice.reducer,
	columns: columnSlice.reducer,
	tasks: tasksSlice.reducer,
	modals: modalsSlice.reducer,
});

const reducer = (
	state: ReturnType<typeof combinedReducer> | undefined,
	action: PayloadAction<CombinedState<{
		lang: InitialLangStateModel;
		user: InitialStateUserModel;
		boards: InitialStateBoardModel;
		columns: InitialStateColumnModel;
		tasks: InitialStateTaskModel;
		modals: InitialStateModalsModel;
	}>>,
) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState as CombinedState<{
			lang: InitialLangStateModel;
			user: InitialStateUserModel;
			boards: InitialStateBoardModel;
			columns: InitialStateColumnModel;
			tasks: InitialStateTaskModel;
			modals: InitialStateModalsModel;
		}>;
	}
	return combinedReducer(state, action) as CombinedState<{
		lang: InitialLangStateModel;
		user: InitialStateUserModel;
		boards: InitialStateBoardModel;
		columns: InitialStateColumnModel;
		tasks: InitialStateTaskModel;
		modals: InitialStateModalsModel;
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
