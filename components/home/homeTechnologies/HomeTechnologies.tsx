import { FC, ReactElement } from 'react';
import HomeList from '../homeList/HomeList';
import reactLogo from '../../../assets/images/react.png';
import nextLogo from '../../../assets/images/next.png';
import tsLogo from '../../../assets/images/typescript.png';
import styledLogo from '../../../assets/images/styled.png';
import muiLogo from '../../../assets/images/mui.png';
import reduxLogo from '../../../assets/images/redux.png';
import dndLogo from '../../../assets/images/dnd.png';
import HomeListItem from '../homeListItem/HomeListItem';
import { useAppSelector } from '../../../redux/store';

const HomeTechnologies: FC = (): ReactElement => {
	const technologiesTitle = useAppSelector((state) => state.lang.text.technologiesTitle);

	return (
		<HomeList title={technologiesTitle}>
			<HomeListItem
				link='https://reactjs.org/'
				image={reactLogo}
				title='React'
				alt='react logo'
			/>
			<HomeListItem
				link='https://nextjs.org/'
				image={nextLogo}
				title='Next JS'
				alt='next logo'
			/>
			<HomeListItem
				link='https://www.typescriptlang.org/'
				image={tsLogo}
				title='TypeScript'
				alt='typescript logo'
			/>
			<HomeListItem
				link='https://redux-toolkit.js.org/'
				image={reduxLogo}
				title='Redux-toolkit'
				alt='redux logo'
			/>
			<HomeListItem
				link='https://mui.com/'
				image={muiLogo}
				title='MUI'
				alt='MUI logo'
			/>
			<HomeListItem
				link='https://styled-components.com/'
				image={styledLogo}
				title='styled-components'
				alt='styled components logo'
			/>
			<HomeListItem
				link='https://github.com/atlassian/react-beautiful-dnd'
				image={dndLogo}
				title='react-beautiful-dnd'
				alt='react-beautiful-dnd'
			/>
		</HomeList>
	);
};

export default HomeTechnologies;
