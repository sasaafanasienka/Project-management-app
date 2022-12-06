import { FC, ReactElement } from 'react';
import Image from 'next/image';
import StyledUserInfo from './StyledUserInfo';
import UserMeta from '../userMeta/UserMeta';

const UserInfo: FC = (): ReactElement => (
	<StyledUserInfo>
		<div>
			<Image src='/avatar.svg' width={200} height={200} alt='user avatar'style={{ objectFit: 'contain' }}/>
		</div>
		<UserMeta />
	</StyledUserInfo>
);

export default UserInfo;
