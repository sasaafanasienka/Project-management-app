import { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StyledUserAside from './StyledUserAside';
import { useAppSelector } from '../../../redux/store';


const UserAside: FC = (): ReactElement => {
	const name = useAppSelector((state) => state.user.user.login);
	const settingsLang = useAppSelector((state) => state.lang.text.editProfile);

	return (
		<StyledUserAside>
			<Image width={55} height={55} src='/avatar.svg' alt='user avatar'/>
			<div>
				{name}
			</div>
			<Link href='/profile'>
				<SettingsOutlinedIcon />
				{settingsLang}
			</Link>
		</StyledUserAside>
	);
};

export default UserAside;
