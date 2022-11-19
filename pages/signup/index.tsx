import Head from 'next/head';
import { FC, ReactElement } from 'react';
import SignUp from '../../components/signup/SignUp';

const SignUpPage: FC = (): ReactElement => (
	<>
		<Head>
			<title>SignUp</title>
		</Head>
		<SignUp />
	</>
);

export default SignUpPage;
