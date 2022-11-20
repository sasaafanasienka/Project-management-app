import { Button } from '@mui/material';
import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../../redux/store';
import { StyledHomeSection } from '../layout/StyledHomeLayout';

const HomeTitle: FC = (): ReactElement => {
	const titleLang = useAppSelector((state) => state.lang.text.homeTitle);
	const descrLang = useAppSelector((state) => state.lang.text.homeDescription);
	const btnLang = useAppSelector((state) => state.lang.text.homeBtn);

	return (
		<StyledHomeSection>
			<h1>
				{titleLang}
			</h1>
			<p>
				{descrLang}
			</p>
			<Button color="primary" size="large" variant="contained">{btnLang}</Button>
		</StyledHomeSection>
	);
};

export default HomeTitle;
