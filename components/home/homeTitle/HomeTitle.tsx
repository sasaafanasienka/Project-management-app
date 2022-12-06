import { Button } from '@mui/material';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../../redux/store';
import { StyledHomeSection } from '../layout/StyledHomeLayout';

const HomeTitle: FC = (): ReactElement => {
	const titleLang = useAppSelector((state) => state.lang.text.homeTitle);
	const descrLang = useAppSelector((state) => state.lang.text.homeDescription);
	const btnLang = useAppSelector((state) => state.lang.text.homeBtn);
	const btnBoardsLang = useAppSelector((state) => state.lang.text.homeBtnBoards);
	const isAuth = useAppSelector((state) => state.user.isAuth);

	return (
		<StyledHomeSection>
			<h1>
				{titleLang}
			</h1>
			<p>
				{descrLang}
			</p>
			<Link href={ isAuth ? '/boards' : '/signin'}>
				<Button color="primary" size="large" variant="contained">{
					isAuth ? btnBoardsLang : btnLang
				}</Button>
			</Link>
		</StyledHomeSection>
	);
};

export default HomeTitle;
