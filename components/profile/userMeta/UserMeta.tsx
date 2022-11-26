import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../../redux/store';
import StyledUserMeta from './StyledUserMeta';

const UserMeta: FC = (): ReactElement => {
	const nameLangVersion = useAppSelector((state) => state.lang.text.name);
	const loginLangVersion = useAppSelector((state) => state.lang.text.login);
	const name = useAppSelector((state) => state.user.user.name);
	const login = useAppSelector((state) => state.user.user.login);

	return (
		<StyledUserMeta>
			<h3>
				{nameLangVersion.toUpperCase()}
			</h3>
			<div>
				{name}
			</div>
			<h3>
				{loginLangVersion.toUpperCase()}
			</h3>
			<div>
				{login}
			</div>
		</StyledUserMeta>
	);
};


export default UserMeta;
