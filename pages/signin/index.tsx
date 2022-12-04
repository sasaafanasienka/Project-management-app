import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';
import SignIn from '../../components/signin/SignIn';
import { useAppSelector } from '../../redux/store';

const SignInPage: FC = (): ReactElement => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const router = useRouter();
	if (isAuth) {
		router.push('/');
	}

	return (
		<>
			<Head>
				<title>SignIn</title>
			</Head>
			<SignIn />
		</>
	);
};

export default SignInPage;
