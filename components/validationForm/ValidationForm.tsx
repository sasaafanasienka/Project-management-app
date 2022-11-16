import {
	FC, ReactElement, useEffect,
} from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { StyledValidationForm, StyledForm } from './StyledValidationForm';
import FlexBox from '../styled/FlexBox';
import { UserUpdateFormDataModel, ValidationFormProps } from './interfaces';

const ValidationForm: FC<ValidationFormProps> = ({
	header,
	onSubmit,
	submitBtnTxt,
	children,
	resetForm,
	isSigningIn,
}): ReactElement => {
	const {
		register, handleSubmit, reset, formState: {
			errors, isValid, isDirty, isSubmitted,
		},
	} = useForm<UserUpdateFormDataModel>();

	useEffect(() => {
		if (isSubmitted && resetForm) {
			reset();
		}
	}, [isSubmitted, reset, resetForm]);

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
		<StyledValidationForm>
			<h2>{header}</h2>
			<StyledForm onSubmit={handleSubmit(onSubmit)} >
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
				{!isSigningIn
					&& <TextField label="Login" variant="outlined" {...register('login', {
						required: 'This field is required',
						minLength: {
							value: 2,
							message: 'Login should consist of at least 2 chars',
						},
					})}
					error={!!errors.login} helperText={errors?.login ? errors?.login.message : null}
					/>
				}
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
				<FlexBox justifyContent={children ? 'end' : 'center'}>
					{ children }
					<Button color="info" type="submit" size="large" variant='outlined' disabled={disableSubmitBtn()}>
						{submitBtnTxt}
					</Button>
				</FlexBox>
			</StyledForm>
		</StyledValidationForm>
	);
};

export default ValidationForm;
