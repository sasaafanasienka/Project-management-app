/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { wrapper } from '../redux/store';
import Layout from '../components/layout/Layout';

function App({ Component, pageProps }: AppProps) {
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
