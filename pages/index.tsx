import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Home from '../components/home/Home';

const HomePage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Home></Home>
	</>
);

export default HomePage;
