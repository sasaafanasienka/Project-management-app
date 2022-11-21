import { Button } from '@mui/material';
import { FC, ReactElement, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import ModalWindow from '../modal/ModalWindow';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import { UserUpdateFormDataModel } from '../validationForm/interfaces';
import ValidationForm from '../validationForm/ValidationForm';
import UserInfo from './userInfo/UserInfo';


const Profile: FC = (): ReactElement => {
	const title = useAppSelector((state) => state.lang.text.editProfile);
	const submitBtnTxt = useAppSelector((state) => state.lang.text.editProfile);
	const deleteBtn = useAppSelector((state) => state.lang.text.deleteBtn);

	const modalTitleLang = useAppSelector((state) => state.lang.text.deleteUser);
	const modalDescrLang = useAppSelector((state) => state.lang.text.confirmation);
	const cancelBtnLang = useAppSelector((state) => state.lang.text.cancelBtn);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const updateUser = (data: UserUpdateFormDataModel) => {
		console.log(data);
	};

	const deleteUser = () => {
		setIsModalOpen(false);
	};

	const handleModal = isModalOpen
		? () => setIsModalOpen(false)
		: () => setIsModalOpen(true);

	return (
		<>
			<FormWrapper>
				<UserInfo />
				<ValidationForm header={title} submitBtnTxt={submitBtnTxt} onSubmit={updateUser} >
					<Button onClick={handleModal} color="warning" size="large" variant='outlined'>
						{deleteBtn}
					</Button>
				</ValidationForm>
			</FormWrapper>
			<ModalWindow
				title={modalTitleLang}
				description={modalDescrLang}
				closeFunc={deleteUser}
				isOpened={isModalOpen}>
				<Button onClick={handleModal}>{cancelBtnLang}</Button>
				<Button variant='contained' autoFocus>
					{deleteBtn}
				</Button>
			</ModalWindow>
		</>
	);
};

export default Profile;
