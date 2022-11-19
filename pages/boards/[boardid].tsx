import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Board from '../../components/board/Board';

const BoardPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Board/>
	</>
);

export default BoardPage;
