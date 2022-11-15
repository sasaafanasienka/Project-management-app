import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import Profile from '../../components/profile/Profile';


const ProfilePage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Profile</title>
		</Head>
		<Layout>
			<Profile />
		</Layout>
	</>
);

export default ProfilePage;
