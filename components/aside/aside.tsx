import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
import { FC, ReactElement } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledAside from './StyledAside';
import AsideButton from '../buttons/aside-button/AsideButton';


const Aside: FC = (): ReactElement => {
	const isDesktop = useMediaQuery('(min-width:1024px)');

	return (
		<StyledAside>
			{
				isDesktop && <>
					<AsideButton href="/" startIcon={<HomeOutlinedIcon />}>Home</AsideButton>
					<AsideButton href="/boards" startIcon={<ContentPasteOutlinedIcon />}>Boards</AsideButton>
					<AsideButton href="/profile" startIcon={<AccountCircleIcon />}>Profile</AsideButton>
					<AsideButton href="/signin" startIcon={<LoginIcon />}>Sign In</AsideButton>
					<AsideButton href="/signup" startIcon={<GroupAddIcon />}>Sign Up</AsideButton>
				</>
			}
			{
				!isDesktop && <>
					<IconButton
						color="secondary"
						href="/"
					>
						<HomeOutlinedIcon />
					</IconButton>
					<IconButton
						color="secondary"
						href="/boards"
					>
						<ContentPasteOutlinedIcon />
					</IconButton>
					<IconButton
						color="secondary"
						href="/profile"
					>
						<AccountCircleIcon />
					</IconButton>
					<IconButton
						color="secondary"
						href="/signin"
					>
						<LoginIcon />
					</IconButton>
					<IconButton
						color="secondary"
						href="/signup"
					>
						<GroupAddIcon />
					</IconButton>
				</>
			}
		</StyledAside>
	);
};

export default Aside;
