import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import SignIn from '../../components/signin/SignIn';

const SignInPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>SignIn</title>
		</Head>
		<Layout>
			<SignIn />
		</Layout>
	</>
);

export default SignInPage;
