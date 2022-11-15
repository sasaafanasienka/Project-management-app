import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Layout from '../../components/layout/Layout';

const Board: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Layout></Layout>
	</>
);

export default Board;
