import { FC, ReactElement } from 'react';
import { TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../../redux/store';
import { StyledUserUpdateForm, StyledForm } from './StyledUserUpdateForm';
import FlexBox from '../../styled/FlexBox';
import { UserUpdateFormDataModel } from '../interfaces';

const UserUpdateForm: FC = (): ReactElement => {
	const {
		register, handleSubmit, formState: {
			errors, isValid, isDirty,
		},
	} = useForm<UserUpdateFormDataModel>();

	const onSubmit: SubmitHandler<UserUpdateFormDataModel> = (data) => {
		console.log(data);
	};

	const headerLang = useAppSelector((state) => state.lang.text.editProfile);
	const deleteLang = useAppSelector((state) => state.lang.text.deleteBtn);

	// eslint-disable-next-line consistent-return
	const disableSubmitBtn = () => {
		if (!isDirty) {
			return true;
		}
		if (Object.keys(errors).length) {
			return true;
		} if (isValid) {
			return false;
		}
	};

	return (
		<StyledUserUpdateForm>
			<h2>{headerLang.toUpperCase()}</h2>
			<StyledForm onSubmit={handleSubmit(onSubmit)} onChange={() => console.log(errors)}>
				<TextField label="Name" variant="outlined" {...register('name', {
					required: 'This field is required',
					minLength: {
						value: 2,
						message: 'Name should consist of at least 2 chars',
					},
					pattern: {
						value: /^[a-zA-Z]+$/,
						message: 'Only letters allowed',
					},
				})} error={!!errors.name} helperText={errors?.name ? errors?.name.message : null}
				/>
				<TextField label="Login" variant="outlined" {...register('login', {
					required: 'This field is required',
					minLength: {
						value: 2,
						message: 'Login should consist of at least 2 chars',
					},
				})}
				error={!!errors.login} helperText={errors?.login ? errors?.login.message : null}
				/>
				<TextField label="Password" variant="outlined" type={'password'} {...register('password', {
					required: 'This field is required',
					pattern: {
						value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message: 'Password should contain at least eight characters including one letter and one number:',
					},
				})}
				error={!!errors.password}
				helperText={errors?.password ? errors?.password.message : null}
				/>
				<FlexBox justifyContent='end'>
					<Button color="warning" size="large" variant='outlined'>
						{deleteLang}
					</Button>
					<Button color="info" type="submit" size="large" variant='outlined' disabled={disableSubmitBtn()}>
						{headerLang}
					</Button>
				</FlexBox>
			</StyledForm>
		</StyledUserUpdateForm>
	);
};

export default UserUpdateForm;
