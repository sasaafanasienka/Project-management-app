import { Button } from '@mui/material';
import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
import { UserUpdateFormDataModel } from '../validationForm/interfaces';
import ValidationForm from '../validationForm/ValidationForm';
import ProfileLayout from './layout/ProfileLayout';
import UserInfo from './userInfo/UserInfo';


const Profile: FC = (): ReactElement => {
	const title = useAppSelector((state) => state.lang.text.editProfile);
	const submitBtnTxt = useAppSelector((state) => state.lang.text.editProfile);
	const deleteBtn = useAppSelector((state) => state.lang.text.deleteBtn);

	const updateUser = (data: UserUpdateFormDataModel) => {
		console.log(data);
	};

	return (
		<ProfileLayout>
			<UserInfo />
			<ValidationForm header={title} submitBtnTxt={submitBtnTxt} onSubmit={updateUser} >
				<Button color="warning" size="large" variant='outlined'>
					{deleteBtn}
				</Button>
			</ValidationForm>
		</ProfileLayout>
	);
};

export default Profile;
