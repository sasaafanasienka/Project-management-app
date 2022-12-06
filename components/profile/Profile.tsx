import { Button } from '@mui/material';
import {
	FC, ReactElement, useState,
} from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ModalWindow from '../modal/ModalWindow';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import { UserUpdateFormDataModel } from '../validationForm/interfaces';
import ValidationForm from '../validationForm/ValidationForm';
import UserInfo from './userInfo/UserInfo';
import { deleteUser, logOut, updateUser } from '../../redux/slices/userSlice';


const Profile: FC = (): ReactElement => {
	const router = useRouter();

	const title = useAppSelector((state) => state.lang.text.editProfile);
	const submitBtnTxt = useAppSelector((state) => state.lang.text.editProfile);
	const deleteBtn = useAppSelector((state) => state.lang.text.deleteBtn);

	const modalTitleLang = useAppSelector((state) => state.lang.text.deleteUser);
	const modalDescrLang = useAppSelector((state) => state.lang.text.confirmation);
	const cancelBtnLang = useAppSelector((state) => state.lang.text.cancelBtn);

	const dispatch = useAppDispatch();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleUpdateUser = (data: UserUpdateFormDataModel) => {
		dispatch(updateUser(data))
			.unwrap()
			.then(() => {
				setIsModalOpen(false);
				dispatch(logOut());
				router.push('/signin', undefined, { shallow: true });
			})
			.finally(() => router.push('/signin', undefined, { shallow: true }));
	};

	const handleDeleteUser = () => {
		dispatch(deleteUser())
			.unwrap()
			.then(() => {
				setIsModalOpen(false);
				dispatch(logOut());
				router.push('/', undefined, { shallow: true });
			})
			.catch(() => {
			// toast.error(`An error has occured: ${err.message}`);
				setIsModalOpen(false);
			});
	};

	const handleModal = isModalOpen
		? () => setIsModalOpen(false)
		: () => setIsModalOpen(true);

	return (
		<>
			<FormWrapper>
				<UserInfo />
				<ValidationForm header={title} submitBtnTxt={submitBtnTxt} onSubmit={handleUpdateUser} >
					<Button onClick={handleModal} color="warning" size="large" variant='outlined'>
						{deleteBtn}
					</Button>
				</ValidationForm>
			</FormWrapper>
			<ModalWindow
				title={modalTitleLang}
				description={modalDescrLang}
				// closeFunc={handleModal}
				isOpened={isModalOpen}>
				<Button onClick={handleModal}>{cancelBtnLang}</Button>
				<Button onClick={handleDeleteUser} variant='contained' autoFocus>
					{deleteBtn}
				</Button>
			</ModalWindow>
		</>
	);
};

export default Profile;
