import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';
import SignUp from '../../components/signup/SignUp';
import { useAppSelector } from '../../redux/store';

const SignUpPage: FC = (): ReactElement => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const router = useRouter();
	if (isAuth) {
		router.push('/');
	}

	return (
		<>
			<Head>
				<title>SignUp</title>
			</Head>
			<SignUp />
		</>
	);
};


export default SignUpPage;
