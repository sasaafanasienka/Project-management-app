import { FC, ReactElement } from 'react';
import { FormHeaderProps } from './interfaces';
import StyledFormHeader from './StyledFormHeader';

const FormHeader: FC<FormHeaderProps> = ({ header, text }): ReactElement => (
	<StyledFormHeader>
		<h1>{header}</h1>
		<h3>{text}</h3>
	</StyledFormHeader>
);

export default FormHeader;
