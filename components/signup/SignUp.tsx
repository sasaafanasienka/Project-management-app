import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
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

	const onSubmit = (data: UserUpdateFormDataModel) => {
		console.log(data);
	};

	return (
		<FormWrapper>
			<FormHeader header={headerText} text={headerMessage} />
			<ValidationForm
				header={formActionText}
				resetForm
				submitBtnTxt={formActionText}
				onSubmit={onSubmit}/>
			<BottomLink text={bottomLinkTxt} linkTo={linkTo}/>
		</FormWrapper>
	);
};

export default SignUp;
