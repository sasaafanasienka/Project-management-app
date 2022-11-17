import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Boards from '../../components/boards/Boards';
import Layout from '../../components/layout/Layout';

const BoardsPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Layout>
			<Boards/>
		</Layout>
	</>
);

export default BoardsPage;
