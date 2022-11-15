import { FC, ReactElement } from 'react';
import { useAppSelector } from '../../../redux/store';
import StyledUserMeta from './StyledUserMeta';

const UserMeta: FC = (): ReactElement => {
	const nameLangVersion = useAppSelector((state) => state.lang.text.name);
	const loginLangVersion = useAppSelector((state) => state.lang.text.login);

	return (
		<StyledUserMeta>
			<h3>
				{nameLangVersion.toUpperCase()}
			</h3>
			<div>
        ISRAEL
			</div>
			<h3>
				{loginLangVersion.toUpperCase()}
			</h3>
			<div>
        THE LAST STYLEBENDER
			</div>
		</StyledUserMeta>
	);
};


export default UserMeta;
