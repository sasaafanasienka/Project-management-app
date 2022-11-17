import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import SignUp from '../../components/signup/SignUp';

const SignUpPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>SignUp</title>
		</Head>
		<Layout>
			<SignUp />
		</Layout>
	</>
);

export default SignUpPage;
