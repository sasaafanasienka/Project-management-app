import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';
import { getUserById, logInUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import BottomLink from '../validationForm/bottomLink/BottomLink';
import FormHeader from '../validationForm/formHeader/FormHeader';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import { UserUpdateFormDataModel } from '../validationForm/interfaces';
import ValidationForm from '../validationForm/ValidationForm';

const SignIn: FC = (): ReactElement => {
	const formActionText = useAppSelector((state) => state.lang.text.singIn);
	const bottomLinkTxt = useAppSelector((state) => state.lang.text.noAccount);
	const linkTo = useAppSelector((state) => state.lang.text.singUp);
	const headerText = useAppSelector((state) => state.lang.text.singInGreet);
	const headerMessage = useAppSelector((state) => state.lang.text.singInMessage);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmit = (data: UserUpdateFormDataModel) => {
		dispatch(logInUser(data))
			.unwrap()
			.then(() => {
				dispatch(getUserById());
				router.push('/boards', undefined, { shallow: true });
			});
	};

	return (
		<FormWrapper>
			<FormHeader header={headerText} text={headerMessage} />
			<ValidationForm
				header={formActionText}
				resetForm
				submitBtnTxt={formActionText}
				onSubmit={onSubmit}
				isSigningIn
			/>
			<BottomLink text={bottomLinkTxt} linkTo='signup' linkText={linkTo}/>
		</FormWrapper>
	);
};

export default SignIn;
