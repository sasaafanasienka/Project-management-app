import { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { createUser } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import BottomLink from '../validationForm/bottomLink/BottomLink';
import FormHeader from '../validationForm/formHeader/FormHeader';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import { UserUpdateFormDataModel } from '../validationForm/interfaces';
import ValidationForm from '../validationForm/ValidationForm';

const SignUp: FC = (): ReactElement => {
	const formActionText = useAppSelector((state) => state.lang.text.singUp);
	const bottomLinkTxt = useAppSelector((state) => state.lang.text.hasAccount);
	const linkTo = useAppSelector((state) => state.lang.text.singIn);
	const headerText = useAppSelector((state) => state.lang.text.singUpGreet);
	const headerMessage = useAppSelector((state) => state.lang.text.singUpMessage);
	const toastSuccess = useAppSelector((state) => state.lang.text.toastSuccessSignUp);
	const toastFailureHasAccaunt = useAppSelector(
		(state) => state.lang.text.toastFailureSignUpHasAccount,
	);
	const toastFailure = useAppSelector((state) => state.lang.text.toastFailureSignUp);


	const dispatch = useAppDispatch();

	const router = useRouter();

	const onSubmit = (data: UserUpdateFormDataModel) => {
		dispatch(createUser(data))
			.unwrap()
			.then((resolveRes) => {
				new Promise((resolve) => {
					setTimeout(() => resolve('resolved'), 500);
				}).then(() => router.push('/signin', undefined, { shallow: true }));
			});
	};

	return (
		<FormWrapper>
			<FormHeader header={headerText} text={headerMessage} />
			<ValidationForm
				header={formActionText}
				resetForm
				submitBtnTxt={formActionText}
				onSubmit={onSubmit}/>
			<BottomLink text={bottomLinkTxt} linkTo='signin' linkText={linkTo}/>
		</FormWrapper>
	);
};

export default SignUp;
