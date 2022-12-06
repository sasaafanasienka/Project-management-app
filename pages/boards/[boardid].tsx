import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';
import Board from '../../components/board/Board';


const BoardPage: FC = (): ReactElement => {
	const router = useRouter();
	const { boardid } = router.query;

	return (
		<>
			<Head>
				<title>Home page</title>
			</Head>
			<Board location={boardid as string} />
		</>
	);
};

export default BoardPage;

