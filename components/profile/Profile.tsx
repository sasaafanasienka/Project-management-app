import { FC, ReactElement } from 'react';
import ProfileLayout from './layout/ProfileLayout';
import UserInfo from './userInfo/UserInfo';
import UserUpdateForm from './userUpdateForm/UserUpdateForm';


const Profile: FC = (): ReactElement => (
	<ProfileLayout>
		<UserInfo />
		<UserUpdateForm />
	</ProfileLayout>
);

export default Profile;
