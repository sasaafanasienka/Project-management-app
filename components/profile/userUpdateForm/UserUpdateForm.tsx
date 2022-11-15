import { FC, ReactElement } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppSelector } from '../../../redux/store';
import { StyledUserUpdateForm, StyledForm } from './StyledUserUpdateForm';
import FlexBox from '../../styled/FlexBox';


const UserUpdateForm: FC = (): ReactElement => {
	const headerLang = useAppSelector((state) => state.lang.text.editProfile);
	const deleteLang = useAppSelector((state) => state.lang.text.deleteBtn);

	return (
		<StyledUserUpdateForm>
			<h2>{headerLang.toUpperCase()}</h2>
			<StyledForm>
				<TextField id="filled-basic" label="Name" variant="outlined" />
				<TextField id="filled-basic" label="Login" variant="outlined" />
				<TextField id="filled-basic" label="Password" variant="outlined" type={'password'}/>
				<FlexBox justifyContent='end'>
					<Button color="warning" size="large" variant='outlined'>
						{deleteLang}
					</Button>
					<Button color="info" type="submit" size="large" variant='outlined'>
						{headerLang}
					</Button>
				</FlexBox>
			</StyledForm>
		</StyledUserUpdateForm>
	);
};

export default UserUpdateForm;
