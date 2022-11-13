import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { langSlice } from './slices/langSlice';


export default function getStore(incomingPreloadState?: undefined) {
	return configureStore({
		reducer: {
			lang: langSlice.reducer,
		},
		preloadedState: incomingPreloadState,
	});
}

const store = getStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
