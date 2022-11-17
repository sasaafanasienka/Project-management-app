import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Board from '../../components/board/Board';
import Layout from '../../components/layout/Layout';

const BoardPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Layout>
			<Board/>
		</Layout>
	</>
);

export default BoardPage;
