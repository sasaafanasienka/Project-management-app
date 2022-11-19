import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Profile from '../../components/profile/Profile';


const ProfilePage: FC = (): ReactElement => (
	<>
		<Head>
			<title>Profile</title>
		</Head>
		<Profile />
	</>
);

export default ProfilePage;
