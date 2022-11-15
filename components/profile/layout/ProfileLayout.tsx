import { FC, ReactElement } from 'react';
import { ProfileLayoutProps } from '../interfaces';
import { StyledProfileWrapper, StyledProfileContent } from './StyledProfileLayout';


const ProfileLayout: FC<ProfileLayoutProps> = ({ children }): ReactElement => (
	<StyledProfileWrapper>
		<StyledProfileContent>
			{ children }
		</StyledProfileContent>
	</StyledProfileWrapper>
);

export default ProfileLayout;
