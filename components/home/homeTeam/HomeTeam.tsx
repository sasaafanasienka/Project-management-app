import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../../redux/store';
import HomeList from '../homeList/HomeList';
import HomeListItem from '../homeListItem/HomeListItem';

const HomeTeam: FC = (): ReactElement => {
	const titleLang = useAppSelector((state) => state.lang.text.teamTitle);

	return (
		<HomeList title={titleLang}>
			<HomeListItem
				link='https://github.com/sasaafanasienka'
				image='https://avatars.githubusercontent.com/u/57214583?v=4'
				title='Sasha Afanasienka'
				alt='userpic'
			/>
			<HomeListItem
				link='https://github.com/rmnvch'
				image='https://avatars.githubusercontent.com/u/90370279?v=4'
				title='Anton Romanovich'
				alt='userpic'
			/>
		</HomeList>
	);
};

export default HomeTeam;
