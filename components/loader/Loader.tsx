import { FC, ReactElement } from 'react';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import { StyledFormWrapper } from '../validationForm/formWrapper/StyledFormWrapper';
import styles from './loader.module.scss';

const Loader: FC = (): ReactElement => (
	<StyledFormWrapper>
		<span className={styles.loader}></span>
	</StyledFormWrapper>
);

export default Loader;
