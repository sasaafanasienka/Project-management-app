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
import { getUserById, logOut, restoreUserToken } from '../redux/slices/userSlice';

function App({ Component, pageProps }: AppProps) {
	const dispatch = useAppDispatch();
	const interval = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		// const LS = JSON.parse(localStorage.getItem('appToken') as string);
		// console.log(LS);
		if (document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')) {
			const token = document.cookie.split('token=')[1].split(';')[0];
			const { id, login, exp } = decodeToken(token);
			dispatch(restoreUserToken({ id, login, token }));
			dispatch(getUserById({ id, token }));
			interval.current = setTimeout(() => {
				dispatch(logOut());
			}, exp * 1000 - Date.now());
			return () => clearTimeout(interval.current);
		}
	}, [dispatch]);

	return (
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
	);
}

export default wrapper.withRedux(App);
