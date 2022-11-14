/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import getStore from '../redux/store';
import theme from '../theme/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
	const store = getStore(pageProps.initialState);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps}>
					<Head>
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
						<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
					</Head>
				</Component>
			</ThemeProvider>
		</Provider >
	);
}
