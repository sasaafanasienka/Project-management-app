import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} >
				<Head>

				</Head>
			</Component>
		</ThemeProvider>
	);
}
