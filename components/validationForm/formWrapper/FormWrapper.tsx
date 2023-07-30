import { FC, ReactElement } from 'react';
import { ValidationFormWrapperProps } from '../interfaces';
import { StyledFormContent, StyledFormWrapper } from './StyledFormWrapper';

const FormWrapper: FC<ValidationFormWrapperProps> = ({ children }): ReactElement => (
	<StyledFormWrapper>
		<StyledFormContent>
			{ children }
		</StyledFormContent>
	</StyledFormWrapper>
);

export default FormWrapper;
