import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';
import { GetStaticProps } from 'next';
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

export async function getStaticPaths() {
	const data = {
		// Only `/posts/1` and `/posts/2` are generated at build time
		paths: [{ params: { boardid: '1' } }, { params: { boardid: '2' } }],
		// Enable statically generating additional pages
		// For example: `/posts/3`
		fallback: true,
	};
	console.log(data);
	return data;
}

export async function getStaticProps({ params }) {
	console.log('params: ', params);
	// params contains the post `id`.
	// If the route is like /posts/1, then params.id is 1
	const res = await fetch('https://final-task-backend-production-287c.up.railway.app/boards/638353168839d53dc5a156b7/columns');
	const post = await res.json();
	console.log(post);

	// Pass post data to the page via props
	return {
		props: { post },
		// Re-generate the post at most once per second
		// if a request comes in
		revalidate: 1,
	};
}

export default BoardPage;
