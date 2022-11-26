import Head from 'next/head';
import NotFound from '../components/notFound/NotFound';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404</title>
			</Head>
			<NotFound />
		</>
	);
}
