import { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StyledUserAside from './StyledUserAside';


const UserAside: FC = (): ReactElement => (
	<StyledUserAside>
		<Image width={55} height={55} src='/avatar.svg' alt='user avatar'/>
		<div>
      Name
		</div>
		<Link href='/profile'>
			<SettingsOutlinedIcon />
			Profile settings</Link>
	</StyledUserAside>
);

export default UserAside;
