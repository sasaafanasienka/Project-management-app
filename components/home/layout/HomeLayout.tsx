import { FC, ReactElement } from 'react';
import { HomeLayoutProps } from '../interfaces';
import { StyledHomeWrapper } from './StyledHomeLayout';


const HomeLayout: FC<HomeLayoutProps> = ({ children }): ReactElement => (
	<StyledHomeWrapper>
		{children}
	</StyledHomeWrapper>
);

export default HomeLayout;
