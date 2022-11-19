import { FC, ReactElement } from 'react';
import HomeList from '../homeList/HomeList';
import reactLogo from '../../../assets/images/react.png';
import nextLogo from '../../../assets/images/next.png';
import tsLogo from '../../../assets/images/typescript.png';
import styledLogo from '../../../assets/images/styled.png';
import muiLogo from '../../../assets/images/mui.png';
import reduxLogo from '../../../assets/images/redux.png';
import HomeListItem from '../homeListItem/HomeListItem';

const HomeTechnologies: FC = (): ReactElement => (
	<HomeList title="Our technologies">
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
	</HomeList>
);

export default HomeTechnologies;