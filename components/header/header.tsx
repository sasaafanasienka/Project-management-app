import { FC, ReactElement } from 'react';
import Logo from '../logo/Logo';
import LangToggle from './langToggle/LangToggle';
import StyledHeader from './StyledHeader';

const Header: FC = (): ReactElement => (
	<StyledHeader>
		<Logo />
		<LangToggle />
	</StyledHeader>
);

export default Header;
