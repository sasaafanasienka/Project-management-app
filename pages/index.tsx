import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Home from '../components/home/Home';
import Layout from '../components/layout/Layout';

const HomePage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Layout>
			<Home></Home>
		</Layout>
	</>
);

export default HomePage;
