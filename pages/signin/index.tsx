import Head from 'next/head';
import { FC, ReactElement } from 'react';
import SignIn from '../../components/signin/SignIn';

const SignInPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>SignIn</title>
		</Head>
		<SignIn />
	</>
);

export default SignInPage;
