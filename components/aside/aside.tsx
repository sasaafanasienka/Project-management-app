import { FC, ReactElement } from 'react';
import Divider from '../divider/Divider';
import Nav from './nav/Nav';
import StyledAside from './StyledAside';
import UserAside from './userAside/userAside';


const Aside: FC = (): ReactElement => (
	<StyledAside>
		<UserAside />
		<Divider />
		<Nav />
	</StyledAside>
);

export default Aside;
