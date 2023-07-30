/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useRef } from 'react';
import theme from '../theme/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useAppDispatch, wrapper } from '../redux/store';
import Layout from '../components/layout/Layout';
import decodeToken from '../utils/decodeToken';
import {
	getAllUsers, getUserById, logOut, restoreUserToken,
} from '../redux/slices/userSlice';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { getUserBoards } from '../redux/slices/boardSlice';
import { readCookie } from '../utils/cookieUtilities';

function App({ Component, pageProps }: AppProps) {
	const dispatch = useAppDispatch();
	const interval = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		const token = readCookie('token');
		if (token) {
			const { id, login, exp } = decodeToken(token);
			dispatch(restoreUserToken({ id, login, token }));
			dispatch(getUserById());
			dispatch(getAllUsers());
			dispatch(getUserBoards());
			interval.current = setTimeout(() => {
				dispatch(logOut());
			}, exp * 1000 - Date.now());
			return () => clearTimeout(interval.current);
		}
		return () => {};
	}, [dispatch]);

	return (
		<ErrorBoundary>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps}>
						<Head>
							<link rel="preconnect" href="https://fonts.googleapis.com" />
							<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
							<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
						</Head>
					</Component>
				</Layout>
			</ThemeProvider>
		</ErrorBoundary>
	);
}

export default wrapper.withRedux(App);
