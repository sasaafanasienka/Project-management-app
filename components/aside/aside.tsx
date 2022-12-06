import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
import Divider from '../divider/Divider';
import Nav from './nav/Nav';
import StyledAside from './StyledAside';
import UserAside from './userAside/userAside';


const Aside: FC = (): ReactElement => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	return (
		<StyledAside>
			{isAuth
			&& <>
				<UserAside />
				<Divider />
			</>
			}
			<Nav />
		</StyledAside>
	);
};

export default Aside;
