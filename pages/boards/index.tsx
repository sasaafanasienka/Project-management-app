import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Boards from '../../components/boards/Boards';

const BoardsPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Boards/>
	</>
);

export default BoardsPage;
